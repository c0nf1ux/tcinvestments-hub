require('dotenv').config();
const mongoose = require('mongoose');

console.log('Environment check:');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('Connection state:', mongoose.connection.readyState);
console.log('0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(' Mongoose connected successfully!');
        console.log('Database name:', mongoose.connection.name);
        console.log('Host:', mongoose.connection.host);
        
        // Test a simple operation
        const testSchema = new mongoose.Schema({ test: String });
        const TestModel = mongoose.model('Test', testSchema);
        
        return TestModel.create({ test: 'connection-test' });
    })
    .then((doc) => {
        console.log(' Database write test successful:', doc._id);
        process.exit(0);
    })
    .catch((error) => {
        console.log(' Connection/operation failed:', error.message);
        console.log('Full error:', error);
        process.exit(1);
    });
