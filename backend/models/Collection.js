const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' },
  quantity: { type: Number, default: 1 },
  purchasePrice: Number,
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Collection', collectionSchema);






