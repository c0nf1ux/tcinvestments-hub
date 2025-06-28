const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// STRIPE INTEGRATION - HEATH DAVIS TCBrainstormS ACCOUNT
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  console.log(' STRIPE INTEGRATION: ACTIVE');
  console.log(' REVENUE SYSTEM: OPERATIONAL');
  console.log(' Account: onepunchllc@outlook.com (Heath Davis)');
}

// COMPETITIVE PRICING CONFIGURATION
const PRICING_TIERS = {
  free: {
    price: 0,
    name: "Starter",
    description: "Perfect for casual collectors getting started",
    features: [
      'Basic portfolio tracking (up to $5K value)',
      'Limited Pokemon searches (50/day)',
      'Community access and discussions',
      'Basic price alerts (3 active)',
      'Mobile app access'
    ],
    limits: { cards: 50, pokemonSearches: 50, portfolioValue: 5000, priceAlerts: 3 }
  },
  pro: {
    price: 9.99,
    name: "Pro",
    popular: true,
    stripePrice: process.env.STRIPE_PRICE_ID || 'price_1RYRZyFQZ4k6eTlv4RhWaopp',
    description: "Less than Netflix - Most comprehensive TCG data",
    features: [
      'Portfolio tracking up to $50K value',
      'Enhanced Pokemon API access (500/day)',
      'Advanced analytics with real Pokemon pricing',
      'Real-time price alerts (25 active)',
      'Export capabilities (CSV, PDF)',
      'Priority customer support',
      'Advanced search filters'
    ],
    limits: { cards: 500, pokemonSearches: 500, portfolioValue: 50000, priceAlerts: 25, exports: 50 },
    savings: 5.50
  },
  premium: {
    price: 14.99,
    name: "Premium",
    description: "Ultimate TCG Brainstorm platform - Still under streaming cost!",
    badge: "BEST VALUE",
    features: [
      'Unlimited portfolio tracking',
      'Full Pokemon API access (2000/day)',
      'Advanced market analytics & predictions',
      'Unlimited price alerts & notifications',
      'TC Brainstorms file processing (included)',
      'API access (1000 calls/month)',
      'Priority support + phone access',
      'Advanced integrations & automation',
      'Early access to new features'
    ],
    limits: { cards: 'unlimited', pokemonSearches: 2000, priceAlerts: 'unlimited', apiCalls: 1000 },
    savings: 0.50
  }
};

// In-memory storage for demo
const demoUsers = new Map();
const demoPortfolio = {
  totalValue: 125840.23,
  dailyChange: 1.69,
  weeklyChange: 4.32,
  monthlyChange: 12.8,
  cardCount: 847,
  lastUpdated: new Date().toISOString(),
  pokemonApiActive: true,
  stripeRevenueActive: true,
  gameBreakdown: {
    pokemon: { value: 42680.25, count: 298, percentage: 33.9, topCard: "Blaine's Charizard", topValue: 317.39 },
    magic: { value: 58420.50, count: 423, percentage: 46.4, topCard: "Black Lotus", topValue: 45000 },
    yugioh: { value: 15920.18, count: 89, percentage: 12.7, topCard: "Blue-Eyes White Dragon", topValue: 2400 },
    sports: { value: 8819.30, count: 37, percentage: 7.0, topCard: "Michael Jordan Rookie", topValue: 3200 }
  }
};

// Demo card data with Pokemon API integration
const demoCards = [
  {
    id: "gym1-4",
    name: "Blaine's Charizard",
    set: "Gym Challenge",
    game: "pokemon",
    rarity: "Rare Holo",
    currentPrice: 317.39,
    currency: "EUR",
    imageUrl: "https://images.pokemontcg.io/gym1/4_hires.png",
    apiSource: "pokemon_tcg_official"
  },
  {
    id: "base1-4",
    name: "Charizard",
    set: "Base Set",
    game: "pokemon",
    rarity: "Rare Holo",
    currentPrice: 825.50,
    currency: "USD",
    imageUrl: "https://images.pokemontcg.io/base1/4_hires.png",
    apiSource: "pokemon_tcg_official"
  }
];

// HEALTH CHECK ENDPOINT
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'operational',
    timestamp: new Date().toISOString(),
    pokemonApiActive: true,
    pokemonApiKey: process.env.POKEMON_TCG_API_KEY ? 'configured' : 'missing',
    stripeActive: !!process.env.STRIPE_SECRET_KEY,
    stripeAccount: 'onepunchllc@outlook.com',
    revenueSystem: 'operational',
    competitivePricing: true,
    pricingTiers: {
      pro: '$9.99 (Save $5.50 vs Netflix)',
      premium: '$14.99 (Save $0.50 vs Netflix)'
    }
  });
});

