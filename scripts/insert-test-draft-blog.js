import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key is missing from environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertTestDraft() {
  console.log('Connecting to Supabase at:', supabaseUrl);
  
  const testSlug = `test-draft-${Date.now()}`;
  const testTitle = '[TEST ALERT] 5 Daily Habits to Boost VO2 Max & Longevity';
  
  const testRow = {
    title: testTitle,
    category: 'Fitness',
    status: 'draft',
    slug: testSlug,
    excerpt: 'Temporary test draft article to verify automated email alerts to gibjack2000@googlemail.com.',
    content: '<h2>Test Article</h2><p>This is a temporary test blog draft inserted to confirm that Supabase database webhooks and email alert notifications are working properly.</p>',
    author: 'Editorial Team Test',
    tags: ['fitness', 'longevity', 'vo2max'],
    featured: false
  };

  // Try inserting into 'blogs', fallback to 'blog_posts'
  let targetTable = 'blogs';
  let insertResult = await supabase.from('blogs').insert([testRow]).select().single();
  
  if (insertResult.error && insertResult.error.code === 'PGRST205') {
    targetTable = 'blog_posts';
    insertResult = await supabase.from('blog_posts').insert([testRow]).select().single();
  }

  if (insertResult.error) {
    console.error(`❌ Error inserting test draft row into ${targetTable}:`, insertResult.error);
    process.exit(1);
  }

  const data = insertResult.data;
  console.log(`\n✅ Test row inserted successfully into public.${targetTable}!`);
  console.log('====================================================');
  console.log('ID:        ', data.id);
  console.log('Title:     ', data.title);
  console.log('Category:  ', data.category);
  console.log('Status:    ', data.status);
  console.log('Slug:      ', data.slug);
  console.log('Table:     ', targetTable);
  console.log('Created At:', data.created_at);
  console.log('====================================================');
  console.log('\nIf Database Webhook or Trigger is configured on this table, an email notification is sent to:');
  console.log('gibjack2000@googlemail.com\n');
  console.log(`To delete this row after verifying, run: node scripts/delete-test-draft-blog.js ${data.id}`);
}

insertTestDraft();
