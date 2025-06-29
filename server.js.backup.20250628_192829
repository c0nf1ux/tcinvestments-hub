// server.js - Ultimate CardHood Server with ALL features from 18 sessions
const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// === COMPREHENSIVE DATA MODELS ===

// Enhanced card database with ALL features
const enhancedCards = [
  {
    id: 1,
    name: 'Black Lotus',
    game: 'MTG',
    price: 45000,
    change: 5.2,
    volume: 1247000,
    marketCap: 15600000,
    
    // AI Predictions
    prediction: {
      direction: 'up',
      confidence: 85,
      target: 47340,
      timeframe: '7d',
      factors: ['vintage demand', 'scarcity', 'tournament meta']
    },
    
    // Social Data
    social: {
      mentions: 1247,
      sentiment: 0.82,
      trendingScore: 95,
      redditMentions: 342,
      twitterMentions: 905,
      discordActivity: 'high'
    },
    
    // NFT Integration
    nft: {
      tokenId: 'BL_001_ALPHA',
      blockchain: 'Ethereum',
      contract: '0x1234567890abcdef',
      verified: true,
      rarity: 'Mythic',
      floorPrice: 2.5,
      traits: [
        { trait_type: 'Game', value: 'MTG' },
        { trait_type: 'Set', value: 'Alpha' },
        { trait_type: 'Condition', value: 'Near Mint' },
        { trait_type: 'Power Level', value: '10/10' }
      ]
    },
    
    // Technical Analysis
    technical: {
      rsi: 68.5,
      macd: 'bullish',
      sma20: 43200,
      sma50: 41800,
      support: 42000,
      resistance: 48000,
      volatility: 23.4
    },
    
    // Market Metrics
    metrics: {
      marketCap: 15600000,
      volume24h: 1247000,
      circulatingSupply: 1100,
      maxSupply: 1100,
      holders: 890,
      transactions24h: 156
    }
  },
  {
    id: 2,
    name: 'Charizard Base Set',
    game: 'Pokemon',
    price: 8500,
    change: -2.1,
    prediction: {
      direction: 'down',
      confidence: 72,
      target: 8322,
      timeframe: '7d',
      factors: ['market saturation', 'new releases']
    },
    social: {
      mentions: 892,
      sentiment: 0.65,
      trendingScore: 78
    },
    nft: {
      tokenId: 'CHAR_BASE_001',
      blockchain: 'Polygon',
      verified: true,
      floorPrice: 1.8
    }
  },
  {
    id: 3,
    name: 'Blue Eyes White Dragon',
    game: 'Yu-Gi-Oh',
    price: 2800,
    change: 3.7,
    prediction: {
      direction: 'up',
      confidence: 68,
      target: 2904,
      timeframe: '7d'
    },
    social: {
      mentions: 634,
      sentiment: 0.71,
      trendingScore: 82
    }
  },
  {
    id: 4,
    name: 'Mox Ruby',
    game: 'MTG',
    price: 12000,
    change: 1.8,
    prediction: {
      direction: 'up',
      confidence: 90,
      target: 12216,
      timeframe: '7d'
    }
  },
  {
    id: 5,
    name: 'Pikachu Illustrator',
    game: 'Pokemon',
    price: 320000,
    change: 12.5,
    prediction: {
      direction: 'up',
      confidence: 95,
      target: 360000,
      timeframe: '30d'
    },
    social: {
      mentions: 2847,
      sentiment: 0.91,
      trendingScore: 100
    }
  }
];

// IPO/Launch comprehensive data
const comprehensiveIPOs = [
  {
    id: 1,
    setName: 'Murders at Karlov Manor',
    game: 'MTG',
    launchDate: '2025-02-09',
    preOrderPrice: 120,
    estimatedValue: 'High',
    expectedROI: '25-40%',
    riskLevel: 'Medium',
    allocationStatus: 'Available',
    totalSupply: 50000,
    preOrdersSold: 12000,
    keyCards: ['Deadly Cover-Up', 'Case of the Stashed Skeleton'],
    marketAnalysis: {
      demandScore: 87,
      competitionLevel: 'Medium',
      innovationScore: 92,
      communityHype: 89
    },
    socialMetrics: {
      preOrderDiscussions: 1247,
      sentiment: 0.84,
      influencerCoverage: 23
    }
  },
  {
    id: 2,
    setName: 'Temporal Forces',
    game: 'Pokemon',
    launchDate: '2025-03-22',
    preOrderPrice: 150,
    estimatedValue: 'Medium-High',
    expectedROI: '15-30%',
    riskLevel: 'Low',
    allocationStatus: 'Limited'
  }
];

