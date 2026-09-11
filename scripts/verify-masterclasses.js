import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const slugs = [
  'performance-biodata-protocols',
  'healthspan-longevity-epigenetic-optimization',
  'metabolic-nutrition-glycemic-mastery',
  'autonomic-engineering-neuro-regulation',
  'womens-health-hormonal-vitality',
  'socio-architecture-bio-networks'
];

async function verify() {
  console.log('--- Verifying Live Database Masterclasses ---\n');
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, status, content')
    .in('slug', slugs);

  if (error) {
    console.error('Fetch error:', error);
    return;
  }

  for (const post of data) {
    const wordCount = post.content.trim().split(/\s+/).length;
    const hasAscii = post.content.includes('===') || post.content.includes('+--');
    const hasStore = post.content.includes('https://123thenextlevel.com/store');
    const hasQuiz = post.content.includes('https://123thenextlevel.com/health-quiz');
    console.log(`✅ [${post.slug}]`);
    console.log(`   Title: "${post.title}"`);
    console.log(`   Status: [${post.status}] | Words: ~${wordCount} | ASCII: ${hasAscii} | Store: ${hasStore} | Quiz: ${hasQuiz}\n`);
  }
}

verify();
