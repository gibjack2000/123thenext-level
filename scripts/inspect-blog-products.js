import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspect() {
  const { data: posts, error } = await supabase.from('blog_posts').select('id, slug, title, content');
  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${posts.length} posts in blog_posts:`);
  for (const post of posts) {
    console.log('\n======================================================');
    console.log(`SLUG: ${post.slug}`);
    console.log(`TITLE: ${post.title}`);
    
    // Find all <ProductCard ... /> tags
    const productCardTags = (post.content || '').match(/<ProductCard\s+[^>]*\/>/gi) || [];
    console.log(`Dynamic <ProductCard /> tags:`, productCardTags);

    // Find all data-product-id
    const dataProductIds = (post.content || '').match(/data-product-id=["'][^"']+["']/gi) || [];
    console.log(`data-product-id tags:`, dataProductIds);

    // Find all raw product-card-box
    const rawCards = (post.content || '').match(/<div class=["']product-card-box["'][\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi) || [];
    console.log(`Raw HTML product-card-box count:`, rawCards.length);
    if (rawCards.length > 0) {
      rawCards.forEach((c, idx) => {
        const titleMatch = c.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
        const imgMatch = c.match(/<img src=["']([^"']+)["']/i);
        const dealMatch = c.match(/href=["']([^"']+)["']/i);
        console.log(`  Card ${idx + 1}: Title="${titleMatch ? titleMatch[1].trim() : 'N/A'}" | Img="${imgMatch ? imgMatch[1] : 'N/A'}" | Link="${dealMatch ? dealMatch[1] : 'N/A'}"`);
      });
    }
  }
}

inspect().catch(console.error);
