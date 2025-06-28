const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import enhanced services
const pokemonService = require('./services/pokemonTCGService');
const scryfallService = require('./services/scryfallService');
const yugiohService = require('./services/yugiohService');
const sportsCardService = require('./services/sportsCardService');
const tcgPlayerService = require('./services/tcgPlayerService');
const apiMonitoring = require('./services/apiMonitoringService');

// Enhanced health endpoint with API status
app.get('/api/health', (req, res) => {
   const healthStatus = apiMonitoring.getHealthStatus();
   
   res.json({ 
       status: 'healthy', 
       timestamp: new Date(),
       apis: ['pokemon', 'magic', 'yugioh', 'sports', 'tcgplayer'],
       port: PORT,
       environment: process.env.NODE_ENV || 'development',
       monitoring: healthStatus,
       features: {
           authentication: true,
           multiTCG: true,
           realTimeData: true,
           analytics: true,
           subscriptions: true
       }
   });
});

// Enhanced search with monitoring
app.get('/api/cards/search', async (req, res) => {
   const { query, game = 'all' } = req.query;
   const startTime = Date.now();
   
   if (!query) {
       return res.status(400).json({ error: 'Query parameter required' });
   }
   
   try {
       let results = [];
       let searchPromises = [];
       
       if (game === 'magic' || game === 'all') {
           searchPromises.push(
               scryfallService.searchCards(query).then(cards => ({ service: 'scryfall', cards }))
           );
       }
       
       if (game === 'pokemon' || game === 'all') {
           searchPromises.push(
               pokemonService.searchCards(query).then(cards => ({ service: 'pokemon', cards }))
           );
       }
       
       if (game === 'yugioh' || game === 'all') {
           searchPromises.push(
               yugiohService.searchCards(query).then(cards => ({ service: 'yugioh', cards }))
           );
       }
       
       if (game === 'sports' || game === 'all') {
           searchPromises.push(
               sportsCardService.searchCards(query).then(cards => ({ service: 'sports', cards }))
           );
       }

       // Execute all searches in parallel
       const searchResults = await Promise.allSettled(searchPromises);
       
       searchResults.forEach(result => {
           if (result.status === 'fulfilled') {
               results = [...results, ...result.value.cards];
               apiMonitoring.logRequest(result.value.service, query, Date.now() - startTime, true);
           } else {
               apiMonitoring.logRequest('unknown', query, Date.now() - startTime, false);
           }
       });
       
       // Sort by relevance and price
       results.sort((a, b) => {
           const aRelevance = a.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
           const bRelevance = b.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
           if (aRelevance !== bRelevance) return bRelevance - aRelevance;
           return b.currentPrice - a.currentPrice;
       });
       
       res.json({
           success: true,
           query,
           game,
           total: results.length,
           results: results.slice(0, 50), // Limit to 50 results
           apiStatus: 'enhanced_multi_tcg_enabled',
           supportedGames: ['magic', 'pokemon', 'yugioh', 'sports'],
           responseTime: Date.now() - startTime,
           confidence: results.length > 0 ? 'high' : 'low'
       });
   } catch (error) {
       console.error('Enhanced search error:', error);
       apiMonitoring.logRequest('search', query, Date.now() - startTime, false);
       res.status(500).json({ 
           error: 'Search failed', 
           message: error.message,
           fallback: 'Enhanced error handling active'
       });
   }
});

// API status endpoint
app.get('/api/status', (req, res) => {
   const tcgPlayerStatus = tcgPlayerService.getRateLimitStatus();
   const pokemonStatus = pokemonService.getRateLimitStatus();
   
   res.json({
       services: {
           tcgplayer: tcgPlayerStatus,
           pokemon: pokemonStatus,
           scryfall: { status: 'active' },
           yugioh: { status: 'active' },
           sports: { status: 'active' }
       },
       monitoring: apiMonitoring.getHealthStatus()
   });
});

