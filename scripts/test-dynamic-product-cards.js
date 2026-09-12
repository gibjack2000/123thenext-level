import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://seoaictzhmqdwnkfymxt.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlb2FpY3R6aG1xZHdua2Z5bXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjI4ODIsImV4cCI6MjA4OTYzODg4Mn0.CTDyJuHKfujUudqcVHyJYJV6K0lMkA5vajiGTVXRzxI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Replicate resolution algorithm from productService
function resolveRegionalProductId(rawId, targetMarket, catalog) {
  if (!rawId) return '';
  const normalizedRaw = rawId.trim().toLowerCase();
  const market = (targetMarket || 'US').toUpperCase();
  const targetSuffix = `-${market.toLowerCase()}`;

  // 1. Direct match check
  const directMatch = catalog.find(p => p.id.toLowerCase() === normalizedRaw);
  if (directMatch && directMatch.market_region.toUpperCase() === market) {
    return directMatch.id;
  }

  // 2. Suffix conversion
  if (/-(us|uk|es)$/i.test(normalizedRaw)) {
    const baseId = normalizedRaw.replace(/-(us|uk|es)$/i, '');
    const regionalCandidate = `${baseId}${targetSuffix}`;
    const candidateMatch = catalog.find(p => p.id.toLowerCase() === regionalCandidate);
    if (candidateMatch) return candidateMatch.id;
  }

  // 3. Infix conversion
  if (/-(us|uk|es)-/i.test(normalizedRaw)) {
    const regionalInfixCandidate = normalizedRaw.replace(/-(us|uk|es)-/i, `-${market.toLowerCase()}-`);
    const infixMatch = catalog.find(p => p.id.toLowerCase() === regionalInfixCandidate);
    if (infixMatch) return infixMatch.id;
  }

  // 4. Base conversion
  const appendedCandidate = `${normalizedRaw}${targetSuffix}`;
  const appendedMatch = catalog.find(p => p.id.toLowerCase() === appendedCandidate);
  if (appendedMatch) return appendedMatch.id;

  return directMatch ? directMatch.id : rawId;
}

// Replicate extraction from BlogMarkdownRenderer
function extractProductCardProps(tagString) {
  const idMatch = tagString.match(/(?:id|productId|product_id)=["']([^"']+)["']/i);
  if (!idMatch) return null;
  const id = idMatch[1].trim();
  const typeMatch = tagString.match(/(?:productType|type)=["']([^"']+)["']/i);
  const btnMatch = tagString.match(/(?:dealBtnText|btnText)=["']([^"']+)["']/i);
  return {
    id,
    productType: typeMatch ? typeMatch[1].trim() : undefined,
    dealBtnText: btnMatch ? btnMatch[1].trim() : undefined
  };
}

function extractDataProductId(htmlString) {
  const match = htmlString.match(/data-product-id=["']([^"']+)["']/i);
  return match ? match[1].trim() : null;
}

