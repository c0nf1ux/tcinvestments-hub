require('dotenv').config();
console.log('MONGODB_URI from env:', process.env.MONGODB_URI);
console.log('JWT_SECRET loaded:', process.env.JWT_SECRET ? 'YES' : 'NO');
