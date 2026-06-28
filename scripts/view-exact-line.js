import fs from 'fs';

const content = fs.readFileSync('src/data/mockBlogPosts.ts', 'utf8');
const lines = content.split('\n');

const targetLines = [495, 542, 585];
targetLines.forEach(lNum => {
  const line = lines[lNum - 1];
  console.log(`--- Line ${lNum} ---`);
  console.log('Text:', line);
  console.log('Chars:', Array.from(line).map(c => `${c}(${c.charCodeAt(0)})`).join(' '));
});
