import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function inspectAndDuplicateSupplements() {
  console.log('=== Fetching supplements from amazon_affiliate_products ===');
  const { data: amazonSupps, error } = await supabase
    .from('amazon_affiliate_products')
    .select('*')
    .eq('category', 'supplements');

  if (error) {
    console.error('Error fetching from amazon_affiliate_products:', error);
    return;
  }

  console.log(`Total supplements in amazon_affiliate_products: ${amazonSupps.length}`);
  const byMarket = {};
  for (const item of amazonSupps) {
    byMarket[item.market] = (byMarket[item.market] || 0) + 1;
  }
  console.log('By market:', byMarket);

  console.log('\n--- Listing UK supplement titles & links ---');
  const ukSupps = amazonSupps.filter(p => p.market === 'UK');
  ukSupps.forEach((p, idx) => {
    console.log(`${idx + 1}. [${p.asin}] ${p.title} | Price: £${p.price} | Link: ${p.affiliate_link}`);
  });

  // Let's also check public.products
  const { data: existingProducts, error: prodErr } = await supabase
    .from('products')
    .select('*');

  if (prodErr) {
    console.error('Error fetching from public.products:', prodErr);
  } else {
    console.log(`\nTotal existing products in public.products: ${existingProducts.length}`);
    const existingSupps = existingProducts.filter(p => p.category?.toLowerCase() === 'supplements');
    console.log(`Existing supplements in public.products: ${existingSupps.length}`);
  }
}

inspectAndDuplicateSupplements();
