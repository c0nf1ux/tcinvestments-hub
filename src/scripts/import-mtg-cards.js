const axios = require('axios');
const Card = require('../models/Card');

async function importMtgCards() {
    console.log(' Importing MTG cards from Scryfall...');
    
    try {
        const response = await axios.get('https://api.scryfall.com/bulk-data');
        const bulkData = response.data.data.find(d => d.type === 'default_cards');
        
        const cardsResponse = await axios.get(bulkData.download_uri);
        const mtgCards = cardsResponse.data;
        
        console.log(` Processing ${mtgCards.length} MTG cards...`);
        
        for (let i = 0; i < mtgCards.length; i += 1000) {
            const batch = mtgCards.slice(i, i + 1000);
            const processedCards = batch.map(card => ({
                id: `mtg_${card.id}`,
                cardType: 'mtg',
                name: card.name,
                setName: card.set_name,
                setCode: card.set,
                cardNumber: card.collector_number,
                year: parseInt(card.released_at?.substring(0, 4)) || 0,
                rarity: card.rarity,
                
                pricing: {
                    current: parseFloat(card.prices?.usd) || 0,
                    lastUpdated: new Date()
                },
                
                mtgData: {
                    manaCost: card.mana_cost,
                    cmc: card.cmc,
                    colors: card.colors,
                    colorIdentity: card.color_identity,
                    type: card.type_line,
                    power: card.power,
                    toughness: card.toughness,
                    text: card.oracle_text,
                    artist: card.artist,
                    scryfallId: card.id,
                    tcgplayerId: card.tcgplayer_id,
                    foil: card.foil,
                    nonfoil: card.nonfoil,
                    reserved: card.reserved
                },
                
                images: {
                    small: card.image_uris?.small,
                    normal: card.image_uris?.normal,
                    large: card.image_uris?.large
                }
            }));
            
            await Card.insertMany(processedCards, { ordered: false }).catch(() => {});
            console.log(` Processed ${i + batch.length}/${mtgCards.length} MTG cards`);
        }
        
        console.log(' MTG import completed!');
    } catch (error) {
        console.error(' MTG import failed:', error.message);
    }
}

module.exports = { importMtgCards };

if (require.main === module) {
    importMtgCards();
}
