import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getProductById } from '../data/products.js';
import { db } from '../services/db.js';
import { stripeService } from '../services/stripe.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Load configurations from environment variables
const EXPIRY_HOURS = parseInt(process.env.DOWNLOAD_TOKEN_EXPIRY_HOURS || '72', 10);
const MAX_USES = parseInt(process.env.DOWNLOAD_MAX_USES || '3', 10);
const FILE_STORAGE_DIR = process.env.FILE_STORAGE_DIR || path.join(__dirname, '../../protected-files/pdfs');

// Helper to calculate token expiry
function getExpiryDate() {
  const date = new Date();
  date.setHours(date.getHours() + EXPIRY_HOURS);
  return date.toISOString();
}

/**
 * 1. POST /api/create-checkout-session
 * Validates frontend cart items and returns a Stripe Checkout session URL
 */
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, customerEmail } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid.' });
    }

    const lineItems = [];
    const validatedItems = [];

    // Resolve Stripe prices using server-side catalog to prevent tampering
    for (const cartItem of items) {
      const product = getProductById(cartItem.id);
      if (!product) {
        return res.status(400).json({ error: `Product ID '${cartItem.id}' not found in catalog.` });
      }

      lineItems.push({
        price: product.stripePriceId,
        quantity: 1 // Quantity is always 1 for digital PDFs
      });

      validatedItems.push({
        product_id: product.id,
        quantity: 1
      });
    }

    const domainURL = process.env.VITE_APP_URL || req.headers.origin || 'http://localhost:3000';

    // Create session on Stripe
    const session = await stripeService.createCheckoutSession({
      lineItems,
      successUrl: `${domainURL}/premium-guides/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${domainURL}/premium-guides/cancel`,
      customerEmail: customerEmail || undefined,
      metadata: {
        itemCount: validatedItems.length.toString()
      }
    });

    // Save pending order locally (using Stripe Session ID as primary key link)
    const order = await db.createOrder({
      stripe_session_id: session.id,
      customer_email: customerEmail || session.customer_details?.email || '',
      amount_total: session.amount_total ? session.amount_total / 100 : 0,
      currency: session.currency || 'gbp',
      payment_status: 'pending'
    });

    // Save order items
    const orderItemsToSave = validatedItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity
    }));
    await db.createOrderItems(orderItemsToSave);

    res.json({ url: session.url });
  } catch (error) {
    console.error('Session creation error:', error);
    res.status(500).json({ error: 'Failed to initiate checkout. Please try again.' });
  }
});

/**
 * 2. GET /api/order-summary
 * Fetches order details and download tokens (if paid) by Stripe Session ID
 */
router.get('/order-summary', async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: 'Missing session_id parameter.' });
    }

    // Load local order
    let order = await db.getOrderBySessionId(session_id);

    // If order paid status is pending, check Stripe directly (fallback/sync check)
    if (!order || order.payment_status === 'pending') {
      try {
        const stripeSession = await stripeService.retrieveSession(session_id);
        
        if (stripeSession && stripeSession.payment_status === 'paid') {
          // Sync database status
          order = await db.createOrder({
            stripe_session_id: session_id,
            stripe_payment_intent_id: typeof stripeSession.payment_intent === 'object' 
              ? stripeSession.payment_intent?.id 
              : stripeSession.payment_intent,
            customer_email: stripeSession.customer_details?.email || order?.customer_email || '',
            amount_total: stripeSession.amount_total ? stripeSession.amount_total / 100 : 0,
            currency: stripeSession.currency || 'gbp',
            payment_status: 'paid'
          });

          // Generate tokens if missing
          const items = await db.getOrderItems(order.id);
          for (const item of items) {
            await db.createDownloadToken({
              order_id: order.id,
              product_id: item.product_id,
              expires_at: getExpiryDate(),
              max_downloads: MAX_USES
            });
          }
        }
      } catch (stripeError) {
        console.error('Error syncing session status from Stripe:', stripeError);
      }
    }

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    const orderItems = await db.getOrderItems(order.id);
    const purchasedProducts = [];
    const downloadLinks = {};

    // Get download tokens if paid
    let tokens = [];
    if (order.payment_status === 'paid') {
      tokens = await db.getDownloadTokensByOrder(order.id);
    }

    for (const item of orderItems) {
      const product = getProductById(item.product_id);
      if (product) {
        purchasedProducts.push({
          id: product.id,
          title: product.title,
          slug: product.slug
        });

        // Map token download link if available
        const tokenRecord = tokens.find(t => t.product_id === product.id);
        if (tokenRecord) {
          // Construct API download link
          downloadLinks[product.id] = `/api/download/${tokenRecord.token}`;
        }
      }
    }

    res.json({
      payment_status: order.payment_status,
      customer_email: order.customer_email,
      products: purchasedProducts,
      download_links: downloadLinks,
      amount_total: order.amount_total,
      currency: order.currency
    });
  } catch (error) {
    console.error('Order summary retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve order details.' });
  }
});

/**
 * 3. POST /api/stripe-webhook
 * Endpoint for Stripe to push event notifications (idempotent fulfillment)
 */
