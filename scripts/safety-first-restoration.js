import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runRestoration() {
  console.log('=== 🏥 EXECUTING SAFETY-FIRST RESTORATION & UNIFICATION SCRIPT ===\n');

  // 1. Fetch current products
  const { data: products, error: fetchErr } = await supabase.from('products').select('*');
  if (fetchErr) {
    console.error('Fetch error:', fetchErr);
    return;
  }

  console.log(`Fetched ${products.length} products from live Supabase.\n`);

  // Explicit mappings for deal_urls
  const exactLinks = {
    // US
    'reagent-strips-us': 'https://www.amazon.com/dp/B0BS1QCFHX?tag=123znl0e-20',
    'blood-pressure-cuff-us': 'https://www.amazon.com/dp/B07SJV1HNR?tag=123znl0e-20',
    'sleep-analyzer-us': 'https://www.amazon.com/dp/B078Z1B34S?tag=123znl0e-20',
    'segmental-scale-us': 'https://www.amazon.com/dp/B0B9849CD1?tag=123znl0e-20',
    'wearable-tracker-us': 'https://www.amazon.com/dp/B0DGJG692K?tag=123znl0e-20',

    // UK
    'reagent-strips-uk': 'https://www.amazon.co.uk/dp/B0DJM3KV8X?tag=123znl0f3-21',
    'blood-pressure-cuff-uk': 'https://www.amazon.co.uk/dp/B07SJV1HNR?tag=123znl0f3-21',
    'sleep-analyzer-uk': 'https://www.amazon.co.uk/dp/B0892BGFX7?tag=123znl0f3-21',
    'segmental-scale-uk': 'https://www.amazon.co.uk/dp/B0B9849CD1?tag=123znl0f3-21',
    'wearable-tracker-uk': 'https://www.amazon.co.uk/dp/B0DGJHCPX5?tag=123znl0f3-21',

    // ES
    'reagent-strips-es': 'https://www.amazon.es/dp/B00NH9WEUA?tag=123znl08a-21',
    'blood-pressure-cuff-es': 'https://www.amazon.es/dp/B07SJV1HNR?tag=123znl08a-21',
    'sleep-analyzer-es': 'https://www.amazon.es/dp/B0892BGFX7?tag=123znl08a-21',
    'segmental-scale-es': 'https://www.amazon.es/dp/B0B9849CD1?tag=123znl08a-21',
    'wearable-tracker-es': 'https://www.amazon.es/dp/B0DGJG692K?tag=123znl08a-21',
  };

  let updatedCount = 0;

  for (const p of products) {
    const updateObj = {};

    // 1. Force is_active = true if column exists
    if (p.hasOwnProperty('is_active') && p.is_active !== true) {
      updateObj.is_active = true;
    }

    // 2. Category alignment
    if (['reagents', 'blood'].includes(p.category?.toLowerCase())) {
      updateObj.category = 'Performance & Testing';
    } else if (['telemetry', 'recovery', 'somatic'].includes(p.category?.toLowerCase())) {
      updateObj.category = 'Tech Gadgets & Wearables';
    } else if (p.id.includes('sirtuin')) {
      updateObj.category = 'Supplements';
    }

    // 3. Image URL domain prepend
    if (p.image_url && p.image_url.startsWith('/assets/') && !p.image_url.startsWith('http')) {
      updateObj.image_url = `https://123thenextlevel.com${p.image_url}`;
    }

    // 4. Exact Amazon links
    if (exactLinks[p.id] && p.deal_url !== exactLinks[p.id]) {
      updateObj.deal_url = exactLinks[p.id];
    }

    if (Object.keys(updateObj).length > 0) {
      const { error: updErr } = await supabase
        .from('products')
        .update(updateObj)
        .eq('id', p.id);

      if (updErr) {
        console.error(`Error updating ${p.id}:`, updErr);
      } else {
        console.log(`[UPDATED] ${p.id}:`, updateObj);
        updatedCount++;
      }
    } else {
      console.log(`[ALREADY SYNCED] ${p.id} (${p.category}) -> ${p.deal_url}`);
    }
  }

  console.log(`\n=== RESTORATION COMPLETE: ${updatedCount} products updated, all synced! ===`);
}

runRestoration();
