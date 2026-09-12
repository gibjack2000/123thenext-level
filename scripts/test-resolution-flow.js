import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Let's test the exact products queried for the socio-architecture blog
const blogSlug = 'socio-architecture-bio-networks';

async function testResolution() {
  const { data: blog } = await supabase.from('blog_posts').select('*').eq('slug', blogSlug).single();
  console.log('Blog title:', blog.title);

  // The blog has product tags:
  // <ProductCard id="sleep-analyzer-us" ... />
  // <ProductCard id="sauna-us" ... />
  // <ProductCard id="headphones-us" ... />

  const productIds = ['sleep-analyzer-us', 'sauna-us', 'headphones-us'];
  const markets = ['US', 'UK', 'ES'];

  // Load all products from DB
  const { data: allProducts } = await supabase.from('products').select('*');
  console.log(`Loaded ${allProducts.length} products from public.products.`);

  const PRODUCT_ALIASES = {
    'sauna': { 'US': 'amazon-health-us-b09pskn6x3', 'UK': 'amazon-health-uk-b09pskn6x3', 'ES': 'amazon-health-es-b09pskn6x3' },
    'sauna-us': { 'US': 'amazon-health-us-b09pskn6x3', 'UK': 'amazon-health-uk-b09pskn6x3', 'ES': 'amazon-health-es-b09pskn6x3' },
    'headphones': { 'US': 'amazon-health-us-b0c3hcd34r', 'UK': 'amazon-health-uk-b0c3hcd34r', 'ES': 'amazon-health-es-b08hmwzbxc' },
    'headphones-us': { 'US': 'amazon-health-us-b0c3hcd34r', 'UK': 'amazon-health-uk-b0c3hcd34r', 'ES': 'amazon-health-es-b08hmwzbxc' },
    'sleep-analyzer': { 'US': 'sleep-analyzer-us', 'UK': 'sleep-analyzer-uk', 'ES': 'sleep-analyzer-es' },
    'sleep-analyzer-us': { 'US': 'sleep-analyzer-us', 'UK': 'sleep-analyzer-uk', 'ES': 'sleep-analyzer-es' },
  };

  function resolveId(rawId, market = 'US') {
    const norm = rawId.trim().toLowerCase();
    if (PRODUCT_ALIASES[norm] && PRODUCT_ALIASES[norm][market]) {
      return PRODUCT_ALIASES[norm][market];
    }
    const baseWithoutSuffix = norm.replace(/-(us|uk|es)$/i, '');
    if (PRODUCT_ALIASES[baseWithoutSuffix] && PRODUCT_ALIASES[baseWithoutSuffix][market]) {
      return PRODUCT_ALIASES[baseWithoutSuffix][market];
    }
    const suffix = `-${market.toLowerCase()}`;
    if (/-(us|uk|es)$/i.test(norm)) {
      return `${baseWithoutSuffix}${suffix}`;
    }
    return `${norm}${suffix}`;
  }

  for (const m of markets) {
    console.log(`\n================= MARKET: ${m} =================`);
    for (const rawId of productIds) {
      const resolved = resolveId(rawId, m);
      const prod = allProducts.find(p => p.id.toLowerCase() === resolved.toLowerCase());
      if (prod) {
        console.log(`[${rawId}] -> [${resolved}] | Region: ${prod.market_region} | Price: ${prod.price_text} | Badge: ${prod.badge_text}`);
        console.log(`  Name: ${prod.name.slice(0, 50)}...`);
        console.log(`  Link: ${prod.deal_url}`);
      } else {
        console.log(`[${rawId}] -> [${resolved}] NOT FOUND!`);
      }
    }
  }
}

testResolution();
