const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    displayName: String,
    avatar: String,
    bio: String,
    tradingLevel: {
      type: String,
      enum: ['Rookie', 'Trader', 'Expert', 'Master'],
      default: 'Rookie'
    }
  },
  portfolio: {
    totalValue: { type: Number, default: 0 },
    cash: { type: Number, default: 10000 },
    holdings: [{
      cardId: String,
      cardName: String,
      quantity: Number,
      avgPrice: Number,
      currentPrice: Number,
      purchaseDate: Date,
      game: String,
      imageUrl: String
    }]
  },
  watchlist: [{
    cardId: String,
    cardName: String,
    currentPrice: Number,
    alertPrice: Number,
    game: String,
    addedDate: { type: Date, default: Date.now }
  }],
  preferences: {
    theme: { type: String, default: 'dark' },
    notifications: { type: Boolean, default: true },
    currency: { type: String, default: 'USD' }
  },
  stats: {
    totalTrades: { type: Number, default: 0 },
    winRate: { type: Number, default: 0 },
    bestTrade: { type: Number, default: 0 },
    worstTrade: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
