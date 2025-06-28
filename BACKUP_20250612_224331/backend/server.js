const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
 res.json({ 
   message: 'Brainstorm Trading Card Brainstorm Platform API',
   version: '2.0.0',
   status: 'operational',
   timestamp: new Date().toISOString()
 });
});

// Health check
app.get('/api/health', (req, res) => {
 res.json({ 
   status: 'operational',
   timestamp: new Date().toISOString(),
   uptime: process.uptime()
 });
});

// Collections endpoint (mock data)
app.get('/api/collections', (req, res) => {
 res.json({
   totalValue: 125840.23,
   dailyChange: 1.69,
   cards: [
     {
       id: 1,
       name: 'Black Lotus',
       set: 'Alpha',
       game: 'Magic',
       currentPrice: 45000.00,
       quantity: 1
     },
     {
       id: 2,
       name: 'Charizard',
       set: 'Base Set',
       game: 'Pokemon',
       currentPrice: 6000.00,
       quantity: 1
     }
   ]
 });
});

// Card search endpoint (mock)
app.get('/api/cards/search', (req, res) => {
 const { query, game } = req.query;
 res.json({
   query,
   game: game || 'all',
   results: [
     {
       name: query || 'Sample Card',
       set: 'Sample Set',
       price: 99.99,
       game: game || 'Magic'
     }
   ],
   total: 1
 });
});

// Error handling
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
 console.log(` Brainstorm API Server running on port ${PORT}`);
 console.log(` Health check: http://localhost:${PORT}/api/health`);
 console.log(` Search endpoint: http://localhost:${PORT}/api/cards/search`);
});

