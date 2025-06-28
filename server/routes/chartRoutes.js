// chartRoutes.js - Enhanced with Advanced AI Predictions
const express = require('express');
const router = express.Router();
const advancedAI = require('../services/advancedPredictionEngine');

// Enhanced chart data endpoint with advanced AI
router.get('/data/:cardId', async (req, res) => {
  try {
    const { cardId } = req.params;
    const { timeframe = '1M', interval = '1D' } = req.query;
    
    // Enhanced mock card data
    const cardDatabase = {
      'black-lotus': {
        id: 'black-lotus',
        name: 'Black Lotus',
        set: 'Alpha',
        rarity: 'legendary',
        type: 'Artifact',
        basePrice: 25000,
        symbol: 'MTG:BLACKLOTUS',
        releaseDate: '1993-08-01'
      },
      'time-walk': {
        id: 'time-walk',
        name: 'Time Walk',
        set: 'Alpha',
        rarity: 'rare',
        type: 'Sorcery',
        basePrice: 8500,
        symbol: 'MTG:TIMEWALK',
        releaseDate: '1993-08-01'
      }
    };
    
    const mockCard = cardDatabase[cardId] || {
      id: cardId,
      name: 'Trading Card',
      set: 'Unknown',
      rarity: 'normal',
      type: 'Card',
      basePrice: 100,
      symbol: 'CARD:UNKNOWN',
      releaseDate: new Date().toISOString()
    };
    
    // Generate realistic price data
    const priceData = generateRealisticPriceData(mockCard.basePrice, 30, mockCard.rarity);
    const prices = priceData.map(d => d.close);
    
    // Get AI prediction
    mockCard.currentPrice = prices[prices.length - 1];
    mockCard.volume = Math.floor(Math.random() * 500) + 50;
    
    const aiPrediction = await advancedAI.generateAdvancedPrediction(mockCard);
    
    const response = {
      card: mockCard,
      data: priceData,
      aiPrediction: aiPrediction,
      metadata: {
        timeframe,
        interval,
        lastUpdate: new Date().toISOString(),
        dataPoints: priceData.length
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Enhanced chart data error:', error);
    res.status(500).json({ error: 'Failed to fetch enhanced chart data' });
  }
});

// Advanced AI prediction endpoint
router.get('/prediction/:cardId', async (req, res) => {
  try {
    const { cardId } = req.params;
    
    // Get card data for prediction
    const cardData = {
      id: cardId,
      name: 'Trading Card',
      currentPrice: Math.random() * 1000 + 100,
      rarity: 'rare',
      type: 'Creature',
      releaseDate: '2020-01-01',
      volume: Math.random() * 500 + 50
    };
    
    // Generate advanced AI prediction
    const prediction = await advancedAI.generateAdvancedPrediction(cardData);
    
    res.json(prediction);
  } catch (error) {
    console.error('Advanced prediction error:', error);
    res.status(500).json({ error: 'Failed to generate advanced prediction' });
  }
});

// Helper function for realistic price data
function generateRealisticPriceData(basePrice, days = 30, cardType = 'normal') {
  const data = [];
  let currentPrice = basePrice;
  const now = new Date();
  
  const volatilityMap = {
    'legendary': 0.08,
    'mythic': 0.06,
    'rare': 0.04,
    'uncommon': 0.02,
    'common': 0.01,
    'normal': 0.05
  };
  
  const volatility = volatilityMap[cardType] || 0.05;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
    const weekday = date.getDay();
    const weekendMultiplier = (weekday === 0 || weekday === 6) ? 0.7 : 1.0;
    
    const month = date.getMonth();
    const seasonalMultiplier = [0.9, 0.9, 1.1, 1.2, 1.1, 0.8, 0.7, 0.8, 1.3, 1.4, 1.3, 1.2][month];
    
    const change = (Math.random() - 0.5) * 2 * volatility * weekendMultiplier * seasonalMultiplier;
    currentPrice = currentPrice * (1 + change);
    currentPrice = Math.max(currentPrice, basePrice * 0.1);
    
    data.push({
      timestamp: date.getTime(),
      date: date.toISOString().split('T')[0],
      open: currentPrice * (1 + (Math.random() - 0.5) * 0.01),
      high: currentPrice * (1 + Math.random() * 0.02),
      low: currentPrice * (1 - Math.random() * 0.02),
      close: currentPrice,
      volume: Math.floor(Math.random() * 500 * seasonalMultiplier) + 50
    });
  }
  
  return data;
}

module.exports = router;
