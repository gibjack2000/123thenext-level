import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanupTestDrafts() {
  const targetId = process.argv[2];

  for (const table of ['blogs', 'blog_posts']) {
    if (targetId) {
      const { data, error } = await supabase.from(table).delete().eq('id', targetId).select();
      if (!error && data && data.length > 0) {
        console.log(`✅ Deleted test draft ID ${targetId} from public.${table}.`);
        return;
      }
    } else {
      const { data } = await supabase
        .from(table)
        .select('id, title, slug')
        .or('title.ilike.%[TEST ALERT]%,slug.ilike.test-draft-%');

      if (data && data.length > 0) {
        for (const item of data) {
          await supabase.from(table).delete().eq('id', item.id);
          console.log(`🗑️ Deleted from public.${table}: "${item.title}" (ID: ${item.id})`);
        }
      }
    }
  }

  console.log('✅ Cleanup check complete.');
}

cleanupTestDrafts();
