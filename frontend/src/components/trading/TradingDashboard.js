import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const TradingDashboard = () => {
 const [portfolio, setPortfolio] = useState({
   totalValue: 125840.23,
   dayChange: 2145.67,
   dayChangePercent: 1.73,
   positions: [
     { name: 'Charizard Base Set', quantity: 3, value: 20400, change: 1200, changePercent: 6.25 },
     { name: 'Black Lotus Alpha', quantity: 1, value: 45000, change: 2000, changePercent: 4.65 },
     { name: 'Pikachu Illustrator', quantity: 1, value: 35000, change: -500, changePercent: -1.41 },
     { name: 'Mox Ruby', quantity: 2, value: 8440, change: 340, changePercent: 4.20 }
   ]
 });

 const chartData = {
   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
   datasets: [{
     label: 'Portfolio Value',
     data: [98000, 105000, 112000, 118000, 123000, 125840],
     borderColor: '#8A2BE2',
     backgroundColor: 'rgba(138, 43, 226, 0.1)',
     tension: 0.4
   }]
 };

 return (
   <div style={{ padding: '2rem', color: '#fff', maxWidth: '1400px', margin: '0 auto' }}>
     {/* Portfolio Header - Robinhood Style */}
     <div style={{ 
       background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%)',
       borderRadius: '16px',
       padding: '2rem',
       marginBottom: '2rem'
     }}>
       <h1 style={{ fontSize: '1.2rem', opacity: 0.8, margin: 0 }}>Total Portfolio Value</h1>
       <div style={{ fontSize: '3.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
         ${portfolio.totalValue.toLocaleString()}
       </div>
       <div style={{ 
         fontSize: '1.2rem',
         color: portfolio.dayChange >= 0 ? '#00C805' : '#FF5733',
         display: 'flex',
         alignItems: 'center',
         gap: '0.5rem'
       }}>
         <span>{portfolio.dayChange >= 0 ? '▲' : '▼'}</span>
         <span>${Math.abs(portfolio.dayChange).toLocaleString()}</span>
         <span>({portfolio.dayChangePercent >= 0 ? '+' : ''}{portfolio.dayChangePercent}%)</span>
         <span style={{ opacity: 0.7 }}>today</span>
       </div>
     </div>

     {/* Chart Section */}
     <div style={{
       background: 'rgba(138, 43, 226, 0.1)',
       borderRadius: '16px',
       padding: '2rem',
       marginBottom: '2rem'
     }}>
       <h2 style={{ marginBottom: '1rem' }}>Performance Trend</h2>
       <div style={{ height: '300px' }}>
         <Line data={chartData} options={{
           responsive: true,
           maintainAspectRatio: false,
           plugins: { legend: { display: false } },
           scales: {
             y: { grid: { color: 'rgba(138, 43, 226, 0.3)' } },
             x: { grid: { color: 'rgba(138, 43, 226, 0.3)' } }
           }
         }} />
       </div>
     </div>

     {/* Holdings Table - Stock-style */}
     <div style={{
       background: 'rgba(138, 43, 226, 0.1)',
       borderRadius: '16px',
       padding: '2rem'
     }}>
       <h2 style={{ marginBottom: '1rem' }}>Your Holdings</h2>
       <div style={{ overflowX: 'auto' }}>
         {portfolio.positions.map((position, index) => (
           <div key={index} style={{
             display: 'grid',
             gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
             padding: '1rem',
             borderBottom: '1px solid rgba(138, 43, 226, 0.3)',
             alignItems: 'center'
           }}>
             <div>
               <div style={{ fontWeight: 'bold' }}>{position.name}</div>
               <div style={{ opacity: 0.7, fontSize: '0.9rem' }}>{position.quantity} cards</div>
             </div>
             <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
               ${position.value.toLocaleString()}
             </div>
             <div style={{ 
               textAlign: 'right',
               color: position.change >= 0 ? '#00C805' : '#FF5733'
             }}>
               {position.change >= 0 ? '+' : ''}${position.change}
             </div>
             <div style={{ 
               textAlign: 'right',
               color: position.changePercent >= 0 ? '#00C805' : '#FF5733'
             }}>
               {position.changePercent >= 0 ? '+' : ''}{position.changePercent}%
             </div>
             <div style={{ textAlign: 'right' }}>
               <button style={{
                 background: '#8A2BE2',
                 color: 'white',
                 border: 'none',
                 padding: '0.5rem 1rem',
                 borderRadius: '6px',
                 cursor: 'pointer'
               }}>
                 Trade
               </button>
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
};

export default TradingDashboard;