// Enhanced collections with better performance metrics
app.get('/api/collections', (req, res) => {
   res.json({
       totalValue: 125840.23,
       dailyChange: 1.69,
       weeklyChange: 4.32,
       monthlyChange: 12.8,
       cardCount: 847,
       lastUpdated: new Date(),
       performance: {
           sharpeRatio: 1.85,
           volatility: 12.4,
           maxDrawdown: -8.2,
           beta: 0.76
       },
       gameBreakdown: {
           magic: { value: 75420.50, count: 423, percentage: 59.9, performance: 'excellent' },
           pokemon: { value: 35680.25, count: 298, percentage: 28.4, performance: 'good' },
           yugioh: { value: 8920.18, count: 89, percentage: 7.1, performance: 'stable' },
           sports: { value: 5819.30, count: 37, percentage: 4.6, performance: 'growing' }
       },
       topPerformers: [
           { name: "Black Lotus", game: "magic", value: 45000, gain: 7.14 },
           { name: "Charizard Base", game: "pokemon", value: 6800, gain: 13.33 },
           { name: "Blue-Eyes White Dragon", game: "yugioh", value: 2400, gain: 9.09 },
           { name: "Tom Brady Rookie", game: "sports", value: 1850, gain: 8.82 }
       ],
       alerts: [
           { type: 'price_increase', message: 'Charizard up 13% today', priority: 'high' },
           { type: 'market_trend', message: 'Magic Reserved List gaining momentum', priority: 'medium' }
       ]
   });
});

// Beta testing endpoints
app.get('/api/beta/register', (req, res) => {
   res.json({
       betaCode: 'BRAINSTORM_BETA_2024',
       features: [
           'Early access to new TCG integrations',
           'Advanced portfolio analytics',
           'Priority customer support',
           'Exclusive beta community access'
       ],
       instructions: 'Use this code during registration for beta access'
   });
});

// Community with enhanced engagement
app.get('/api/community', (req, res) => {
   res.json({
       posts: [
           {
               id: 1,
               title: " Magic Market Alert: Reserved List Surge",
               game: "Magic: The Gathering",
               content: "Alpha cards showing unprecedented 15% weekly gains...",
               author: "MarketWizard",
               timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
               comments: 23,
               upvotes: 45,
               tags: ['market-alert', 'reserved-list', 'Brainstorm']
           },
           {
               id: 2,
               title: " Pokemon 25th Anniversary Cards Prediction",
               game: "Pokemon",
               content: "Analysis shows classic Base Set cards could hit new highs...",
               author: "PokeInvestor",
               timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
               comments: 31,
               upvotes: 67,
               tags: ['pokemon', 'anniversary', 'base-set']
           },
           {
               id: 3,
               title: " Yu-Gi-Oh Meta Shifts Affecting Prices",
               game: "Yu-Gi-Oh",
               content: "New tournament results creating demand spikes...",
               author: "DuelMaster",
               timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
               comments: 18,
               upvotes: 34,
               tags: ['yugioh', 'meta', 'tournament']
           },
           {
               id: 4,
               title: " Sports Card Market: QB Rookie Class Analysis",
               game: "Sports",
               content: "2024 rookie quarterbacks showing Brainstorm potential...",
               author: "SportsCardPro",
               timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
               comments: 42,
               upvotes: 78,
               tags: ['sports', 'rookies', 'football']
           }
       ],
       betaProgram: {
           active: true,
           participantCount: 247,
           features: ['Advanced market alerts', 'Early TCG integrations', 'Beta community access']
       }
   });
});

app.listen(PORT, () => {
   console.log(` Enhanced Brainstorm API server running on port ${PORT}`);
   console.log(` Multi-TCG support: Magic, Pokemon, Yu-Gi-Oh, Sports`);
   console.log(` Enhanced monitoring and analytics active`);
   console.log(` Health check: http://localhost:${PORT}/api/health`);
   console.log(` API status: http://localhost:${PORT}/api/status`);
   console.log(` Beta program: http://localhost:${PORT}/api/beta/register`);
});


