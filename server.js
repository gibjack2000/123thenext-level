import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { generateAndPostContent } from './src/lib/automationService.js';

const app = express();
// Hostinger often provides the port through the PORT environment variable
const port = process.env.PORT || 3000;

// Serve static files from the 'dist' directory where Vite outputs the build
app.use(express.static(join(__dirname, 'dist')));

// Automation Route for Cron Jobs
app.get('/api/cron/generate', async (req, res) => {
  const { secret } = req.query;

  // Security Check
  if (!secret || secret !== process.env.CRON_SECRET) {
    console.warn('Unauthorized cron attempt blocked.');
    return res.status(403).json({ error: 'Unauthorized' });
  }

  try {
    const result = await generateAndPostContent();
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    console.error('Cron Route Error:', error);
    return res.status(500).json({ error: error });
  }
});


// Handle client-side routing by returning the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running internally on port ${port}`);
});
