const express = require('express');
const cardController = require('../controllers/cardController');
const router = express.Router();

// Card search routes
router.get('/cards/search', cardController.searchAllPlatforms);
router.post('/cards/prices', cardController.getCardPrices);

// Health check
router.get('/health', (req, res) => {
 res.json({ 
   status: 'operational',
   timestamp: new Date().toISOString(),
   services: {
     tcgplayer: 'ready',
     pokemon: 'ready',
     sports: 'ready'
   }
 });
});

// Mock portfolio data (enhanced)
router.get('/collections', (req, res) => {
 res.json({
   totalValue: 125840.23,
   dailyChange: 1.69,
   cards: [
     {
       id: 1,
       name: 'Black Lotus',
       set: 'Alpha',
       game: 'Magic',
       currentPrice: 45000.00,
       purchasePrice: 42000.00,
       quantity: 1,
       condition: 'Near Mint'
     },
     {
       id: 2,
       name: 'Charizard',
       set: 'Base Set',
       game: 'Pokemon',
       currentPrice: 6000.00,
       purchasePrice: 5500.00,
       quantity: 1,
       condition: 'PSA 9'
     },
     {
       id: 3,
       name: 'Mike Trout Rookie',
       set: '2009 Bowman Chrome',
       game: 'Sports',
       currentPrice: 4200.00,
       purchasePrice: 3800.00,
       quantity: 1,
       condition: 'BGS 9.5'
     }
   ]
 });
});

module.exports = router;


