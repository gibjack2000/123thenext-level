import dotenv from 'dotenv';
dotenv.config();

/**
 * Sends a WhatsApp notification to the admin when a new blog draft is staged.
 * Supports direct Twilio REST API as well as Make.com / Zapier webhooks.
 */
export async function sendWhatsAppDraftAlert({ title, category, status = 'Draft', slug, id }) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromWhatsApp = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'; // default Twilio sandbox number
  const toWhatsAppNumber = process.env.ADMIN_WHATSAPP_NUMBER || '+447522404028';
  const toWhatsApp = toWhatsAppNumber.startsWith('whatsapp:') ? toWhatsAppNumber : `whatsapp:${toWhatsAppNumber}`;

  const baseUrl = process.env.VITE_APP_URL || 'https://123thenextlevel.com';
  const adminReviewUrl = `${baseUrl.replace(/\/$/, '')}/admin/blogs`;

  const messageBody = `📝 123TheNextLevel Alert: New Blog Draft Ready!\nTitle: ${title || 'Untitled Article'}\nCategory: ${category || 'General'}\nStatus: ${status || 'Draft'}\n📲 Review & Publish Here: ${adminReviewUrl}`;

  console.log(`[WhatsApp Service] Processing draft alert for "${title}" to ${toWhatsApp}...`);

  const results = {
    twilio: null,
    forwardingWebhook: null,
    messageBody
  };

  // 1. Optional Make.com / Zapier webhook forwarding
  const externalWebhookUrl = process.env.MAKE_WHATSAPP_WEBHOOK_URL || process.env.ZAPIER_WHATSAPP_WEBHOOK_URL;
  if (externalWebhookUrl) {
    try {
      console.log(`[WhatsApp Service] Forwarding to external webhook: ${externalWebhookUrl}`);
      const fwdRes = await fetch(externalWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          status,
          slug,
          id,
          recipient_number: toWhatsAppNumber,
          review_url: adminReviewUrl,
          message_body: messageBody,
          timestamp: new Date().toISOString()
        })
      });
      results.forwardingWebhook = { status: fwdRes.status, ok: fwdRes.ok };
    } catch (whErr) {
      console.error('[WhatsApp Service] Forwarding webhook failed:', whErr.message);
      results.forwardingWebhook = { error: whErr.message };
    }
  }

  // 2. Twilio WhatsApp REST API execution
  if (accountSid && authToken) {
    try {
      const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');

      const params = new URLSearchParams();
      params.append('From', fromWhatsApp);
      params.append('To', toWhatsApp);
      params.append('Body', messageBody);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Twilio API error HTTP ${response.status}`);
      }

      console.log(`[WhatsApp Service] ✅ Twilio WhatsApp dispatched! SID: ${data.sid}`);
      results.twilio = { success: true, sid: data.sid };
      return { success: true, ...results };
    } catch (twErr) {
      console.error('[WhatsApp Service] ❌ Twilio WhatsApp error:', twErr.message);
      results.twilio = { success: false, error: twErr.message };
      return { success: false, error: twErr.message, ...results };
    }
  } else {
    console.log('[WhatsApp Service] ℹ️ TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN not configured yet. Alert payload generated:');
    console.log(messageBody);
    results.twilio = { simulated: true, note: 'Twilio credentials needed in .env' };
    return { success: true, ...results };
  }
}