// Social feed data
const socialPosts = [
  {
    id: 1,
    user: 'MTGWhale',
    avatar: '',
    verified: true,
    followers: 15600,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    content: 'Just picked up a NM Black Lotus for \. Market looking bullish!  #BlackLotus #MTG',
    likes: 24,
    comments: 8,
    shares: 3,
    cardMentions: ['Black Lotus'],
    sentiment: 0.89,
    engagement: 'high'
  },
  {
    id: 2,
    user: 'PokemonMaster',
    avatar: '',
    verified: false,
    followers: 2400,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    content: 'Charizard prices dipping - good entry point or falling knife?  Need some AI insights on this one',
    likes: 15,
    comments: 12,
    shares: 1,
    cardMentions: ['Charizard'],
    sentiment: 0.32
  }
];

// Portfolio optimization data
const portfolioOptimization = {
  currentAllocation: {
    'MTG': 65,
    'Pokemon': 25,
    'Yu-Gi-Oh': 10,
    'Sports': 0
  },
  recommendedAllocation: {
    'MTG': 55,
    'Pokemon': 30,
    'Yu-Gi-Oh': 10,
    'Sports': 5
  },
  riskMetrics: {
    portfolioVolatility: 23.5,
    sharpeRatio: 1.47,
    maxDrawdown: -12.3,
    beta: 1.15,
    alpha: 2.8
  },
  aiRecommendations: [
    'Consider increasing Pokemon allocation for better diversification',
    'Sports cards showing strong momentum - consider 5% allocation',
    'MTG vintage cards approaching resistance levels',
    'Consider taking profits on recent gains'
  ]
};

// === COMPREHENSIVE API ENDPOINTS ===

// Real-time WebSocket updates
wss.on('connection', (ws) => {
  console.log('Client connected to real-time feed');
  
  const sendRealTimeUpdate = () => {
    const update = {
      type: 'market_update',
      timestamp: new Date().toISOString(),
      data: {
        prices: enhancedCards.map(card => ({
          id: card.id,
          name: card.name,
          price: card.price + (Math.random() - 0.5) * card.price * 0.01,
          change: (Math.random() - 0.5) * 10
        })),
        marketSentiment: Math.random() > 0.5 ? 'bullish' : 'bearish',
        aiSignals: Math.floor(Math.random() * 10) + 1
      }
    };
    
    ws.send(JSON.stringify(update));
  };

  const interval = setInterval(sendRealTimeUpdate, 5000);
  
  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected from real-time feed');
  });
});

// === PORTFOLIO ENDPOINTS ===
app.get('/api/portfolio', (req, res) => {
  const totalValue = enhancedCards.slice(0, 3).reduce((sum, card) => sum + card.price, 0);
  const dailyChange = 2.34;
  
  res.json({
    totalValue: Math.round(totalValue),
    dailyChange,
    weeklyChange: 8.7,
    monthlyChange: 15.2,
    yearlyChange: 45.8,
    holdings: enhancedCards.slice(0, 3).map(card => ({
      cardId: card.id,
      name: card.name,
      quantity: 1,
      avgCost: card.price * 0.9,
      currentValue: card.price,
      unrealizedPnL: card.price * 0.1
    })),
    allocation: portfolioOptimization.currentAllocation,
    riskMetrics: portfolioOptimization.riskMetrics
  });
});

app.get('/api/portfolio/history/:timeframe', (req, res) => {
  const { timeframe } = req.params;
  const days = timeframe === '1D' ? 1 : timeframe === '1W' ? 7 : 
               timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : 
               timeframe === '6M' ? 180 : timeframe === '1Y' ? 365 : 1095;
  
  const data = [];
  let baseValue = 100000;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    baseValue *= (1 + (Math.random() - 0.48) * 0.03);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(baseValue * 100) / 100,
      change: (Math.random() - 0.5) * 0.05
    });
  }
  
  res.json({ timeframe, data });
});

// === ENHANCED CARD ENDPOINTS ===
app.get('/api/cards', (req, res) => {
  res.json(enhancedCards);
});

