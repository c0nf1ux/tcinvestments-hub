const mongoose = require('mongoose');
const DatabaseConfig = require('../config/database');
const User = require('../models/User');
require('dotenv').config();

const sampleUsers = [
 {
   username: 'cardmaster',
   email: 'cardmaster@brainstorm.com',
   password: 'Master123!',
   profile: {
     firstName: 'Card',
     lastName: 'Master',
     bio: 'Professional TCG investor with 15+ years experience'
   },
   subscription: {
     plan: 'premium',
     status: 'active'
   },
   portfolio: {
     totalValue: 125840.23,
     cardCount: 847
   },
   preferences: {
     favoriteGames: ['Magic', 'Pokemon', 'Sports'],
     notifications: {
       priceAlerts: true,
       marketNews: true,
       trades: true
     }
   }
 },
 {
   username: 'pokemonfan',
   email: 'pokemon@brainstorm.com', 
   password: 'Pokemon123!',
   profile: {
     firstName: 'Ash',
     lastName: 'Ketchum',
     bio: 'Pokemon card collector since Base Set'
   },
   subscription: {
     plan: 'free',
     status: 'active'
   },
   portfolio: {
     totalValue: 15420.50,
     cardCount: 234
   },
   preferences: {
     favoriteGames: ['Pokemon'],
     notifications: {
       priceAlerts: true,
       marketNews: false,
       trades: true
     }
   }
 },
 {
   username: 'mtgpro',
   email: 'mtg@brainstorm.com',
   password: 'Magic123!',
   profile: {
     firstName: 'Jace',
     lastName: 'Beleren',
     bio: 'Competitive Magic player and investor'
   },
   subscription: {
     plan: 'enterprise',
     status: 'active'
   },
   portfolio: {
     totalValue: 89340.75,
     cardCount: 1205
   },
   preferences: {
     favoriteGames: ['Magic'],
     notifications: {
       priceAlerts: true,
       marketNews: true,
       trades: false
     }
   }
 }
];

async function seedDatabase() {
 try {
   console.log(' Starting database seeding...');
   
   await DatabaseConfig.connect();
   
   // Clear existing users (development only)
   if (process.env.NODE_ENV === 'development') {
     await User.deleteMany({});
     console.log(' Cleared existing users');
   }
   
   // Create sample users
   for (const userData of sampleUsers) {
     const existingUser = await User.findOne({ 
       $or: [{ email: userData.email }, { username: userData.username }]
     });
     
     if (!existingUser) {
       const user = new User(userData);
       await user.save();
       console.log(` Created user: ${userData.username}`);
     } else {
       console.log(` User already exists: ${userData.username}`);
     }
   }
   
   console.log(' Database seeding completed successfully!');
   console.log(` Total users: ${await User.countDocuments()}`);
   
 } catch (error) {
   console.error(' Seeding failed:', error.message);
 } finally {
   await DatabaseConfig.disconnect();
 }
}

// Run seeding if called directly
if (require.main === module) {
 seedDatabase();
}

module.exports = { seedDatabase, sampleUsers };


