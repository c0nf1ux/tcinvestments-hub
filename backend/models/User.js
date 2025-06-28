const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  // SUBSCRIPTION FIELDS - ADDED FOR NEW PRICING
  subscriptionTier: {
    type: String,
    enum: ['free', 'premium', 'enterprise'],
    default: 'free'
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'cancelled', 'past_due', 'incomplete'],
    default: 'active'
  },
  stripeCustomerId: {
    type: String,
    default: null
  },
  stripeSubscriptionId: {
    type: String,
    default: null
  },
  fileProcessingCredits: {
    type: Number,
    default: 0
  },
  // FEATURE LIMITS BASED ON TIER
  portfolioLimit: {
    type: Number,
    default: 10000 // \ for free tier
  },
  alertsLimit: {
    type: Number,
    default: 5 // 5 alerts for free tier
  },
  dailySearchLimit: {
    type: Number,
    default: 100 // 100 searches/day for free tier
  },
  // USAGE TRACKING
  dailySearchCount: {
    type: Number,
    default: 0
  },
  lastSearchReset: {
    type: Date,
    default: Date.now
  },
  // PORTFOLIO TRACKING
  portfolio: {
    totalValue: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    cards: [{
      cardId: String,
      name: String,
      set: String,
      quantity: Number,
      purchasePrice: Number,
      currentPrice: Number,
      dateAdded: {
        type: Date,
        default: Date.now
      }
    }]
  },
  // PREFERENCES
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    priceAlerts: {
      type: Boolean,
      default: true
    },
    marketingEmails: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Update user limits based on subscription tier
userSchema.methods.updateSubscriptionLimits = function() {
  switch(this.subscriptionTier) {
    case 'free':
      this.portfolioLimit = 10000;
      this.alertsLimit = 5;
      this.dailySearchLimit = 100;
      break;
    case 'premium':
      this.portfolioLimit = 999999999;
      this.alertsLimit = 50;
      this.dailySearchLimit = 1000;
      break;
    case 'enterprise':
      this.portfolioLimit = 999999999;
      this.alertsLimit = 999;
      this.dailySearchLimit = 10000;
      break;
  }
};

// Check if user can perform action based on tier
userSchema.methods.canPerformAction = function(action) {
  switch(action) {
    case 'advanced_analytics':
      return this.subscriptionTier !== 'free';
    case 'real_time_alerts':
      return this.subscriptionTier !== 'free';
    case 'unlimited_portfolio':
      return this.subscriptionTier !== 'free';
    case 'file_processing':
      return this.subscriptionTier === 'enterprise' || this.fileProcessingCredits > 0;
    case 'api_access':
      return this.subscriptionTier === 'enterprise';
    default:
      return true;
  }
};

// Reset daily search count if needed
userSchema.methods.resetDailySearchIfNeeded = function() {
  const today = new Date();
  const lastReset = new Date(this.lastSearchReset);
  
  if (today.getDate() !== lastReset.getDate()) {
    this.dailySearchCount = 0;
    this.lastSearchReset = today;
  }
};

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
