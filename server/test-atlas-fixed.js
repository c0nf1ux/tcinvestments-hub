const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing with updated MongoDB URI...');
console.log('URI found:', process.env.MONGODB_URI ? 'YES' : 'NO');

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log(' MongoDB Atlas connected successfully!');
            console.log('Connection state:', mongoose.connection.readyState);
            process.exit(0);
        })
        .catch((error) => {
            console.log(' Connection failed:', error.message);
            console.log('Error code:', error.code);
            process.exit(1);
        });
} else {
    console.log(' No MONGODB_URI in environment');
    process.exit(1);
}
