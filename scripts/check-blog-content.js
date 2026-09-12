import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: posts, error } = await supabase.from('blog_posts').select('id, slug, title, status, affiliate_product_1, affiliate_product_2, affiliate_product_3, affiliate_product_4, content');
  if (error) {
    console.error('Error fetching blog_posts:', error);
    return;
  }
  
  console.log(`Found ${posts.length} posts in blog_posts table:`);
  for (const p of posts) {
    console.log(`\n========================================`);
    console.log(`Slug: ${p.slug} (${p.status})`);
    console.log(`Title: ${p.title}`);
    console.log(`Affiliate product IDs: 1:${p.affiliate_product_1}, 2:${p.affiliate_product_2}, 3:${p.affiliate_product_3}, 4:${p.affiliate_product_4}`);
    
    const esLinks = p.content ? p.content.match(/amazon\.es[^\s"')]+/g) : null;
    const euroPrices = p.content ? p.content.match(/\d+[\.,]?\d*\s*€|€\s*\d+[\.,]?\d*/g) : null;
    const cards = p.content ? p.content.match(/<ProductCard[^>]+>/g) : null;
    const htmlCards = p.content ? p.content.match(/<div[^>]*data-product-id[^>]*>|product-card-box/g) : null;

    console.log('amazon.es links:', esLinks);
    console.log('euro symbols count:', euroPrices ? euroPrices.length : 0);
    console.log('ProductCard tags:', cards);
    console.log('HTML Cards:', htmlCards);
  }
}

main().catch(console.error);
