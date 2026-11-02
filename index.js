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
  limit: '50mb',
  verify: (req, res, buf) => {
    if (req.originalUrl && (req.originalUrl.includes('stripe') || req.originalUrl.includes('webhook'))) {
      req.rawBody = buf;
    }
  }
}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Resolve absolute paths for the static folder
// In production (flattened), files are in the root. Locally, they are in 'dist/'.
const distPath = fs.existsSync(path.resolve(__dirname, 'dist')) 
  ? path.resolve(__dirname, 'dist') 
  : __dirname;
const indexPath = path.resolve(distPath, 'index.html');
const publicDir = path.resolve(__dirname, 'public');

// Automatically copy Products folder, sitemap.xml, and robots.txt to public_html if it exists
try {
  const parentDir = path.resolve(__dirname, '..');
  const publicHtmlDir = path.resolve(parentDir, 'public_html');
  const publicHtmlProductsPath = path.resolve(publicHtmlDir, 'Products');
  const sourceProductsPath = path.resolve(distPath, 'Products');

  if (fs.existsSync(publicHtmlDir)) {
    if (fs.existsSync(sourceProductsPath)) {
      if (!fs.existsSync(publicHtmlProductsPath)) {
        console.log('Auto-copying Products to public_html/Products on startup...');
        fs.mkdirSync(publicHtmlProductsPath, { recursive: true });
      }
      const files = fs.readdirSync(sourceProductsPath);
      let copiedCount = 0;
      for (const file of files) {
        const srcFile = path.join(sourceProductsPath, file);
        const destFile = path.join(publicHtmlProductsPath, file);
        if (fs.statSync(srcFile).isFile()) {
          fs.copyFileSync(srcFile, destFile);
          copiedCount++;
        }
      }
      if (copiedCount > 0) {
        console.log(`Successfully copied ${copiedCount} product images to public_html/Products`);
      }
    }

    // Guarantee sitemap.xml and robots.txt are synced to public_html root
    const sourceSitemap = fs.existsSync(path.resolve(distPath, 'sitemap.xml'))
      ? path.resolve(distPath, 'sitemap.xml')
      : path.resolve(publicDir, 'sitemap.xml');
    if (fs.existsSync(sourceSitemap)) {
      fs.copyFileSync(sourceSitemap, path.resolve(publicHtmlDir, 'sitemap.xml'));
      console.log('Synced sitemap.xml to public_html/sitemap.xml');
    }

    const sourceRobots = fs.existsSync(path.resolve(distPath, 'robots.txt'))
      ? path.resolve(distPath, 'robots.txt')
      : path.resolve(publicDir, 'robots.txt');
    if (fs.existsSync(sourceRobots)) {
      fs.copyFileSync(sourceRobots, path.resolve(publicHtmlDir, 'robots.txt'));
      console.log('Synced robots.txt to public_html/robots.txt');
    }
  }
} catch (err) {
  console.error('Failed to auto-sync files to public_html:', err);
}


// Add a health check route
app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api', apiRouter);

// Direct alias for Stripe webhooks sent without /api prefix
app.post(['/webhooks/stripe', '/stripe-webhook', '/webhook/stripe'], (req, res, next) => {
  req.url = '/webhooks/stripe';
  apiRouter(req, res, next);
});

// Add a logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Explicit sitemap and robots handlers to guarantee correct MIME types and fast delivery BEFORE static middleware
app.get(['/sitemap.xml', '/sitemap'], (req, res) => {
  const sitemapPath = fs.existsSync(path.resolve(distPath, 'sitemap.xml'))
    ? path.resolve(distPath, 'sitemap.xml')
    : path.resolve(publicDir, 'sitemap.xml');

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'all');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  if (fs.existsSync(sitemapPath)) {
    return res.status(200).send(fs.readFileSync(sitemapPath, 'utf8'));
  }

  // Resilient fallback if neither file is on disk
  const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://123thenextlevel.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://123thenextlevel.com/store</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://123thenextlevel.com/clinician-copilot</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://123thenextlevel.com/guides/uk-preventative-blood-tests/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://123thenextlevel.com/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;
  return res.status(200).send(fallbackSitemap);
});

app.get('/robots.txt', (req, res) => {
  const robotsPath = fs.existsSync(path.resolve(distPath, 'robots.txt'))
    ? path.resolve(distPath, 'robots.txt')
    : path.resolve(publicDir, 'robots.txt');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('X-Robots-Tag', 'all');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  if (fs.existsSync(robotsPath)) {
    return res.status(200).send(fs.readFileSync(robotsPath, 'utf8'));
  }

  const fallbackRobots = `User-agent: *\nAllow: /\n\nSitemap: https://123thenextlevel.com/sitemap.xml\n`;
  return res.status(200).send(fallbackRobots);
});

// --- Static Asset Serving for Railway & Local ---
const distProducts = path.resolve(distPath, 'Products');
const publicProducts = path.resolve(publicDir, 'Products');

// Serve Products from dist and public, supporting both case variations
app.use('/Products', express.static(distProducts));
app.use('/Products', express.static(publicProducts));
app.use('/products', express.static(distProducts));
app.use('/products', express.static(publicProducts));

// Serve root static assets from dist and public with strict cache policies for HTML
const staticHtmlNoCache = {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
};
app.use(express.static(distPath, staticHtmlNoCache));
app.use(express.static(publicDir, staticHtmlNoCache));

// Add a specific health check route before wildcard
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// 301 Permanent Redirect from /diagnostics to consolidated /clinician-copilot hub
app.get('/diagnostics', (req, res) => {
  res.redirect(301, '/clinician-copilot');
});


// Handle client-side routing by returning the index.html file for all paths
app.get('*', (req, res) => {
  // If the request is for a missing asset (e.g. .js or .css), don't send index.html
  // and instead return a 404 to avoid confusing the browser.
  if (req.url.includes('.') && !req.url.endsWith('.html')) {
    return res.status(404).send('Asset not found');
  }

  // Ensure index.html is never cached by browsers or CDNs so updates propagate instantly
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

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
