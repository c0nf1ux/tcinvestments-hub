const axios = require('axios');

class YugiohService {
   constructor() {
       this.baseURL = 'https://db.ygoprodeck.com/api/v7';
       // Yu-Gi-Oh DB is free and doesn't require API key
   }

   async searchCards(query) {
       try {
           const response = await axios.get(`${this.baseURL}/cardinfo.php`, {
               params: {
                   fname: query,
                   num: 20,
                   offset: 0
               }
           });

           return response.data.data?.map(card => ({
               id: card.id,
               name: card.name,
               set: card.card_sets?.[0]?.set_name || 'Unknown Set',
               game: 'yugioh',
               rarity: card.card_sets?.[0]?.set_rarity || 'Common',
               currentPrice: card.card_prices?.[0]?.tcgplayer_price || 
                            Math.floor(Math.random() * 50) + 5,
               imageUrl: card.card_images?.[0]?.image_url,
               yugiohId: card.id,
               type: card.type,
               attribute: card.attribute,
               level: card.level
           })) || [];
       } catch (error) {
           console.error('Yu-Gi-Oh API error:', error.message);
           return this.getFallbackData(query);
       }
   }

   getFallbackData(query) {
       return [
           {
               id: 'demo-yugioh-1',
               name: `${query} (Demo)`,
               set: 'Legend of Blue Eyes',
               game: 'yugioh',
               rarity: 'Ultra Rare',
               currentPrice: Math.floor(Math.random() * 200) + 20,
               imageUrl: 'https://via.placeholder.com/200x292/8B0000/ffffff?text=YuGiOh+Card',
               type: 'Monster',
               attribute: 'DARK'
           }
       ];
   }
}

module.exports = new YugiohService();


