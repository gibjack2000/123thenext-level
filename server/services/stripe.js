import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.warn('WARNING: STRIPE_SECRET_KEY is not defined in environment variables. Ensure it is configured.');
}

const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  apiVersion: '2023-10-16', // Ensure stable API version compatibility
});

export const stripeService = {
  /**
   * Create a Stripe Checkout Session for multiple line items
   */
  async createCheckoutSession({ lineItems, successUrl, cancelUrl, clientReferenceId, customerEmail, metadata }) {
    const sessionConfig = {
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: clientReferenceId,
      metadata: metadata || {}
    };

    if (customerEmail) {
      sessionConfig.customer_email = customerEmail;
    }

    // Enable promotion codes if configured or by default
    sessionConfig.allow_promotion_codes = true;

    // Enable automatic tax behind a config flag
    if (process.env.ENABLE_AUTOMATIC_TAX === 'true') {
      sessionConfig.automatic_tax = { enabled: true };
    }

    return await stripe.checkout.sessions.create(sessionConfig);
  },

  /**
   * Retrieve Checkout Session details by ID, including expanding line items
   */
  async retrieveSession(sessionId) {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent']
    });
  },

  /**
   * Construct event from request body and signature for webhook validation
   */
  constructEvent(rawBody, signature, webhookSecret) {
    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not configured.');
    }
    return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  }
};
