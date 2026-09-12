import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Aliases matching productService.ts
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
  'amazon-health-us-b09pskn6x3': { 'US': 'amazon-health-us-b09pskn6x3', 'UK': 'amazon-health-uk-b09pskn6x3', 'ES': 'amazon-health-es-b09pskn6x3' },
  'headphones': { 'US': 'amazon-health-us-b0c3hcd34r', 'UK': 'amazon-health-uk-b0c3hcd34r', 'ES': 'amazon-health-es-b08hmwzbxc' },
  'headphones-us': { 'US': 'amazon-health-us-b0c3hcd34r', 'UK': 'amazon-health-uk-b0c3hcd34r', 'ES': 'amazon-health-es-b08hmwzbxc' },
  'amazon-health-us-b0c3hcd34r': { 'US': 'amazon-health-us-b0c3hcd34r', 'UK': 'amazon-health-uk-b0c3hcd34r', 'ES': 'amazon-health-es-b08hmwzbxc' },
  'rower': { 'US': 'amazon-fitness-us-rower', 'UK': 'amazon-fitness-uk-rower', 'ES': 'amazon-fitness-es-rower' },
  'rower-us': { 'US': 'amazon-fitness-us-rower', 'UK': 'amazon-fitness-uk-rower', 'ES': 'amazon-fitness-es-rower' },
  'amazon-fitness-us-rower': { 'US': 'amazon-fitness-us-rower', 'UK': 'amazon-fitness-uk-rower', 'ES': 'amazon-fitness-es-rower' }
};

function resolveRegionalProductId(rawId, targetMarket = 'US', catalog = []) {
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

  const directMatch = catalog.find(p => p.id.toLowerCase() === normalizedRaw);
  if (directMatch && directMatch.market_region.toUpperCase() === market) {
    return directMatch.id;
  }

  if (/-(us|uk|es)$/i.test(normalizedRaw)) {
    const baseId = normalizedRaw.replace(/-(us|uk|es)$/i, '');
    const regionalCandidate = `${baseId}${targetSuffix}`;
    const candidateMatch = catalog.find(p => p.id.toLowerCase() === regionalCandidate);
    if (candidateMatch) return candidateMatch.id;
  }

  if (/-(us|uk|es)-/i.test(normalizedRaw)) {
    const regionalInfixCandidate = normalizedRaw.replace(/-(us|uk|es)-/i, `-${market.toLowerCase()}-`);
    const infixMatch = catalog.find(p => p.id.toLowerCase() === regionalInfixCandidate);
    if (infixMatch) return infixMatch.id;
  }

  const appendedCandidate = `${normalizedRaw}${targetSuffix}`;
  const appendedMatch = catalog.find(p => p.id.toLowerCase() === appendedCandidate);
  if (appendedMatch) return appendedMatch.id;

  return directMatch ? directMatch.id : rawId;
}

async function testResolution() {
  const { data: catalog, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching catalog:', error);
    return;
  }

  console.log(`Fetched ${catalog.length} products from Supabase.`);

  const testIds = [
    'wearable-tracker',
    'wearable-tracker-us',
    'rower',
    'rower-us',
    'sauna',
    'sauna-us',
    'headphones',
    'headphones-us',
    'sleep-analyzer',
    'sleep-analyzer-us',
    'cgm',
    'cgm-us',
    'reagent-strips',
    'reagent-strips-us',
    'segmental-scale',
    'segmental-scale-us',
    'sirtuin-stack',
    'sirtuin-stack-us',
    'stethoscope',
    'stethoscope-us',
    'blood-pressure-cuff',
    'blood-pressure-cuff-us'
  ];

  const markets = ['US', 'UK', 'ES', undefined];

  let passed = 0;
  let failed = 0;

  for (const rawId of testIds) {
    console.log(`\n================ Testing ID: "${rawId}" ================`);
    for (const m of markets) {
      const targetM = m || 'US';
      const resolvedId = resolveRegionalProductId(rawId, m, catalog);
      const matched = catalog.find(p => p.id.toLowerCase() === resolvedId.toLowerCase());
      
      if (!matched) {
        console.error(`❌ FAILED to find product for "${rawId}" in market "${m}" (resolved: "${resolvedId}")`);
        failed++;
        continue;
      }

      const expectedRegion = targetM;
      const actualRegion = matched.market_region.toUpperCase();
      const regionMatch = actualRegion === expectedRegion;
      
      if (!regionMatch) {
        console.error(`❌ REGION MISMATCH for "${rawId}" (target: ${targetM}, resolved: ${matched.id} [${actualRegion}])`);
        failed++;
      } else {
        console.log(`✅ [Market: ${m || 'DEFAULT (US)'}] -> ${matched.id} | Region: ${matched.market_region} | Price: ${matched.price_text} | Badge: ${matched.badge_text} | Deal: ${matched.deal_url}`);
        passed++;
      }
    }
  }

  console.log(`\n========================================`);
  console.log(`Resolution Test Summary: Passed: ${passed}, Failed: ${failed}`);
  if (failed === 0) {
    console.log('🎉 ALL REGIONAL PRODUCT RESOLUTIONS PASSED WITH 100% ACCURACY!');
  }
}

testResolution().catch(console.error);
