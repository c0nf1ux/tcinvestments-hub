const express = require('express');
const router = express.Router();

// Get price data
router.get('/:cardId', async (req, res) => {
  try {
    // Mock price data for now
    const priceData = {
      current: Math.floor(Math.random() * 100) + 10,
      change24h: (Math.random() - 0.5) * 20,
      history: Array.from({length: 30}, () => Math.floor(Math.random() * 100) + 10)
    };
    res.json(priceData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


