require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing Atlas connection...');
console.log('URI loaded:', process.env.MONGODB_URI ? 'YES' : 'NO');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(' ATLAS CONNECTED SUCCESSFULLY!');
        console.log(' Revenue generation ready!');
        console.log(' User persistence enabled!');
        process.exit(0);
    })
    .catch((error) => {
        console.log(' Atlas connection failed:', error.message);
        console.log('Error code:', error.code);
        process.exit(1);
    });
