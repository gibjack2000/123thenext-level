import fs from 'fs';

const content = fs.readFileSync('src/data/mockBlogPosts.ts', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  let pos = line.indexOf('`');
  while (pos !== -1) {
    console.log(`Line ${index + 1}, Column ${pos + 1}: ${line.substring(Math.max(0, pos - 10), Math.min(line.length, pos + 30))}`);
    pos = line.indexOf('`', pos + 1);
  }
});
