import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function healContent(rawContent) {
  if (!rawContent) return rawContent;
  let content = rawContent;

  // 1. Heal Nutrisense CGM (US) -> Abbott Lingo Continuous Glucose Biosensor System (CGM 14-Day)
  content = content.replace(
    /https?:\/\/(?:www\.)?amazon\.com\/dp\/B07P88H4NL(?:\?[^"'\s<>]*)?/gi,
    '/store-us'
  );
  content = content.replace(
    /Nutrisense Continuous Glucose Biosensor System(?:\s*\(CGM\s*14-Day\))?/gi,
    'Abbott Lingo Continuous Glucose Biosensor System (CGM 14-Day)'
  );
  content = content.replace(/NUTRI-CGM-14/g, 'LINGO-CGM-US');
  content = content.replace(/\$175\.00/g, '$149.00');

  // 2. Heal FreeStyle Libre 2 (UK) -> Abbott Lingo Continuous Glucose Biosensor (UK 🇬🇧)
  content = content.replace(
    /https?:\/\/(?:www\.)?amazon\.co\.uk\/dp\/B07P88H4NL(?:\?[^"'\s<>]*)?/gi,
    '/store-uk'
  );
  content = content.replace(
    /FreeStyle Libre 2 Continuous Glucose Monitoring Sensor/gi,
    'Abbott Lingo Continuous Glucose Biosensor (UK 🇬🇧)'
  );
  content = content.replace(/LIBRE2-UK/g, 'LINGO-CGM-UK');
  content = content.replace(/£52\.50/g, '£59.00');

  // 3. Heal Tanita BC-730 (ES) -> Withings Body Scan Báscula de Composición Segmental
  content = content.replace(
    /https?:\/\/(?:www\.)?amazon\.es\/dp\/B008DWX1MG(?:\?[^"'\s<>]*)?/gi,
    '/store-es'
  );
  content = content.replace(
    /Tanita BC-730 B[aá]scula de Composici[oó]n Corporal Segmental/gi,
    'Withings Body Scan Báscula de Composición Segmental'
  );
  content = content.replace(/B008DWX1MG/g, 'B0GXWY29G7');
  content = content.replace(/€49\.90/g, '€399.95');

  // 4. Heal dummy Amazon links for health panels
  content = content.replace(
    /https?:\/\/(?:www\.)?amazon\.com\/dp\/B00068U48C(?:\?[^"'\s<>]*)?/gi,
    '/store-us'
  );
  content = content.replace(/QUEST-APOB-778/g, 'HEALTHLABS-US-99');

  content = content.replace(
    /https?:\/\/(?:www\.)?amazon\.co\.uk\/dp\/B08N5N68K6(?:\?[^"'\s<>]*)?/gi,
    'https://referrals.lolahealth.com/NextLevel15'
  );
  content = content.replace(/LOLA-CV-902/g, 'LOLA-CORE-45');

  content = content.replace(
    /https?:\/\/(?:www\.)?amazon\.es\/dp\/B07R4C9R69(?:\?[^"'\s<>]*)?/gi,
    '/store-es'
  );

  // 5. Heal /es link
  content = content.replace(/href=["']\/es["']/gi, 'href="/store-es"');
  content = content.replace(/\]\(\/es\/?\)/gi, '](/store-es)');

  return content;
}

async function healAllPosts() {
  console.log('Scanning all blog posts in Supabase...');

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, content');

  if (error) {
    console.error('Error fetching blog posts:', error);
    process.exit(1);
  }

  console.log(`Auditing ${posts.length} blog posts...`);
  let healedCount = 0;

  for (const post of posts) {
    const original = post.content || '';
    const healed = healContent(original);

    if (original !== healed) {
      console.log(`Healing post: "${post.title}" (${post.slug})`);
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update({ content: healed })
        .eq('id', post.id);

      if (updateError) {
        console.error(`Failed to update ${post.slug}:`, updateError);
      } else {
        healedCount++;
        console.log(`✓ Healed: ${post.slug}`);
      }
    }
  }

  console.log(`Scan complete! Healed ${healedCount} posts.`);
}

healAllPosts();
