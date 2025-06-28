const axios = require('axios');

class SportsCardService {
   constructor() {
       this.baseURL = 'https://api.sportsdata.io/v3/nfl'; // Demo endpoint
   }

   async searchCards(query) {
       try {
           // Simulate sports card search with realistic data
           return this.generateSportsCards(query);
       } catch (error) {
           console.error('Sports Card API error:', error.message);
           return this.getFallbackData(query);
       }
   }

   generateSportsCards(query) {
       const athletes = [
           { name: 'Tom Brady', sport: 'Football', team: 'Buccaneers' },
           { name: 'LeBron James', sport: 'Basketball', team: 'Lakers' },
           { name: 'Connor McDavid', sport: 'Hockey', team: 'Oilers' },
           { name: 'Mike Trout', sport: 'Baseball', team: 'Angels' },
           { name: 'Patrick Mahomes', sport: 'Football', team: 'Chiefs' }
       ];

       const sets = ['Topps Chrome', 'Panini Prizm', 'Upper Deck', 'Bowman', 'Select'];
       const rarities = ['Base', 'Refractor', 'Prizm', 'Autograph', 'Patch'];

       return athletes
           .filter(athlete => 
               athlete.name.toLowerCase().includes(query.toLowerCase()) ||
               athlete.sport.toLowerCase().includes(query.toLowerCase()) ||
               athlete.team.toLowerCase().includes(query.toLowerCase())
           )
           .slice(0, 10)
           .map((athlete, index) => ({
               id: `sports-${index}`,
               name: `${athlete.name} ${sets[index % sets.length]}`,
               set: sets[index % sets.length],
               game: 'sports',
               rarity: rarities[index % rarities.length],
               currentPrice: Math.floor(Math.random() * 1000) + 50,
               imageUrl: 'https://via.placeholder.com/200x280/FF6B35/ffffff?text=Sports+Card',
               sportsId: `${athlete.name.replace(' ', '_')}_${index}`,
               sport: athlete.sport,
               team: athlete.team,
               player: athlete.name
           }));
   }

   getFallbackData(query) {
       return [
           {
               id: 'demo-sports-1',
               name: `${query} Rookie Card`,
               set: 'Topps Chrome',
               game: 'sports',
               rarity: 'Refractor',
               currentPrice: Math.floor(Math.random() * 500) + 100,
               imageUrl: 'https://via.placeholder.com/200x280/FF6B35/ffffff?text=Sports+Card',
               sport: 'Football',
               team: 'Unknown'
           }
       ];
   }
}

module.exports = new SportsCardService();


