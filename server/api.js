import express from 'express';
import { processCategoryJob, getQueue } from './blog-generator.js';
import checkoutRouter from './routes/checkout.js';
import { sendQuizResultsEmail } from './services/mailer.js';

const router = express.Router();

// --- Quiz Results Route ---
router.post('/quiz-results', async (req, res) => {
  const { email, name, score, dimensions, text } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  try {
    await sendQuizResultsEmail({ email, name, score, dimensions, text });
    res.json({ success: true, message: 'Quiz results email sent successfully.' });
  } catch (error) {
    console.error('Failed to send quiz results email:', error);
    res.status(500).json({ error: 'Failed to send quiz results email. ' + error.message });
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

