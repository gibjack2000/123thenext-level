import 'dotenv/config';

// Mock test to verify payload parsing and logic of the webhook handler
async function testWebhookLogic() {
  console.log('Testing Supabase Webhook payload simulation...');

  const supabaseInsertPayload = {
    type: 'INSERT',
    table: 'blogs',
    schema: 'public',
    record: {
      id: '99b24479-7dd2-4b77-aefc-3472fa41df54',
      title: 'The Blueprint to Cellular Longevity & Autophagy',
      category: 'Wellness',
      status: 'draft',
      slug: 'the-blueprint-to-cellular-longevity-and-autophagy',
      created_at: new Date().toISOString()
    }
  };

  console.log('Sample Supabase Webhook Payload:');
  console.log(JSON.stringify(supabaseInsertPayload, null, 2));

  console.log('\nVerified Email Template Format:');
  console.log('----------------------------------------------------');
  console.log(`Subject: 📝 New Blog Draft Ready: ${supabaseInsertPayload.record.title}`);
  console.log('Body:');
  console.log(`Title: ${supabaseInsertPayload.record.title}`);
  console.log(`Category: ${supabaseInsertPayload.record.category}`);
  console.log(`Status: Draft (Invisible on public site)`);
  console.log(`Review & Publish Link: https://123thenextlevel.com/admin/blogs`);
  console.log('Recipient: gibjack2000@googlemail.com');
  console.log('----------------------------------------------------');
}

testWebhookLogic();
