const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
   origin: ['http://localhost:5001', 'http://localhost:3000'],
   credentials: true
}));
app.use(express.json());

// In-memory user storage (for demo purposes)
const users = new Map();
const JWT_SECRET = 'brainstorm_jwt_secret_key_2024';

// Import services
let pokemonService, scryfallService, yugiohService, sportsCardService, betaUserManager;

try {
   pokemonService = require('./services/pokemonTCGService');
   scryfallService = require('./services/scryfallService');
   yugiohService = require('./services/yugiohService');
   sportsCardService = require('./services/sportsCardService');
   betaUserManager = require('./services/betaUserManager');
} catch (error) {
   console.log('Some services not available, using fallback mode');
}

// Auth endpoints
app.post('/api/auth/register', async (req, res) => {
   try {
       const { username, email, password, firstName, lastName } = req.body;

       // Validation
       if (!username || !email || !password) {
           return res.status(400).json({ 
               success: false,
               message: 'Username, email, and password are required' 
           });
       }

       if (password.length < 6) {
           return res.status(400).json({ 
               success: false,
               message: 'Password must be at least 6 characters' 
           });
       }

       // Check if user already exists
       if (users.has(email) || Array.from(users.values()).some(u => u.username === username)) {
           return res.status(409).json({ 
               success: false,
               message: 'User already exists with this email or username' 
           });
       }

       // Hash password
       const hashedPassword = await bcrypt.hash(password, 12);

       // Create user
       const user = {
           id: Date.now().toString(),
           username,
           email,
           password: hashedPassword,
           firstName: firstName || '',
           lastName: lastName || '',
           subscription: {
               plan: 'free',
               status: 'active'
           },
           createdAt: new Date(),
           lastLogin: new Date()
       };

       users.set(email, user);

       // Generate JWT token
       const token = jwt.sign(
           { 
               userId: user.id, 
               email: user.email,
               username: user.username 
           },
           JWT_SECRET,
           { expiresIn: '7d' }
       );

       // Remove password from response
       const userResponse = { ...user };
       delete userResponse.password;

       res.status(201).json({
           success: true,
           message: 'Account created successfully!',
           token,
           user: userResponse
       });

       console.log(` New user registered: ${username} (${email})`);
   } catch (error) {
       console.error('Registration error:', error);
       res.status(500).json({ 
           success: false,
           message: 'Registration failed. Please try again.' 
       });
   }
});

app.post('/api/auth/login', async (req, res) => {
   try {
       const { email, password } = req.body;

       if (!email || !password) {
           return res.status(400).json({ 
               success: false,
               message: 'Email and password are required' 
           });
       }

       // Find user
       const user = users.get(email);
       if (!user) {
           return res.status(401).json({ 
               success: false,
               message: 'Invalid email or password' 
           });
       }

       // Check password
       const passwordMatch = await bcrypt.compare(password, user.password);
       if (!passwordMatch) {
           return res.status(401).json({ 
               success: false,
               message: 'Invalid email or password' 
           });
       }

       // Update last login
       user.lastLogin = new Date();
       users.set(email, user);

       // Generate JWT token
       const token = jwt.sign(
           { 
               userId: user.id, 
               email: user.email,
               username: user.username 
           },
           JWT_SECRET,
           { expiresIn: '7d' }
       );

       // Remove password from response
       const userResponse = { ...user };
       delete userResponse.password;

       res.json({
           success: true,
           message: 'Login successful!',
           token,
           user: userResponse
       });

       console.log(` User logged in: ${user.username} (${email})`);
   } catch (error) {
       console.error('Login error:', error);
       res.status(500).json({ 
           success: false,
           message: 'Login failed. Please try again.' 
       });
   }
});

// Health check
app.get('/api/health', (req, res) => {
   res.json({ 
       status: 'healthy', 
       timestamp: new Date(),
       apis: ['auth', 'pokemon', 'magic', 'yugioh', 'sports'],
       port: PORT,
       users: users.size
   });
});

