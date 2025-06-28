const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing local MongoDB connection...');
console.log('URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(' Local MongoDB connected successfully!');
        console.log('Database name:', mongoose.connection.name);
        process.exit(0);
    })
    .catch((error) => {
        console.log('ℹ Local MongoDB not available, will use fallback');
        console.log('Error:', error.message);
        process.exit(1);
    });
