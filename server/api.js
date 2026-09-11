import express from 'express';
import { processCategoryJob, getQueue } from './blog-generator.js';
import checkoutRouter from './routes/checkout.js';
import { sendQuizResultsEmail, sendNewsletterWelcomeEmail, sendBlogDraftAlertEmail, sendQueueEmptyAlertEmail } from './services/mailer.js';
import { sendWhatsAppDraftAlert } from './services/whatsapp.js';

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// --- Supabase Database Webhook: Blog Draft Email Alert ---
// Trigger: Whenever a new row is inserted into public.blogs with status = 'draft'
router.post('/webhooks/blog-draft-alert', async (req, res) => {
  try {
    const payload = req.body || {};
    
    // Support Supabase Database Webhook payload format: { type: 'INSERT', table: 'blogs', record: { ... } }
    // As well as direct payloads: { title, category, status, ... }
    const record = payload.record || payload;
    const { title, category, status, slug, id } = record;

    console.log('[Webhook /api/webhooks/blog-draft-alert] Received event:', {
      type: payload.type,
      table: payload.table,
      title: title || record.title,
      status: status || record.status
    });

    // Only process if status is 'draft' (or if directly requested)
    const normalizedStatus = (status || record.status || '').toLowerCase();
    if (normalizedStatus && normalizedStatus !== 'draft') {
      return res.json({
        skipped: true,
        message: `Skipped: Status is "${status}". Email alert is only sent for draft rows.`
      });
    }

    // 1. Primary Action: Send Automated Notification Email to admin (gibjack2000@googlemail.com)
    const emailResult = await sendBlogDraftAlertEmail({
      title: title || record.title || 'New Draft Post',
      category: category || record.category || 'Wellness',
      status: 'Draft',
      slug: slug || record.slug,
      id: id || record.id
    });

    // 2. Optional: If WhatsApp is configured in .env, also send WhatsApp alert
    let whatsappResult = null;
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      try {
        whatsappResult = await sendWhatsAppDraftAlert({
          title: title || record.title || 'New Draft Post',
          category: category || record.category || 'Wellness',
          status: 'Draft',
          slug: slug || record.slug,
          id: id || record.id
        });
      } catch (waErr) {
        console.warn('[Webhook /api/webhooks/blog-draft-alert] WhatsApp optional alert skipped/failed:', waErr.message);
      }
    }

    res.json({
      success: true,
      message: 'Draft alert email sent successfully',
      email: emailResult,
      whatsapp: whatsappResult
    });
  } catch (error) {
    console.error('[Webhook /api/webhooks/blog-draft-alert] Error:', error);
    res.status(500).json({ error: 'Failed to process draft alert: ' + error.message });
  }
});

// Dedicated alias route for email-specific webhook
router.post('/webhooks/blog-draft-email-alert', async (req, res) => {
  // Delegate directly to the main webhook handler
  return router.handle(req, res);
});

// --- Supabase Database Webhook / Server Check: Queue Empty Alert ---
// Trigger: Whenever a blog post status changed to 'published' or deleted AND COUNT(status = 'draft') == 0
router.post('/webhooks/blog-queue-empty-check', async (req, res) => {
  try {
    const payload = req.body || {};
    console.log('[Webhook /api/webhooks/blog-queue-empty-check] Event received:', payload.type || 'direct_check');

    let draftCount = 0;
    if (supabase) {
      // 1. Query blogs table for remaining drafts
      try {
        const { count: blogsCount, error: blogsErr } = await supabase
          .from('blogs')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'draft');

        if (!blogsErr && typeof blogsCount === 'number') {
          draftCount += blogsCount;
        }
      } catch (bErr) {
        // blogs table may not exist
      }

      // 2. Query blog_posts table for remaining drafts
      try {
        const { count: postsCount, error: postsErr } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'draft');

        if (!postsErr && typeof postsCount === 'number') {
          draftCount += postsCount;
        }
      } catch (pErr) {
        // ignore
      }
    }

    console.log(`[Queue Empty Check] Current draft count across tables: ${draftCount}`);

    // If queue is empty (0 drafts remaining)
    if (draftCount === 0) {
      console.log('[Queue Empty Check] Queue is empty! Sending notification email to jack@123thenextlevel.com...');
      const emailResult = await sendQueueEmptyAlertEmail();

      return res.json({
        success: true,
        queueEmpty: true,
        draftsRemaining: 0,
        message: 'Queue is empty. Alert email dispatched to jack@123thenextlevel.com successfully.',
        email: emailResult
      });
    }

    // Queue still has drafts
    return res.json({
      success: true,
      queueEmpty: false,
      draftsRemaining: draftCount,
      message: `${draftCount} draft(s) remain in the queue. No empty alert needed.`
    });

  } catch (error) {
    console.error('[Webhook /api/webhooks/blog-queue-empty-check] Error:', error);
    res.status(500).json({ error: 'Failed to verify queue empty status: ' + error.message });
  }
});



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

