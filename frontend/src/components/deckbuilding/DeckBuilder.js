import React, { useState, useCallback } from 'react';

const DeckBuilder = () => {
 const [deck, setDeck] = useState({
   commander: null,
   mainboard: [],
   sideboard: [],
   maybeboard: []
 });
 
 const [deckStats, setDeckStats] = useState({
   totalCards: 0,
   avgCMC: 0,
   powerLevel: 0,
   colorBreakdown: { white: 0, blue: 0, black: 0, red: 0, green: 0, colorless: 0 }
 });

 const [recommendations, setRecommendations] = useState([
   { name: 'Sol Ring', reason: '99% of decks run this', synergy: 95, price: 2.50, category: 'Ramp' },
   { name: 'Command Tower', reason: 'Perfect mana fixing', synergy: 90, price: 1.25, category: 'Lands' },
   { name: 'Lightning Greaves', reason: 'Protects your commander', synergy: 85, price: 4.75, category: 'Protection' },
   { name: 'Rhystic Study', reason: 'Card draw engine', synergy: 80, price: 25.00, category: 'Draw' }
 ]);

 const [cardSearch, setCardSearch] = useState('');
 const [searchResults, setSearchResults] = useState([]);

 const sampleCards = [
   { name: 'Lightning Bolt', cmc: 1, type: 'Instant', colors: ['red'], price: 0.25 },
   { name: 'Counterspell', cmc: 2, type: 'Instant', colors: ['blue'], price: 0.50 },
   { name: 'Dark Ritual', cmc: 1, type: 'Instant', colors: ['black'], price: 1.00 },
   { name: 'Birds of Paradise', cmc: 1, type: 'Creature', colors: ['green'], price: 3.50 }
 ];

 const handleSearch = () => {
   const results = sampleCards.filter(card => 
     card.name.toLowerCase().includes(cardSearch.toLowerCase())
   );
   setSearchResults(results);
 };

 const addToMainboard = (card) => {
   setDeck(prev => ({
     ...prev,
     mainboard: [...prev.mainboard, card]
   }));
   calculateStats();
 };

 const calculateStats = () => {
   const total = deck.mainboard.length;
   const avgCMC = total > 0 ? 
     deck.mainboard.reduce((sum, card) => sum + (card.cmc || 0), 0) / total : 0;
   
   setDeckStats(prev => ({
     ...prev,
     totalCards: total,
     avgCMC: Math.round(avgCMC * 100) / 100,
     powerLevel: Math.min(Math.round((total / 100) * 10), 10)
   }));
 };

 return (
   <div style={{ 
     display: 'grid', 
     gridTemplateColumns: '300px 1fr 350px', 
     gap: '1rem', 
     padding: '1rem',
     height: '100vh',
     color: '#fff',
     background: 'linear-gradient(135deg, #000000 0%, #2D1B69 100%)'
   }}>
     
     {/* LEFT PANEL: Card Search & Database */}
     <div style={{
       background: 'rgba(138, 43, 226, 0.1)',
       borderRadius: '12px',
       padding: '1rem',
       overflow: 'auto'
     }}>
       <h3 style={{ color: '#8A2BE2', marginBottom: '1rem' }}> Card Search</h3>
       
       <div style={{ marginBottom: '1rem' }}>
         <input
           type="text"
           placeholder="Search cards..."
           value={cardSearch}
           onChange={(e) => setCardSearch(e.target.value)}
           onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
           style={{
             width: '100%',
             padding: '0.75rem',
             background: 'rgba(0, 0, 0, 0.5)',
             border: '1px solid #8A2BE2',
             borderRadius: '6px',
             color: '#fff',
             marginBottom: '0.5rem'
           }}
         />
         <button
           onClick={handleSearch}
           style={{
             width: '100%',
             background: '#8A2BE2',
             color: 'white',
             border: 'none',
             padding: '0.5rem',
             borderRadius: '6px',
             cursor: 'pointer'
           }}
         >
           Search
         </button>
       </div>

       {/* Search Results */}
       <div>
         {searchResults.map((card, index) => (
           <div key={index} style={{
             background: 'rgba(0, 0, 0, 0.3)',
             padding: '0.75rem',
             marginBottom: '0.5rem',
             borderRadius: '6px',
             border: '1px solid rgba(138, 43, 226, 0.3)',
             cursor: 'pointer'
           }}
           onClick={() => addToMainboard(card)}
           >
             <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{card.name}</div>
             <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
               {card.cmc} CMC  {card.type}
             </div>
             <div style={{ fontSize: '0.8rem', color: '#00C805' }}>
               ${card.price}
             </div>
           </div>
         ))}
       </div>
     </div>

     {/* CENTER PANEL: Deck Builder */}
     <div style={{
       background: 'rgba(138, 43, 226, 0.1)',
       borderRadius: '12px',
       padding: '1rem',
       overflow: 'auto'
     }}>
       <h2 style={{ color: '#8A2BE2', marginBottom: '1rem' }}> Deck Builder</h2>
       
       {/* Commander Slot */}
       <div style={{
         background: 'rgba(255, 215, 0, 0.2)',
         border: '2px dashed #FFD700',
         borderRadius: '8px',
         padding: '1rem',
         marginBottom: '1rem',
         textAlign: 'center'
       }}>
         <h4 style={{ margin: 0, color: '#FFD700' }}>
           {deck.commander ? deck.commander.name : ' Drop Commander Here'}
         </h4>
       </div>

       {/* Mainboard */}
       <div style={{
         background: 'rgba(0, 0, 0, 0.3)',
         border: '2px dashed #8A2BE2',
         borderRadius: '8px',
         padding: '1rem',
         minHeight: '300px'
       }}>
         <h4 style={{ color: '#8A2BE2', marginBottom: '1rem' }}>
            Mainboard ({deck.mainboard.length}/100)
         </h4>
         
         {deck.mainboard.length === 0 ? (
           <div style={{ 
             textAlign: 'center', 
             padding: '2rem', 
             opacity: 0.6,
             fontSize: '1.1rem'
           }}>
             Drag cards here or click from search results
           </div>
         ) : (
           <div style={{ display: 'grid', gap: '0.5rem' }}>
             {deck.mainboard.map((card, index) => (
               <div key={index} style={{
                 background: 'rgba(138, 43, 226, 0.2)',
                 padding: '0.5rem',
                 borderRadius: '4px',
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center'
               }}>
                 <span>{card.name}</span>
                 <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                   {card.cmc} CMC
                 </span>
               </div>
             ))}
           </div>
         )}
       </div>

       {/* Deck Stats */}
       <div style={{
         background: 'rgba(0, 0, 0, 0.3)',
         borderRadius: '8px',
         padding: '1rem',
         marginTop: '1rem'
       }}>
         <h4 style={{ color: '#8A2BE2', marginBottom: '0.5rem' }}> Deck Statistics</h4>
         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
           <div>
             <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total Cards</div>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{deckStats.totalCards}</div>
           </div>
           <div>
             <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Avg CMC</div>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{deckStats.avgCMC}</div>
           </div>
           <div>
             <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Power Level</div>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8A2BE2' }}>
               {deckStats.powerLevel}/10
             </div>
           </div>
           <div>
             <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Completion</div>
             <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00C805' }}>
               {Math.round((deckStats.totalCards / 100) * 100)}%
             </div>
           </div>
         </div>
       </div>
     </div>

     {/* RIGHT PANEL: AI Recommendations */}
     <div style={{
       background: 'rgba(138, 43, 226, 0.1)',
       borderRadius: '12px',
       padding: '1rem',
       overflow: 'auto'
     }}>
       <h3 style={{ color: '#8A2BE2', marginBottom: '1rem' }}> AI Recommendations</h3>
       
       <div style={{ marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>
         Based on 10,000+ similar decks and current meta
       </div>

       {recommendations.map((rec, index) => (
         <div key={index} style={{
           background: 'rgba(0, 0, 0, 0.3)',
           borderRadius: '8px',
           padding: '1rem',
           marginBottom: '1rem',
           border: '1px solid rgba(138, 43, 226, 0.3)'
         }}>
           <div style={{ 
             display: 'flex', 
             justifyContent: 'space-between', 
             alignItems: 'flex-start',
             marginBottom: '0.5rem'
           }}>
             <div style={{ fontWeight: 'bold' }}>{rec.name}</div>
             <div style={{ 
               background: '#8A2BE2', 
               color: 'white', 
               padding: '0.25rem 0.5rem', 
               borderRadius: '12px', 
               fontSize: '0.7rem' 
             }}>
               {rec.category}
             </div>
           </div>
           
           <div style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '0.5rem' }}>
             {rec.reason}
           </div>
           
           <div style={{ 
             display: 'flex', 
             justifyContent: 'space-between', 
             alignItems: 'center',
             marginBottom: '0.75rem'
           }}>
             <div style={{ fontSize: '0.8rem' }}>
               Synergy: <span style={{ color: '#00C805', fontWeight: 'bold' }}>{rec.synergy}%</span>
             </div>
             <div style={{ fontSize: '0.8rem', color: '#00C805', fontWeight: 'bold' }}>
               ${rec.price}
             </div>
           </div>
           
           <button
             onClick={() => addToMainboard({ 
               name: rec.name, 
               cmc: 1, 
               type: rec.category,
               price: rec.price 
             })}
             style={{
               width: '100%',
               background: '#8A2BE2',
               color: 'white',
               border: 'none',
               padding: '0.5rem',
               borderRadius: '6px',
               cursor: 'pointer',
               fontSize: '0.8rem'
             }}
           >
             Add to Deck
           </button>
         </div>
       ))}
       
       {/* Meta Analysis */}
       <div style={{
         background: 'rgba(0, 0, 0, 0.3)',
         borderRadius: '8px',
         padding: '1rem',
         marginTop: '1rem'
       }}>
         <h4 style={{ color: '#8A2BE2', marginBottom: '0.5rem' }}> Meta Analysis</h4>
         <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            Aggro decks: 35% of meta<br/>
            Control decks: 28% of meta<br/>
            Combo decks: 22% of meta<br/>
            Midrange: 15% of meta
         </div>
       </div>
     </div>
   </div>
 );
};

export default DeckBuilder;
