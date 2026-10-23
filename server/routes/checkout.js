import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getProductById } from '../data/products.js';
import { GUIDE_PRODUCTS, resolveGuideProduct } from '../data/guide-registry.js';
import { db } from '../services/db.js';
import { stripeService } from '../services/stripe.js';
import { generatePresignedDownloadUrl, generateGuidePresignedUrl, isR2Configured, listVaultObjects, GUIDE_FILE_KEYS } from '../services/r2.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Load configurations from environment variables
const EXPIRY_HOURS = parseInt(process.env.DOWNLOAD_TOKEN_EXPIRY_HOURS || '72', 10);
const MAX_USES = parseInt(process.env.DOWNLOAD_MAX_USES || '3', 10);
const FILE_STORAGE_DIR = process.env.FILE_STORAGE_DIR || path.join(__dirname, '../../protected-files/pdfs');
const R2_PRESIGNED_EXPIRY_SECONDS = parseInt(process.env.R2_PRESIGNED_EXPIRY_SECONDS || '3600', 10);

// Helper to calculate token expiry
function getExpiryDate() {
  const date = new Date();
  date.setHours(date.getHours() + EXPIRY_HOURS);
  return date.toISOString();
}

// Definition of bundle constituents for multi-book suites
export const BUNDLE_CONSTITUENTS = {
  'all-nine-master-guides': [
    { id: 'workout-plan', title: 'Beginner Home Workout Plan', key: 'beginner_home_workout-2026.pdf', pillar: 'Fitness' },
    { id: 'hypertrophy-strength', title: 'Hypertrophy & Strength Protocol', key: 'Hypertrophy-Strength-Protocol-2026.pdf', pillar: 'Strength' },
    { id: 'mobility-recovery', title: 'Daily Mobility & Recovery Routine', key: 'Daily_Mobility_and_Recovery-2026.pdf', pillar: 'Mobility' },
    { id: 'meal-planner', title: 'The Master Meal Planning Guide', key: 'The Master_Meal_Planning_Guide-2026.pdf', pillar: 'Nutrition' },
    { id: 'fat-loss-blueprint', title: 'The Fat Loss Nutrition Blueprint', key: 'Fat-Loss-Nutrition-Blueprint-2026.pdf', pillar: 'Metabolism' },
    { id: 'high-protein-recipes', title: 'High-Protein Recipe Collection', key: 'High_Protein_Recipe_Collection-2026.pdf', pillar: 'Fuel' },
    { id: 'stress-management', title: 'Cortisol & Stress Management', key: 'Cortisol_&_Stress_Management-2026.pdf', pillar: 'Wellness' },
    { id: 'sleep-optimization', title: 'Deep Sleep Optimization Protocol', key: 'Deep_Sleep_Optimization-2026.pdf', pillar: 'Recovery' },
    { id: 'habit-reset', title: 'Mindfulness & Habit Reset Workbook', key: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf', pillar: 'Habits' }
  ],
  'all-9-master-guides': [
    { id: 'workout-plan', title: 'Beginner Home Workout Plan', key: 'beginner_home_workout-2026.pdf', pillar: 'Fitness' },
    { id: 'hypertrophy-strength', title: 'Hypertrophy & Strength Protocol', key: 'Hypertrophy-Strength-Protocol-2026.pdf', pillar: 'Strength' },
    { id: 'mobility-recovery', title: 'Daily Mobility & Recovery Routine', key: 'Daily_Mobility_and_Recovery-2026.pdf', pillar: 'Mobility' },
    { id: 'meal-planner', title: 'The Master Meal Planning Guide', key: 'The Master_Meal_Planning_Guide-2026.pdf', pillar: 'Nutrition' },
    { id: 'fat-loss-blueprint', title: 'The Fat Loss Nutrition Blueprint', key: 'Fat-Loss-Nutrition-Blueprint-2026.pdf', pillar: 'Metabolism' },
    { id: 'high-protein-recipes', title: 'High-Protein Recipe Collection', key: 'High_Protein_Recipe_Collection-2026.pdf', pillar: 'Fuel' },
    { id: 'stress-management', title: 'Cortisol & Stress Management', key: 'Cortisol_&_Stress_Management-2026.pdf', pillar: 'Wellness' },
    { id: 'sleep-optimization', title: 'Deep Sleep Optimization Protocol', key: 'Deep_Sleep_Optimization-2026.pdf', pillar: 'Recovery' },
    { id: 'habit-reset', title: 'Mindfulness & Habit Reset Workbook', key: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf', pillar: 'Habits' }
  ],
  'g-bundle-9': [
    { id: 'workout-plan', title: 'Beginner Home Workout Plan', key: 'beginner_home_workout-2026.pdf', pillar: 'Fitness' },
    { id: 'hypertrophy-strength', title: 'Hypertrophy & Strength Protocol', key: 'Hypertrophy-Strength-Protocol-2026.pdf', pillar: 'Strength' },
    { id: 'mobility-recovery', title: 'Daily Mobility & Recovery Routine', key: 'Daily_Mobility_and_Recovery-2026.pdf', pillar: 'Mobility' },
    { id: 'meal-planner', title: 'The Master Meal Planning Guide', key: 'The Master_Meal_Planning_Guide-2026.pdf', pillar: 'Nutrition' },
    { id: 'fat-loss-blueprint', title: 'The Fat Loss Nutrition Blueprint', key: 'Fat-Loss-Nutrition-Blueprint-2026.pdf', pillar: 'Metabolism' },
    { id: 'high-protein-recipes', title: 'High-Protein Recipe Collection', key: 'High_Protein_Recipe_Collection-2026.pdf', pillar: 'Fuel' },
    { id: 'stress-management', title: 'Cortisol & Stress Management', key: 'Cortisol_&_Stress_Management-2026.pdf', pillar: 'Wellness' },
    { id: 'sleep-optimization', title: 'Deep Sleep Optimization Protocol', key: 'Deep_Sleep_Optimization-2026.pdf', pillar: 'Recovery' },
    { id: 'habit-reset', title: 'Mindfulness & Habit Reset Workbook', key: 'Mindfulness_and_Habit_Reset_Workbook-2026.pdf', pillar: 'Habits' }
  ],
  'all-six-master-guides': [
    { id: 'workout-plan', title: 'Beginner Home Workout Plan', key: 'beginner_home_workout-2026.pdf', pillar: 'Fitness' },
    { id: 'meal-planner', title: 'The Master Meal Planning Guide', key: 'The Master_Meal_Planning_Guide-2026.pdf', pillar: 'Nutrition' },
    { id: 'stress-management', title: 'Cortisol & Stress Management', key: 'Cortisol_&_Stress_Management-2026.pdf', pillar: 'Wellness' },
    { id: 'lifespan-blueprint', title: 'The Next Level Lifespan Blueprint', key: 'the-next-level-lifespan.pdf', pillar: 'Longevity / Epigenetics' },
    { id: 'hypertrophy-strength', title: 'Hypertrophy & Strength Protocol', key: 'Hypertrophy-Strength-Protocol-2026.pdf', pillar: 'Muscle Health' },
    { id: 'mobility-recovery', title: 'Daily Mobility & Recovery Routine', key: 'Daily_Mobility_and_Recovery-2026.pdf', pillar: 'Joint & Spine' }
  ],
  'g-bundle-6': [
    { id: 'workout-plan', title: 'Beginner Home Workout Plan', key: 'beginner_home_workout-2026.pdf', pillar: 'Fitness' },
    { id: 'meal-planner', title: 'The Master Meal Planning Guide', key: 'The Master_Meal_Planning_Guide-2026.pdf', pillar: 'Nutrition' },
    { id: 'stress-management', title: 'Cortisol & Stress Management', key: 'Cortisol_&_Stress_Management-2026.pdf', pillar: 'Wellness' },
    { id: 'lifespan-blueprint', title: 'The Next Level Lifespan Blueprint', key: 'the-next-level-lifespan.pdf', pillar: 'Longevity / Epigenetics' },
    { id: 'hypertrophy-strength', title: 'Hypertrophy & Strength Protocol', key: 'Hypertrophy-Strength-Protocol-2026.pdf', pillar: 'Muscle Health' },
    { id: 'mobility-recovery', title: 'Daily Mobility & Recovery Routine', key: 'Daily_Mobility_and_Recovery-2026.pdf', pillar: 'Joint & Spine' }
  ],
  'all-three-master-guides': [
    { id: 'workout-plan', title: 'Beginner Home Workout Plan', key: 'beginner_home_workout-2026.pdf', pillar: 'Fitness' },
    { id: 'meal-planner', title: 'The Master Meal Planning Guide', key: 'The Master_Meal_Planning_Guide-2026.pdf', pillar: 'Nutrition' },
    { id: 'stress-management', title: 'Cortisol & Stress Management', key: 'Cortisol_&_Stress_Management-2026.pdf', pillar: 'Wellness' }
  ],
  'g-bundle-1': [
    { id: 'workout-plan', title: 'Beginner Home Workout Plan', key: 'beginner_home_workout-2026.pdf', pillar: 'Fitness' },
    { id: 'meal-planner', title: 'The Master Meal Planning Guide', key: 'The Master_Meal_Planning_Guide-2026.pdf', pillar: 'Nutrition' },
    { id: 'stress-management', title: 'Cortisol & Stress Management', key: 'Cortisol_&_Stress_Management-2026.pdf', pillar: 'Wellness' }
  ]
};

// Helper to create download tokens for a product, expanding bundles if necessary
async function createDownloadTokensForProduct(orderId, productId) {
  let constituentProductIds = [productId];
  if (productId === 'g-bundle-9' || productId === 'all-nine-master-guides' || productId === 'all-9-master-guides') {
    constituentProductIds = ['g-fit-1', 'g-fit-2', 'g-fit-3', 'g-nut-1', 'g-nut-2', 'g-nut-3', 'g-wel-1', 'g-wel-2', 'g-wel-3'];
  } else if (productId === 'g-bundle-6' || productId === 'all-six-master-guides') {
    constituentProductIds = ['g-fit-1', 'g-nut-1', 'g-wel-1', 'g-epi-1', 'g-fit-2', 'g-fit-3'];
  } else if (productId === 'g-bundle-1' || productId === 'all-three-master-guides') {
    constituentProductIds = ['g-fit-1', 'g-nut-1', 'g-wel-1'];
  }

  for (const pid of constituentProductIds) {
    await db.createDownloadToken({
      order_id: orderId,
      product_id: pid,
      expires_at: getExpiryDate(),
      max_downloads: MAX_USES
    });
  }
}

function resolveValidBaseUrl(req) {
  // Check req.headers.origin first if it is a valid http(s) URL
  const origin = req && req.headers && req.headers.origin;
  if (origin && typeof origin === 'string' && /^https?:\/\//i.test(origin.trim())) {
    return origin.trim().replace(/\/+$/, '');
  }

  // Check req.headers.referer
  const referer = req && req.headers && req.headers.referer;
  if (referer && typeof referer === 'string') {
    try {
      const u = new URL(referer);
      return u.origin;
    } catch {}
  }

  // Check host header
  const host = req && req.headers && (req.headers['x-forwarded-host'] || req.headers.host);
  if (host && typeof host === 'string' && !host.includes('localhost') && !host.includes('127.0.0.1')) {
    const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0].trim();
    return `${proto}://${host.split(',')[0].trim()}`.replace(/\/+$/, '');
  }

  // Check VITE_APP_URL env var if it starts with http(s)
  const envUrl = process.env.VITE_APP_URL;
  if (envUrl && typeof envUrl === 'string') {
    const clean = envUrl.trim().replace(/^["']|["']$/g, '');
    if (/^https?:\/\//i.test(clean)) {
      return clean.replace(/\/+$/, '');
    }
  }

  // Guaranteed valid production fallback
  return 'https://123thenextlevel.com';
}

/**
 * 1. POST /api/create-checkout-session
 * Validates frontend cart items and returns a Stripe Checkout session URL
 */
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { guideId, items, customerEmail, source } = req.body || {};

    // 1. Direct single guide purchase (e.g. from DigitalGuides / Library / Checkout)
    const targetGuide = guideId ? resolveGuideProduct(guideId) : (items && Array.isArray(items) && items.length === 1 ? resolveGuideProduct(items[0].id) : null);
    if (targetGuide) {
      const origin = resolveValidBaseUrl(req);
      const successUrl = (source === 'library')
        ? `${origin}/library?success=true&session_id={CHECKOUT_SESSION_ID}&guideId=${targetGuide.id}`
        : `${origin}/premium-guides/success?session_id={CHECKOUT_SESSION_ID}&guideId=${targetGuide.id}`;
      const cancelUrl = (source === 'library')
        ? `${origin}/library?canceled=true`
        : `${origin}/checkout?canceled=true`;

      const session = await stripeService.createCheckoutSession({
        lineItems: [
          {
            price_data: {
              currency: 'gbp',
              product_data: {
                name: targetGuide.title,
                description: 'Instant PDF Digital Guide — 123TheNextLevel',
              },
              unit_amount: targetGuide.priceInCents,
            },
            quantity: 1,
          },
        ],
        successUrl,
        cancelUrl,
        customerEmail: customerEmail || undefined,
        metadata: {
          guideId: targetGuide.id,
          r2FileKey: targetGuide.r2FileKey,
        }
      });

      try {
        const order = await db.createOrder({
          stripe_session_id: session.id,
          customer_email: customerEmail || '',
          amount_total: targetGuide.priceInCents / 100,
          currency: 'gbp',
          payment_status: 'pending'
        });
        await db.createOrderItems([{
          order_id: order.id,
          product_id: targetGuide.id,
          quantity: 1
        }]);
      } catch (dbErr) {
        console.warn('Local DB order recording skipped:', dbErr.message);
      }

      return res.json({ url: session.url });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid.' });
    }

    const lineItems = [];
    const validatedItems = [];

    // Resolve Stripe prices using server-side catalog to prevent tampering
    for (const cartItem of items) {
      const product = getProductById(cartItem.id) || resolveGuideProduct(cartItem.id);
      if (!product) {
        return res.status(400).json({ error: `Product ID '${cartItem.id}' not found in catalog.` });
      }

      const unitAmount = product.priceInCents || Math.round((product.price || 19) * 100);
      lineItems.push({
        price_data: {
          currency: product.currency || 'gbp',
          product_data: {
            name: product.title,
            description: 'Instant PDF Digital Guide — 123TheNextLevel',
          },
          unit_amount: unitAmount,
        },
        quantity: cartItem.quantity || 1
      });

      validatedItems.push({
        product_id: product.id,
        quantity: cartItem.quantity || 1
      });
    }

    const domainURL = resolveValidBaseUrl(req);

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
    try {
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
    } catch (dbErr) {
      console.warn('Local DB order recording skipped:', dbErr.message);
    }

    res.json({ url: session.url });
  } catch (error) {
    console.error('Session creation error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to initiate checkout. Please try again.',
      details: error.raw ? error.raw.message : undefined 
    });
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
            await createDownloadTokensForProduct(order.id, item.product_id);
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
      let resolvedProductIds = [item.product_id];
      if (item.product_id === 'g-bundle-9' || item.product_id === 'all-nine-master-guides' || item.product_id === 'all-9-master-guides') {
        resolvedProductIds = ['g-fit-1', 'g-fit-2', 'g-fit-3', 'g-nut-1', 'g-nut-2', 'g-nut-3', 'g-wel-1', 'g-wel-2', 'g-wel-3'];
      } else if (item.product_id === 'g-bundle-6' || item.product_id === 'all-six-master-guides') {
        resolvedProductIds = ['g-fit-1', 'g-nut-1', 'g-wel-1', 'g-epi-1', 'g-fit-2', 'g-fit-3'];
      } else if (item.product_id === 'g-bundle-1' || item.product_id === 'all-three-master-guides') {
        resolvedProductIds = ['g-fit-1', 'g-nut-1', 'g-wel-1'];
      }

      for (const pid of resolvedProductIds) {
        const product = getProductById(pid);
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
      console.log(`🎉 Payment confirmed for guide: ${session.metadata?.guideId || 'order'}`);

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
        await createDownloadTokensForProduct(order.id, item.product_id);
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

// Helper to handle secure download delivery
async function handleDownloadDelivery(req, res, forceJson = false) {
  try {
    const { token } = req.params;
    const format = forceJson ? 'json' : (req.query.format || (req.query.redirect === 'false' ? 'json' : null));

    if (!token) {
      if (format === 'json') return res.status(400).json({ error: 'Token parameter is required.' });
      return res.status(400).send('Token parameter is required.');
    }

    // Retrieve token record
    const tokenRecord = await db.getDownloadToken(token);
    if (!tokenRecord) {
      if (format === 'json') return res.status(404).json({ error: 'Invalid or expired download link.' });
      return res.status(404).send('Invalid or expired download link.');
    }

    // Check token expiration
    if (new Date() > new Date(tokenRecord.expires_at)) {
      if (format === 'json') return res.status(410).json({ error: 'This download link has expired.' });
      return res.status(410).send('This download link has expired.');
    }

    // Check download limit
    if (tokenRecord.download_count >= tokenRecord.max_downloads) {
      if (format === 'json') return res.status(429).json({ error: 'Maximum download limit reached for this link.' });
      return res.status(429).send('Maximum download limit reached for this link.');
    }

    // Verify order payment status
    const order = await db.getOrder(tokenRecord.order_id);
    if (!order || order.payment_status !== 'paid') {
      if (format === 'json') return res.status(403).json({ error: 'Payment has not been confirmed for this order.' });
      return res.status(403).send('Payment has not been confirmed for this order.');
    }

    // Load product
    const product = getProductById(tokenRecord.product_id);
    if (!product) {
      if (format === 'json') return res.status(404).json({ error: 'Product not found in current catalog.' });
      return res.status(404).send('Product not found in current catalog.');
    }

    // --- Preferred Delivery: Cloudflare R2 Presigned Download URL ---
    if (isR2Configured() && product.r2Key) {
      try {
        const downloadFilename = product.downloadFilename || `${product.slug || product.id}.pdf`;
        const presignedUrl = await generatePresignedDownloadUrl({
          key: product.r2Key,
          filename: downloadFilename,
          expiresInSeconds: R2_PRESIGNED_EXPIRY_SECONDS,
        });

        // Increment download count before dispatching
        await db.incrementDownloadCount(token);

        console.log(`[R2 Download] Presigned URL generated for order=${order.id}, product=${product.id}, count=${tokenRecord.download_count + 1}/${tokenRecord.max_downloads}`);

        if (format === 'json') {
          return res.json({
            success: true,
            download_url: presignedUrl,
            filename: downloadFilename,
            expires_in_seconds: R2_PRESIGNED_EXPIRY_SECONDS,
            remaining_downloads: Math.max(0, tokenRecord.max_downloads - (tokenRecord.download_count + 1)),
          });
        }

        // Direct browser redirect to secure Cloudflare R2 presigned URL
        return res.redirect(presignedUrl);
      } catch (r2Error) {
        console.error('[R2 Download Error] Failed to generate presigned URL, checking local fallback:', r2Error.message);
      }
    }

    // --- Fallback: Local protected filesystem delivery ---
    const candidates = [
      product.filePath,
      product.r2Key,
    ].filter(Boolean);

    for (const candidate of candidates) {
      const safeFileName = path.basename(candidate);
      const resolvedPath = path.resolve(FILE_STORAGE_DIR, safeFileName);

      // Secure boundary check
      if (resolvedPath.startsWith(path.resolve(FILE_STORAGE_DIR)) && fs.existsSync(resolvedPath)) {
        await db.incrementDownloadCount(token);

        if (format === 'json') {
          return res.json({
            success: true,
            download_url: `/api/download/${token}`,
            filename: product.downloadFilename || safeFileName,
            is_local: true,
            remaining_downloads: Math.max(0, tokenRecord.max_downloads - (tokenRecord.download_count + 1)),
          });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${product.downloadFilename || safeFileName}"`);
        return res.sendFile(resolvedPath);
      }
    }

    console.error(`File missing both in R2 and local storage for product: ${product.id}`);
    if (format === 'json') return res.status(404).json({ error: 'PDF file currently unavailable. Please contact support.' });
    return res.status(404).send('PDF file currently unavailable. Please contact support.');

  } catch (error) {
    console.error('Download delivery error:', error);
    if (forceJson || req.query.format === 'json') {
      return res.status(500).json({ error: 'Failed to serve download file.' });
    }
    res.status(500).send('Failed to serve download file.');
  }
}

/**
 * 4. GET /api/download/:token
 * Securely delivers the PDF file if token matches conditions.
 * Delivers via secure, temporary Cloudflare R2 presigned download URL,
 * with graceful fallback to local storage.
 */
router.get('/download/:token', async (req, res) => {
  return handleDownloadDelivery(req, res, false);
});

/**
 * GET /api/presigned-url/:token
 * Dedicated endpoint returning JSON with presigned download URL for programmatic consumers
 */
router.get('/presigned-url/:token', async (req, res) => {
  return handleDownloadDelivery(req, res, true);
});

/**
 * GET /api/r2/status
 * Diagnostic endpoint to verify R2 bucket connectivity, health, and object list
 */
router.get('/r2/status', async (req, res) => {
  try {
    if (!isR2Configured()) {
      return res.status(503).json({
        configured: false,
        error: 'Cloudflare R2 environment variables are incomplete or missing.',
      });
    }

    const objects = await listVaultObjects();
    res.json({
      configured: true,
      bucket: process.env.R2_PAID_BUCKET_NAME || 'paid-products-vault',
      account_id: process.env.CLOUDFLARE_ACCOUNT_ID,
      object_count: objects.length,
      objects,
    });
  } catch (err) {
    res.status(500).json({
      configured: false,
      error: err.message,
    });
  }
});

/**
 * POST /api/get-presigned-guide
 * Returns a short-lived presigned download URL directly from Cloudflare R2
 * Body: { guideId: string }
 * Response: { downloadUrl: string }
 */
router.post('/get-presigned-guide', async (req, res) => {
  try {
    const { sessionId, session_id, guideId } = req.body || {};
    const activeSessionId = sessionId || session_id;

    // 1. Direct Stripe Payment Verification Flow (Secures paid-products-vault)
    if (activeSessionId) {
      const stripeSession = await stripeService.retrieveSession(activeSessionId);
      if (!stripeSession || stripeSession.payment_status !== 'paid') {
        return res.status(403).json({ error: 'Payment not completed' });
      }

      // Identify the target file key inside 'paid-products-vault'
      const guide = resolveGuideProduct(guideId) || resolveGuideProduct(stripeSession.metadata?.guideId);
      const r2FileKey = guide ? guide.r2FileKey : (stripeSession.metadata?.r2FileKey || (guideId ? GUIDE_FILE_KEYS[guideId] : null));

      if (!r2FileKey) {
        return res.status(404).json({ error: 'Guide file mapping missing' });
      }

      // Generate short-lived presigned URL (valid for 15 minutes / 900 seconds)
      const downloadUrl = await generateGuidePresignedUrl(r2FileKey, 900);

      return res.json({
        verified: true,
        downloadUrl,
        guideId: guide?.id || guideId,
        title: guide?.title || 'Digital Master Guide',
        filename: r2FileKey
      });
    }

    if (!guideId) {
      return res.status(400).json({ error: 'guideId or sessionId is required in request body.' });
    }

    // If guideId is a bundle, return presigned links for all constituent books
    if (BUNDLE_CONSTITUENTS[guideId]) {
      const items = BUNDLE_CONSTITUENTS[guideId];
      const downloads = await Promise.all(items.map(async (item) => {
        const url = await generateGuidePresignedUrl(item.id || item.key);
        return {
          id: item.id,
          title: item.title,
          pillar: item.pillar,
          filename: item.key,
          downloadUrl: url
        };
      }));

      let zipUrl = null;
      if (guideId === 'all-nine-master-guides' || guideId === 'all-9-master-guides' || guideId === 'g-bundle-9') {
        try {
          zipUrl = await generateGuidePresignedUrl('Complete_9_Book_Master_Vault-2026.zip');
        } catch (zErr) {
          console.warn('Could not generate 9-book zip presigned url:', zErr.message);
        }
      } else if (guideId === 'all-six-master-guides' || guideId === 'g-bundle-6') {
        try {
          zipUrl = await generateGuidePresignedUrl('Complete_6_Pillar_Master_Suite-2026.zip');
        } catch (zErr) {
          console.warn('Could not generate zip presigned url:', zErr.message);
        }
      }

      return res.json({
        isBundle: true,
        bundleId: guideId,
        downloadUrl: zipUrl || downloads[0]?.downloadUrl,
        zipUrl,
        downloads
      });
    }

    const downloadUrl = await generateGuidePresignedUrl(guideId);
    return res.json({
      isBundle: false,
      downloadUrl,
      downloads: [{ id: guideId, downloadUrl }]
    });
  } catch (error) {
    console.error('[API /api/get-presigned-guide] Error:', error.message);
    return res.status(500).json({ error: 'Failed to generate presigned download URL.' });
  }
});

/**
 * 5. POST /api/test-bypass-checkout
 * Disabled to strictly enforce Stripe payment authorization
 */
router.post('/test-bypass-checkout', async (req, res) => {
  return res.status(403).json({ error: 'Direct download bypass is disabled. Please complete checkout via Stripe.' });
});

export default router;
