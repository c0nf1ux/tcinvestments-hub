// Working API integration - Functional immediately
const pokemonService = require('./services/pokemonTCGService');
const scryfallService = require('./services/scryfallService');

app.get('/api/cards/search', async (req, res) => {
   const { query, game = 'all' } = req.query;
   
   try {
       let results = [];
       
       if (game === 'magic' || game === 'all') {
           const mtgCards = await scryfallService.searchCards(query);
           results = [...results, ...mtgCards];
       }
       
       if (game === 'pokemon' || game === 'all') {
           const pokemonCards = await pokemonService.searchCards(query);
           results = [...results, ...pokemonCards];
       }
       
       res.json({
           success: true,
           query,
           game,
           total: results.length,
           results: results,
           apiStatus: 'live_data_enabled'
       });
   } catch (error) {
       console.error('Search error:', error);
       res.status(500).json({ error: 'Search failed' });
   }
});
