import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Roots
const projectRoot = path.resolve(__dirname, '..');
const sourceDir = path.resolve(projectRoot, 'public', 'Products');
const targetParentDir = path.resolve(projectRoot, '..', 'public_html');
const targetDir = path.resolve(targetParentDir, 'Products');

console.log(`Source Products Dir: ${sourceDir}`);
console.log(`Target public_html Products Dir: ${targetDir}`);

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    console.log(`Source folder does not exist: ${from}`);
    return;
  }
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  const files = fs.readdirSync(from);
  for (const file of files) {
    const fromPath = path.join(from, file);
    const toPath = path.join(to, file);
    const stat = fs.statSync(fromPath);
    if (stat.isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  }
}

if (fs.existsSync(targetParentDir)) {
  console.log(`Found public_html folder at ${targetParentDir}. Copying Products...`);
  try {
    copyFolderSync(sourceDir, targetDir);
    console.log('Successfully copied Products folder to public_html/Products.');
  } catch (error) {
    console.error('Failed to copy Products folder:', error);
  }
} else {
  console.log(`public_html folder not found at ${targetParentDir}. Skipping copy (this is normal for local dev).`);
}
