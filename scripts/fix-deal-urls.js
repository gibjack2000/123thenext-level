import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Map of canonical deal URLs
const canonicalAmazonLinks = {
  // US
  'reagent-strips-us': 'https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20',
  'blood-pressure-cuff-us': 'https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20',
  'sleep-analyzer-us': 'https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20',
  'segmental-scale-us': 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20',
  'wearable-tracker-us': 'https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20',
  'noise-headphones-us': 'https://www.amazon.com/dp/B0BTY3Y6PP?tag=123znl0e-20',
  'meditation-cushion-us': 'https://www.amazon.com/dp/B01697W160?tag=123znl0e-20',
  'marine-collagen-us': 'https://www.amazon.com/dp/B07T8H5N1M?tag=123znl0e-20',
  'water-bottle-us': 'https://www.amazon.com/dp/B08524B5C6?tag=123znl0e-20',
  'rowing-machine-us': 'https://www.amazon.com/dp/B099KBD9X8?tag=123znl0e-20',
  'sauna-tent-us': 'https://www.amazon.com/dp/B08H23V7S5?tag=123znl0e-20',
  'ovarian-test-us': 'https://www.amazon.com/dp/B08H7V69F7?tag=123znl0e-20',
  'cgm-us': 'https://www.amazon.com/dp/B0DGHQ2QH6?tag=123znl0e-20',

  // UK
  'reagent-strips-uk': 'https://www.amazon.co.uk/dp/B0DJM3KV8X?tag=123znl0f3-21',
  'blood-pressure-cuff-uk': 'https://www.amazon.co.uk/dp/B07SJV1HNR?tag=123znl0f3-21',
  'sleep-analyzer-uk': 'https://www.amazon.co.uk/dp/B0892BGFX7?tag=123znl0f3-21',
  'segmental-scale-uk': 'https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21',
  'wearable-tracker-uk': 'https://www.amazon.co.uk/dp/B0DGJHCPX5?tag=123znl0f3-21',
  'noise-headphones-uk': 'https://www.amazon.co.uk/dp/B0BTY3Y6PP?tag=123znl0f3-21',
  'meditation-cushion-uk': 'https://www.amazon.co.uk/dp/B01697W160?tag=123znl0f3-21',
  'marine-collagen-uk': 'https://www.amazon.co.uk/dp/B07T8H5N1M?tag=123znl0f3-21',
  'water-bottle-uk': 'https://www.amazon.co.uk/dp/B08524B5C6?tag=123znl0f3-21',
  'rowing-machine-uk': 'https://www.amazon.co.uk/dp/B099KBD9X8?tag=123znl0f3-21',
  'sauna-tent-uk': 'https://www.amazon.co.uk/dp/B08H23V7S5?tag=123znl0f3-21',
  'ovarian-test-uk': 'https://www.amazon.co.uk/dp/B08H7V69F7?tag=123znl0f3-21',

  // ES
  'reagent-strips-es': 'https://www.amazon.es/dp/B00NH9WEUA?tag=123znl08a-21',
  'blood-pressure-cuff-es': 'https://www.amazon.es/dp/B07SJV1HNR?tag=123znl08a-21',
  'sleep-analyzer-es': 'https://www.amazon.es/dp/B0892BGFX7?tag=123znl08a-21',
  'segmental-scale-es': 'https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21',
  'wearable-tracker-es': 'https://www.amazon.es/dp/B0DGJG692K?tag=123znl08a-21',
  'noise-headphones-es': 'https://www.amazon.es/dp/B0BTY3Y6PP?tag=123znl08a-21',
  'meditation-cushion-es': 'https://www.amazon.es/dp/B01697W160?tag=123znl08a-21',
  'marine-collagen-es': 'https://www.amazon.es/dp/B07T8H5N1M?tag=123znl08a-21',
  'water-bottle-es': 'https://www.amazon.es/dp/B08524B5C6?tag=123znl08a-21',
  'rowing-machine-es': 'https://www.amazon.es/dp/B099KBD9X8?tag=123znl08a-21',
  'sauna-tent-es': 'https://www.amazon.es/dp/B08H23V7S5?tag=123znl08a-21',
  'ovarian-test-es': 'https://www.amazon.es/dp/B08H7V69F7?tag=123znl08a-21',
};

async function fixDealUrls() {
  console.log('Fetching all current products from Supabase...');
  const { data: products, error } = await supabase.from('products').select('id, name, deal_url, image_url');
  
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Analyzing ${products.length} products in database...`);
  let fixedCount = 0;

  for (const prod of products) {
    let currentDealUrl = prod.deal_url || '';
    let updatedDealUrl = currentDealUrl;

    // Step 1: Strip accidental domain prepend if present
    if (currentDealUrl.startsWith('https://123thenextlevel.comhttp')) {
      updatedDealUrl = currentDealUrl.replace('https://123thenextlevel.com', '');
    }

    // Step 2: Ensure canonical affiliate link if defined in master list
    if (canonicalAmazonLinks[prod.id]) {
      updatedDealUrl = canonicalAmazonLinks[prod.id];
    }

    if (updatedDealUrl !== currentDealUrl) {
      const { error: updateErr } = await supabase
        .from('products')
        .update({ deal_url: updatedDealUrl })
        .eq('id', prod.id);

      if (updateErr) {
        console.error(`Failed to update ${prod.id}:`, updateErr);
      } else {
        console.log(`[FIXED] ${prod.id}: ${currentDealUrl} -> ${updatedDealUrl}`);
        fixedCount++;
      }
    } else {
      console.log(`[OK] ${prod.id}: ${currentDealUrl}`);
    }
  }

  console.log(`\nReconciliation Complete! Fixed ${fixedCount} deal URLs in live Supabase.`);
}

fixDealUrls();
