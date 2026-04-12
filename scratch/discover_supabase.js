import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function discover() {
  console.log("Checking amazon_afiliate_products...");
  const { data: products, error: pError } = await supabase
    .from('amazon_affiliate_products')
    .select('*')
    .limit(1);
  
  if (pError) console.error("Products error:", pError);
  else console.log("Product columns:", Object.keys(products[0]));

  console.log("\nChecking blog_posts...");
  const { data: blogs, error: bError } = await supabase
    .from('blog_posts')
    .select('*')
    .limit(1);
  
  if (bError) console.error("Blogs error:", bError);
  else if (blogs && blogs.length > 0) console.log("Blog columns:", Object.keys(blogs[0]));
  else console.log("Blog table is empty or inaccessible.");
}

discover();
