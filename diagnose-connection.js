require('dotenv').config();
const mongoose = require('mongoose');

console.log('Before connection:');
console.log('readyState:', mongoose.connection.readyState);
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('After successful connection:');
        console.log('readyState:', mongoose.connection.readyState);
        console.log('host:', mongoose.connection.host);
        console.log('name:', mongoose.connection.name);
        process.exit(0);
    })
    .catch((error) => {
        console.log('Connection failed:');
        console.log('readyState:', mongoose.connection.readyState);
        console.log('Error:', error.message);
        process.exit(1);
    });

// Check status after 5 seconds
setTimeout(() => {
    console.log('After 5 seconds:');
    console.log('readyState:', mongoose.connection.readyState);
}, 5000);
