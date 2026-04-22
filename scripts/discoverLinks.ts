
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const PAGES_DIR = path.join(ROOT_DIR, 'src', 'pages');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'src', 'components');

interface DiscoveredLink {
  file: string;
  line: number;
  content: string;
  key?: string;
  url?: string;
  type: 'key' | 'hardcoded';
}

function scanFile(filePath: string): DiscoveredLink[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const links: DiscoveredLink[] = [];
  const relativePath = path.relative(ROOT_DIR, filePath);

  lines.forEach((line, index) => {
    // Look for affiliateLinks.key or links.key
    const keyMatch = line.match(/(?:affiliateLinks|links)\.([a-zA-Z0-9_]+)/);
    if (keyMatch) {
      links.push({
        file: relativePath,
        line: index + 1,
        content: line.trim(),
        key: keyMatch[1],
        type: 'key'
      });
    }

    // Look for hardcoded Amazon URLs
    const urlMatch = line.match(/https?:\/\/(?:www\.)?(?:amazon\.[a-z.]+|amzn\.to)\/[^\s"']+/);
    if (urlMatch) {
      // Ignore if it's already in the config file itself to avoid duplicates if we want unique ones
      links.push({
        file: relativePath,
        line: index + 1,
        content: line.trim(),
        url: urlMatch[0],
        type: 'hardcoded'
      });
    }
    
    // Look for mappings keys in objects
    const mappingMatch = line.match(/key:\s*['"]([^'"]+)['"]/);
    if (mappingMatch && (line.includes('placement') || line.includes('cta') || line.includes('link'))) {
       links.push({
        file: relativePath,
        line: index + 1,
        content: line.trim(),
        key: mappingMatch[1],
        type: 'key'
      });
    }
  });

  return links;
}

function walkDir(dir: string, callback: (filePath: string) => void) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      walkDir(filePath, callback);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      callback(filePath);
    }
  });
}

const allLinks: DiscoveredLink[] = [];

console.log('Scanning pages...');
walkDir(PAGES_DIR, (file) => {
  allLinks.push(...scanFile(file));
});

console.log('Scanning components...');
walkDir(COMPONENTS_DIR, (file) => {
  allLinks.push(...scanFile(file));
});

// Deduplicate and group
const result = {
  timestamp: new Date().toISOString(),
  total: allLinks.length,
  links: allLinks
};

const outputPath = path.join(ROOT_DIR, 'public', 'discovered_links.json');
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log(`Scan complete. Found ${allLinks.length} potential links. Result saved to ${outputPath}`);
