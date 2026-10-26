/**
 * MailerLite Integration Service for Paid Customers & Automations
 * Synchronizes paying customers to MailerLite groups and custom fields,
 * enabling instant "Thank You & Your Guide Download" automation workflows.
 */

export async function syncPaidCustomerToMailerLite({
  email,
  name,
  productTitle,
  sessionId,
  amount,
  currency = 'GBP',
  origin = 'https://123thenextlevel.com'
}) {
  const apiKey = (process.env.MAILERLITE_API_KEY || '').trim();
  const groupId = (process.env.MAILERLITE_BUYERS_GROUP_ID || process.env.MAILERLITE_GROUP_ID || '').trim();

  if (!apiKey) {
    console.warn('⚠️ [MailerLite] MAILERLITE_API_KEY is not configured. Customer sync skipped.');
    return { skipped: true, reason: 'Missing MAILERLITE_API_KEY' };
  }

  if (!email || typeof email !== 'string') {
    console.warn('⚠️ [MailerLite] Customer email is missing or invalid.');
    return { skipped: true, reason: 'Missing email' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanName = (name || '').trim();
  const downloadUrl = sessionId 
    ? `${origin}/premium-guides/success?session_id=${sessionId}`
    : `${origin}/library`;

  const formattedAmount = amount ? `${currency.toUpperCase()} ${Number(amount).toFixed(2)}` : '';

  // 1. Comprehensive payload with custom fields for email template personalization
  const fullPayload = {
    email: cleanEmail,
    fields: {
      ...(cleanName ? { name: cleanName } : {}),
      ...(productTitle ? { last_purchased_product: productTitle } : {}),
      download_url: downloadUrl,
      ...(formattedAmount ? { order_amount: formattedAmount } : {}),
      source: 'stripe_checkout_paid'
    },
    ...(groupId ? { groups: [groupId] } : {})
  };

  try {
    console.log(`[MailerLite] Syncing paid buyer ${cleanEmail} (Product: "${productTitle || 'Digital Guide'}") to MailerLite...`);

    let response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(fullPayload)
    });

    // 2. Fallback handling: If MailerLite returns 422 because custom fields (like download_url) 
    // are not yet declared in the MailerLite dashboard, retry with basic fields so the group trigger STILL fires!
    if (!response.ok && response.status === 422) {
      console.warn('[MailerLite] 422 Unprocessable Entity (custom fields may not be created in MailerLite). Retrying with essential fields...');
      const fallbackPayload = {
        email: cleanEmail,
        fields: {
          ...(cleanName ? { name: cleanName } : {}),
          source: 'stripe_checkout_paid'
        },
        ...(groupId ? { groups: [groupId] } : {})
      };

      response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(fallbackPayload)
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[MailerLite Error] API returned status ${response.status}: ${errorText}`);
      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    console.log(`✅ [MailerLite] Buyer ${cleanEmail} synced successfully! Group ID: ${groupId || 'Default'}. Automation triggered.`);
    return { success: true, subscriberId: data.data?.id, email: cleanEmail };

  } catch (err) {
    console.error('[MailerLite Exception] Network or execution error while syncing buyer:', err.message);
    return { success: false, error: err.message };
  }
}