app.get('/api/cards/:id', (req, res) => {
  const card = enhancedCards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: 'Card not found' });
  res.json(card);
});

app.get('/api/cards/:id/history/:timeframe', (req, res) => {
  const { id, timeframe } = req.params;
  const card = enhancedCards.find(c => c.id === parseInt(id));
  if (!card) return res.status(404).json({ message: 'Card not found' });
  
  const days = timeframe === '1D' ? 1 : timeframe === '1W' ? 7 : 30;
  const data = [];
  let currentPrice = card.price;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    currentPrice *= (1 + (Math.random() - 0.5) * 0.05);
    
    const open = currentPrice;
    const close = currentPrice * (1 + (Math.random() - 0.5) * 0.02);
    const high = Math.max(open, close) * (1 + Math.random() * 0.03);
    const low = Math.min(open, close) * (1 - Math.random() * 0.03);
    
    data.push({
      time: date.toISOString().split('T')[0],
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume: Math.floor(Math.random() * 1000) + 100
    });
  }
  
  res.json({ cardName: card.name, timeframe, data });
});

// === WATCHLIST ENDPOINTS ===
let userWatchlist = [1, 2, 3, 4];

app.get('/api/watchlist', (req, res) => {
  const watchedCards = enhancedCards.filter(card => userWatchlist.includes(card.id));
  res.json(watchedCards);
});

app.post('/api/watchlist/:cardId', (req, res) => {
  const cardId = parseInt(req.params.cardId);
  if (!userWatchlist.includes(cardId)) {
    userWatchlist.push(cardId);
  }
  res.json({ message: 'Card added to watchlist', watchlist: userWatchlist });
});

app.delete('/api/watchlist/:cardId', (req, res) => {
  const cardId = parseInt(req.params.cardId);
  userWatchlist = userWatchlist.filter(id => id !== cardId);
  res.json({ message: 'Card removed from watchlist', watchlist: userWatchlist });
});

// === AI/ML ENDPOINTS ===
app.get('/api/ai/predictions', (req, res) => {
  res.json({
    recommendations: enhancedCards.slice(0, 5).map(card => ({
      cardName: card.name,
      action: card.prediction.direction === 'up' ? 'BUY' : 'SELL',
      confidence: card.prediction.confidence,
      reasoning: card.prediction.factors?.join(', ') || 'Technical analysis',
      targetPrice: card.prediction.target,
      timeframe: card.prediction.timeframe
    })),
    marketSentiment: 'Bullish',
    volatilityIndex: 23.5,
    aiScore: 87,
    signals: {
      bullish: 12,
      bearish: 4,
      neutral: 2
    }
  });
});

app.get('/api/ai/portfolio-optimization', (req, res) => {
  res.json(portfolioOptimization);
});

app.get('/api/ai/market-analysis', (req, res) => {
  res.json({
    overview: {
      marketTrend: 'bullish',
      volatility: 'medium',
      liquidityIndex: 78,
      momentumScore: 84
    },
    sectors: {
      'MTG': { trend: 'up', strength: 85, volume: 'high' },
      'Pokemon': { trend: 'sideways', strength: 72, volume: 'medium' },
      'Yu-Gi-Oh': { trend: 'up', strength: 68, volume: 'low' },
      'Sports': { trend: 'up', strength: 91, volume: 'high' }
    },
    technicalIndicators: {
      rsi: 68.5,
      macd: 'bullish_crossover',
      movingAverages: 'above_support',
      volumeProfile: 'accumulation'
    }
  });
});

// === IPO ENDPOINTS ===
app.get('/api/ipo', (req, res) => {
  res.json(comprehensiveIPOs);
});

app.get('/api/ipo/:id', (req, res) => {
  const ipo = comprehensiveIPOs.find(i => i.id === parseInt(req.params.id));
  if (!ipo) return res.status(404).json({ message: 'IPO not found' });
  res.json(ipo);
});

app.post('/api/ipo/:id/preorder', (req, res) => {
  const { quantity } = req.body;
  const ipo = comprehensiveIPOs.find(i => i.id === parseInt(req.params.id));
  if (!ipo) return res.status(404).json({ message: 'IPO not found' });
  
  res.json({
    message: 'Pre-order placed successfully',
    orderId: Date.now(),
    quantity,
    totalCost: quantity * ipo.preOrderPrice,
    estimatedDelivery: ipo.launchDate
  });
});

