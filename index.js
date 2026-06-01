import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';
import apiRouter from './server/api.js';
import { initScheduler } from './server/scheduler.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({
  verify: (req, res, buf) => {
    if (req.originalUrl && req.originalUrl.includes('stripe-webhook')) {
      req.rawBody = buf;
    }
  }
}));

// Resolve absolute paths for the static folder
// In production (flattened), files are in the root. Locally, they are in 'dist/'.
const distPath = fs.existsSync(path.resolve(__dirname, 'dist')) 
  ? path.resolve(__dirname, 'dist') 
  : __dirname;
const indexPath = path.resolve(distPath, 'index.html');

// Automatically copy Products folder from dist/Products to public_html/Products if it's missing there
try {
  const parentDir = path.resolve(__dirname, '..');
  const publicHtmlProductsPath = path.resolve(parentDir, 'public_html', 'Products');
  const sourceProductsPath = path.resolve(distPath, 'Products');

  if (fs.existsSync(sourceProductsPath) && fs.existsSync(path.resolve(parentDir, 'public_html'))) {
    if (!fs.existsSync(publicHtmlProductsPath)) {
      console.log('Auto-copying Products to public_html/Products on startup...');
      fs.mkdirSync(publicHtmlProductsPath, { recursive: true });
    }
    const files = fs.readdirSync(sourceProductsPath);
    let copiedCount = 0;
    for (const file of files) {
      const srcFile = path.join(sourceProductsPath, file);
      const destFile = path.join(publicHtmlProductsPath, file);
      if (fs.statSync(srcFile).isFile() && !fs.existsSync(destFile)) {
        fs.copyFileSync(srcFile, destFile);
        copiedCount++;
      }
    }
    if (copiedCount > 0) {
      console.log(`Successfully copied ${copiedCount} product images to public_html/Products`);
    }
  }
} catch (err) {
  console.error('Failed to auto-copy Products to public_html:', err);
}


// Add a health check route
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api', apiRouter);

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
  initScheduler();
});

process.on('uncaughtException', (err) => console.error('EXC:', err));
process.on('unhandledRejection', (r) => console.error('REJ:', r));
