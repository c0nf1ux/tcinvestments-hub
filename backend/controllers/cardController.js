const tcgPlayerService = require('../services/tcgPlayerService');
const pokemonService = require('../services/pokemonTCGService');
const sportsCardService = require('../services/sportsCardService');

class CardController {
 async searchAllPlatforms(req, res) {
   const { query, game = 'all' } = req.query;
   
   if (!query) {
     return res.status(400).json({ error: 'Search query required' });
   }

   try {
     const results = {
       magic: [],
       pokemon: [],
       sports: [],
       total: 0
     };

     // Search Magic: The Gathering via TCGPlayer
     if (game === 'all' || game === 'magic') {
       results.magic = await tcgPlayerService.searchCards(query, 1);
     }

     // Search Pokemon
     if (game === 'all' || game === 'pokemon') {
       results.pokemon = await pokemonService.searchCards(query);
     }

     // Search Sports Cards
     if (game === 'all' || game === 'sports') {
       results.sports = await sportsCardService.searchSportsCards(query);
     }

     results.total = results.magic.length + results.pokemon.length + results.sports.length;

     res.json({
       success: true,
       query,
       results,
       timestamp: new Date().toISOString()
     });
   } catch (error) {
     console.error('Search error:', error);
     res.status(500).json({ error: 'Search failed' });
   }
 }

 async getCardPrices(req, res) {
   const { cardIds, platform } = req.body;
   
   try {
     let prices = [];
     
     if (platform === 'tcgplayer') {
       prices = await tcgPlayerService.getCardPrices(cardIds);
     }
     
     res.json({
       success: true,
       prices,
       timestamp: new Date().toISOString()
     });
   } catch (error) {
     console.error('Pricing error:', error);
     res.status(500).json({ error: 'Price fetch failed' });
   }
 }
}

module.exports = new CardController();






