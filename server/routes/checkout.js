import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { getProductById } from '../data/products.js';
import { GUIDE_PRODUCTS, resolveGuideProduct } from '../data/guide-registry.js';
import { db } from '../services/db.js';
import { stripeService } from '../services/stripe.js';
import { generatePresignedDownloadUrl, generateGuidePresignedUrl, isR2Configured, listVaultObjects, GUIDE_FILE_KEYS } from '../services/r2.js';
import { syncPaidCustomerToMailerLite } from '../services/mailerlite.js';

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
  'bundle-complete-vault-10': [
    { id: 'metabolic-master-guide', title: 'The 12-Week Metabolic Re-Engineering Protocol', key: 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf', pillar: 'Metabolic & Visceral' },
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
  'all-ten-master-guides': [
    { id: 'metabolic-master-guide', title: 'The 12-Week Metabolic Re-Engineering Protocol', key: 'the-12-week-metabolic-re-engineering-visceral-fat-protocol.pdf', pillar: 'Metabolic & Visceral' },
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
async function createDownloadTokensForProduct(orderId, productId, selectedGuides = []) {
  let constituentProductIds = [productId];
  if (productId === 'bundle-complete-vault-10' || productId === 'all-ten-master-guides' || productId === 'all-10-master-guides' || productId === 'g-bundle-10') {
    constituentProductIds = ['g-met-1', 'g-fit-1', 'g-fit-2', 'g-fit-3', 'g-nut-1', 'g-nut-2', 'g-nut-3', 'g-wel-1', 'g-wel-2', 'g-wel-3'];
  } else if (productId === 'bundle-pick-3' && Array.isArray(selectedGuides) && selectedGuides.length > 0) {
    constituentProductIds = selectedGuides;
  } else if (productId === 'g-bundle-9' || productId === 'all-nine-master-guides' || productId === 'all-9-master-guides') {
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
      const successUrl = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&guideId=${targetGuide.id}`;
      const cancelUrl = (source === 'library')
        ? `${origin}/library?canceled=true`
        : `${origin}/checkout?canceled=true`;

      const r2FileKey = targetGuide.r2FileKey || targetGuide.r2Key || '';
      const guideFileUrl = r2FileKey 
        ? `${origin}/api/download-r2/${r2FileKey}` 
        : (targetGuide.fileUrl || `/assets/docs/${r2FileKey}`);

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
          guide_id: targetGuide.id,
          file_url: guideFileUrl,
          guideId: targetGuide.id,
          bundleId: targetGuide.pillar === 'Bundle' ? targetGuide.id : undefined,
          r2FileKey: targetGuide.r2FileKey,
          selectedGuides: Array.isArray(req.body?.selectedGuides) ? req.body.selectedGuides.join(',') : (req.body?.selectedGuides || undefined)
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
    const firstProduct = validatedItems[0] ? (getProductById(validatedItems[0].product_id) || resolveGuideProduct(validatedItems[0].product_id)) : null;
    const firstR2Key = firstProduct?.r2FileKey || firstProduct?.r2Key || '';
    const cartFileUrl = firstR2Key ? `${domainURL}/api/download-r2/${firstR2Key}` : '';

    // Create session on Stripe
    const session = await stripeService.createCheckoutSession({
      lineItems,
      successUrl: `${domainURL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${domainURL}/checkout?canceled=true`,
      customerEmail: customerEmail || undefined,
      metadata: {
        guide_id: firstProduct?.id || (validatedItems[0] ? validatedItems[0].product_id : 'cart_order'),
        file_url: cartFileUrl,
        guideId: firstProduct?.id || (validatedItems[0] ? validatedItems[0].product_id : 'cart_order'),
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

    // Load local order if available
    let order = null;
    try {
      order = await db.getOrderBySessionId(session_id);
    } catch (dbErr) {
      console.warn('DB getOrderBySessionId warning:', dbErr.message);
    }

    // Always retrieve session details directly from Stripe to ensure absolute payment truth
    let stripeSession = null;
    try {
      stripeSession = await stripeService.retrieveSession(session_id);
    } catch (stripeError) {
      console.error('Error retrieving session status from Stripe:', stripeError.message);
    }

    const isPaid = (order && order.payment_status === 'paid') || (stripeSession && stripeSession.payment_status === 'paid');

    if (!order && !stripeSession) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    // Sync database status if paid
    if (isPaid && (!order || order.payment_status !== 'paid')) {
      try {
        order = await db.createOrder({
          stripe_session_id: session_id,
          stripe_payment_intent_id: typeof stripeSession?.payment_intent === 'object' 
            ? stripeSession.payment_intent?.id 
            : stripeSession?.payment_intent,
          customer_email: stripeSession?.customer_details?.email || order?.customer_email || '',
          amount_total: stripeSession?.amount_total ? stripeSession.amount_total / 100 : (order?.amount_total || 0),
          currency: stripeSession?.currency || order?.currency || 'gbp',
          payment_status: 'paid'
        });
      } catch (syncErr) {
        console.warn('DB order sync warning:', syncErr.message);
      }
    }

    // Collect all purchased product IDs from both local DB items and Stripe session metadata
    let rawProductIds = [];
    if (order?.id) {
      try {
        const items = await db.getOrderItems(order.id);
        for (const item of items) {
          rawProductIds.push(item.product_id);
        }
      } catch (itemsErr) {
        console.warn('DB getOrderItems warning:', itemsErr.message);
      }
    }

    if (stripeSession?.metadata?.guide_id) {
      rawProductIds.push(stripeSession.metadata.guide_id);
    }
    if (stripeSession?.metadata?.guideId) {
      rawProductIds.push(stripeSession.metadata.guideId);
    }
    if (stripeSession?.metadata?.bundleId) {
      rawProductIds.push(stripeSession.metadata.bundleId);
    }
    if (stripeSession?.client_reference_id) {
      rawProductIds.push(stripeSession.client_reference_id);
    }

    // Deduplicate
    rawProductIds = Array.from(new Set(rawProductIds.filter(Boolean)));

    // Expand bundles into individual book IDs
    let resolvedProductIds = [];
    for (const pid of rawProductIds) {
      if (pid === 'bundle-complete-vault-10' || pid === 'all-ten-master-guides' || pid === 'all-10-master-guides' || pid === 'g-bundle-10') {
        resolvedProductIds.push('g-met-1', 'g-fit-1', 'g-fit-2', 'g-fit-3', 'g-nut-1', 'g-nut-2', 'g-nut-3', 'g-wel-1', 'g-wel-2', 'g-wel-3');
      } else if (pid === 'bundle-pick-3') {
        const customGuides = stripeSession?.metadata?.selectedGuides ? stripeSession.metadata.selectedGuides.split(',').filter(Boolean) : [];
        if (customGuides.length > 0) {
          resolvedProductIds.push(...customGuides);
        } else {
          resolvedProductIds.push('g-met-1', 'g-fit-2', 'g-wel-2');
        }
      } else if (pid === 'g-bundle-9' || pid === 'all-nine-master-guides' || pid === 'all-9-master-guides') {
        resolvedProductIds.push('g-fit-1', 'g-fit-2', 'g-fit-3', 'g-nut-1', 'g-nut-2', 'g-nut-3', 'g-wel-1', 'g-wel-2', 'g-wel-3');
      } else if (pid === 'g-bundle-6' || pid === 'all-six-master-guides') {
        resolvedProductIds.push('g-fit-1', 'g-nut-1', 'g-wel-1', 'g-epi-1', 'g-fit-2', 'g-fit-3');
      } else if (pid === 'g-bundle-1' || pid === 'all-three-master-guides') {
        resolvedProductIds.push('g-fit-1', 'g-nut-1', 'g-wel-1');
      } else {
        resolvedProductIds.push(pid);
      }
    }
    resolvedProductIds = Array.from(new Set(resolvedProductIds));

    // Get tokens if paid
    let tokens = [];
    if (isPaid && order?.id) {
      try {
        tokens = await db.getDownloadTokensByOrder(order.id);
        for (const pid of resolvedProductIds) {
          if (!tokens.some(t => t.product_id === pid)) {
            await createDownloadTokensForProduct(order.id, pid);
          }
        }
        tokens = await db.getDownloadTokensByOrder(order.id);
      } catch (tokErr) {
        console.warn('DB token generation warning:', tokErr.message);
      }
    }

    const purchasedProducts = [];
    const downloadLinks = {};

    for (const pid of resolvedProductIds) {
      const product = getProductById(pid) || resolveGuideProduct(pid);
      if (product) {
        purchasedProducts.push({
          id: product.id,
          productId: product.productId || product.id,
          title: product.title,
          slug: product.slug || product.id
        });

        if (isPaid) {
          let downloadUrl = null;
          const fileKey = product.r2FileKey || product.r2Key;

          // 1. Direct Cloudflare R2 Presigned Download Link (valid for 24 hours / 86400s)
          if (isR2Configured() && fileKey) {
            try {
              downloadUrl = await generateGuidePresignedUrl(fileKey, 86400);
            } catch (r2Err) {
              console.warn(`R2 presigned link generation failed for ${fileKey}:`, r2Err.message);
            }
          }

          // 2. Token fallback
          if (!downloadUrl && tokens.length > 0) {
            const tokenRecord = tokens.find(t => t.product_id === product.id || t.product_id === product.productId);
            if (tokenRecord) {
              downloadUrl = `/api/download/${tokenRecord.token}`;
            }
          }

          downloadLinks[product.id] = downloadUrl;
          if (product.productId) {
            downloadLinks[product.productId] = downloadUrl;
          }
        }
      }
    }

    // Secondary redundant sync to MailerLite (in case webhook hasn't fired yet)
    if (isPaid) {
      const emailToSync = order?.customer_email || stripeSession?.customer_details?.email;
      const nameToSync = stripeSession?.customer_details?.name || '';
      const displayTitle = purchasedProducts[0]?.title || 'Digital Longevity Guide';
      const baseUrl = resolveValidBaseUrl(req);
      syncPaidCustomerToMailerLite({
        email: emailToSync,
        name: nameToSync,
        productTitle: displayTitle,
        sessionId: session_id,
        amount: order?.amount_total || (stripeSession?.amount_total ? stripeSession.amount_total / 100 : 0),
        currency: order?.currency || stripeSession?.currency || 'GBP',
        origin: baseUrl
      }).catch(err => console.warn('Non-blocking order-summary MailerLite sync warning:', err.message));
    }

    res.json({
      payment_status: isPaid ? 'paid' : (order?.payment_status || stripeSession?.payment_status || 'unpaid'),
      customer_email: order?.customer_email || stripeSession?.customer_details?.email || '',
      products: purchasedProducts,
      download_links: downloadLinks,
      amount_total: order?.amount_total || (stripeSession?.amount_total ? stripeSession.amount_total / 100 : 0),
      currency: order?.currency || stripeSession?.currency || 'gbp'
    });
  } catch (error) {
    console.error('Order summary retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve order details.' });
  }
});

/**
 * 3. POST /api/stripe-webhook & /api/webhooks/stripe
 * Endpoint for Stripe to push event notifications (idempotent fulfillment)
 */
router.post(['/stripe-webhook', '/webhooks/stripe', '/webhook/stripe'], async (req, res) => {
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
      console.log(`🎉 Payment confirmed for guide: ${session.metadata?.guide_id || session.metadata?.guideId || 'order'}`);

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

      // 4. Trigger MailerLite Thank You & Guide Delivery Automation with customer_status: paid_buyer
      try {
        const customerEmail = session.customer_details?.email || fullSession.customer_details?.email || order?.customer_email;
        const customerName = session.customer_details?.name || fullSession.customer_details?.name || '';
        
        let displayTitle = session.metadata?.guide_id || session.metadata?.guideId;
        if (displayTitle) {
          const resolved = resolveGuideProduct(displayTitle);
          if (resolved) displayTitle = resolved.title;
        } else if (orderItems.length > 0) {
          const firstProd = getProductById(orderItems[0].product_id) || resolveGuideProduct(orderItems[0].product_id);
          displayTitle = firstProd ? firstProd.title : orderItems[0].product_id;
          if (orderItems.length > 1) displayTitle += ` (+${orderItems.length - 1} more)`;
        }

        const baseUrl = resolveValidBaseUrl(req);
        syncPaidCustomerToMailerLite({
          email: customerEmail,
          name: customerName,
          productTitle: displayTitle || 'Digital Longevity Guide',
          sessionId: session.id,
          amount: session.amount_total ? session.amount_total / 100 : (order?.amount_total || 0),
          currency: session.currency || order?.currency || 'GBP',
          origin: baseUrl
        }).catch(mlErr => console.warn('Non-blocking MailerLite sync warning in webhook:', mlErr.message));
      } catch (mlSyncErr) {
        console.warn('MailerLite sync block error:', mlSyncErr.message);
      }
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
    const product = getProductById(tokenRecord.product_id) || resolveGuideProduct(tokenRecord.product_id);
    if (!product) {
      if (format === 'json') return res.status(404).json({ error: 'Product not found in current catalog.' });
      return res.status(404).send('Product not found in current catalog.');
    }

    const fileKey = product.r2Key || product.r2FileKey;
    // --- Preferred Delivery: Cloudflare R2 Presigned Download URL ---
    if (isR2Configured() && fileKey) {
      try {
        const downloadFilename = product.downloadFilename || `${product.slug || product.id}.pdf`;
        const presignedUrl = await generatePresignedDownloadUrl({
          key: fileKey,
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
 * GET /api/download/guide/:guideId
 * Direct instant presigned download from Cloudflare R2 vault.
 * Generates an authenticated, short-lived presigned download URL and redirects the browser directly to Cloudflare R2.
 */
router.get('/download/guide/:guideId', async (req, res) => {
  try {
    const { guideId } = req.params;
    if (!guideId) {
      return res.status(400).send('guideId is required.');
    }
    const downloadUrl = await generateGuidePresignedUrl(guideId, 900);
    return res.redirect(302, downloadUrl);
  } catch (error) {
    console.error(`[Direct Guide Download Error] ${req.params.guideId}:`, error.message);
    return res.status(404).send('Guide not found in vault or R2 unavailable.');
  }
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
