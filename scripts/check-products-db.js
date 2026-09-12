import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const idsToCheck = [
    'sauna', 'sauna-us', 'sauna-uk', 'sauna-es',
    'amazon-health-us-b09pskn6x3', 'amazon-health-uk-b09pskn6x3', 'amazon-health-es-b09pskn6x3',
    'headphones', 'headphones-us', 'headphones-uk', 'headphones-es',
    'amazon-health-us-b0c3hcd34r', 'amazon-health-uk-b0c3hcd34r', 'amazon-health-es-b08hmwzbxc',
    'sleep-analyzer', 'sleep-analyzer-us', 'sleep-analyzer-uk', 'sleep-analyzer-es',
    'rower', 'rower-us', 'rower-uk', 'rower-es',
    'wearable-tracker', 'wearable-tracker-us', 'wearable-tracker-uk', 'wearable-tracker-es',
    'cgm', 'cgm-us', 'cgm-uk', 'cgm-es',
    'segmental-scale', 'segmental-scale-us', 'segmental-scale-uk', 'segmental-scale-es',
    'sirtuin-stack', 'sirtuin-stack-us', 'sirtuin-stack-uk', 'sirtuin-stack-es',
    'stethoscope', 'stethoscope-us', 'stethoscope-uk', 'stethoscope-es',
    'blood-pressure-cuff', 'blood-pressure-cuff-us', 'blood-pressure-cuff-uk', 'blood-pressure-cuff-es'
  ];

  const { data: prods, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Total products in public.products: ${prods.length}`);
  
  console.log('\n--- Matching IDs from our check list ---');
  for (const p of prods) {
    if (idsToCheck.includes(p.id.toLowerCase())) {
      console.log(`ID: ${p.id} | Region: ${p.market_region} | Price: ${p.price_text} | Badge: ${p.badge_text} | Deal: ${p.deal_url}`);
    }
  }

  console.log('\n--- Looking for any ES products matching sauna/headphones/sleep ---');
  const matchingES = prods.filter(p => p.id.includes('sauna') || p.id.includes('b09pskn6x3') || p.id.includes('headphone') || p.id.includes('b0c3hcd34r') || p.id.includes('b08hmwzbxc') || p.id.includes('sleep'));
  matchingES.forEach(p => {
    console.log(`[${p.market_region}] ID: ${p.id} | Name: ${p.name} | Price: ${p.price_text} | Deal: ${p.deal_url}`);
  });
}

main().catch(console.error);
