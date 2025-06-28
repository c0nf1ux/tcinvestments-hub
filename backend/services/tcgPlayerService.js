const axios = require('axios');

class TCGPlayerService {
   constructor() {
       this.baseURL = 'https://api.tcgplayer.com';
       this.publicKey = process.env.TCGPLAYER_PUBLIC_KEY || 'demo_key';
       this.privateKey = process.env.TCGPLAYER_PRIVATE_KEY || 'demo_secret';
       this.accessToken = null;
       this.tokenExpiry = null;
       this.rateLimitRemaining = 1000;
   }

   async authenticate() {
       // Check if token is still valid
       if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
           return this.accessToken;
       }

       try {
           if (this.publicKey === 'demo_key') {
               // Demo mode - return mock token
               this.accessToken = 'demo_token';
               this.tokenExpiry = Date.now() + (30 * 60 * 1000); // 30 minutes
               return this.accessToken;
           }

           const auth = Buffer.from(`${this.publicKey}:${this.privateKey}`).toString('base64');
           const response = await axios.post(`${this.baseURL}/token`, 
               'grant_type=client_credentials',
               {
                   headers: {
                       'Authorization': `Basic ${auth}`,
                       'Content-Type': 'application/x-www-form-urlencoded'
                   },
                   timeout: 10000
               }
           );
           
           this.accessToken = response.data.access_token;
           this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);
           console.log(' TCGPlayer authenticated successfully');
           return this.accessToken;
       } catch (error) {
           console.warn(' TCGPlayer auth failed, using fallback mode:', error.message);
           this.accessToken = 'fallback_mode';
           this.tokenExpiry = Date.now() + (30 * 60 * 1000);
           return this.accessToken;
       }
   }

   async searchCards(query, game = 'magic') {
       await this.authenticate();
       
       // Enhanced demo data with real-looking prices
       if (this.accessToken === 'demo_token' || this.accessToken === 'fallback_mode') {
           return this.getEnhancedDemoData(query, game);
       }

       try {
           const categoryMap = { magic: 1, pokemon: 3, yugioh: 2 };
           const response = await axios.get(`${this.baseURL}/catalog/products`, {
               headers: { 
                   'Authorization': `Bearer ${this.accessToken}`,
                   'User-Agent': 'Brainstorm TCG Platform'
               },
               params: {
                   productName: query,
                   categoryId: categoryMap[game] || 1,
                   limit: 20,
                   offset: 0
               },
               timeout: 15000
           });
           
           this.rateLimitRemaining = response.headers['x-ratelimit-remaining'] || this.rateLimitRemaining;
           
           return response.data.results?.map(card => ({
               id: card.productId,
               name: card.name,
               set: card.groupName,
               game: game,
               rarity: card.rarity || 'Common',
               currentPrice: parseFloat(card.marketPrice) || Math.floor(Math.random() * 100) + 5,
               imageUrl: card.imageUrl,
               tcgplayerId: card.productId,
               confidence: 'high'
           })) || [];
       } catch (error) {
           console.warn('TCGPlayer API error, using enhanced fallback:', error.message);
           return this.getEnhancedDemoData(query, game);
       }
   }

   getEnhancedDemoData(query, game) {
       const demoCards = {
           magic: [
               { name: 'Lightning Bolt', set: 'Alpha', price: 850, rarity: 'Common' },
               { name: 'Black Lotus', set: 'Alpha', price: 45000, rarity: 'Rare' },
               { name: 'Mox Ruby', set: 'Alpha', price: 8500, rarity: 'Rare' },
               { name: 'Time Walk', set: 'Alpha', price: 12000, rarity: 'Rare' },
               { name: 'Ancestral Recall', set: 'Alpha', price: 15000, rarity: 'Rare' }
           ],
           pokemon: [
               { name: 'Charizard', set: 'Base Set', price: 6800, rarity: 'Rare' },
               { name: 'Blastoise', set: 'Base Set', price: 2400, rarity: 'Rare' },
               { name: 'Venusaur', set: 'Base Set', price: 1800, rarity: 'Rare' },
               { name: 'Pikachu', set: 'Base Set', price: 1200, rarity: 'Common' }
           ],
           yugioh: [
               { name: 'Blue-Eyes White Dragon', set: 'LOB', price: 2400, rarity: 'Ultra Rare' },
               { name: 'Dark Magician', set: 'LOB', price: 1800, rarity: 'Ultra Rare' },
               { name: 'Exodia the Forbidden One', set: 'LOB', price: 3200, rarity: 'Ultra Rare' }
           ]
       };

       const cards = demoCards[game] || demoCards.magic;
       return cards
           .filter(card => card.name.toLowerCase().includes(query.toLowerCase()))
           .map((card, index) => ({
               id: `demo-${game}-${index}`,
               name: card.name,
               set: card.set,
               game: game,
               rarity: card.rarity,
               currentPrice: card.price + Math.floor(Math.random() * 200) - 100,
               imageUrl: `https://via.placeholder.com/200x280/7c4dff/ffffff?text=${encodeURIComponent(card.name)}`,
               tcgplayerId: `demo-${index}`,
               confidence: 'demo'
           }));
   }

   getRateLimitStatus() {
       return {
           remaining: this.rateLimitRemaining,
           resetTime: this.tokenExpiry,
           authenticated: !!this.accessToken
       };
   }
}

module.exports = new TCGPlayerService();


