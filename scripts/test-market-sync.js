import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// PRODUCT_ALIASES matrix mirror
const PRODUCT_ALIASES = {
  'cgm': { 'US': 'cgm-us', 'UK': 'cgm-uk', 'ES': 'cgm-es' },
  'cgm-us': { 'US': 'cgm-us', 'UK': 'cgm-uk', 'ES': 'cgm-es' },
  'sleep-analyzer': { 'US': 'sleep-analyzer-us', 'UK': 'sleep-analyzer-uk', 'ES': 'sleep-analyzer-es' },
  'sleep-analyzer-us': { 'US': 'sleep-analyzer-us', 'UK': 'sleep-analyzer-uk', 'ES': 'sleep-analyzer-es' },
  'reagent-strips': { 'US': 'reagent-strips-us', 'UK': 'reagent-strips-uk', 'ES': 'reagent-strips-es' },
  'reagent-strips-us': { 'US': 'reagent-strips-us', 'UK': 'reagent-strips-uk', 'ES': 'reagent-strips-es' },
  'segmental-scale': { 'US': 'segmental-scale-us', 'UK': 'segmental-scale-uk', 'ES': 'segmental-scale-es' },
  'segmental-scale-us': { 'US': 'segmental-scale-us', 'UK': 'segmental-scale-uk', 'ES': 'segmental-scale-es' },
  'sirtuin-stack': { 'US': 'sirtuin-stack-us', 'UK': 'sirtuin-stack-uk', 'ES': 'sirtuin-stack-es' },
  'sirtuin-stack-us': { 'US': 'sirtuin-stack-us', 'UK': 'sirtuin-stack-uk', 'ES': 'sirtuin-stack-es' },
  'stethoscope': { 'US': 'stethoscope-us', 'UK': 'stethoscope-uk', 'ES': 'stethoscope-es' },
  'stethoscope-us': { 'US': 'stethoscope-us', 'UK': 'stethoscope-uk', 'ES': 'stethoscope-es' },
  'blood-pressure-cuff': { 'US': 'blood-pressure-cuff-us', 'UK': 'blood-pressure-cuff-uk', 'ES': 'blood-pressure-cuff-es' },
  'blood-pressure-cuff-us': { 'US': 'blood-pressure-cuff-us', 'UK': 'blood-pressure-cuff-uk', 'ES': 'blood-pressure-cuff-es' },
  'wearable-tracker': { 'US': 'wearable-tracker-us', 'UK': 'wearable-tracker-uk', 'ES': 'wearable-tracker-es' },
  'wearable-tracker-us': { 'US': 'wearable-tracker-us', 'UK': 'wearable-tracker-uk', 'ES': 'wearable-tracker-es' },
  'sauna': { 'US': 'amazon-health-us-b09pskn6x3', 'UK': 'amazon-health-uk-b09pskn6x3', 'ES': 'amazon-health-es-b09pskn6x3' },
  'sauna-us': { 'US': 'amazon-health-us-b09pskn6x3', 'UK': 'amazon-health-uk-b09pskn6x3', 'ES': 'amazon-health-es-b09pskn6x3' },
  'headphones': { 'US': 'amazon-health-us-b0c3hcd34r', 'UK': 'amazon-health-uk-b0c3hcd34r', 'ES': 'amazon-health-es-b08hmwzbxc' },
  'headphones-us': { 'US': 'amazon-health-us-b0c3hcd34r', 'UK': 'amazon-health-uk-b0c3hcd34r', 'ES': 'amazon-health-es-b08hmwzbxc' },
  'rower': { 'US': 'amazon-fitness-us-rower', 'UK': 'amazon-fitness-uk-rower', 'ES': 'amazon-fitness-es-rower' },
  'rower-us': { 'US': 'amazon-fitness-us-rower', 'UK': 'amazon-fitness-uk-rower', 'ES': 'amazon-fitness-es-rower' }
};

function resolveRegionalProductId(rawId, targetMarket = 'US') {
  if (!rawId) return '';
  const normalizedRaw = rawId.trim().toLowerCase();
  const market = (targetMarket || 'US').toUpperCase();
  const targetSuffix = `-${market.toLowerCase()}`;

  const baseWithoutSuffix = normalizedRaw.replace(/-(us|uk|es)$/i, '');
  if (PRODUCT_ALIASES[normalizedRaw] && PRODUCT_ALIASES[normalizedRaw][market]) {
    return PRODUCT_ALIASES[normalizedRaw][market];
  }
  if (PRODUCT_ALIASES[baseWithoutSuffix] && PRODUCT_ALIASES[baseWithoutSuffix][market]) {
    return PRODUCT_ALIASES[baseWithoutSuffix][market];
  }

  if (/-(us|uk|es)$/i.test(normalizedRaw)) {
    return `${baseWithoutSuffix}${targetSuffix}`;
  }

  return `${normalizedRaw}${targetSuffix}`;
}

async function runTest() {
  console.log('================================================================');
  console.log('🧪 TESTING MARKET-AWARE BLOG PRODUCT CARD REGIONAL RESOLUTION');
  console.log('================================================================\n');

  const { data: dbProducts, error } = await supabase.from('products').select('*');
  if (error || !dbProducts) {
    console.error('Failed to fetch products from Supabase:', error);
    return;
  }

  const dbMap = new Map(dbProducts.map(p => [p.id.toLowerCase(), p]));
  console.log(`Loaded ${dbProducts.length} live products from public.products in Supabase.\n`);

  const testCases = [
    'cgm',
    'cgm-us',
    'sleep-analyzer-us',
    'reagent-strips-us',
    'segmental-scale-us',
    'sirtuin-stack-us',
    'stethoscope-us',
    'blood-pressure-cuff-us',
    'wearable-tracker-us',
    'rower-us',
    'sauna-us',
    'headphones-us'
  ];

  const markets = ['US', 'UK', 'ES'];
  let allPassed = true;

  for (const testId of testCases) {
    console.log(`🔹 Testing Product Key: "${testId}"`);
    for (const m of markets) {
      const resolvedId = resolveRegionalProductId(testId, m);
      const prod = dbMap.get(resolvedId.toLowerCase());

      if (prod) {
        console.log(`   [${m}] -> Resolved: "${resolvedId}" | Title: "${prod.name.slice(0, 35)}..." | Price: "${prod.price_text}" | Badge: "${prod.badge_text}" | Region: "${prod.market_region}"`);
      } else {
        console.error(`   ❌ [${m}] -> Resolved: "${resolvedId}" (NOT FOUND in public.products!)`);
        allPassed = false;
      }
    }
    console.log('');
  }

  if (allPassed) {
    console.log('================================================================');
    console.log('✅ ALL TEST CASES RESOLVED 100% PERFECTLY ACROSS US, UK, AND ES!');
    console.log('================================================================');
  } else {
    console.log('================================================================');
    console.log('⚠️ SOME PRODUCTS WERE NOT FOUND.');
    console.log('================================================================');
  }
}

runTest().catch(console.error);
