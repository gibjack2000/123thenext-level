import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function migrateHealthWellness() {
  console.log('=== MIGRATING HEALTH & WELLNESS PRODUCTS INTO PUBLIC.PRODUCTS ===');

  const { data: healthProducts, error } = await supabase
    .from('amazon_affiliate_products')
    .select('*')
    .or('category.ilike.%health%,category.ilike.%wellness%');

  if (error) {
    console.error('Error fetching health_wellness products:', error);
    return;
  }

  console.log('Found ' + healthProducts.length + ' health_wellness products in amazon_affiliate_products.');

  const currencySymbolMap = {
    'UK': '£',
    'US': '$',
    'ES': '€'
  };

  const rows = [];

  for (const item of healthProducts) {
    const market = item.market ? item.market.toUpperCase() : 'UK';
    const symbol = currencySymbolMap[market] || '£';
    const priceText = item.price 
      ? (market === 'ES' ? Number(item.price).toFixed(2).replace('.', ',') + '€' : symbol + Number(item.price).toFixed(2)) 
      : 'Check on Amazon';
    
    let img = item.image_url || '';
    if (img && img.startsWith('/assets/') && !img.startsWith('http')) {
      img = 'https://123thenextlevel.com' + img;
    } else if (img && img.startsWith('/Products/') && !img.startsWith('http')) {
      img = 'https://123thenextlevel.com' + img;
    }

    let link = item.affiliate_link || item.deal_url || ('https://www.amazon.' + (market === 'UK' ? 'co.uk' : market === 'ES' ? 'es' : 'com') + '/dp/' + item.asin);
    if (link && link.startsWith('https://123thenextlevel.comhttp')) {
      link = link.replace('https://123thenextlevel.com', '');
    }

    let badge = 'Longevity Grade';
    if (market === 'UK') badge = 'UK Quality Standard';
    else if (market === 'US') badge = 'Biohacker Approved';
    else if (market === 'ES') badge = 'Certificado UE';

    const row = {
      id: 'amazon-health-' + market.toLowerCase() + '-' + (item.asin || item.id).toString().toLowerCase(),
      name: item.title || item.product_name || item.name,
      category: 'Health & Wellness',
      rating: item.rating ? Number(item.rating) : 4.8,
      description: item.description || item.short_benefit || item.cta || item.title,
      image_url: img,
      deal_url: link,
      badge_text: badge,
      price_text: priceText,
      market_region: market
    };

    rows.push(row);
  }

  console.log('Prepared ' + rows.length + ' health & wellness rows for public.products.');

  const { error: upsertErr } = await supabase
    .from('products')
    .upsert(rows, { onConflict: 'id' });

  if (upsertErr) {
    console.error('Error inserting health & wellness products:', upsertErr);
  } else {
    console.log('✅ Successfully inserted ' + rows.length + ' health & wellness products into public.products!');
  }

  // Verification
  const { data: finalProducts } = await supabase.from('products').select('*');
  const ukHealth = finalProducts.filter(p => p.market_region === 'UK' && p.category?.toLowerCase() === 'health & wellness');
  const usHealth = finalProducts.filter(p => p.market_region === 'US' && p.category?.toLowerCase() === 'health & wellness');
  const esHealth = finalProducts.filter(p => p.market_region === 'ES' && p.category?.toLowerCase() === 'health & wellness');

  console.log('\n=== HEALTH & WELLNESS MIGRATION SUMMARY ===');
  console.log('Total products in public.products: ' + finalProducts.length);
  console.log('- UK Health & Wellness: ' + ukHealth.length);
  console.log('- US Health & Wellness: ' + usHealth.length);
  console.log('- ES Health & Wellness: ' + esHealth.length);
}

migrateHealthWellness();