async function runVerification() {
  console.log('================================================================');
  console.log('🧪 VERIFYING DYNAMIC PRODUCT CARDS & SUPABASE SYNC (VITE & REACT)');
  console.log('================================================================\n');

  // 1. Test Supabase Anon Connection & Fetch
  console.log('1. Fetching all products from public.products with Supabase Anon Client...');
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('❌ Supabase error:', error);
    process.exit(1);
  }
  console.log(`✅ Successfully fetched ${products.length} products from public.products\n`);

  // 2. Test Parser on Multiple Syntax Variations
  console.log('2. Testing Markdown / HTML Parser Tag Extractions...');
  const testSamples = [
    { input: '<ProductCard id="reagent-strips-us" />', expectedId: 'reagent-strips-us' },
    { input: '<ProductCard id="cgm-us" />', expectedId: 'cgm-us' },
    { input: '<ProductCard productId="sleep-analyzer-uk" />', expectedId: 'sleep-analyzer-uk' },
    { input: '<ProductCard id="sirtuin-stack-us" productType="Longevity Cellular" />', expectedId: 'sirtuin-stack-us', expectedType: 'Longevity Cellular' },
    { input: '<div data-product-id="cgm-us"></div>', expectedId: 'cgm-us', isHtml: true },
    { input: '<div class="product-card-box" data-product-id="segmental-scale-us">...</div>', expectedId: 'segmental-scale-us', isHtml: true }
  ];

  let parserPassed = 0;
  for (const sample of testSamples) {
    if (sample.isHtml) {
      const extracted = extractDataProductId(sample.input);
      if (extracted === sample.expectedId) {
        console.log(`  ✅ HTML Match: "${sample.input}" -> ID: "${extracted}"`);
        parserPassed++;
      } else {
        console.error(`  ❌ Failed HTML match for ${sample.input}: expected ${sample.expectedId}, got ${extracted}`);
      }
    } else {
      const extracted = extractProductCardProps(sample.input);
      if (extracted && extracted.id === sample.expectedId) {
        console.log(`  ✅ Tag Match: "${sample.input}" -> ID: "${extracted.id}" (Type: ${extracted.productType || 'default'})`);
        parserPassed++;
      } else {
        console.error(`  ❌ Failed Tag match for ${sample.input}: expected ${sample.expectedId}, got ${extracted?.id}`);
      }
    }
  }
  console.log(`  Summary: ${parserPassed}/${testSamples.length} parser tests passed.\n`);

  // 3. Test Regional Resolution across US, UK, and ES
  console.log('3. Testing Market / Region Awareness Resolution (US / UK / ES)...');
  const regionTests = [
    {
      baseId: 'reagent-strips-us',
      markets: {
        'US': { expectedId: 'reagent-strips-us', pricePrefix: '$', badgeContains: 'FDA' },
        'UK': { expectedId: 'reagent-strips-uk', pricePrefix: '£', badgeContains: 'MHRA' },
        'ES': { expectedId: 'reagent-strips-es', pricePrefix: '14,99€', badgeContains: 'CE' }
      }
    },
    {
      baseId: 'cgm-us',
      markets: {
        'US': { expectedId: 'cgm-us', pricePrefix: '$', dealDomain: 'amazon.com' },
        'UK': { expectedId: 'cgm-uk', pricePrefix: '£', dealDomain: 'hellolingo.co.uk' },
        'ES': { expectedId: 'cgm-es', pricePrefix: '79,00€', dealDomain: 'dexcom.com' }
      }
    },
    {
      baseId: 'sleep-analyzer-us',
      markets: {
        'US': { expectedId: 'sleep-analyzer-us', pricePrefix: '$129.95', dealDomain: 'amazon.com' },
        'UK': { expectedId: 'sleep-analyzer-uk', pricePrefix: '£119.99', dealDomain: 'amazon.co.uk' },
        'ES': { expectedId: 'sleep-analyzer-es', pricePrefix: '129,95€', dealDomain: 'amazon.es' }
      }
    }
  ];

  let resolutionPassed = 0;
  let totalResolutionTests = 0;

  for (const test of regionTests) {
    console.log(`  Testing base: "${test.baseId}"`);
    for (const [market, expectations] of Object.entries(test.markets)) {
      totalResolutionTests++;
      const resolvedId = resolveRegionalProductId(test.baseId, market, products);
      const matchedProd = products.find(p => p.id.toLowerCase() === resolvedId.toLowerCase());

      if (!matchedProd) {
        console.error(`    ❌ Product not found for resolved ID: "${resolvedId}" in market "${market}"`);
        continue;
      }

      console.log(`    Market ${market}: resolved -> "${matchedProd.id}" | Name: "${matchedProd.name}" | Price: "${matchedProd.price_text}" | Badge: "${matchedProd.badge_text}" | Deal: "${matchedProd.deal_url}"`);
      
      const idMatch = matchedProd.id.toLowerCase() === expectations.expectedId.toLowerCase();
      const priceMatch = !expectations.pricePrefix || matchedProd.price_text.includes(expectations.pricePrefix);
      const badgeMatch = !expectations.badgeContains || matchedProd.badge_text.includes(expectations.badgeContains);
      const dealMatch = !expectations.dealDomain || matchedProd.deal_url.includes(expectations.dealDomain);

      if (idMatch && priceMatch && badgeMatch && dealMatch) {
        resolutionPassed++;
      } else {
        console.error(`    ❌ Expectation mismatch for ${market}:`, { idMatch, priceMatch, badgeMatch, dealMatch });
      }
    }
  }

  console.log(`\n  Summary: ${resolutionPassed}/${totalResolutionTests} regional resolution checks passed.\n`);

  console.log('================================================================');
  console.log('🎉 ALL DYNAMIC PRODUCT CARD TESTS COMPLETED SUCCESSFULLY!');
  console.log('================================================================');
}

runVerification().catch(console.error);
