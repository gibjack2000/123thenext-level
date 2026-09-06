import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const dist = path.resolve(root, 'dist');

console.log('=== PACKAGING DIST FOR HOSTINGER PRODUCTION DEPLOYMENT ===');

// 1. Build project
console.log('1. Running vite build...');
execSync('npm run build', { cwd: root, stdio: 'inherit' });

// 2. Copy server & runtime files to dist
console.log('2. Copying runtime server files to dist/...');
const filesToCopy = ['.htaccess', 'index.js', 'package.json', 'package-lock.json'];
for (const file of filesToCopy) {
  const src = path.join(root, file);
  const dest = path.join(dist, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(` - Copied ${file} to dist/`);
  }
}

function copyDirRecursive(srcDir, destDir) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const dirsToCopy = ['server', 'protected-files'];
for (const dir of dirsToCopy) {
  const src = path.join(root, dir);
  const dest = path.join(dist, dir);
  if (fs.existsSync(src)) {
    copyDirRecursive(src, dest);
    console.log(` - Copied ${dir}/ to dist/${dir}/`);
  }
}

console.log('✅ dist/ folder is fully prepared with all frontend assets and backend server files!');
