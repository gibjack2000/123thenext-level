import express from 'express';
import { processCategoryJob, getQueue } from './blog-generator.js';

import Stripe from 'stripe';

// Initialize Stripe (use environment variable or placeholder)
// Note: In production, STRIPE_SECRET_KEY must be in your .env file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16',
});

const router = express.Router();

// --- Existing Routes ---
router.get('/jobs/queue', async (req, res) => {
    const queue = await getQueue();
    if (queue && queue.error) {
        res.status(500).json({ error: queue.error });
    } else if (queue) {
        res.json(queue);
    } else {
        res.status(500).json({ error: 'Failed to fetch queue' });
    }
});

router.post('/jobs/:category/run', async (req, res) => {
    const { category } = req.params;
    if (!['Health', 'Fitness', 'Nutrition', 'Wellness'].includes(category)) {
        return res.status(400).json({ error: 'Invalid category' });
    }
    
    // In a real production system, this should push to a background worker or check if running
    // We'll run it synchronously for the response or kick it off asynchronously.
    // Given HTTP timeouts, kicking off async is safer.
    processCategoryJob(category).catch(console.error);
    
    res.json({ message: `Job for ${category} has been triggered manually.` });
});

// --- Premium PDFs / Stripe Routes ---
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, guideId } = req.body;

    if (!priceId || !guideId) {
      return res.status(400).json({ error: 'Missing priceId or guideId' });
    }

    // Define success and cancel URLs based on the request origin or env var
    // process.env.VITE_APP_URL should be set to your domain (e.g. https://123thenextlevel.com)
    const domainURL = process.env.VITE_APP_URL || req.headers.origin || 'http://localhost:3000';

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      // Pass the guideId to the success URL so we know which guide they bought
      // In a real scenario, you'd verify the session ID on the success page before delivering
      success_url: `${domainURL}/premium-guides/success?session_id={CHECKOUT_SESSION_ID}&guide_id=${guideId}`,
      cancel_url: `${domainURL}/premium-guides/cancel`,
      metadata: {
        guideId: guideId
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

export default router;
