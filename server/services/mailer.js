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
  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

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
  const smtpFrom = formatFromAddress(process.env.SMTP_FROM || `"The Next Level" <${process.env.SMTP_USER}>`);
  const smtpUser = process.env.SMTP_USER;
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
