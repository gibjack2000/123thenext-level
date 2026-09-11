import 'dotenv/config';
import { sendQueueEmptyAlertEmail } from '../server/services/mailer.js';

async function runQueueEmptyTest() {
  console.log('Testing "Queue Empty" Email Notification Trigger...');
  console.log('Recipients:', process.env.QUEUE_EMPTY_NOTIFICATION_EMAIL || 'jack@123thenextlevel.com, gibjack2000@googlemail.com');
  console.log('SMTP Host:', process.env.SMTP_HOST);
  console.log('SMTP User:', process.env.SMTP_USER);

  try {
    const result = await sendQueueEmptyAlertEmail();
    console.log('\n✅ "Queue Empty" alert email dispatched successfully!');
    console.log('Result:', result);

  } catch (err) {
    console.error('❌ Failed to dispatch Queue Empty email:', err);
    process.exit(1);
  }
}

runQueueEmptyTest();