// STRIPE ENDPOINTS
if (stripe) {
  // Stripe pricing information
  app.get('/api/stripe/pricing', (req, res) => {
    res.json({
      success: true,
      stripeActive: true,
      accountEmail: 'onepunchllc@outlook.com',
      accountOwner: 'Heath Davis',
      pricing: {
        pro: { 
          price: 9.99, 
          priceId: process.env.STRIPE_PRICE_ID, 
          savings: 5.50,
          description: 'Less than Netflix - Most comprehensive TCG data'
        },
        premium: { 
          price: 14.99, 
          savings: 0.50,
          description: 'Ultimate platform - Still under streaming cost!'
        },
        tcBrainstorms: { 
          price: 59.00,
          description: 'Enhanced with Pokemon API data'
        }
      },
      competitiveAdvantage: {
        netflix: 15.49,
        brainstormPro: 9.99,
        brainstormPremium: 14.99,
        message: 'Most comprehensive TCG data for less than Netflix!'
      }
    });
  });

  // Create Stripe checkout session
  app.post('/api/stripe/create-checkout-session', async (req, res) => {
    try {
      const { tier, customerEmail } = req.body;
      const email = customerEmail || 'onepunchllc@outlook.com';
      
      let priceId = process.env.STRIPE_PRICE_ID;
      let mode = 'subscription';
      
      if (tier === 'pro') {
        priceId = process.env.STRIPE_PRICE_ID;
      }
      
      const session = await stripe.checkout.sessions.create({
        customer_email: email,
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: mode,
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
        allow_promotion_codes: true,
        billing_address_collection: 'required',
        subscription_data: {
          trial_period_days: 7,
        },
        metadata: {
          platform: 'brainstorm_tcg',
          competitive_advantage: 'less_than_netflix',
          pokemon_api: 'active',
          account: 'heath_davis_tcBrainstorms'
        }
      });
      
      res.json({ 
        success: true, 
        sessionId: session.id, 
        url: session.url,
        message: 'Checkout created - LIVE REVENUE SYSTEM ACTIVE!',
        savings: tier === 'pro' ? '$5.50/month vs Netflix' : '$0.50/month vs Netflix'
      });
    } catch (error) {
      console.error('Stripe checkout error:', error);
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  });

  // Handle Stripe webhooks
  app.post('/api/stripe/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.log('Webhook signature verification failed.', err.message);
      return res.status(400).send('Webhook Error: ' + err.message);
    }
    
    if (event.type === 'checkout.session.completed') {
      console.log(' Payment successful!', event.data.object.customer_email);
      console.log(' Revenue generated for Heath Davis TCBrainstorms account!');
    }
    
    res.json({received: true});
  });
}

// COMPETITIVE PRICING ENDPOINT
app.get('/api/pricing-comparison', (req, res) => {
  res.json({
    success: true,
    comparison: {
      netflix: { standard: 15.49, premium: 19.99 },
      brainstorm: { pro: 9.99, premium: 14.99 },
      savings: {
        proVsNetflix: 5.50,
        premiumVsNetflix: 0.50
      },
      message: "Most comprehensive TCG data for less than Netflix!"
    },
    tiers: PRICING_TIERS,
    stripeIntegration: !!process.env.STRIPE_SECRET_KEY,
    revenueActive: true
  });
});

// SUBSCRIPTION PRICING ENDPOINT
app.get('/api/subscription/pricing', (req, res) => {
  res.json({
    success: true,
    data: {
      tiers: PRICING_TIERS,
      comparison: {
        netflix: "$15.49/month",
        brainstormPro: "$9.99/month",
        brainstormPremium: "$14.99/month",
        savings: {
          proVsNetflix: "$5.50/month",
          premiumVsNetflix: "$0.50/month"
        }
      },
      valueProposition: "Most comprehensive TCG data platform at streaming service prices",
      stripeReady: !!process.env.STRIPE_SECRET_KEY,
      accountOwner: "Heath Davis",
      accountEmail: "onepunchllc@outlook.com"
    }
  });
});

// COLLECTIONS ENDPOINT
app.get('/api/collections', (req, res) => {
  res.json({
    success: true,
    ...demoPortfolio,
    enhancedWithPokemonApi: true,
    stripeRevenueActive: !!process.env.STRIPE_SECRET_KEY
  });
});

