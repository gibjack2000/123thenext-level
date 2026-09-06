import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function migrateHomeKitchen() {
  console.log('=== MIGRATING HOME & KITCHEN PRODUCTS INTO PUBLIC.PRODUCTS ===');

  const { data: kitchenProducts, error } = await supabase
    .from('amazon_affiliate_products')
    .select('*')
    .ilike('category', '%kitchen%');

  if (error) {
    console.error('Error fetching home_kitchen products:', error);
    return;
  }

  console.log('Found ' + kitchenProducts.length + ' home_kitchen products in amazon_affiliate_products.');

  const currencySymbolMap = {
    'UK': '£',
    'US': '$',
    'ES': '€'
  };

  const rows = [];

  for (const item of kitchenProducts) {
    const market = item.market ? item.market.toUpperCase() : 'UK';
    const symbol = currencySymbolMap[market] || '£';
    const priceText = item.price 
      ? (market === 'ES' ? item.price.toFixed(2).replace('.', ',') + '€' : symbol + item.price.toFixed(2)) 
      : 'Check on Amazon';
    
    let img = item.image_url || '';
    if (img && img.startsWith('/assets/') && !img.startsWith('http')) {
      img = 'https://123thenextlevel.com' + img;
    } else if (img && img.startsWith('/Products/') && !img.startsWith('http')) {
      img = 'https://123thenextlevel.com' + img;
    }

    let link = item.affiliate_link || item.deal_url || ('https://www.amazon.' + (market === 'UK' ? 'co.uk' : market === 'ES' ? 'es' : 'com') + '/dp/' + item.asin);
    if (link.startsWith('https://123thenextlevel.comhttp')) {
      link = link.replace('https://123thenextlevel.com', '');
    }

    let badge = 'Kitchen Grade';
    if (market === 'UK') badge = 'UK Quality Standard';
    else if (market === 'US') badge = 'FDA / UL Certified';
    else if (market === 'ES') badge = 'Certificado UE';

    const row = {
      id: 'amazon-kitchen-' + market.toLowerCase() + '-' + (item.asin || item.id).toString().toLowerCase(),
      name: item.title || item.product_name || item.name,
      category: 'Kitchen',
      rating: item.rating ? Number(item.rating) : 4.8,
      description: item.description || item.short_benefit || item.title,
      image_url: img,
      deal_url: link,
      badge_text: badge,
      price_text: priceText,
      market_region: market
    };

    rows.push(row);
  }

  console.log('Prepared ' + rows.length + ' kitchen rows for public.products.');

  const { error: upsertErr } = await supabase
    .from('products')
    .upsert(rows, { onConflict: 'id' });

  if (upsertErr) {
    console.error('Error inserting kitchen products:', upsertErr);
  } else {
    console.log('✅ Successfully inserted ' + rows.length + ' kitchen products into public.products!');
  }

  // Verification
  const { data: finalProducts } = await supabase.from('products').select('*');
  const ukKitchen = finalProducts.filter(p => p.market_region === 'UK' && p.category?.toLowerCase() === 'kitchen');
  const usKitchen = finalProducts.filter(p => p.market_region === 'US' && p.category?.toLowerCase() === 'kitchen');
  const esKitchen = finalProducts.filter(p => p.market_region === 'ES' && p.category?.toLowerCase() === 'kitchen');

  console.log('\n=== KITCHEN MIGRATION SUMMARY ===');
  console.log('Total products in public.products: ' + finalProducts.length);
  console.log('- UK Kitchen: ' + ukKitchen.length);
  console.log('- US Kitchen: ' + usKitchen.length);
  console.log('- ES Kitchen: ' + esKitchen.length);
}

migrateHomeKitchen();