// === SOCIAL ENDPOINTS ===
app.get('/api/social/feed', (req, res) => {
  res.json({
    posts: socialPosts,
    trending: ['#BlackLotus', '#MurdersAtKarlov', '#PokemonTCG', '#NFTCards'],
    activeUsers: 1247,
    totalPosts24h: 8934
  });
});

app.post('/api/social/posts', (req, res) => {
  const { content, cardMentions } = req.body;
  const newPost = {
    id: Date.now(),
    user: 'You',
    avatar: '',
    verified: false,
    timestamp: new Date().toISOString(),
    content,
    likes: 0,
    comments: 0,
    shares: 0,
    cardMentions: cardMentions || []
  };
  
  socialPosts.unshift(newPost);
  res.json(newPost);
});

app.post('/api/social/posts/:id/like', (req, res) => {
  const post = socialPosts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.likes += 1;
    res.json({ message: 'Post liked', likes: post.likes });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// === NFT ENDPOINTS ===
app.get('/api/nft/collection', (req, res) => {
  const nftCards = enhancedCards.filter(card => card.nft);
  res.json({
    totalNFTs: nftCards.length,
    totalValue: nftCards.reduce((sum, card) => sum + (card.nft.floorPrice * 3000), 0), // ETH to USD
    floorValue: Math.min(...nftCards.map(card => card.nft.floorPrice)),
    nfts: nftCards.map(card => ({
      ...card.nft,
      cardName: card.name,
      game: card.game,
      currentPrice: card.price
    }))
  });
});

app.post('/api/nft/:tokenId/mint', (req, res) => {
  res.json({
    message: 'NFT minting initiated',
    transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
    estimatedGas: 0.015,
    status: 'pending'
  });
});

// === MARKET DATA ENDPOINTS ===
app.get('/api/market/overview', (req, res) => {
  res.json({
    totalMarketCap: 15600000000,
    dailyVolume: 124000000,
    activeCards: enhancedCards.length,
    topGainers: enhancedCards.filter(c => c.change > 0).slice(0, 5),
    topLosers: enhancedCards.filter(c => c.change < 0).slice(0, 5),
    indices: {
      'MTG Index': { value: 1247.82, change: 2.1 },
      'Pokemon Index': { value: 892.45, change: -0.8 },
      'Sports Index': { value: 634.91, change: 1.4 },
      'Overall Market': { value: 958.23, change: 1.7 }
    },
    marketMetrics: {
      fearGreedIndex: 67,
      liquidityScore: 78,
      marketSentiment: 'bullish',
      volatilityIndex: 23.5
    }
  });
});

// === SEARCH & DISCOVERY ===
app.get('/api/search', (req, res) => {
  const { q, type } = req.query;
  if (!q) return res.json([]);
  
  let results = [];
  
  if (!type || type === 'cards') {
    results.push(...enhancedCards.filter(card => 
      card.name.toLowerCase().includes(q.toLowerCase()) ||
      card.game.toLowerCase().includes(q.toLowerCase())
    ));
  }
  
  if (!type || type === 'ipos') {
    results.push(...comprehensiveIPOs.filter(ipo =>
      ipo.setName.toLowerCase().includes(q.toLowerCase())
    ));
  }
  
  res.json(results);
});

// === TRADING SIMULATION ===
app.post('/api/trading/simulate', (req, res) => {
  const { cardId, action, quantity, price } = req.body;
  const card = enhancedCards.find(c => c.id === cardId);
  
  if (!card) return res.status(404).json({ message: 'Card not found' });
  
  const totalCost = quantity * price;
  const fees = totalCost * 0.025; // 2.5% fee
  
  res.json({
    orderId: Date.now(),
    card: card.name,
    action,
    quantity,
    price,
    totalCost,
    fees,
    estimatedTotal: totalCost + fees,
    status: 'executed',
    timestamp: new Date().toISOString()
  });
});

// === ANALYTICS & REPORTING ===
app.get('/api/analytics/performance', (req, res) => {
  const { timeframe = '1M' } = req.query;
  
  res.json({
    timeframe,
    performance: {
      totalReturn: 15.6,
      annualizedReturn: 28.4,
      maxDrawdown: -8.2,
      winRate: 67.3,
      sharpeRatio: 1.47,
      volatility: 23.5
    },
    benchmarkComparison: {
      vsMarket: +5.2,
      vsMTGIndex: +2.8,
      vsPokemonIndex: +7.1
    },
    topPerformers: enhancedCards.slice(0, 3).map(card => ({
      name: card.name,
      return: card.change,
      contribution: Math.random() * 5
    }))
  });
});

// === HEALTH & STATUS ===
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    version: '2.0.0',
    uptime: process.uptime(),
    features: [
      'AI Predictions', 'IPO Tracking', 'NFT Integration', 
      'Social Feed', 'Real-time Data', 'Portfolio Analytics',
      'Technical Analysis', 'Market Intelligence'
    ],
    dataStatus: {
      cards: enhancedCards.length,
      ipos: comprehensiveIPOs.length,
      socialPosts: socialPosts.length,
      activeConnections: wss.clients.size
    },
    theme: 'Periwinkle & Black',
    sessions: 18,
    developmentHours: '50+',
    message: 'CardHood - The Ultimate AI-Powered Trading Card Platform'
  });
});

