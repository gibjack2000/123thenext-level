import fs from 'fs';

const content = fs.readFileSync('src/data/mockBlogPosts.ts', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('content:')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
    console.log('Chars:', Array.from(line).map(c => `${c}(${c.charCodeAt(0)})`).join(' '));
  }
});
