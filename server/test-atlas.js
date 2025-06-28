const mongoose = require('mongoose');
require('dotenv').config();

console.log('MongoDB URI from env:', process.env.MONGODB_URI ? 'FOUND' : 'NOT FOUND');
console.log('Attempting connection to Atlas...');

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log(' MongoDB Atlas connected successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.log(' MongoDB Atlas connection failed:', error.message);
            process.exit(1);
        });
} else {
    console.log(' No MONGODB_URI found in environment');
    process.exit(1);
}