// Enhanced search endpoint
app.get('/api/cards/search', async (req, res) => {
   const { query, game = 'all' } = req.query;
   
   if (!query) {
       return res.status(400).json({ error: 'Query parameter required' });
   }
   
   try {
       let results = [];
       
       // Magic cards (using enhanced demo data)
       if (game === 'magic' || game === 'all') {
           const magicCards = [
               { id: 'mtg-1', name: 'Lightning Bolt', set: 'Alpha', game: 'magic', rarity: 'Common', currentPrice: 850 },
               { id: 'mtg-2', name: 'Black Lotus', set: 'Alpha', game: 'magic', rarity: 'Rare', currentPrice: 45000 },
               { id: 'mtg-3', name: 'Mox Ruby', set: 'Alpha', game: 'magic', rarity: 'Rare', currentPrice: 8500 }
           ].filter(card => card.name.toLowerCase().includes(query.toLowerCase()));
           results = [...results, ...magicCards];
       }
       
       // Pokemon cards
       if (game === 'pokemon' || game === 'all') {
           const pokemonCards = [
               { id: 'pkmn-1', name: 'Charizard', set: 'Base Set', game: 'pokemon', rarity: 'Rare', currentPrice: 6800 },
               { id: 'pkmn-2', name: 'Blastoise', set: 'Base Set', game: 'pokemon', rarity: 'Rare', currentPrice: 2400 },
               { id: 'pkmn-3', name: 'Pikachu', set: 'Base Set', game: 'pokemon', rarity: 'Common', currentPrice: 1200 }
           ].filter(card => card.name.toLowerCase().includes(query.toLowerCase()));
           results = [...results, ...pokemonCards];
       }

       // Yu-Gi-Oh cards
       if (game === 'yugioh' || game === 'all') {
           const yugiohCards = [
               { id: 'ygo-1', name: 'Blue-Eyes White Dragon', set: 'LOB', game: 'yugioh', rarity: 'Ultra Rare', currentPrice: 2400 },
               { id: 'ygo-2', name: 'Dark Magician', set: 'LOB', game: 'yugioh', rarity: 'Ultra Rare', currentPrice: 1800 }
           ].filter(card => card.name.toLowerCase().includes(query.toLowerCase()));
           results = [...results, ...yugiohCards];
       }

       // Sports cards
       if (game === 'sports' || game === 'all') {
           const sportsCards = [
               { id: 'sport-1', name: 'Tom Brady Rookie', set: 'Topps Chrome', game: 'sports', rarity: 'Refractor', currentPrice: 1850 },
               { id: 'sport-2', name: 'LeBron James Rookie', set: 'Topps Chrome', game: 'sports', rarity: 'Refractor', currentPrice: 3200 }
           ].filter(card => card.name.toLowerCase().includes(query.toLowerCase()));
           results = [...results, ...sportsCards];
       }
       
       res.json({
           success: true,
           query,
           game,
           total: results.length,
           results: results,
           apiStatus: 'enhanced_demo_mode'
       });
   } catch (error) {
       console.error('Search error:', error);
       res.status(500).json({ error: 'Search failed' });
   }
});

// Collections endpoint
app.get('/api/collections', (req, res) => {
   res.json({
       totalValue: 125840.23,
       dailyChange: 1.69,
       weeklyChange: 4.32,
       monthlyChange: 12.8,
       cardCount: 847,
       lastUpdated: new Date(),
       cards: [
           {
               id: 1,
               name: "Black Lotus",
               set: "Alpha",
               game: "magic",
               currentPrice: 45000.00,
               quantity: 1,
               condition: "Near Mint"
           }
       ]
   });
});

// Community endpoint
app.get('/api/community', (req, res) => {
   res.json({
       posts: [
           {
               id: 1,
               title: "Magic Market Update",
               game: "Magic: The Gathering",
               content: "Reserved List cards showing strong performance...",
               author: "MarketAnalyst",
               timestamp: new Date(),
               comments: 23
           }
       ]
   });
});

// Beta endpoints
app.get('/api/beta/stats', (req, res) => {
   res.json({
       totalBetaUsers: users.size,
       activeUsers: users.size,
       slotsRemaining: 100 - users.size,
       betaCode: 'BRAINSTORM_BETA_2024'
   });
});

app.post('/api/beta/register', (req, res) => {
   const { betaCode } = req.body;
   if (betaCode === 'BRAINSTORM_BETA_2024') {
       res.json({ success: true, message: 'Beta code valid!' });
   } else {
       res.status(400).json({ error: 'Invalid beta code' });
   }
});

app.listen(PORT, () => {
   console.log(` Brainstorm API server running on port ${PORT}`);
   console.log(` Authentication system active`);
   console.log(` Health check: http://localhost:${PORT}/api/health`);
   console.log(` Auth endpoints: /api/auth/register, /api/auth/login`);
   console.log(` Beta program ready`);
});

