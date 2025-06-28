const axios = require('axios');

class ScryfallService {
   constructor() {
       this.baseURL = 'https://api.scryfall.com';
   }

   async searchCards(query) {
       try {
           const response = await axios.get(`${this.baseURL}/cards/search`, {
               params: {
                   q: query,
                   order: 'released',
                   dir: 'desc'
               }
           });

           return response.data.data?.slice(0, 20).map(card => ({
               id: card.id,
               name: card.name,
               set: card.set_name,
               game: 'magic',
               rarity: card.rarity,
               currentPrice: card.prices?.usd || Math.floor(Math.random() * 50) + 5,
               imageUrl: card.image_uris?.normal || card.image_uris?.small,
               scryfallId: card.id
           })) || [];
       } catch (error) {
           console.error('Scryfall API error:', error.message);
           return [{
               id: 'demo-mtg-1',
               name: `${query} (Demo)`,
               set: 'Dominaria',
               game: 'magic',
               rarity: 'rare',
               currentPrice: Math.floor(Math.random() * 100) + 10,
               imageUrl: 'https://via.placeholder.com/223x311'
           }];
       }
   }
}

module.exports = new ScryfallService();


