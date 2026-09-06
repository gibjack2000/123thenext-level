import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function generateLocalCatalogCode() {
  const { data: allProducts, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error:', error);
    return;
  }

  const ukProducts = allProducts.filter(p => p.market_region === 'UK');
  const usProducts = allProducts.filter(p => p.market_region === 'US');
  const esProducts = allProducts.filter(p => p.market_region === 'ES');

  console.log(`UK Products: ${ukProducts.length}`);
  console.log(`US Products: ${usProducts.length}`);
  console.log(`ES Products: ${esProducts.length}`);

  const code = `// Dedicated Market-Specific Fallback Registries
export const REGIONAL_FALLBACK_CATALOGS: Record<MarketTab, any[]> = {
  UK: ${JSON.stringify(ukProducts, null, 2)},
  US: ${JSON.stringify(usProducts, null, 2)},
  ES: ${JSON.stringify(esProducts, null, 2)}
};
`;

  fs.writeFileSync('scripts/generated-regional-catalogs.json', JSON.stringify({
    UK: ukProducts,
    US: usProducts,
    ES: esProducts
  }, null, 2));

  console.log('Saved to scripts/generated-regional-catalogs.json');
}

generateLocalCatalogCode();
