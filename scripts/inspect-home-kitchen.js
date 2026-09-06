import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function inspectHomeKitchen() {
  console.log('=== Checking amazon_affiliate_products for home_kitchen ===');
  const { data: dbData, error } = await supabase
    .from('amazon_affiliate_products')
    .select('*')
    .ilike('category', '%kitchen%');

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Found ' + dbData.length + ' kitchen products in amazon_affiliate_products:');
    const byMarket = {};
    for (const item of dbData) {
      byMarket[item.market] = (byMarket[item.market] || 0) + 1;
    }
    console.log('By market:', byMarket);
    dbData.forEach((p, idx) => {
      console.log((idx + 1) + '. [' + p.market + '] [' + p.asin + '] ' + (p.title || p.product_name) + ' | Price: ' + p.price);
    });
  }

  // Also check if any exist under 'Home & Kitchen' or 'kitchen'
  const { data: allAmazonProducts } = await supabase.from('amazon_affiliate_products').select('category, market');
  const cats = {};
  allAmazonProducts.forEach(p => {
    const key = (p.market || 'UNKNOWN') + '_' + (p.category || 'UNKNOWN');
    cats[key] = (cats[key] || 0) + 1;
  });
  console.log('\nAll categories in amazon_affiliate_products by market:');
  console.log(cats);
}

inspectHomeKitchen();
