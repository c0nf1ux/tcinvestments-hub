const express = require('express');
const { createCheckoutSession, handleSuccessfulPayment, STRIPE_PRICING } = require('../services/stripeService');
const router = express.Router();

// Get Stripe pricing information
router.get('/pricing', (req, res) => {
  res.json({
    success: true,
    pricing: STRIPE_PRICING,
    competitiveAdvantage: {
      netflixStandard: '$15.49/month',
      brainstormPro: '$9.99/month (Save $5.50)',
      brainstormPremium: '$14.99/month (Save $0.50)',
      tcBrainstorms: '$59.00 (Enhanced with Pokemon API data)'
    }
  });
});

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { tier, successUrl, cancelUrl, customerEmail } = req.body;
    
    if (!STRIPE_PRICING[tier]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pricing tier'
      });
    }
    
    const priceId = STRIPE_PRICING[tier].priceId;
    const result = await createCheckoutSession(
      priceId,
      successUrl || 'http://localhost:3000/success',
      cancelUrl || 'http://localhost:3000/cancel',
      customerEmail
    );
    
    if (result.success) {
      res.json({
        success: true,
        sessionId: result.sessionId,
        checkoutUrl: result.url,
        pricing: STRIPE_PRICING[tier],
        message: `Checkout created for ${STRIPE_PRICING[tier].name} - ${STRIPE_PRICING[tier].savings || 'Professional TCG analysis'}`
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Checkout creation failed'
    });
  }
});

// Handle successful payment
router.post('/success', async (req, res) => {
  try {
    const { session_id } = req.body;
    const result = await handleSuccessfulPayment(session_id);
    
    res.json({
      success: result.success,
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Payment processing failed'
    });
  }
});

module.exports = router;






