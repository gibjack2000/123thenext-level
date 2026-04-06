import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Resolve absolute paths for the dist folder
const distPath = join(__dirname, 'dist');
const indexPath = join(distPath, 'index.html');

// Serve static files from the 'dist' directory
app.use(express.static(distPath));

// Handle client-side routing by returning the index.html file for all paths
app.get('*', (req, res) => {
  // If the request is for a file that doesn't exist, serve index.html
  // This is the core fix for 503 on refresh
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('CRITICAL: Failed to serve index.html:', err);
      // Fallback if the file is missing
      res.status(404).send('Site files are currently updating or missing. Please rebuild.');
    }
  });
});

// Global Error Handling
app.use((err, req, res, next) => {
  console.error('SERVER FATAL:', err.stack);
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

process.on('uncaughtException', (err) => console.error('EXC:', err));
process.on('unhandledRejection', (r) => console.error('REJ:', r));
