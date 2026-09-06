import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceRoleKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY in environment');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const imageUpdates = [
  // 1. CLINICAL DIAGNOSTICS & TELEMETRY
  {
    ids: ['blood-panel-us', 'blood-panel-uk', 'blood-panel-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/blood-panel.png'
  },
  {
    ids: ['cgm-us', 'cgm-uk', 'cgm-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/cgm.png'
  },
  {
    ids: ['stethoscope-us', 'stethoscope-uk', 'stethoscope-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/core-500.png'
  },
  {
    ids: ['sirtuin-stack-us', 'sirtuin-stack-uk', 'sirtuin-stack-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sirtuin-stack.png'
  },

  // 2. TECH GADGETS & WEARABLES
  {
    ids: ['blood-pressure-cuff-us', 'blood-pressure-cuff-uk', 'blood-pressure-cuff-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/bpm-connect.png'
  },
  {
    ids: ['sleep-analyzer-us', 'sleep-analyzer-uk', 'sleep-analyzer-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sleep-analyzer.png'
  },
  {
    ids: ['segmental-scale-us', 'segmental-scale-uk', 'segmental-scale-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/body-scan.png'
  },
  {
    ids: ['wearable-tracker-us', 'wearable-tracker-uk', 'wearable-tracker-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/apple-watch.png'
  },

  // 3. LIFESTYLE & PERFORMANCE GEAR
  {
    ids: ['noise-headphones-us', 'noise-headphones-uk', 'noise-headphones-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sony-headphones.png'
  },
  {
    ids: ['meditation-cushion-us', 'meditation-cushion-uk', 'meditation-cushion-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/meditation-cushion.png'
  },
  {
    ids: ['marine-collagen-us', 'marine-collagen-uk', 'marine-collagen-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/marine-collagen.png'
  },
  {
    ids: ['water-bottle-us', 'water-bottle-uk', 'water-bottle-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/water-bottle.png'
  },
  {
    ids: ['sauna-tent-us', 'sauna-tent-uk', 'sauna-tent-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/sauna.png'
  },

  // 4. PERFORMANCE & TESTING
  {
    ids: ['reagent-strips-us', 'reagent-strips-uk', 'reagent-strips-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/reagent-strips.png'
  },
  {
    ids: ['rowing-machine-us', 'rowing-machine-uk', 'rowing-machine-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/rower.png'
  },
  {
    ids: ['ovarian-test-us', 'ovarian-test-uk', 'ovarian-test-es'],
    imageUrl: 'https://123thenextlevel.com/assets/images/shop/ovarian-test.png'
  }
];

async function runUpdate() {
  console.log('Updating Supabase product image URLs...');
  let totalUpdated = 0;

  for (const group of imageUpdates) {
    const { data, error } = await supabase
      .from('products')
      .update({ image_url: group.imageUrl })
      .in('id', group.ids)
      .select('id, name, image_url');

    if (error) {
      console.error(`Error updating group ${group.ids.join(', ')}:`, error);
    } else {
      console.log(`Updated ${data?.length || 0} rows for image: ${group.imageUrl}`);
      totalUpdated += (data?.length || 0);
    }
  }

  console.log(`\nSuccessfully updated ${totalUpdated} product entries in live Supabase database!`);
}

runUpdate();
