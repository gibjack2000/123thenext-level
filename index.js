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

// Handle client-side routing by returning the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running internally on port ${port}`);
});
