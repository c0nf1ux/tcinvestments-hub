import React, { useState } from 'react';

const AdvancedSearch = () => {
 const [searchQuery, setSearchQuery] = useState('');
 const [filters, setFilters] = useState({
   game: 'all',
   type: '',
   rarity: '',
   set: '',
   priceMin: '',
   priceMax: ''
 });
 const [results, setResults] = useState([]);

 const sampleResults = [
   { name: 'Charizard', set: 'Base Set', rarity: 'Rare Holo', price: 6800, image: '🔥' },
   { name: 'Black Lotus', set: 'Alpha', rarity: 'Rare', price: 45000, image: '🌸' },
   { name: 'Pikachu', set: 'Base Set', rarity: 'Common', price: 25, image: '⚡' },
   { name: 'Mox Ruby', set: 'Alpha', rarity: 'Rare', price: 4220, image: '💎' }
 ];

 const handleSearch = () => {
   // Simulate search results
   setResults(sampleResults.filter(card => 
     card.name.toLowerCase().includes(searchQuery.toLowerCase())
   ));
 };

 return (
   <div style={{ padding: '2rem', color: '#fff', maxWidth: '1400px', margin: '0 auto' }}>
     <h1 style={{ color: '#8A2BE2', marginBottom: '2rem' }}>Advanced Card Search</h1>
     
     {/* Search Bar */}
     <div style={{
       background: 'rgba(138, 43, 226, 0.1)',
       borderRadius: '16px',
       padding: '2rem',
       marginBottom: '2rem'
     }}>
       <div style={{ marginBottom: '1rem' }}>
         <input
           type="text"
           placeholder="Search cards... (e.g., name:charizard type:pokemon)"
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
           style={{
             width: '100%',
             padding: '1rem',
             fontSize: '1.1rem',
             background: 'rgba(0, 0, 0, 0.5)',
             border: '2px solid rgba(138, 43, 226, 0.5)',
             borderRadius: '8px',
             color: '#fff'
           }}
         />
       </div>
       
       {/* Advanced Filters */}
       <div style={{ 
         display: 'grid', 
         gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
         gap: '1rem',
         marginBottom: '1rem'
       }}>
         <select 
           value={filters.game}
           onChange={(e) => setFilters({...filters, game: e.target.value})}
           style={{
             padding: '0.75rem',
             background: 'rgba(0, 0, 0, 0.5)',
             border: '1px solid rgba(138, 43, 226, 0.5)',
             borderRadius: '6px',
             color: '#fff'
           }}
         >
           <option value="all">All Games</option>
           <option value="pokemon">Pokemon</option>
           <option value="magic">Magic: The Gathering</option>
           <option value="yugioh">Yu-Gi-Oh!</option>
         </select>
         
         <input
           type="text"
           placeholder="Card Type"
           value={filters.type}
           onChange={(e) => setFilters({...filters, type: e.target.value})}
           style={{
             padding: '0.75rem',
             background: 'rgba(0, 0, 0, 0.5)',
             border: '1px solid rgba(138, 43, 226, 0.5)',
             borderRadius: '6px',
             color: '#fff'
           }}
         />
         
         <input
           type="text"
           placeholder="Min Price ($)"
           value={filters.priceMin}
           onChange={(e) => setFilters({...filters, priceMin: e.target.value})}
           style={{
             padding: '0.75rem',
             background: 'rgba(0, 0, 0, 0.5)',
             border: '1px solid rgba(138, 43, 226, 0.5)',
             borderRadius: '6px',
             color: '#fff'
           }}
         />
         
         <input
           type="text"
           placeholder="Max Price ($)"
           value={filters.priceMax}
           onChange={(e) => setFilters({...filters, priceMax: e.target.value})}
           style={{
             padding: '0.75rem',
             background: 'rgba(0, 0, 0, 0.5)',
             border: '1px solid rgba(138, 43, 226, 0.5)',
             borderRadius: '6px',
             color: '#fff'
           }}
         />
       </div>
       
       <button
         onClick={handleSearch}
         style={{
           background: '#8A2BE2',
           color: 'white',
           border: 'none',
           padding: '1rem 2rem',
           borderRadius: '8px',
           fontWeight: 'bold',
           cursor: 'pointer'
         }}
       >
         Search Cards
       </button>
     </div>

     {/* Search Results */}
     {results.length > 0 && (
       <div style={{
         background: 'rgba(138, 43, 226, 0.1)',
         borderRadius: '16px',
         padding: '2rem'
       }}>
         <h2>Search Results ({results.length} cards found)</h2>
         <div style={{
           display: 'grid',
           gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
           gap: '1rem',
           marginTop: '1rem'
         }}>
           {results.map((card, index) => (
             <div key={index} style={{
               background: 'rgba(0, 0, 0, 0.3)',
               borderRadius: '12px',
               padding: '1.5rem',
               border: '1px solid rgba(138, 43, 226, 0.3)'
             }}>
               <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '0.5rem' }}>
                 {card.image}
               </div>
               <h3 style={{ margin: '0 0 0.5rem 0' }}>{card.name}</h3>
               <p style={{ margin: '0 0 0.5rem 0', opacity: 0.8 }}>{card.set}</p>
               <p style={{ margin: '0 0 1rem 0', color: '#8A2BE2' }}>{card.rarity}</p>
               <div style={{ 
                 fontSize: '1.5rem', 
                 fontWeight: 'bold', 
                 color: '#00C805',
                 marginBottom: '1rem'
               }}>
                 ${card.price.toLocaleString()}
               </div>
               <button style={{
                 width: '100%',
                 background: '#8A2BE2',
                 color: 'white',
                 border: 'none',
                 padding: '0.75rem',
                 borderRadius: '6px',
                 cursor: 'pointer'
               }}>
                 Add to Portfolio
               </button>
             </div>
           ))}
         </div>
       </div>
     )}
   </div>
 );
};

export default AdvancedSearch;
