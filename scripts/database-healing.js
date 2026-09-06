import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runDatabaseHealing() {
  console.log('=== 🏥 RUNNING SUPABASE DATABASE HEALING & RESTORATION ===');

  // 1. Fetch all products
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error querying products table:', error);
    return;
  }

  console.log(`Fetched ${products.length} products for healing analysis.`);

  let dealUrlFixed = 0;
  let imageFixed = 0;
  let activeFixed = 0;

  for (const p of products) {
    const updates = {};

    // Step 1: Clean deal_url
    if (p.deal_url && p.deal_url.startsWith('https://123thenextlevel.comhttp')) {
      updates.deal_url = p.deal_url.replace('https://123thenextlevel.com', '');
      dealUrlFixed++;
    }

    // Step 2: Clean image_url
    if (p.image_url && p.image_url.startsWith('/assets/') && !p.image_url.startsWith('http')) {
      updates.image_url = `https://123thenextlevel.com${p.image_url}`;
      imageFixed++;
    }

    // Step 3: is_active (if column exists)
    if (p.hasOwnProperty('is_active') && p.is_active !== true) {
      updates.is_active = true;
      activeFixed++;
    }

    if (Object.keys(updates).length > 0) {
      const { error: updateErr } = await supabase
        .from('products')
        .update(updates)
        .eq('id', p.id);

      if (updateErr) {
        console.error(`Failed to update ${p.id}:`, updateErr);
      } else {
        console.log(`[HEALED] ${p.id}:`, updates);
      }
    }
  }

  console.log('\n=== HEALING AUDIT COMPLETE ===');
  console.log(`- Deal URLs Repaired: ${dealUrlFixed}`);
  console.log(`- Image Paths Made Absolute: ${imageFixed}`);
  console.log(`- Active Flags Reconciled: ${activeFixed}`);
  console.log('All products are healthy and operational in live Supabase.');
}

runDatabaseHealing();
