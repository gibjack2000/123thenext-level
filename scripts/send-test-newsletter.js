import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase configuration missing in environment variables.');
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

const testEmail = 'jack_2000@yahoo.com';

const MOCK_FALLBACK_POSTS = [
  {
    title: "The Epigenetic Clock: Tracking Cellular Age in Real-Time",
    slug: "epigenetic-clock-cellular-age",
    category: "health",
    excerpt: "How new consumer diagnostics allow you to measure biological vs chronological age and evaluate longevity protocols."
  },
  {
    title: "A Beginner's Guide to Strength Training at Home",
    slug: "beginners-guide-strength-training-home",
    category: "fitness",
    excerpt: "No gym? No problem. Learn how to build muscle and strength using minimal equipment and bodyweight."
  },
  {
    title: "Mastering Meal Prep: A Step-by-Step Guide for Busy Weeks",
    slug: "mastering-meal-prep",
    category: "nutrition",
    excerpt: "Save time and stay on track with our efficient system for prepping nutritious meals in under 2 hours."
  },
  {
    title: "Practical Mindfulness: Techniques for Busy Schedules",
    slug: "practical-mindfulness",
    category: "wellness",
    excerpt: "Learn how to integrate micro-meditations and mindful presence into your daily workflow."
  },
  {
    title: "The Social Vagus: Building Co-Regulation in Community Cohorts",
    slug: "social-vagus-vns-community",
    category: "social-fitness",
    excerpt: "Why training alone misses a critical recovery trigger. How team coordination and social fitness buffer stress."
  },
  {
    title: "Ovarian Longevity: Extending the Epigenetic Timeline",
    slug: "ovarian-longevity-epigenetic-timeline",
    category: "womens-health",
    excerpt: "New diagnostics and metabolic protocols aiming to track and preserve reproductive age and systemic biological vitality."
  }
];

function createTransporter() {
  const host = (process.env.SMTP_HOST || 'smtp.hostinger.com').replace(/"/g, '').trim();
  const portVal = (process.env.SMTP_PORT || '465').replace(/"/g, '').trim();
  const port = parseInt(portVal, 10);
  const secure = (process.env.SMTP_SECURE || '').replace(/"/g, '').trim() === 'true' || port === 465;
  const user = (process.env.SMTP_USER || '').replace(/"/g, '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/"/g, '').trim();

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
}

function formatFromAddress(fromStr) {
  if (!fromStr) return fromStr;
  const match = fromStr.match(/^(.*?)\s*<(.*?)>$/);
  if (match) {
    let name = match[1].trim();
    const email = match[2].trim();
    if (name.startsWith('"') && name.endsWith('"')) name = name.slice(1, -1).trim();
    return `"${name}" <${email}>`;
  }
  return fromStr;
}

async function main() {
  console.log(`Starting test weekly newsletter run for: ${testEmail}`);

  const categories = ['health', 'fitness', 'nutrition', 'wellness', 'social-fitness', 'womens-health'];
  const latestPosts = {};

  for (const cat of categories) {
    try {
      const { data: posts, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', cat)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(1);

      if (!postError && posts && posts.length > 0) {
        latestPosts[cat] = posts[0];
      } else {
        console.log(`No active DB posts for ${cat}, using local mock post.`);
        latestPosts[cat] = MOCK_FALLBACK_POSTS.find(p => p.category === cat);
      }
    } catch (err) {
      latestPosts[cat] = MOCK_FALLBACK_POSTS.find(p => p.category === cat);
    }
  }

  const transporter = createTransporter();
  const rawFrom = (process.env.SMTP_FROM || `"The Next Level" <${process.env.SMTP_USER}>`).replace(/"/g, '').trim();
  const smtpFrom = formatFromAddress(rawFrom);
  const appUrl = process.env.VITE_APP_URL || 'http://localhost:3000';

  const userPrefs = categories; // Send all categories for the test run

  const selectedPosts = Object.keys(latestPosts)
    .filter(cat => userPrefs.includes(cat))
    .map(cat => latestPosts[cat])
    .filter(Boolean);

  let bentoBoxesHtml = '';
  
  const categoryColors = {
    health: '#f43f5e',          // rose-500
    fitness: '#3b82f6',         // blue-500
    nutrition: '#10b981',       // emerald-500
    wellness: '#a855f7',        // purple-500
    'social-fitness': '#06b6d4', // cyan-500
    'womens-health': '#ec4899'   // pink-500
  };

  selectedPosts.forEach((post) => {
    const readUrl = `${appUrl}/blog/${post.slug}`;
    const formattedCategory = post.category
      ? post.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : '';
    const categoryColor = categoryColors[post.category?.toLowerCase()] || '#3b82f6';

    bentoBoxesHtml += `
      <!-- Bento Box Item -->
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; font-family: sans-serif;">
        <tr>
          <td style="padding: 20px;">
            <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: ${categoryColor}; letter-spacing: 0.1em; display: inline-block; margin-bottom: 8px;">
              ${formattedCategory}
            </span>
            <h3 style="margin: 0 0 10px 0; font-size: 18px; font-weight: bold; color: #1e293b; line-height: 1.3;">
              ${post.title}
            </h3>
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #475569; line-height: 1.5;">
              ${post.excerpt || 'Read the latest protocol updates.'}
            </p>
            <a href="${readUrl}" target="_blank" style="display: inline-block; background-color: #1e293b; color: #ffffff; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">
              Read Breakdown ➜
            </a>
          </td>
        </tr>
      </table>
    `;
  });

  const emailBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Weekly Bento Box Digest (Practice Run)</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: sans-serif;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f8fafc" style="padding: 30px 0;">
        <tr>
          <td align="center">
            <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px;">
              <!-- Header -->
              <tr>
                <td align="center" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 24px; border-radius: 16px 16px 0 0; color: #ffffff;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">
                    123TheNext Level
                  </h1>
                  <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">
                    Your Weekly Bento Box Digest (Practice Run)
                  </p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 24px 0;">
                  <p style="font-size: 15px; color: #334155; line-height: 1.5; margin-bottom: 20px;">
                    Hi there, here is your customized health protocol summary for the week, curated based on your preferences:
                  </p>
                  
                  ${bentoBoxesHtml}
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td bgcolor="#f1f5f9" style="padding: 24px 24px; text-align: center; border-radius: 0 0 16px 16px; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 8px 0; font-size: 11px; color: #64748b; line-height: 1.5;">
                    Sent to ${testEmail} based on your selected interests.
                  </p>
                  <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                    This is a practice run of the automated weekly newsletter distribution.
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

  try {
    console.log(`Sending bento box newsletter to ${testEmail}...`);
    await transporter.sendMail({
      from: smtpFrom,
      to: testEmail,
      subject: `123TheNextLevel — Your Weekly Bento Box Digest (Practice Run)`,
      html: emailBody
    });
    console.log(`Successfully sent to ${testEmail}.`);
  } catch (err) {
    console.error(`Failed to send to ${testEmail}:`, err.message);
  }
}

main().catch(console.error);
