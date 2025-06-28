const axios = require('axios');
const Card = require('../models/Card');

async function importPokemonCards() {
    console.log(' Importing Pokemon cards from Pokemon TCG API...');
    
    try {
        let page = 1;
        let totalProcessed = 0;
        
        while (true) {
            const response = await axios.get(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=250`);
            const cards = response.data.data;
            
            if (cards.length === 0) break;
            
            const processedCards = cards.map(card => ({
                id: `pokemon_${card.id}`,
                cardType: 'pokemon',
                name: card.name,
                setName: card.set.name,
                setCode: card.set.id,
                cardNumber: card.number,
                year: parseInt(card.set.releaseDate?.substring(0, 4)) || 0,
                rarity: card.rarity,
                
                pricing: {
                    current: parseFloat(card.tcgplayer?.prices?.holofoil?.market || card.tcgplayer?.prices?.normal?.market) || 0,
                    lastUpdated: new Date()
                },
                
                pokemonData: {
                    types: card.types,
                    hp: parseInt(card.hp) || 0,
                    attacks: card.attacks || [],
                    weakness: card.weaknesses?.[0],
                    resistance: card.resistances?.[0],
                    retreatCost: card.retreatCost,
                    pokemonNumber: card.nationalPokedexNumbers?.[0],
                    stage: card.subtypes?.[0],
                    evolvesFrom: card.evolvesFrom,
                    artist: card.artist,
                    holo: card.rarity?.includes('Holo') || false,
                    pokemonTcgId: card.id
                },
                
                images: {
                    small: card.images?.small,
                    normal: card.images?.large,
                    large: card.images?.large
                }
            }));
            
            await Card.insertMany(processedCards, { ordered: false }).catch(() => {});
            totalProcessed += cards.length;
            console.log(` Processed ${totalProcessed} Pokemon cards (page ${page})`);
            page++;
        }
        
        console.log(' Pokemon import completed!');
    } catch (error) {
        console.error(' Pokemon import failed:', error.message);
    }
}

module.exports = { importPokemonCards };

if (require.main === module) {
    importPokemonCards();
}
