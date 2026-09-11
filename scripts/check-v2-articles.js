import fs from 'fs';

const sql = fs.readFileSync('supabase-blogs-schema-and-seed-v2.sql', 'utf8');

const slugs = [
  'performance-biodata-protocols',
  'healthspan-longevity-epigenetic-optimization',
  'metabolic-nutrition-glycemic-mastery',
  'autonomic-engineering-neuro-regulation',
  'womens-health-hormonal-vitality',
  'socio-architecture-bio-networks'
];

console.log('--- Checking V2 SQL Content for 6 Masterclasses ---');
for (const slug of slugs) {
  const index = sql.indexOf(`'${slug}'`);
  if (index !== -1) {
    console.log(`✅ Found slug: ${slug} at character ${index}`);
  } else {
    console.log(`❌ Missing slug: ${slug}`);
  }
}
