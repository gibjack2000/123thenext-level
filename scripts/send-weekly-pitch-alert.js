import 'dotenv/config';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

const TARGET_RECIPIENT = 'jack_2000@yahoo.com';
const SUBJECT = '[123TheNextLevel] 20 Weekly Topic Pitches Ready for Selection';
const PORTAL_URL = 'https://123thenextlevel.com/automation-admin';

const PLAIN_TEXT_BODY = `Your 20 weekly blog topic pitches (5 per category) are ready for review:
 - Healthspan (/blog/category/health)
 - Performance (/blog/category/fitness)
 - Nutrition (/blog/category/nutrition)
 - Wellness (/blog/category/wellness)

 Select your 4 titles here:
 ${PORTAL_URL}`;

const HTML_BODY = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${SUBJECT}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #030712; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); border-bottom: 1px solid #334155;">
              <span style="font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #38bdf8; background-color: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.2); padding: 4px 12px; border-radius: 9999px;">
                Weekly Editorial Pitch Engine
              </span>
              <h1 style="margin: 16px 0 0 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                20 Weekly Topic Pitches Ready
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
                Your 20 weekly blog topic pitches (5 per category) are ready for review:
              </p>

              <!-- Category Pillars -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding: 10px 14px; background-color: #030712; border: 1px solid #1e293b; border-radius: 8px; margin-bottom: 8px;">
                    <span style="color: #38bdf8; font-weight: 700; font-size: 14px;">&bull; Healthspan</span>
                    <a href="https://123thenextlevel.com/blog/category/health" style="color: #64748b; font-size: 12px; text-decoration: none; margin-left: 8px;">(/blog/category/health)</a>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 10px 14px; background-color: #030712; border: 1px solid #1e293b; border-radius: 8px;">
                    <span style="color: #f43f5e; font-weight: 700; font-size: 14px;">&bull; Performance</span>
                    <a href="https://123thenextlevel.com/blog/category/fitness" style="color: #64748b; font-size: 12px; text-decoration: none; margin-left: 8px;">(/blog/category/fitness)</a>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 10px 14px; background-color: #030712; border: 1px solid #1e293b; border-radius: 8px;">
                    <span style="color: #10b981; font-weight: 700; font-size: 14px;">&bull; Nutrition</span>
                    <a href="https://123thenextlevel.com/blog/category/nutrition" style="color: #64748b; font-size: 12px; text-decoration: none; margin-left: 8px;">(/blog/category/nutrition)</a>
                  </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>
                <tr>
                  <td style="padding: 10px 14px; background-color: #030712; border: 1px solid #1e293b; border-radius: 8px;">
                    <span style="color: #a855f7; font-weight: 700; font-size: 14px;">&bull; Wellness</span>
                    <a href="https://123thenextlevel.com/blog/category/wellness" style="color: #64748b; font-size: 12px; text-decoration: none; margin-left: 8px;">(/blog/category/wellness)</a>
                  </td>
                </tr>
              </table>

              <!-- Call to Action Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 10px;">
                <tr>
                  <td align="center">
                    <a href="${PORTAL_URL}" style="display: inline-block; width: 100%; box-sizing: border-box; text-align: center; background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%); color: #ffffff; padding: 16px 24px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 15px; letter-spacing: 0.3px; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);">
                      Select Your 4 Titles Here &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0 0; font-size: 12px; color: #64748b; text-align: center;">
                Direct link: <a href="${PORTAL_URL}" style="color: #38bdf8; text-decoration: none;">${PORTAL_URL}</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #030712; border-top: 1px solid #1e293b; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #475569;">
                123TheNextLevel CMS Automation &bull; Scheduled Editorial Alert sent to ${TARGET_RECIPIENT}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export async function sendWeeklyPitchAlertEmail(targetEmail = TARGET_RECIPIENT) {
  console.log(`[Weekly Pitch Mailer] Preparing alert dispatch to ${targetEmail}...`);

  const smtpUser = process.env.SMTP_USER || process.env.VITE_SMTP_USER || 'jack@123thenextlevel.com';
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD || process.env.VITE_SMTP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpFrom = process.env.SMTP_FROM || `"123TheNextLevel Automation" <${smtpUser}>`;

  // 0. Try MailerLite API if key is present
  if (process.env.MAILERLITE_API_KEY) {
    try {
      console.log(`[Weekly Pitch Mailer] Dispatching via MailerLite API to ${targetEmail}...`);
      const targetGroupId = process.env.MAILERLITE_ADMIN_GROUP_ID || '203052285768500622'; // Admin Alerts (Jack Only)
      
      const createRes = await fetch('https://connect.mailerlite.com/api/campaigns', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `Monday Blog Pitches Alert - ${new Date().toISOString()}`,
          type: 'regular',
          emails: [
            {
              subject: SUBJECT,
              from_name: '123TheNextLevel Automation',
              from: 'jack@123thenextlevel.com',
              content: HTML_BODY
            }
          ],
          groups: [targetGroupId]
        })
      });

      const campaign = await createRes.json();
      if (campaign.data?.id) {
        const cid = campaign.data.id;
        const sendRes = await fetch(`https://connect.mailerlite.com/api/campaigns/${cid}/schedule`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ delivery: 'instant' })
        });
        const sendData = await sendRes.json();
        console.log(`[Weekly Pitch Mailer] ✅ Email successfully dispatched via MailerLite! Campaign ID: ${cid}`);
        return { success: true, provider: 'mailerlite', campaignId: cid };
      } else {
        console.warn('[Weekly Pitch Mailer] MailerLite campaign error:', campaign.message || campaign);
      }
    } catch (mlErr) {
      console.warn(`[Weekly Pitch Mailer] MailerLite dispatch failed: ${mlErr.message}. Trying next provider...`);
    }
  }

  // 1. Try Resend API if key is present
  if (process.env.RESEND_API_KEY) {
    try {
      console.log(`[Weekly Pitch Mailer] Dispatching via Resend API to ${targetEmail}...`);
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: smtpFrom.includes('<') ? smtpFrom : `123TheNextLevel <${smtpUser}>`,
          to: [targetEmail],
          subject: SUBJECT,
          text: PLAIN_TEXT_BODY,
          html: HTML_BODY
        })
      });
      const data = await resendRes.json();
      if (!resendRes.ok) throw new Error(data.message || `HTTP ${resendRes.status}`);
      console.log(`[Weekly Pitch Mailer] ✅ Email dispatched via Resend! ID: ${data.id}`);
      return { success: true, provider: 'resend', id: data.id };
    } catch (err) {
      console.warn(`[Weekly Pitch Mailer] Resend API failed: ${err.message}. Trying SMTP...`);
    }
  }

  // 2. Try SendGrid API if key is present
  if (process.env.SENDGRID_API_KEY) {
    try {
      console.log(`[Weekly Pitch Mailer] Dispatching via SendGrid API to ${targetEmail}...`);
      const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: targetEmail }] }],
          from: { email: smtpUser, name: '123TheNextLevel Automation' },
          subject: SUBJECT,
          content: [
            { type: 'text/plain', value: PLAIN_TEXT_BODY },
            { type: 'text/html', value: HTML_BODY }
          ]
        })
      });
      if (!sgRes.ok) throw new Error(`SendGrid HTTP ${sgRes.status}`);
      console.log(`[Weekly Pitch Mailer] ✅ Email dispatched via SendGrid!`);
      return { success: true, provider: 'sendgrid' };
    } catch (err) {
      console.warn(`[Weekly Pitch Mailer] SendGrid API failed: ${err.message}. Trying SMTP...`);
    }
  }

  // 3. Fallback to Hostinger / Nodemailer SMTP
  if (smtpUser && smtpPass) {
    try {
      console.log(`[Weekly Pitch Mailer] Connecting to SMTP server ${smtpHost}:${smtpPort}...`);
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 8000
      });

      const info = await transporter.sendMail({
        from: smtpFrom,
        to: targetEmail,
        subject: SUBJECT,
        text: PLAIN_TEXT_BODY,
        html: HTML_BODY
      });

      console.log(`[Weekly Pitch Mailer] ✅ Email successfully sent via SMTP! Message ID: ${info.messageId}`);
      return { success: true, provider: 'nodemailer', messageId: info.messageId };
    } catch (smtpErr) {
      console.error(`[Weekly Pitch Mailer] SMTP sending error:`, smtpErr.message);
      // In CI / local dev without credentials, gracefully notify
      return { success: false, error: smtpErr.message };
    }
  } else {
    console.log(`[Weekly Pitch Mailer] Notice: No SMTP credentials configured in environment.`);
    console.log(`[Weekly Pitch Mailer] Simulating email delivery to ${targetEmail}:`);
    console.log(`----------------------------------------------------------------`);
    console.log(`Subject: ${SUBJECT}`);
    console.log(`Body:\n${PLAIN_TEXT_BODY}`);
    console.log(`----------------------------------------------------------------`);
    return { success: true, simulated: true, recipient: targetEmail };
  }
}

// CLI direct run
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  sendWeeklyPitchAlertEmail()
    .then(result => {
      console.log('Result:', result);
      process.exit(0);
    })
    .catch(err => {
      console.error('Fatal dispatch error:', err);
      process.exit(1);
    });
}
