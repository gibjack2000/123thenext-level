import 'dotenv/config';
import { sendQuizResultsEmail } from '../server/services/mailer.js';

console.log('--- SMTP Config Loaded ---');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_FROM:', process.env.SMTP_FROM);
console.log('-------------------------');

if (!process.env.SMTP_USER || process.env.SMTP_USER === 'hello@yourdomain.com') {
  console.log('SMTP user is not configured or is using the default placeholder.');
  console.log('Please update your .env file with your Hostinger email credentials to run a real test.');
  process.exit(0);
}

// Dummy data for testing email
const dummyData = {
  email: process.env.SMTP_USER, // Send it to yourself
  name: 'Test User',
  score: 85,
  dimensions: {
    'Sleep': { icon: '😴', total: 15, max: 18, count: 6, scores: [] },
    'Nutrition': { icon: '🥑', total: 11, max: 15, count: 5, scores: [] },
    'Fitness': { icon: '🏃', total: 14, max: 18, count: 6, scores: [] }
  },
  text: `YOUR SIX PILLARS\n  • Sleep: 15/18 (83%)\n  • Nutrition: 11/15 (73%)\n  • Fitness: 14/18 (78%)\n\n================================\nACTION NOW — DO THESE THIS WEEK\n================================\n\n1. Establish a wind-down routine.\n   Turn off screens 60 minutes before bed.\n   Timeline: 7 days\n`
};

console.log('Sending test email to', dummyData.email, '...');
sendQuizResultsEmail(dummyData)
  .then((info) => {
    console.log('Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
  })
  .catch((err) => {
    console.error('Error sending test email:', err);
  });