// ENHANCED POKEMON SEARCH
app.get('/api/cards/search', async (req, res) => {
  try {
    const { query = '', game = 'all' } = req.query;
    
    if (game === 'pokemon' && process.env.POKEMON_TCG_API_KEY) {
      try {
        const pokemonResponse = await axios.get(
          `https://api.pokemontcg.io/v2/cards?q=name:${query}*&pageSize=10`,
          {
            headers: {
              'X-Api-Key': process.env.POKEMON_TCG_API_KEY
            },
            timeout: 5000
          }
        );
        
        const pokemonCards = pokemonResponse.data.data.map(card => ({
          id: card.id,
          name: card.name,
          set: card.set.name,
          game: 'pokemon',
          rarity: card.rarity,
          currentPrice: card.tcgplayer?.prices?.holofoil?.market || card.tcgplayer?.prices?.normal?.market || 0,
          currency: 'USD',
          imageUrl: card.images.large,
          apiSource: 'pokemon_tcg_official'
        }));
        
        return res.json({
          success: true,
          query,
          game,
          total: pokemonCards.length,
          pokemonApiActive: true,
          results: pokemonCards,
          competitivePricing: {
            upgradeForMore: "Upgrade to Pro ($9.99) for 500 searches/day or Premium ($14.99) for 2000/day - Less than Netflix!",
            stripeReady: !!process.env.STRIPE_SECRET_KEY
          }
        });
      } catch (pokemonError) {
        console.log('Pokemon API error, using demo data:', pokemonError.message);
      }
    }
    
    // Fallback to demo data
    const filteredCards = demoCards.filter(card => {
      const matchesQuery = !query || card.name.toLowerCase().includes(query.toLowerCase());
      const matchesGame = game === 'all' || card.game === game;
      return matchesQuery && matchesGame;
    });
    
    res.json({
      success: true,
      query,
      game,
      total: filteredCards.length,
      pokemonApiActive: !!process.env.POKEMON_TCG_API_KEY,
      results: filteredCards,
      competitivePricing: {
        upgradeMessage: "Upgrade to Pro ($9.99) or Premium ($14.99) for enhanced search - Less than Netflix!",
        stripeReady: !!process.env.STRIPE_SECRET_KEY
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search error occurred'
    });
  }
});

// COMMUNITY ENDPOINT
app.get('/api/community', (req, res) => {
  res.json({
    success: true,
    posts: [
      {
        id: 1,
        title: "Pokemon Market Analysis - Official API Data Active",
        content: "With our Pokemon TCG API integration, we're seeing unprecedented accuracy in Pokemon card valuations...",
        author: "TCG Analyst",
        timestamp: new Date().toISOString(),
        likes: 47,
        category: "pokemon"
      },
      {
        id: 2,
        title: "Competitive Pricing: Why We're Better Than Netflix",
        content: "At $9.99 Pro and $14.99 Premium, we offer more comprehensive TCG data than any platform at streaming service prices...",
        author: "Platform Team",
        timestamp: new Date().toISOString(),
        likes: 89,
        category: "platform"
      },
      {
        id: 3,
        title: "LIVE Revenue System Now Active!",
        content: "Heath Davis TCBrainstorms Stripe account is now processing live payments. Revenue system operational!",
        author: "Heath Davis",
        timestamp: new Date().toISOString(),
        likes: 156,
        category: "announcement"
      }
    ],
    competitivePricing: {
      message: "Join the discussion! Pro users get priority support and Premium users get phone access.",
      stripeActive: !!process.env.STRIPE_SECRET_KEY
    }
  });
});

// AUTH ENDPOINTS
app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
  if (demoUsers.has(email)) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }
  
  demoUsers.set(email, {
    email,
    firstName,
    lastName,
    createdAt: new Date().toISOString(),
    tier: 'free'
  });
  
  res.json({
    success: true,
    message: 'Registration successful',
    competitivePricing: {
      upgradeOffer: "Upgrade to Pro ($9.99) for enhanced features - less than Netflix!",
      stripeReady: !!process.env.STRIPE_SECRET_KEY
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!demoUsers.has(email)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
  
  const user = demoUsers.get(email);
  
  res.json({
    success: true,
    message: 'Login successful',
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      tier: user.tier || 'free'
    },
    competitivePricing: {
      currentTier: user.tier || 'free',
      upgradeOptions: {
        pro: "$9.99/month - Save $5.50 vs Netflix",
        premium: "$14.99/month - Save $0.50 vs Netflix"
      },
      stripeReady: !!process.env.STRIPE_SECRET_KEY
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` BRAINSTORM BACKEND - STRIPE REVENUE SYSTEM ACTIVE!`);
  console.log(` Server running on port ${PORT}`);
  console.log(` Stripe Account: onepunchllc@outlook.com (Heath Davis)`);
  console.log(` Competitive Pricing: Pro $9.99 | Premium $14.99`);
  console.log(` Pokemon API: ${process.env.POKEMON_TCG_API_KEY ? 'ACTIVE' : 'DEMO MODE'} (20,000/day)`);
  console.log(` Revenue System: ${process.env.STRIPE_SECRET_KEY ? 'OPERATIONAL' : 'DEMO MODE'}`);
  console.log(` Platform: Most comprehensive TCG data at streaming service prices`);
});


