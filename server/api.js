import express from 'express';
import { processCategoryJob, getQueue } from './blog-generator.js';
import checkoutRouter from './routes/checkout.js';
import { sendQuizResultsEmail, sendNewsletterWelcomeEmail } from './services/mailer.js';

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// --- Quiz Results Route ---
router.post('/quiz-results', async (req, res) => {
  const { email, name, score, dimensions, text } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  // Attempt to save to Supabase
  if (supabase) {
    try {
      const { error: dbError } = await supabase
        .from('quiz_submissions')
        .insert([{
          email,
          name: name || '',
          score: score ? parseInt(score, 10) : null,
          dimensions,
          plan_text: text
        }]);
      
      if (dbError) {
        console.error('Failed to save quiz submission to Supabase:', dbError);
      } else {
        console.log(`Quiz submission for ${email} saved to Supabase successfully.`);
      }

      // Automatically subscribe the quiz submitter to the newsletter list
      const { error: subError } = await supabase
        .from('newsletter_subscribers')
        .upsert([{ email, preferences: ['Health', 'Fitness', 'Nutrition', 'Wellness'] }], { onConflict: 'email' });
      
      if (subError) {
        console.error('Failed to auto-subscribe quiz submitter to newsletter:', subError);
      } else {
        console.log(`Quiz taker ${email} automatically subscribed to newsletter.`);
      }
    } catch (dbError) {
      console.error('Unexpected error saving quiz submission to Supabase:', dbError);
    }
  } else {
    console.warn('Supabase is not configured; skipping quiz submission persistence.');
  }

  try {
    await sendQuizResultsEmail({ email, name, score, dimensions, text });
    res.json({ success: true, message: 'Quiz results processed and email sent successfully.' });
  } catch (error) {
    console.error('Failed to send quiz results email:', error);
    res.status(500).json({ error: 'Failed to send quiz results email. ' + error.message });
  }
});

// --- Newsletter Subscription Route ---
router.post('/newsletter/subscribe', async (req, res) => {
  const { email, preferences } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  // Save to Supabase newsletter_subscribers
  if (supabase) {
    try {
      const { error: dbError } = await supabase
        .from('newsletter_subscribers')
        .upsert([{ email, preferences: preferences || [] }], { onConflict: 'email' });
      
      if (dbError) {
        console.error('Failed to save newsletter subscription to Supabase:', dbError);
      } else {
        console.log(`Newsletter subscription for ${email} saved to Supabase.`);
      }
    } catch (dbError) {
      console.error('Unexpected error saving newsletter subscription:', dbError);
    }
  } else {
    console.warn('Supabase is not configured; skipping newsletter subscription persistence.');
  }

  try {
    await sendNewsletterWelcomeEmail({ email, preferences });
    res.json({ success: true, message: 'Subscribed to newsletter successfully.' });
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    res.json({ success: true, warning: 'Subscribed, but confirmation email failed to send: ' + error.message });
  }
});

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
router.use('/', checkoutRouter);

export default router;

