const express = require('express');
const Collection = require('../models/Collection');
const router = express.Router();

// Get user collection
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find().populate('cardId');
    res.json(collections);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add to collection
router.post('/', async (req, res) => {
  try {
    const collection = new Collection(req.body);
    await collection.save();
    res.status(201).json(collection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