router.post('/stripe-webhook', async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Note: req.rawBody must be set up on index.js for this to succeed
    const rawBody = req.rawBody || req.body;
    event = stripeService.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Idempotency: Handling events safely
  console.log(`Processing Stripe Webhook event: ${event.type}`);

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      // 1. Retrieve full session with line items
      const fullSession = await stripeService.retrieveSession(session.id);
      const paymentIntentId = typeof fullSession.payment_intent === 'object' 
        ? fullSession.payment_intent?.id 
        : fullSession.payment_intent;

      // 2. Fetch or create the local order
      let order = await db.getOrderBySessionId(session.id);
      
      if (!order) {
        // Fallback: Order record missing locally, rebuild it
        order = await db.createOrder({
          stripe_session_id: session.id,
          stripe_payment_intent_id: paymentIntentId,
          customer_email: session.customer_details?.email || '',
          amount_total: session.amount_total ? session.amount_total / 100 : 0,
          currency: session.currency || 'gbp',
          payment_status: 'paid'
        });

        // Rebuild order items from Stripe metadata or line items
        const lineItems = fullSession.line_items?.data || [];
        const orderItemsToSave = [];
        for (const item of lineItems) {
          // Resolve price back to product catalog
          const matchedProduct = getProductById(item.price.id) || 
            // Or look up by price ID
            products.find(p => p.stripePriceId === item.price.id);

          if (matchedProduct) {
            orderItemsToSave.push({
              order_id: order.id,
              product_id: matchedProduct.id,
              quantity: item.quantity
            });
          }
        }
        await db.createOrderItems(orderItemsToSave);
      } else {
        // Update existing order status to paid
        await db.updateOrderStatus(session.id, 'paid', paymentIntentId);
      }

      // 3. Generate secure download tokens for each item (idempotent creation)
      const orderItems = await db.getOrderItems(order.id);
      for (const item of orderItems) {
        await db.createDownloadToken({
          order_id: order.id,
          product_id: item.product_id,
          expires_at: getExpiryDate(),
          max_downloads: MAX_USES
        });
      }

      console.log(`Successfully fulfilled order ${order.id} for session ${session.id}`);
    } 
    
    else if (event.type === 'checkout.session.expired') {
      const session = event.data.object;
      await db.updateOrderStatus(session.id, 'expired');
      console.log(`Order session ${session.id} marked as expired.`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook handler failed.' });
  }
});

/**
 * 4. GET /api/download/:token
 * Securely delivers the PDF file if token matches conditions
 */
router.get('/download/:token', async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).send('Token parameter is required.');
    }

    // Retrieve token record
    const tokenRecord = await db.getDownloadToken(token);
    if (!tokenRecord) {
      return res.status(404).send('Invalid or expired download link.');
    }

    // Check token expiration
    if (new Date() > new Date(tokenRecord.expires_at)) {
      return res.status(410).send('This download link has expired.');
    }

    // Check download limit
    if (tokenRecord.download_count >= tokenRecord.max_downloads) {
      return res.status(429).send('Maximum download limit reached for this link.');
    }

    // Verify order payment status
    const order = await db.getOrder(tokenRecord.order_id);
    if (!order || order.payment_status !== 'paid') {
      return res.status(403).send('Payment has not been confirmed for this order.');
    }

    // Load product
    const product = getProductById(tokenRecord.product_id);
    if (!product) {
      return res.status(404).send('Product not found in current catalog.');
    }

    // Resolve file path securely and prevent directory traversal
    const safeFileName = path.basename(product.filePath);
    const resolvedPath = path.resolve(FILE_STORAGE_DIR, safeFileName);

    // Secure boundary check
    if (!resolvedPath.startsWith(path.resolve(FILE_STORAGE_DIR))) {
      return res.status(403).send('Access Denied.');
    }

    // Check if file exists on disk
    if (!fs.existsSync(resolvedPath)) {
      console.error(`File missing in storage directory: ${resolvedPath}`);
      return res.status(404).send('PDF file currently unavailable. Please contact support.');
    }

    // Increment download count before sending file to avoid double-triggers
    await db.incrementDownloadCount(token);

    // Send PDF with correct attachment headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}"`);
    res.sendFile(resolvedPath);

  } catch (error) {
    console.error('Download delivery error:', error);
    res.status(500).send('Failed to serve download file.');
  }
});

/**
 * 5. POST /api/test-bypass-checkout
 * Test bypass endpoint to instantly generate download tokens without Stripe checkout
 */
router.post('/test-bypass-checkout', async (req, res) => {
  try {
    const { productId } = req.body;
    const product = getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: `Product ID '${productId}' not found in catalog.` });
    }

    // 1. Create a paid order
    const order = await db.createOrder({
      stripe_session_id: `test_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      customer_email: 'test-user@example.com',
      amount_total: 0,
      currency: 'gbp',
      payment_status: 'paid'
    });

    // 2. Create order item
    await db.createOrderItems([{
      order_id: order.id,
      product_id: product.id,
      quantity: 1
    }]);

    // 3. Create download token
    const tokenRecord = await db.createDownloadToken({
      order_id: order.id,
      product_id: product.id,
      expires_at: getExpiryDate(),
      max_downloads: MAX_USES
    });

    res.json({
      success: true,
      download_link: `/api/download/${tokenRecord.token}`,
      expires_at: tokenRecord.expires_at
    });
  } catch (error) {
    console.error('Bypass test error:', error);
    res.status(500).json({ error: 'Failed to bypass checkout.' });
  }
});

export default router;
