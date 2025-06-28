const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tcg: { type: String, required: true, enum: ['MTG', 'Pokemon', 'Sports', 'Yu-Gi-Oh'] },
  set: String,
  rarity: String,
  currentPrice: Number,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', cardSchema);






