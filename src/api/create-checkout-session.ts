import Stripe from 'stripe';
import { GUIDE_PRODUCTS, resolveGuideProduct } from '../data/guide-registry';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export async function handleCreateCheckoutSession(req: Request): Promise<Response> {
  try {
    const { guideId } = await req.json();
    const guide = resolveGuideProduct(guideId) || GUIDE_PRODUCTS[guideId];

    if (!guide) {
      return new Response(JSON.stringify({ error: 'Invalid guide product' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const origin = req.headers.get('origin') || process.env.VITE_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: guide.title,
              description: 'Instant PDF Digital Guide — 123TheNextLevel',
            },
            unit_amount: guide.priceInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        guideId: guide.id,
        r2FileKey: guide.r2FileKey,
      },
      success_url: `${origin}/library?success=true&session_id={CHECKOUT_SESSION_ID}&guideId=${guide.id}`,
      cancel_url: `${origin}/library?canceled=true`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('[API create-checkout-session] Error:', error.message);
    return new Response(JSON.stringify({ error: 'Failed to create checkout session: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
