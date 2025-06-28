// BRAINSTORM COMPETITIVE PRICING STRATEGY
// Less expensive than Netflix, more comprehensive than competitors

const PRICING_TIERS = {
  free: {
    price: 0,
    name: "Starter",
    stripePrice: null,
    description: "Perfect for casual collectors getting started",
    features: [
      'Basic portfolio tracking (up to $5K value)',
      'Limited Pokemon searches (50/day)',
      'Community access and discussions',
      'Basic price alerts (3 active)',
      'Mobile app access'
    ],
    limits: { 
      cards: 50, 
      pokemonSearches: 50,
      portfolioValue: 5000,
      priceAlerts: 3
    }
  },
  pro: {
    price: 9.99,
    name: "Pro",
    stripePrice: "price_pro_999",
    popular: true,
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
    limits: { 
      cards: 500, 
      pokemonSearches: 500,
      portfolioValue: 50000,
      priceAlerts: 25,
      exports: 50
    },
    valueProps: [
      'Cheaper than Netflix ($15.49)',
      'Official Pokemon TCG API data',
      'Professional analytics tools'
    ]
  },
  premium: {
    price: 14.99,
    name: "Premium",
    stripePrice: "price_premium_1499",
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
    limits: { 
      cards: 'unlimited', 
      pokemonSearches: 2000,
      priceAlerts: 'unlimited',
      apiCalls: 1000,
      fileProcessing: 'included'
    },
    valueProps: [
      'Still cheaper than Netflix Premium',
      'Includes $59/file TC Brainstorms service',
      'Full Pokemon API quota (2000/day)',
      'Professional-grade features'
    ]
  }
};

// Competitive pricing analysis
const COMPETITOR_PRICING = {
  netflix: { standard: 15.49, premium: 19.99 },
  spotify: { premium: 10.99 },
  adobe: { creative: 20.99 },
  brainstorm: { pro: 9.99, premium: 14.99 }
};

module.exports = { PRICING_TIERS, COMPETITOR_PRICING };






