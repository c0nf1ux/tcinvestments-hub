const express = require('express');
const Card = require('../models/Card');
const router = express.Router();

// Get all cards
router.get('/', async (req, res) => {
  try {
    const { tcg, search } = req.query;
    let query = {};
    if (tcg) query.tcg = tcg;
    if (search) query.name = { $regex: search, $options: 'i' };
    
    const cards = await Card.find(query).limit(50);
    res.json(cards);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add card
router.post('/', async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


