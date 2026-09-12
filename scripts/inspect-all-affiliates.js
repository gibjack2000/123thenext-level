import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectAll() {
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, affiliate_product_1, affiliate_product_2, affiliate_product_3, affiliate_product_4');

  if (error) {
    console.error(error);
    return;
  }

  const ids = new Set();
  posts.forEach(p => {
    if (p.affiliate_product_1) ids.add(p.affiliate_product_1);
    if (p.affiliate_product_2) ids.add(p.affiliate_product_2);
    if (p.affiliate_product_3) ids.add(p.affiliate_product_3);
    if (p.affiliate_product_4) ids.add(p.affiliate_product_4);
  });

  const { data: prods } = await supabase
    .from('amazon_affiliate_products')
    .select('id, title, market, affiliate_link, price, currency')
    .in('id', Array.from(ids));

  const prodMap = new Map((prods || []).map(p => [p.id, p]));

  console.log(`Found ${posts.length} blog posts. Linked affiliate products:`);
  posts.forEach(p => {
    if (p.affiliate_product_1 || p.affiliate_product_2 || p.affiliate_product_3 || p.affiliate_product_4) {
      console.log(`\nBlog: [${p.slug}] "${p.title}"`);
      [p.affiliate_product_1, p.affiliate_product_2, p.affiliate_product_3, p.affiliate_product_4].filter(Boolean).forEach((id, idx) => {
        const prod = prodMap.get(id);
        console.log(`  Product ${idx+1} (id=${id}): [Market: ${prod?.market}] "${prod?.title?.slice(0, 40)}..." (Link: ${prod?.affiliate_link})`);
      });
    }
  });
}

inspectAll();
