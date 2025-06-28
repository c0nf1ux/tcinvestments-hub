const mongoose = require('mongoose');

class DatabaseConfig {
 static async connect() {
   try {
     const options = {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       maxPoolSize: 10,
       serverSelectionTimeoutMS: 5000,
       socketTimeoutMS: 45000,
       bufferMaxEntries: 0,
       bufferCommands: false,
     };

     // Try MongoDB Atlas first, then local
     const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/brainstorm';
     
     await mongoose.connect(mongoURI, options);
     
     console.log(' Database connected successfully');
     console.log(` Connected to: ${mongoose.connection.host}:${mongoose.connection.port}`);
     console.log(` Database: ${mongoose.connection.name}`);
     
     return true;
   } catch (error) {
     console.error(' Database connection failed:', error.message);
     
     // Fallback to local MongoDB
     if (process.env.MONGODB_URI && process.env.MONGODB_URI.includes('mongodb.net')) {
       console.log(' Attempting local MongoDB fallback...');
       try {
         await mongoose.connect('mongodb://localhost:27017/brainstorm', {
           useNewUrlParser: true,
           useUnifiedTopology: true,
         });
         console.log(' Connected to local MongoDB');
         return true;
       } catch (localError) {
         console.error(' Local MongoDB also failed:', localError.message);
       }
     }
     
     return false;
   }
 }

 static async disconnect() {
   try {
     await mongoose.connection.close();
     console.log(' Database disconnected');
   } catch (error) {
     console.error(' Error disconnecting database:', error.message);
   }
 }

 static getConnectionStatus() {
   const states = {
     0: 'Disconnected',
     1: 'Connected', 
     2: 'Connecting',
     3: 'Disconnecting'
   };
   return states[mongoose.connection.readyState] || 'Unknown';
 }
}

module.exports = DatabaseConfig;


