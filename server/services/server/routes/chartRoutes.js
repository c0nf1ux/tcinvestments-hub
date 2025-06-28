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

// Batch predictions for watchlist
router.post('/predictions/batch', async (req, res) => {
  try {
    const { cardIds } = req.body;
    
    if (!Array.isArray(cardIds)) {
      return res.status(400).json({ error: 'cardIds must be an array' });
    }
    
    const predictions = [];
    
    for (const cardId of cardIds) {
      const cardData = {
        id: cardId,
        name: `Card ${cardId}`,
        currentPrice: Math.random() * 1000 + 100,
        rarity: ['common', 'uncommon', 'rare', 'mythic'][Math.floor(Math.random() * 4)],
        type: ['Creature', 'Instant', 'Sorcery', 'Artifact'][Math.floor(Math.random() * 4)]
      };
      
      const prediction = await advancedAI.generateAdvancedPrediction(cardData);
      predictions.push(prediction);
    }
    
    res.json({
      predictions,
      batchSize: cardIds.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Batch prediction error:', error);
    res.status(500).json({ error: 'Failed to generate batch predictions' });
  }
});

// Enhanced real-time updates with AI insights
router.get('/stream/:cardId', (req, res) => {
  const { cardId } = req.params;
  
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  
  let basePrice = Math.random() * 10000 + 1000;
  let updateCount = 0;
  
  const sendEnhancedUpdate = async () => {
    const volatility = 0.002;
    const change = (Math.random() - 0.5) * 2 * volatility;
    basePrice = basePrice * (1 + change);
    
    updateCount++;
    
    // Generate AI insight every 10 updates
    let aiInsight = null;
    if (updateCount % 10 === 0) {
      const cardData = {
        id: cardId,
        currentPrice: basePrice,
        volume: Math.floor(Math.random() * 200) + 50
      };
      
      try {
        aiInsight = await advancedAI.generateAdvancedPrediction(cardData);
      } catch (error) {
        console.error('AI insight error:', error);
      }
    }
    
    const update = {
      cardId,
      price: Math.round(basePrice * 100) / 100,
      change: Math.round(change * 10000) / 100,
      changePercent: Math.round(change * 10000) / 100,
      timestamp: Date.now(),
      volume: Math.floor(Math.random() * 200) + 50,
      trend: change > 0 ? 'up' : 'down',
      aiInsight: aiInsight,
      updateCount: updateCount
    };
    
    res.write(`data: ${JSON.stringify(update)}\n\n`);
  };
  
  // Send updates every 3 seconds
  const interval = setInterval(sendEnhancedUpdate, 3000);
  
  // Send initial update
  sendEnhancedUpdate();
  
  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval);
    console.log(`Stream closed for card: ${cardId}`);
  });
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
