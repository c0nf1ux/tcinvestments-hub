const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
 username: {
   type: String,
   required: true,
   unique: true,
   trim: true,
   minlength: 3,
   maxlength: 30
 },
 email: {
   type: String,
   required: true,
   unique: true,
   lowercase: true,
   trim: true
 },
 password: {
   type: String,
   required: true,
   minlength: 6
 },
 profile: {
   firstName: String,
   lastName: String,
   avatar: String,
   bio: String
 },
 subscription: {
   plan: {
     type: String,
     enum: ['free', 'premium', 'enterprise'],
     default: 'free'
   },
   status: {
     type: String,
     enum: ['active', 'inactive', 'cancelled'],
     default: 'active'
   },
   expiresAt: Date
 },
 portfolio: {
   totalValue: { type: Number, default: 0 },
   cardCount: { type: Number, default: 0 },
   lastUpdated: { type: Date, default: Date.now }
 },
 preferences: {
   favoriteGames: [String],
   notifications: {
     priceAlerts: { type: Boolean, default: true },
     marketNews: { type: Boolean, default: true },
     trades: { type: Boolean, default: true }
   }
 }
}, {
 timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
 if (!this.isModified('password')) return next();
 
 try {
   const salt = await bcrypt.genSalt(12);
   this.password = await bcrypt.hash(this.password, salt);
   next();
 } catch (error) {
   next(error);
 }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
 return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
 const user = this.toObject();
 delete user.password;
 return user;
};

module.exports = mongoose.model('User', userSchema);


