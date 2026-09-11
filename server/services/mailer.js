import nodemailer from 'nodemailer';

// Helper to determine score tier
function getScoreTier(score) {
  if (score >= 75) {
    return { name: 'THRIVING', color: '#059669' };
  } else if (score >= 50) {
    return { name: 'BUILDING MOMENTUM', color: '#d97706' };
  } else {
    return { name: 'PRIORITY FOCUS', color: '#dc2626' };
  }
}

// Convert plain text plan to styled HTML
function formatPlanTextToHtml(text) {
  let html = text;
  // Remove "YOUR SIX PILLARS" section from the text since we render it separately as HTML progress bars
  const pillarsIndex = html.indexOf('ACTION NOW');
  if (pillarsIndex !== -1) {
    html = html.substring(pillarsIndex);
  }

  // Remove lines of equal signs (separators)
  html = html.replace(/={10,}/g, '');

  const lines = html.split('\n');
  const formattedLines = lines.map(line => {
    let trimmed = line.trim();
    if (!trimmed) return '';

    // If it starts with "Link:", style as a premium button
    if (trimmed.startsWith('Link:')) {
      const url = trimmed.substring(5).trim();
      return `
        <p style="margin-top: 6px; margin-bottom: 14px; font-family: sans-serif;">
          <a href="${url}" target="_blank" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 6px 14px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: bold; font-family: sans-serif;">
            View Product ➜
          </a>
        </p>
      `;
    }

    // Convert any URLs in the text into clickable links
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    trimmed = trimmed.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" style="color: #059669; text-decoration: underline; font-weight: bold;">${url}</a>`;
    });

    // Main section headers
    if (
      trimmed === 'ACTION NOW — DO THESE THIS WEEK' ||
      trimmed === 'BUILD YOUR DATA FOUNDATION' ||
      trimmed === 'MINDFULNESS & MEDITATION PRACTICE' ||
      trimmed === 'YOUR PERSONALIZED PRIORITY ACTIONS' ||
      trimmed === 'QUICK WINS — START THIS WEEK' ||
      trimmed === 'CURATED VITAMINS & SUPPLEMENTS' ||
      trimmed === 'CURATED HOME GYM ESSENTIALS' ||
      trimmed === 'CURATED RELAXATION & RECOVERY AIDS'
    ) {
      return `
        <h3 style="color: #064e3b; margin-top: 28px; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; font-size: 18px; font-family: sans-serif; font-weight: bold; letter-spacing: -0.01em;">
          ${trimmed}
        </h3>
      `;
    }

    // Recommendations list items or numbered items
    if (/^\d+\./.test(trimmed)) {
      return `
        <p style="margin-top: 16px; margin-bottom: 6px; font-weight: bold; color: #0f172a; font-family: sans-serif; font-size: 15px;">
          ${trimmed}
        </p>
      `;
    }

    // Bullet points / items (like supplements, gym products)
    if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      const content = trimmed.substring(1).trim();
      return `
        <li style="margin-left: 12px; margin-bottom: 8px; color: #334155; font-family: sans-serif; font-size: 14px; line-height: 1.5;">
          ${content}
        </li>
      `;
    }

    // Tag / timeline notes (e.g. Action timelines, priorities)
    if (trimmed.startsWith('Timeline:') || trimmed.startsWith('Action:') || trimmed.startsWith('Best for:')) {
      return `
        <p style="margin-top: 4px; margin-bottom: 12px; font-size: 12px; font-weight: bold; color: #b91c1c; font-family: sans-serif; background-color: #fef2f2; padding: 4px 8px; border-radius: 6px; display: inline-block; border: 1px solid #fee2e2;">
          ${trimmed}
        </p>
      `;
    }

    // Curated subheaders [Category Name]
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      const category = trimmed.slice(1, -1);
      return `
        <h4 style="color: #059669; margin-top: 20px; margin-bottom: 8px; font-size: 14px; font-family: sans-serif; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
          ${category}
        </h4>
      `;
    }

    // Standard paragraph text
    return `
      <p style="margin-top: 4px; margin-bottom: 6px; color: #475569; font-family: sans-serif; font-size: 14px; line-height: 1.55;">
        ${trimmed}
      </p>
    `;
  });

  return formattedLines.join('\n');
}

