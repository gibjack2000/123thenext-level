import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// Hostinger often provides the port through the PORT environment variable
const port = process.env.PORT || 3000;

// Serve static files from the 'dist' directory where Vite outputs the build
app.use(express.static(join(__dirname, 'dist')));

// Global Error Handling to prevent 503 Crashes
app.use((err, req, res, next) => {
  console.error('SERVER ERROR RECOVERY INTERCEPTED:', err.stack);
  res.status(500).send('Internal Server Error - Recovery mode active.');
});

// Handle client-side routing by returning the index.html file for all other routes
app.get('*', (req, res) => {
  try {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  } catch (error) {
    console.error('INDEX FILE SERVE ERROR:', error);
    res.status(404).send('Not Found');
  }
});

app.listen(port, () => {
  console.log(`Server is running internally on port ${port}`);
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
});
