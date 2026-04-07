import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Resolve absolute paths for the dist folder
const distPath = path.resolve(__dirname, 'dist');
const indexPath = path.resolve(distPath, 'index.html');

// Add a health check route
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Add a logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files from the 'dist' directory
app.use(express.static(distPath));

// Add a specific health check route before wildcard
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Handle client-side routing by returning the index.html file for all paths
app.get('*', (req, res) => {
  // If the request is for a missing asset (e.g. .js or .css), don't send index.html
  // and instead return a 404 to avoid confusing the browser.
  if (req.url.includes('.') && !req.url.endsWith('.html')) {
    return res.status(404).send('Asset not found');
  }

  // Ensure index.html exists before attempting to send it
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('CRITICAL: Failed to serve index.html at:', indexPath, err);
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
