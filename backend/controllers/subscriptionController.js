const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Get subscription plans
const getPlans = async (req, res) => {
  try {
    const plans = [
      {
        id: 'free',
        name: 'Free Tier',
        price: 0,
        features: [
          'Basic card search (Pokemon TCG)',
          'Community features',
          'Portfolio tracking up to $10K',
          'Basic deck building'
        ]
      },
      {
        id: 'premium',
        name: 'Premium Tier', 
        price: 999,
        features: [
          'Everything in Free',
          'Advanced market analytics',
          'Real-time price alerts',
          'Unlimited portfolio tracking',
          'AI-powered recommendations',
          'Marketplace access'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise Tier',
        price: 1499,
        features: [
          'Everything in Premium',
          'Unlimited TC Investments processing',
          'API access for developers',
          'Advanced trading tools',
          'Tax reporting features',
          'Priority support'
        ]
      }
    ];
    
    res.json({ plans });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create subscription
const createSubscription = async (req, res) => {
  try {
    const { planId, paymentMethodId } = req.body;
    
    // Mock subscription creation for development
    const subscription = {
      id: `sub_${Date.now()}`,
      user_id: req.user.id,
      plan_id: planId,
      status: 'active',
      created_at: new Date(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    };
    
    res.json({ 
      subscription,
      message: 'Subscription created successfully (development mode)'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user subscription
const getUserSubscription = async (req, res) => {
  try {
    // Mock user subscription for Heath Davis
    const subscription = {
      id: 'sub_heath_enterprise',
      user_id: req.user.id,
      plan_id: 'enterprise',
      plan_name: 'Enterprise Tier',
      status: 'active',
      price: 1499,
      created_at: '2024-01-01',
      current_period_end: '2025-01-01'
    };
    
    res.json({ subscription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getPlans,
  createSubscription,
  getUserSubscription
};
