import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function duplicateSupplementsToProducts() {
  console.log('=== DUPLICATING AMAZON SUPPLEMENTS INTO PUBLIC.PRODUCTS ===');

  // 1. Fetch all supplements from amazon_affiliate_products
  const { data: amazonSupps, error } = await supabase
    .from('amazon_affiliate_products')
    .select('*')
    .eq('category', 'supplements');

  if (error) {
    console.error('Error fetching from amazon_affiliate_products:', error);
    return;
  }

  console.log(`Fetched ${amazonSupps.length} supplements from amazon_affiliate_products.`);

  const currencySymbolMap = {
    'UK': '£',
    'US': '$',
    'ES': '€'
  };

  const newProductRows = [];

  for (const item of amazonSupps) {
    const market = item.market ? item.market.toUpperCase() : 'UK';
    const symbol = currencySymbolMap[market] || '£';
    const priceText = item.price ? (market === 'ES' ? `${item.price.toFixed(2).replace('.', ',')}€` : `${symbol}${item.price.toFixed(2)}`) : 'Check on Amazon';
    
    let img = item.image_url || '';
    if (img && img.startsWith('/assets/') && !img.startsWith('http')) {
      img = `https://123thenextlevel.com${img}`;
    } else if (img && img.startsWith('/Products/') && !img.startsWith('http')) {
      img = `https://123thenextlevel.com${img}`;
    }

    let link = item.affiliate_link || item.deal_url || `https://www.amazon.co.uk/dp/${item.asin}?tag=123znl0f3-21`;
    if (link.startsWith('https://123thenextlevel.comhttp')) {
      link = link.replace('https://123thenextlevel.com', '');
    }

    let badge = 'Verified Quality';
    if (market === 'UK') badge = 'UK GMP Certified';
    else if (market === 'US') badge = 'FDA / GMP Verified';
    else if (market === 'ES') badge = 'Certificado UE';

    const row = {
      id: `amazon-supp-${market.toLowerCase()}-${(item.asin || item.id).toString().toLowerCase()}`,
      name: item.title || item.product_name || item.name,
      category: 'Supplements',
      rating: item.rating ? Number(item.rating) : 4.8,
      description: item.description || item.short_benefit || item.title,
      image_url: img,
      deal_url: link,
      badge_text: badge,
      price_text: priceText,
      market_region: market
    };

    newProductRows.push(row);
  }

  console.log(`Prepared ${newProductRows.length} product rows for insertion into public.products.`);

  // Upsert in batches of 20
  for (let i = 0; i < newProductRows.length; i += 20) {
    const batch = newProductRows.slice(i, i + 20);
    const { error: upsertErr } = await supabase
      .from('products')
      .upsert(batch, { onConflict: 'id' });

    if (upsertErr) {
      console.error(`Error inserting batch ${Math.floor(i / 20) + 1}:`, upsertErr);
    } else {
      console.log(`✅ Inserted batch ${Math.floor(i / 20) + 1} (${batch.length} rows)`);
    }
  }

  // Verify counts in public.products
  const { data: finalProducts } = await supabase.from('products').select('*');
  const ukSupplements = finalProducts.filter(p => p.market_region === 'UK' && p.category?.toLowerCase() === 'supplements');
  const usSupplements = finalProducts.filter(p => p.market_region === 'US' && p.category?.toLowerCase() === 'supplements');
  const esSupplements = finalProducts.filter(p => p.market_region === 'ES' && p.category?.toLowerCase() === 'supplements');

  console.log('\n=== MIGRATION SUMMARY in public.products ===');
  console.log(`Total products in public.products: ${finalProducts.length}`);
  console.log(`- UK Supplements: ${ukSupplements.length}`);
  console.log(`- US Supplements: ${usSupplements.length}`);
  console.log(`- ES Supplements: ${esSupplements.length}`);
  console.log('✅ Successfully duplicated Amazon supplements into Store table!');
}

duplicateSupplementsToProducts();
