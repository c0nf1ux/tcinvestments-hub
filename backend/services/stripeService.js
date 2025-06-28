const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Competitive pricing configuration for Stripe
const STRIPE_PRICING = {
  pro: {
    priceId: 'price_brainstorm_pro_999',
    amount: 999, // $9.99 in cents
    name: 'Brainstorm Pro',
    description: 'Professional TCG platform - Less than Netflix!',
    features: ['Pokemon API 500/day', 'Advanced Analytics', 'Priority Support'],
    savings: '$5.50/month vs Netflix Standard'
  },
  premium: {
    priceId: 'price_brainstorm_premium_1499',
    amount: 1499, // $14.99 in cents
    name: 'Brainstorm Premium',
    description: 'Ultimate TCG platform - Still under streaming cost!',
    features: ['Pokemon API 2000/day', 'TC Brainstorms Included', 'Phone Support'],
    savings: '$0.50/month vs Netflix Standard'
  },
  tcBrainstorms: {
    priceId: 'price_tc_Brainstorms_5900',
    amount: 5900, // $59.00 in cents
    name: 'TC Brainstorms Analysis',
    description: 'Professional card analysis with Pokemon API data',
    features: ['Enhanced Pokemon Data', 'Professional Analysis', 'Detailed Reports']
  }
};

// Create Stripe checkout session with competitive pricing
const createCheckoutSession = async (priceId, successUrl, cancelUrl, customerEmail) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: priceId.includes('tc_Brainstorms') ? 'payment' : 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: 'required',
      allow_promotion_codes: true,
      subscription_data: priceId.includes('tc_Brainstorms') ? undefined : {
        trial_period_days: 7, // 7-day free trial
      },
      metadata: {
        platform: 'brainstorm_tcg',
        competitive_advantage: 'less_than_netflix',
        pokemon_api: 'active'
      }
    });

    return { success: true, sessionId: session.id, url: session.url };
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return { success: false, error: error.message };
  }
};

// Handle successful payments
const handleSuccessfulPayment = async (sessionId) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Update user subscription status in database
    // For now, return success confirmation
    return {
      success: true,
      customerEmail: session.customer_email,
      amountPaid: session.amount_total / 100,
      subscriptionActive: true,
      message: 'Welcome to Brainstorm - The most comprehensive TCG platform at streaming prices!'
    };
  } catch (error) {
    console.error('Payment processing error:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  STRIPE_PRICING,
  createCheckoutSession,
  handleSuccessfulPayment
};


