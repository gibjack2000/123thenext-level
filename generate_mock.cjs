const fs = require('fs');
const content = fs.readFileSync('insert_posts.js', 'utf-8');
const match = content.match(/const posts = (\[[\s\S]*?\]);/);
if (match) {
  let arrayStr = match[1];
  // Convert properties and format to valid TS
  const fileContent = `import { BlogPost } from '../types';\n\nexport const MOCK_BLOG_POSTS: Partial<BlogPost>[] = ${arrayStr}.map((p, i) => ({...p, id: 'mock-'+i, created_at: new Date().toISOString()}));\n`;
  fs.writeFileSync('src/data/mockBlogPosts.ts', fileContent);
  console.log('Mock file created successfully.');
}
