const { importMtgCards } = require('./import-mtg-cards');
const { importPokemonCards } = require('./import-pokemon-cards');

async function importAllCards() {
    console.log(' Starting mega card import process...');
    console.log('Target: Complete trading card database across all games');
    
    try {
        await importMtgCards();
        await importPokemonCards();
        
        console.log(' ALL CARD IMPORTS COMPLETED!');
        console.log(' Mega Trading Card Platform ready for deployment!');
        
    } catch (error) {
        console.error(' Import process failed:', error.message);
    }
}

if (require.main === module) {
    importAllCards();
}

module.exports = { importAllCards };