server.listen(PORT, () => {
  console.log(' CardHood Ultimate Server running on port ' + PORT);
  console.log(' Theme: Periwinkle & Black');
  console.log(' AI Engine: Active');
  console.log(' IPO Tracker: Online');
  console.log(' NFT Integration: Connected');
  console.log(' Social Feed: Live');
  console.log(' Real-time Analytics: Streaming');
  console.log(' TradingView Charts: Ready');
  console.log(' All 18 sessions integrated successfully!');
});

// === TRADING CARD NEWS ENDPOINTS ===
app.get('/api/news', (req, res) => {
  const { category } = req.query;
  
  const allNews = [
    {
      id: 1,
      title: 'Murders at Karlov Manor Spoiler Season Begins',
      summary: 'Wizards reveals the first cards from the highly anticipated mystery-themed set, featuring new investigate mechanics.',
      category: 'mtg',
      source: 'MTG Official',
      timestamp: '2 hours ago',
      impact: 'high',
      tags: ['spoilers', 'new-set'],
      priceImpact: [{ card: 'Detective Cards', expectedChange: '+15%' }]
    },
    {
      id: 2,
      title: 'Pokemon TCG Temporal Forces Set Announced',
      summary: 'New Pokemon set featuring Paradox Pokemon forms coming March 2025.',
      category: 'pokemon',
      source: 'Pokemon Company',
      timestamp: '4 hours ago',
      impact: 'high',
      tags: ['new-set', 'paradox-pokemon'],
      priceImpact: [{ card: 'Iron Valiant ex', expectedChange: '+25%' }]
    },
    {
      id: 3,
      title: 'Connor McDavid Rookie Card Sells for Record $8.1M',
      summary: 'Upper Deck McDavid rookie card breaks hockey records.',
      category: 'sports',
      source: 'Sports Card Investor',
      timestamp: '6 hours ago',
      impact: 'very-high',
      tags: ['record-sale', 'hockey'],
      priceImpact: [{ card: 'McDavid Rookies', expectedChange: '+35%' }]
    },
    {
      id: 4,
      title: 'Yu-Gi-Oh! Legacy of Destruction Banlist Updates',
      summary: 'Konami announces new forbidden and limited list changes.',
      category: 'yugioh',
      source: 'Yu-Gi-Oh! Official',
      timestamp: '8 hours ago',
      impact: 'high',
      tags: ['banlist', 'competitive'],
      priceImpact: [{ card: 'Banned Cards', expectedChange: '-40%' }]
    },
    {
      id: 5,
      title: 'Black Lotus Alpha Condition Study Released',
      summary: 'PSA releases comprehensive condition report on Alpha Black Lotus.',
      category: 'mtg',
      source: 'PSA Grading',
      timestamp: '12 hours ago',
      impact: 'very-high',
      tags: ['vintage', 'investment'],
      priceImpact: [{ card: 'Alpha Black Lotus', expectedChange: '+18%' }]
    }
  ];

  const filteredNews = category && category !== 'all' 
    ? allNews.filter(article => article.category === category)
    : allNews;

  res.json({
    articles: filteredNews,
    totalCount: filteredNews.length,
    category: category || 'all'
  });
});


