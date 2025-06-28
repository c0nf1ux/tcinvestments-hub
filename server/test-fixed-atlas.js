require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing with fixed dependencies...');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(' ATLAS CONNECTION SUCCESSFUL!');
        console.log('Database:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        console.log('ReadyState:', mongoose.connection.readyState);
        process.exit(0);
    })
    .catch((error) => {
        console.log(' Connection failed:', error.message);
        process.exit(1);
    });
