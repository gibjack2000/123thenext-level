import 'dotenv/config';
import { sendBlogDraftAlertEmail } from '../server/services/mailer.js';

async function runTest() {
  console.log('Testing Blog Draft Email Alert Notification...');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP User:', process.env.SMTP_USER);
  console.log('Admin Notification Emails:', process.env.ADMIN_NOTIFICATION_EMAIL);

  const testPayload = {
    title: 'Longevity Protocol: Zone 2 Cardio & Mitochondrial Density',
    category: 'Fitness',
    status: 'Draft',
    slug: 'longevity-protocol-zone-2-cardio',
    id: 'test-draft-uuid-001'
  };

  try {
    const result = await sendBlogDraftAlertEmail(testPayload);

    console.log('✅ Test email sent successfully! Result:', result);
  } catch (error) {
    console.error('❌ Failed to send test email:', error);
    process.exit(1);
  }
}

runTest();
