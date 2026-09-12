import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: posts, error } = await supabase.from('blog_posts').select('*');
  if (error) {
    console.error('Error fetching blog_posts:', error);
    return;
  }
  
  console.log(`Total posts: ${posts.length}`);
  for (const p of posts) {
    const ukLinks = p.content ? p.content.match(/amazon\.co\.uk[^\s"')]+/g) : null;
    const esLinks = p.content ? p.content.match(/amazon\.es[^\s"')]+/g) : null;
    const usLinks = p.content ? p.content.match(/amazon\.com[^\s"')]+/g) : null;
    const poundPrices = p.content ? p.content.match(/£\s*\d+[\.,]?\d*/g) : null;
    const euroPrices = p.content ? p.content.match(/€\s*\d+[\.,]?\d*|\d+[\.,]?\d*\s*€/g) : null;
    const dollarPrices = p.content ? p.content.match(/\$\s*\d+[\.,]?\d*/g) : null;

    if (ukLinks || poundPrices || esLinks || euroPrices || p.affiliate_product_1 || p.affiliate_product_2) {
      console.log(`\n========================================`);
      console.log(`Slug: ${p.slug} | Status: ${p.status} | Title: ${p.title}`);
      console.log(`Affiliate fields: 1:${p.affiliate_product_1}, 2:${p.affiliate_product_2}, 3:${p.affiliate_product_3}, 4:${p.affiliate_product_4}`);
      if (ukLinks) console.log('UK Links:', ukLinks);
      if (poundPrices) console.log('Pound Prices:', poundPrices);
      if (esLinks) console.log('ES Links:', esLinks);
      if (euroPrices) console.log('Euro Prices:', euroPrices);
      if (usLinks) console.log('US Links:', usLinks?.length);
      if (dollarPrices) console.log('Dollar Prices:', dollarPrices?.length);
    }
  }

  // Also check if public.blogs table exists or has any data
  const { data: blogs, error: bErr } = await supabase.from('blogs').select('*');
  if (blogs && blogs.length > 0) {
    console.log(`\nFound ${blogs.length} posts in 'blogs' table:`);
    for (const b of blogs) {
      console.log(`Blogs table Slug: ${b.slug} | Title: ${b.title}`);
    }
  } else {
    console.log(`\n'blogs' table error/empty:`, bErr?.message);
  }
}

main().catch(console.error);
