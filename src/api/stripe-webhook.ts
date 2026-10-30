import Stripe from 'stripe';
import { VAULT_BASE, PRODUCT_DOWNLOAD_MAP, matchProductDownload } from '../config/vaultProducts';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function handleStripeWebhook(req: Request): Promise<Response> {
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || '',
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const targetKey = session.metadata?.guide_id || session.metadata?.guideId || session.client_reference_id;
    const matchedProduct = matchProductDownload(targetKey) || {
      title: 'Complete 10-Guide Master Longevity Suite',
      url: `${VAULT_BASE}/Complete_9_Book_Master_Vault-2026.zip`
    };

    console.log(`🎉 Payment confirmed for guide: ${matchedProduct.title} -> ${matchedProduct.url}`);

    // Forward to MailerLite if API key configured
    const apiKey = (process.env.MAILERLITE_API_KEY || '').trim();
    const customerEmail = session.customer_details?.email;
    if (apiKey && customerEmail) {
      try {
        await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            email: customerEmail,
            fields: {
              download_url: matchedProduct.url,
              last_purchased_product: matchedProduct.title,
              customer_status: 'paid_buyer',
              name: session.customer_details?.name || ''
            },
            groups: ['202427608236820440'] // "Paid Buyers" group
          })
        });
      } catch (mlErr) {
        console.warn('[Stripe Webhook] MailerLite sync warning:', mlErr);
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