/**
 * Creates transporter dynamically using current environment variables
 */
function createTransporter() {
  const host = (process.env.SMTP_HOST || 'smtp.hostinger.com').replace(/"/g, '').trim();
  const portVal = (process.env.SMTP_PORT || '465').replace(/"/g, '').trim();
  const port = parseInt(portVal, 10);
  const secure = (process.env.SMTP_SECURE || '').replace(/"/g, '').trim() === 'true' || port === 465;
  const user = (process.env.SMTP_USER || '').replace(/"/g, '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/"/g, '').trim();

  if (!user || !pass) {
    console.warn('WARNING: SMTP credentials are not defined in process.env. SMTP_USER and SMTP_PASS are required.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    },
    // Useful for some shared hosting environments
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Helper to ensure From display name is properly wrapped in double quotes (RFC 5322)
 */
function formatFromAddress(fromStr) {
  if (!fromStr) return fromStr;
  const match = fromStr.match(/^(.*?)\s*<(.*?)>$/);
  if (match) {
    let name = match[1].trim();
    const email = match[2].trim();
    // Strip existing outer quotes
    if (name.startsWith('"') && name.endsWith('"')) {
      name = name.slice(1, -1).trim();
    } else if (name.startsWith("'") && name.endsWith("'")) {
      name = name.slice(1, -1).trim();
    }
    return `"${name}" <${email}>`;
  }
  return fromStr;
}

/**
 * Sends the Health Baseline Plan email to a user
 */
export async function sendQuizResultsEmail({ email, name, score, dimensions, text }) {
  const rawFrom = (process.env.SMTP_FROM || `"The Next Level" <${process.env.SMTP_USER}>`).replace(/"/g, '').trim();
  const smtpFrom = formatFromAddress(rawFrom);
  const smtpUser = (process.env.SMTP_USER || '').replace(/"/g, '').trim();
  const tier = getScoreTier(score);

  if (!smtpUser) {
    throw new Error('SMTP_USER environment variable is not defined. Cannot send email.');
  }

  // Construct HTML email
  let dimensionsHtml = '';
  if (dimensions && typeof dimensions === 'object') {
    dimensionsHtml += `
      <div style="background-color: #ffffff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <h3 style="margin-top: 0; margin-bottom: 16px; font-size: 16px; font-weight: bold; color: #0f172a; font-family: sans-serif; text-transform: uppercase; letter-spacing: 0.05em;">Your Six Pillars Breakdown</h3>
    `;

    for (const [pillarName, data] of Object.entries(dimensions)) {
      const pct = Math.round((data.total / data.max) * 100);
      let barColor = '#059669'; // Thriving (Green)
      if (pct < 50) {
        barColor = '#dc2626'; // Focus (Red)
      } else if (pct < 75) {
        barColor = '#d97706'; // Building (Orange)
      }

      dimensionsHtml += `
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px; font-family: sans-serif;">
          <tr>
            <td align="left" style="font-size: 14px; font-weight: bold; color: #1e293b; padding-bottom: 6px;">
              <span style="margin-right: 4px;">${data.icon || '•'}</span> ${pillarName}
            </td>
            <td align="right" style="font-size: 14px; font-weight: bold; color: #475569; padding-bottom: 6px;">
              ${data.total}/${data.max} (${pct}%)
            </td>
          </tr>
          <tr>
            <td colspan="2" style="background-color: #f1f5f9; border-radius: 4px; height: 8px; line-height: 8px; font-size: 0px;">
              <table cellpadding="0" cellspacing="0" border="0" width="${pct}%" height="8" style="background-color: ${barColor}; border-radius: 4px;">
                <tr><td></td></tr>
              </table>
            </td>
          </tr>
        </table>
      `;
    }
    dimensionsHtml += `</div>`;
  }

  const detailedPlanHtml = formatPlanTextToHtml(text);

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Health Baseline Plan</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f8fafc" style="padding: 20px 0;">
        <tr>
          <td align="center">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <tr>
                <td bgcolor="#0f172a" align="center" style="padding: 30px 20px;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">
                    THE NEXT LEVEL
                  </h1>
                  <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase;">
                    Your Health Baseline Report
                  </p>
                </td>
              </tr>
              
              <!-- Content Body -->
              <tr>
                <td style="padding: 32px 24px;">
                  <p style="margin-top: 0; margin-bottom: 20px; font-size: 16px; color: #334155; line-height: 1.5; font-family: sans-serif;">
                    Hi ${name || 'there'},
                  </p>
                  <p style="margin-top: 0; margin-bottom: 24px; font-size: 15px; color: #475569; line-height: 1.6; font-family: sans-serif;">
                    Here is your complete, personalized Health Baseline Plan. We've assessed your habits across sleep, nutrition, recovery, and daily movement. Start with the prioritized actions below to compound your energy and health gains.
                  </p>
                  
                  <!-- Score Circle Banner -->
                  <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; text-align: center; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                    <h2 style="margin: 0; font-size: 14px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-family: sans-serif;">
                      Overall Health Baseline
                    </h2>
                    <div style="display: inline-block; margin: 16px 0; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; border-radius: 50%; width: 110px; height: 110px; line-height: 110px; font-size: 32px; font-weight: bold; font-family: sans-serif;">
                      ${score}<span style="font-size: 14px; font-weight: normal; opacity: 0.85;">/100</span>
                    </div>
                    <p style="margin: 0; font-weight: 800; font-size: 16px; color: ${tier.color}; text-transform: uppercase; letter-spacing: 0.05em; font-family: sans-serif;">
                      ${tier.name}
                    </p>
                  </div>
                  
                  <!-- Dimensions Breakdown -->
                  ${dimensionsHtml}
                  
                  <!-- Plan details formatted -->
                  <div style="color: #334155; font-family: sans-serif;">
                    ${detailedPlanHtml}
                  </div>
                  
                  <!-- Closing -->
                  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0 20px 0;" />
                  <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5; font-family: sans-serif;">
                    To your health,<br/>
                    <strong>The Next Level Team</strong><br/>
                    <a href="https://123thenextlevel.com" style="color: #059669; text-decoration: none;">123thenextlevel.com</a>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td bgcolor="#f1f5f9" style="padding: 24px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b; line-height: 1.5; font-family: sans-serif;">
                    This report is for educational and self-reflection purposes only. It is not medical advice. Always consult a qualified healthcare professional before making health or dietary changes.
                  </p>
                  <p style="margin: 0; font-size: 11px; color: #94a3b8; font-family: sans-serif;">
                    You received this because you opted in after completing the Health Quiz. <br/>
                    Unsubscribe instantly from weekly updates by replying "Unsubscribe".
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

  // Define email options
  const mailOptions = {
    from: smtpFrom,
    to: email,
    subject: `The Next Level — Your Health Baseline Plan (Score: ${score}/100)`,
    text: text, // Plain text fallback
    html: htmlBody
  };

  // CC the sender (the site owner) so they receive a copy of all reports/leads
  if (smtpUser && smtpUser.includes('@')) {
    mailOptions.cc = smtpUser;
  }

  // Create transporter and send
  const transporter = createTransporter();
  console.log(`Attempting to send email from ${smtpFrom} to ${email}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log(`Email sent successfully! MessageID: ${info.messageId}`);
  return info;
}

/**
 * Sends a welcome email to a new newsletter subscriber
 */
export async function sendNewsletterWelcomeEmail({ email, preferences }) {
  const rawFrom = (process.env.SMTP_FROM || `"The Next Level" <${process.env.SMTP_USER}>`).replace(/"/g, '').trim();
  const smtpFrom = formatFromAddress(rawFrom);
  const smtpUser = (process.env.SMTP_USER || '').replace(/"/g, '').trim();

  if (!smtpUser) {
    throw new Error('SMTP_USER environment variable is not defined. Cannot send email.');
  }

  const prefsText = (preferences && preferences.length > 0)
    ? preferences.join(', ')
    : 'All topics';

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to The Next Level Newsletter</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f8fafc" style="padding: 20px 0;">
        <tr>
          <td align="center">
            <table cellpadding="0" cellspacing="0" border="0" width="600" bgcolor="#ffffff" style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03); border: 1px solid #e2e8f0;">
              
              <!-- Header -->
              <tr>
                <td align="center" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px 24px; color: #ffffff;">
                  <h1 style="margin: 0; font-size: 26px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; font-family: sans-serif;">
                    123TheNext Level
                  </h1>
                  <p style="margin: 8px 0 0 0; font-size: 14px; color: #94a3b8; font-family: sans-serif; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">
                    Welcome to the Blueprint
                  </p>
                </td>
              </tr>
              
              <!-- Body -->
              <tr>
                <td style="padding: 40px 32px;">
                  <p style="margin-top: 0; margin-bottom: 20px; font-size: 16px; color: #334155; line-height: 1.5; font-family: sans-serif;">
                    Hi there,
                  </p>
                  <p style="margin-top: 0; margin-bottom: 24px; font-size: 15px; color: #475569; line-height: 1.6; font-family: sans-serif;">
                    Thank you for subscribing to our weekly newsletter! You are officially on the pathway to optimization and high-performance health.
                  </p>

                  <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
                    <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 14px; font-weight: bold; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; font-family: sans-serif;">
                      Your Preferences
                    </h3>
                    <p style="margin: 0; font-size: 15px; color: #1e293b; font-weight: bold; font-family: sans-serif;">
                      ${prefsText}
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b; font-family: sans-serif; line-height: 1.4;">
                      We'll make sure you only receive Bento Box-style weekly summaries and updates focused precisely on these areas.
                    </p>
                  </div>
                  
                  <p style="margin-top: 0; margin-bottom: 24px; font-size: 15px; color: #475569; line-height: 1.6; font-family: sans-serif;">
                    Every week, we compile a curated summary containing exactly <strong>one deep-dive post</strong>, <strong>one action item</strong>, and <strong>one piece of curated gear</strong> from each of your selected areas to help you compound your longevity, fitness, and wellness gains.
                  </p>
                  
                  <!-- Closing -->
                  <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 32px 0 20px 0;" />
                  <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5; font-family: sans-serif;">
                    To your health,<br/>
                    <strong>The Next Level Team</strong><br/>
                    <a href="https://123thenextlevel.com" style="color: #3b82f6; text-decoration: none;">123thenextlevel.com</a>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td bgcolor="#f1f5f9" style="padding: 24px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b; line-height: 1.5; font-family: sans-serif;">
                    This email was sent to ${email} because you subscribed to 123TheNextLevel updates.
                  </p>
                  <p style="margin: 0; font-size: 11px; color: #94a3b8; font-family: sans-serif;">
                    Unsubscribe at any time by replying "Unsubscribe" or updating your preferences in the sidebar.
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

  const mailOptions = {
    from: smtpFrom,
    to: email,
    subject: `Welcome to The Next Level Newsletter!`,
    text: `Hi there! Thank you for subscribing to 123TheNextLevel updates. Your topic preferences: ${prefsText}.`,
    html: htmlBody
  };

  if (smtpUser && smtpUser.includes('@')) {
    mailOptions.cc = smtpUser;
  }

  const transporter = createTransporter();
  console.log(`Sending welcome email to ${email}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log(`Welcome email sent! MessageID: ${info.messageId}`);
  return info;
}

const DEFAULT_NOTIFICATION_RECIPIENTS = [
  'jack@123thenextlevel.com',
  'gibjack2000@googlemail.com'
];

function resolveRecipients(customRecipient, envVar) {
  if (customRecipient) {
    return Array.isArray(customRecipient)
      ? customRecipient
      : customRecipient.split(',').map(e => e.trim()).filter(Boolean);
  }
  const envVal = envVar || process.env.ADMIN_NOTIFICATION_EMAILS || process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL;
  if (envVal) {
    return envVal.split(',').map(e => e.trim()).filter(Boolean);
  }
  return DEFAULT_NOTIFICATION_RECIPIENTS;
}

/**
 * Sends an automated notification email to the admin when a new blog draft is created in public.blogs
 * Trigger: When a new row is inserted into public.blogs with status = 'draft'
 * Recipients: jack@123thenextlevel.com AND gibjack2000@googlemail.com
 */
export async function sendBlogDraftAlertEmail({
  title,
  category,
  status = 'Draft',
  slug,
  id,
  recipientEmail
}) {
  const recipients = resolveRecipients(recipientEmail, process.env.ADMIN_NOTIFICATION_EMAIL);
  const targetEmailStr = recipients.join(', ');

  const articleTitle = title || 'Untitled Draft Article';
  const articleCategory = category || 'General';
  const articleStatus = status || 'Draft';
  const baseUrl = (process.env.VITE_APP_URL || process.env.APP_URL || 'https://123thenextlevel.com').replace(/\/$/, '');
  const adminReviewUrl = `${baseUrl}/admin/blogs`;

  const subject = `📝 New Blog Draft Ready: ${articleTitle}`;

  const plainTextBody = `Title: ${articleTitle}\nCategory: ${articleCategory}\nStatus: ${articleStatus} (Invisible on public site)\nReview & Publish Link: ${adminReviewUrl}`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Blog Draft Ready</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#0f172a" style="padding: 32px 16px;">
        <tr>
          <td align="center">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 580px; background-color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
              
              <!-- Header Bar -->
              <tr>
                <td bgcolor="#0b1120" style="padding: 24px 28px; border-bottom: 1px solid #334155;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td>
                        <span style="display: inline-block; background-color: #059669; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 6px;">
                          Editorial CMS Alert
                        </span>
                        <h1 style="margin: 10px 0 0 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: -0.02em;">
                          📝 New Blog Draft Ready
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Main Content Body -->
              <tr>
                <td style="padding: 28px;">
                  <p style="margin: 0 0 20px 0; font-size: 15px; color: #cbd5e1; line-height: 1.6;">
                    A new article draft has been staged in the database and is ready for your editorial review and approval before going live on the public site.
                  </p>
                  
                  <!-- Metadata Box -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0f172a; border-radius: 12px; border: 1px solid #334155; margin-bottom: 26px;">
                    <tr>
                      <td style="padding: 20px;">
                        <table cellpadding="0" cellspacing="0" border="0" width="100%">
                          <tr>
                            <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 600; width: 90px; vertical-align: top;">
                              Title:
                            </td>
                            <td style="padding: 6px 0; font-size: 15px; color: #f8fafc; font-weight: 700;">
                              ${articleTitle}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 600; vertical-align: top;">
                              Category:
                            </td>
                            <td style="padding: 6px 0; font-size: 14px; color: #38bdf8; font-weight: 600;">
                              ${articleCategory}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 6px 0; font-size: 13px; color: #94a3b8; font-weight: 600; vertical-align: top;">
                              Status:
                            </td>
                            <td style="padding: 6px 0; font-size: 13px; color: #fbbf24; font-weight: 600;">
                              <span style="background-color: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.3); padding: 2px 8px; border-radius: 4px; display: inline-block;">
                                Draft (Invisible on public site)
                              </span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- CTA Button -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
                    <tr>
                      <td align="center">
                        <a href="${adminReviewUrl}" target="_blank" style="display: block; width: 100%; box-sizing: border-box; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; text-align: center; padding: 14px 24px; border-radius: 10px; font-weight: bold; font-size: 15px; text-decoration: none; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.4);">
                          Review &amp; Publish Link ➜
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
                    Direct Link: <a href="${adminReviewUrl}" style="color: #38bdf8; text-decoration: underline;">${adminReviewUrl}</a>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td bgcolor="#0b1120" style="padding: 16px 28px; border-top: 1px solid #334155; text-align: center;">
                  <p style="margin: 0; font-size: 11px; color: #64748b;">
                    123TheNextLevel CMS Automation &bull; Automated draft alert sent to ${targetEmailStr}
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

  const rawFrom = (process.env.SMTP_FROM || `"The Next Level" <${process.env.SMTP_USER || 'jack@123thenextlevel.com'}>`).replace(/"/g, '').trim();
  const smtpFrom = formatFromAddress(rawFrom) || `"The Next Level" <jack@123thenextlevel.com>`;

  // 1. Check if Resend API key is provided
  if (process.env.RESEND_API_KEY) {
    try {
      console.log(`[Blog Draft Mailer] Dispatching alert via Resend API to ${targetEmailStr}...`);
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: smtpFrom.includes('<') ? smtpFrom : `The Next Level <${process.env.SMTP_USER || 'jack@123thenextlevel.com'}>`,
          to: recipients,
          subject,
          text: plainTextBody,
          html: htmlBody
        })
      });
      const data = await resendRes.json();
      if (!resendRes.ok) throw new Error(data.message || `Resend HTTP error ${resendRes.status}`);
      console.log(`[Blog Draft Mailer] ✅ Email sent via Resend! ID: ${data.id}`);
      return { success: true, provider: 'resend', id: data.id, recipients };
    } catch (resendErr) {
      console.warn('[Blog Draft Mailer] Resend dispatch failed, falling back to Nodemailer SMTP:', resendErr.message);
    }
  }

  // 2. Check if SendGrid API key is provided
  if (process.env.SENDGRID_API_KEY) {
    try {
      console.log(`[Blog Draft Mailer] Dispatching alert via SendGrid API to ${targetEmailStr}...`);
      const fromEmail = (process.env.SMTP_USER || 'jack@123thenextlevel.com').trim();
      const sendGridRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: recipients.map(e => ({ email: e })) }],
          from: { email: fromEmail, name: '123TheNextLevel' },
          subject,
          content: [
            { type: 'text/plain', value: plainTextBody },
            { type: 'text/html', value: htmlBody }
          ]
        })
      });
      if (!sendGridRes.ok) {
        const errorText = await sendGridRes.text();
        throw new Error(`SendGrid HTTP error ${sendGridRes.status}: ${errorText}`);
      }
      console.log(`[Blog Draft Mailer] ✅ Email sent via SendGrid!`);
      return { success: true, provider: 'sendgrid', recipients };
    } catch (sendGridErr) {
      console.warn('[Blog Draft Mailer] SendGrid dispatch failed, falling back to Nodemailer SMTP:', sendGridErr.message);
    }
  }

  // 3. Default: Send via Nodemailer SMTP (Hostinger or custom SMTP)
  const mailOptions = {
    from: smtpFrom,
    to: targetEmailStr,
    subject,
    text: plainTextBody,
    html: htmlBody
  };

  const transporter = createTransporter();
  console.log(`[Blog Draft Mailer] Sending draft alert email to ${targetEmailStr} from ${smtpFrom}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log(`[Blog Draft Mailer] ✅ Email sent successfully! MessageID: ${info.messageId}`);
  return { success: true, provider: 'nodemailer', messageId: info.messageId, recipients };
}

/**
 * Sends an automated notification email when all blog drafts in the queue are published or deleted (COUNT(drafts) == 0)
 * Trigger: Whenever a blog post status changes to 'published' or is deleted AND no drafts remain.
 * Recipients: jack@123thenextlevel.com AND gibjack2000@googlemail.com
 */
export async function sendQueueEmptyAlertEmail({ recipientEmail } = {}) {
  const recipients = resolveRecipients(recipientEmail, process.env.QUEUE_EMPTY_NOTIFICATION_EMAIL);
  const targetEmailStr = recipients.join(', ');

  const subject = `🎉 All Blog Drafts Published — Time for Batch 2!`;

  const plainTextBody = `Hi Jack,\n\nAll blog drafts in your queue have now been published on 123thenextlevel.com!\n\nYour draft queue is currently empty. Whenever you are ready for your next batch of 6 clinical authority articles, drop back into your Gemini Notebook chat to generate Batch 2.\n\nBest,\n123TheNextLevel Automation`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>All Blog Drafts Published</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#0f172a" style="padding: 36px 16px;">
        <tr>
          <td align="center">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 580px; background-color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);">
              
              <!-- Header Bar -->
              <tr>
                <td bgcolor="#0b1120" style="padding: 26px 30px; border-bottom: 1px solid #334155; text-align: left;">
                  <span style="display: inline-block; background-color: #10b981; color: #ffffff; font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 6px; margin-bottom: 8px;">
                    Editorial Milestone
                  </span>
                  <h1 style="margin: 4px 0 0 0; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">
                    🎉 All Blog Drafts Published!
                  </h1>
                </td>
              </tr>
              
              <!-- Content Body -->
              <tr>
                <td style="padding: 32px 30px;">
                  <p style="margin: 0 0 16px 0; font-size: 16px; color: #f8fafc; font-weight: 600;">
                    Hi Jack,
                  </p>
                  
                  <p style="margin: 0 0 20px 0; font-size: 15px; color: #cbd5e1; line-height: 1.65;">
                    All blog drafts in your queue have now been published on <strong style="color: #38bdf8;">123thenextlevel.com</strong>!
                  </p>

                  <div style="background-color: #0f172a; border-radius: 12px; border: 1px solid #334155; padding: 20px; margin-bottom: 24px;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #94a3b8;">
                      📊 <strong>Queue Status:</strong> <span style="color: #10b981; font-weight: bold;">0 Drafts Remaining (Queue Empty)</span>
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #cbd5e1; line-height: 1.6;">
                      Your draft queue is currently empty. Whenever you are ready for your next batch of 6 clinical authority articles, drop back into your Gemini Notebook chat to generate <strong>Batch 2</strong>.
                    </p>
                  </div>

                  <!-- CTA Button -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                    <tr>
                      <td align="center">
                        <a href="https://123thenextlevel.com/admin/blogs" target="_blank" style="display: block; width: 100%; box-sizing: border-box; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; text-align: center; padding: 14px 24px; border-radius: 10px; font-weight: bold; font-size: 15px; text-decoration: none; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.4);">
                          View Blog CMS Dashboard ➜
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0; font-size: 13px; color: #94a3b8; line-height: 1.5;">
                    Keep up the great momentum compounding your authority content library!
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td bgcolor="#0b1120" style="padding: 18px 30px; border-top: 1px solid #334155; text-align: center;">
                  <p style="margin: 0; font-size: 11px; color: #64748b;">
                    123TheNextLevel CMS Automation &bull; Automated queue alert sent to ${targetEmailStr}
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

  const rawFrom = (process.env.SMTP_FROM || `"The Team at 123Next Level" <${process.env.SMTP_USER || 'jack@123thenextlevel.com'}>`).replace(/"/g, '').trim();
  const smtpFrom = formatFromAddress(rawFrom) || `"The Team at 123Next Level" <jack@123thenextlevel.com>`;

  // 1. Resend API support if configured
  if (process.env.RESEND_API_KEY) {
    try {
      console.log(`[Queue Empty Mailer] Dispatching via Resend API to ${targetEmailStr}...`);
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: smtpFrom.includes('<') ? smtpFrom : `123TheNextLevel <${process.env.SMTP_USER || 'jack@123thenextlevel.com'}>`,
          to: recipients,
          subject,
          text: plainTextBody,
          html: htmlBody
        })
      });
      const data = await resendRes.json();
      if (!resendRes.ok) throw new Error(data.message || `Resend HTTP error ${resendRes.status}`);
      console.log(`[Queue Empty Mailer] ✅ Email sent via Resend! ID: ${data.id}`);
      return { success: true, provider: 'resend', id: data.id, recipients };
    } catch (resendErr) {
      console.warn('[Queue Empty Mailer] Resend dispatch failed, falling back to Nodemailer:', resendErr.message);
    }
  }

  // 2. SendGrid API support if configured
  if (process.env.SENDGRID_API_KEY) {
    try {
      console.log(`[Queue Empty Mailer] Dispatching via SendGrid API to ${targetEmailStr}...`);
      const fromEmail = (process.env.SMTP_USER || 'jack@123thenextlevel.com').trim();
      const sendGridRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{ to: recipients.map(e => ({ email: e })) }],
          from: { email: fromEmail, name: '123TheNextLevel' },
          subject,
          content: [
            { type: 'text/plain', value: plainTextBody },
            { type: 'text/html', value: htmlBody }
          ]
        })
      });
      if (!sendGridRes.ok) {
        const errorText = await sendGridRes.text();
        throw new Error(`SendGrid HTTP error ${sendGridRes.status}: ${errorText}`);
      }
      console.log(`[Queue Empty Mailer] ✅ Email sent via SendGrid!`);
      return { success: true, provider: 'sendgrid', recipients };
    } catch (sendGridErr) {
      console.warn('[Queue Empty Mailer] SendGrid dispatch failed, falling back to Nodemailer:', sendGridErr.message);
    }
  }

  // 3. Default: Nodemailer Hostinger SMTP
  const mailOptions = {
    from: smtpFrom,
    to: targetEmailStr,
    subject,
    text: plainTextBody,
    html: htmlBody
  };

  const transporter = createTransporter();
  console.log(`[Queue Empty Mailer] Sending Queue Empty email to ${targetEmailStr} from ${smtpFrom}...`);
  const info = await transporter.sendMail(mailOptions);
  console.log(`[Queue Empty Mailer] ✅ Email sent successfully! MessageID: ${info.messageId}`);
  return { success: true, provider: 'nodemailer', messageId: info.messageId, recipients };
}




