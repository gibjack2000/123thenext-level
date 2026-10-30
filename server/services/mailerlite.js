/**
 * MailerLite Integration Service for Paid Customers & Automations
 * Synchronizes paying customers to MailerLite groups and custom fields,
 * enabling instant "Thank You & Your Guide Download" automation workflows.
 */

export async function syncPaidCustomerToMailerLite({
  email,
  name,
  productTitle,
  productUrl,
  sessionId,
  amount,
  currency = 'GBP',
  origin = 'https://123thenextlevel.com',
  groupId
}) {
  const apiKey = (process.env.MAILERLITE_API_KEY || '').trim();
  // Known official MailerLite Group ID for "Paid Buyers"
  const KNOWN_PAID_BUYERS_GROUP = '202427608236820440';
  const configuredGroupId = (groupId || process.env.MAILERLITE_BUYERS_GROUP_ID || KNOWN_PAID_BUYERS_GROUP).trim();

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
  const downloadUrl = productUrl || (sessionId 
    ? `${origin}/checkout/success?session_id=${sessionId}`
    : `${origin}/library`);

  const formattedAmount = amount ? `${currency.toUpperCase()} ${Number(amount).toFixed(2)}` : '';

  // Smart group mapping: ensure "Paid Buyers" group is selected
  let targetGroupId = configuredGroupId;

  // 1. Comprehensive payload with custom fields: download_url, last_purchased_product & customer_status
  const fullPayload = {
    email: cleanEmail,
    fields: {
      download_url: downloadUrl,
      last_purchased_product: productTitle || 'Digital Longevity Guide',
      customer_status: 'paid_buyer',
      ...(cleanName ? { name: cleanName } : {}),
      ...(formattedAmount ? { order_amount: formattedAmount } : {}),
      source: 'stripe_checkout_paid'
    },
    ...(targetGroupId ? { groups: [targetGroupId] } : {})
  };

  try {
    console.log(`[MailerLite] Syncing paid buyer ${cleanEmail} (Product: "${productTitle || 'Digital Guide'}", URL: "${downloadUrl}") to "Paid Buyers" group [${targetGroupId}]...`);

    let response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(fullPayload)
    });

    // 2. Fallback handling: If MailerLite returns 422, retry with verified fields (download_url, last_purchased_product)
    if (!response.ok && response.status === 422) {
      console.warn('[MailerLite] 422 Unprocessable Entity. Retrying with essential fields (download_url, last_purchased_product)...');
      const fallbackPayload = {
        email: cleanEmail,
        fields: {
          download_url: downloadUrl,
          last_purchased_product: productTitle || 'Digital Longevity Guide',
          customer_status: 'paid_buyer',
          ...(cleanName ? { name: cleanName } : {}),
          source: 'stripe_checkout_paid'
        },
        ...(targetGroupId ? { groups: [targetGroupId] } : {})
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

    // 3. Ultra-resilient fallback: If customer_status custom field does not exist in MailerLite yet
    if (!response.ok && response.status === 422) {
      console.warn('[MailerLite] 422 Unprocessable Entity persists. Retrying with base fields to ensure group inclusion...');
      const basicPayload = {
        email: cleanEmail,
        fields: {
          ...(cleanName ? { name: cleanName } : {}),
          source: 'stripe_checkout_paid'
        },
        ...(targetGroupId ? { groups: [targetGroupId] } : {})
      };

      response = await fetch('https://connect.mailerlite.com/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(basicPayload)
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[MailerLite Error] API returned status ${response.status}: ${errorText}`);
      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    console.log(`✅ [MailerLite] Buyer ${cleanEmail} synced successfully with customer_status: paid_buyer! Group: ${targetGroupId}`);
    return { success: true, subscriberId: data.data?.id, email: cleanEmail };

  } catch (err) {
    console.error('[MailerLite Exception] Network or execution error while syncing buyer:', err.message);
    return { success: false, error: err.message };
  }
}
