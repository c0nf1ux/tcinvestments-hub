import React from 'react';
import { Bar } from 'react-chartjs-2';

const ManaCurveAnalyzer = ({ deck }) => {
 const calculateManaCurve = () => {
   const curve = [0, 0, 0, 0, 0, 0, 0, 0]; // 0-7+ CMC
   
   deck.mainboard.forEach(card => {
     const cmc = card.cmc || 0;
     const index = Math.min(cmc, 7);
     curve[index]++;
   });
   
   return curve;
 };

 const manaCurve = calculateManaCurve();
 const idealCurve = [2, 8, 12, 10, 8, 4, 2, 1]; // Ideal curve for comparison

 const chartData = {
   labels: ['0', '1', '2', '3', '4', '5', '6', '7+'],
   datasets: [
     {
       label: 'Your Deck',
       data: manaCurve,
       backgroundColor: 'rgba(138, 43, 226, 0.8)',
       borderColor: '#8A2BE2',
       borderWidth: 2
     },
     {
       label: 'Optimal Curve',
       data: idealCurve,
       backgroundColor: 'rgba(0, 200, 5, 0.3)',
       borderColor: '#00C805',
       borderWidth: 2,
       type: 'line'
     }
   ]
 };

 const chartOptions = {
   responsive: true,
   plugins: {
     legend: {
       labels: { color: '#fff' }
     }
   },
   scales: {
     x: {
       ticks: { color: '#fff' },
       grid: { color: 'rgba(138, 43, 226, 0.3)' }
     },
     y: {
       ticks: { color: '#fff' },
       grid: { color: 'rgba(138, 43, 226, 0.3)' }
     }
   }
 };

 const getRecommendations = () => {
   const recommendations = [];
   
   if (manaCurve[0] + manaCurve[1] < 8) {
     recommendations.push({
       type: 'warning',
       message: 'Consider adding more low-cost cards for early game presence'
     });
   }
   
   if (manaCurve[5] + manaCurve[6] + manaCurve[7] > 6) {
     recommendations.push({
       type: 'warning', 
       message: 'Too many expensive cards - deck may be slow'
     });
   }
   
   if (Math.max(...manaCurve) > 15) {
     recommendations.push({
       type: 'error',
       message: 'Mana curve heavily skewed - consider balancing'
     });
   }
   
   return recommendations;
 };

 return (
   <div style={{
     background: 'rgba(138, 43, 226, 0.1)',
     borderRadius: '12px',
     padding: '1.5rem',
     color: '#fff'
   }}>
     <h3 style={{ color: '#8A2BE2', marginBottom: '1rem' }}> Mana Curve Analysis</h3>
     
     <div style={{ height: '300px', marginBottom: '1rem' }}>
       <Bar data={chartData} options={chartOptions} />
     </div>
     
     {/* Curve Statistics */}
     <div style={{ 
       display: 'grid', 
       gridTemplateColumns: 'repeat(4, 1fr)', 
       gap: '1rem',
       marginBottom: '1rem'
     }}>
       <div style={{ textAlign: 'center' }}>
         <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Avg CMC</div>
         <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8A2BE2' }}>
           {(manaCurve.reduce((sum, count, cmc) => sum + count * cmc, 0) / 
             manaCurve.reduce((sum, count) => sum + count, 0) || 0).toFixed(1)}
         </div>
       </div>
       <div style={{ textAlign: 'center' }}>
         <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Early Game</div>
         <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00C805' }}>
           {manaCurve[0] + manaCurve[1] + manaCurve[2]}
         </div>
       </div>
       <div style={{ textAlign: 'center' }}>
         <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Mid Game</div>
         <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFA500' }}>
           {manaCurve[3] + manaCurve[4]}
         </div>
       </div>
       <div style={{ textAlign: 'center' }}>
         <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Late Game</div>
         <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF5733' }}>
           {manaCurve[5] + manaCurve[6] + manaCurve[7]}
         </div>
       </div>
     </div>
     
     {/* Recommendations */}
     <div>
       <h4 style={{ color: '#8A2BE2', marginBottom: '0.5rem' }}> Optimization Tips</h4>
       {getRecommendations().map((rec, index) => (
         <div key={index} style={{
           background: rec.type === 'error' ? 'rgba(255, 87, 51, 0.2)' : 'rgba(255, 165, 0, 0.2)',
           border: `1px solid ${rec.type === 'error' ? '#FF5733' : '#FFA500'}`,
           borderRadius: '6px',
           padding: '0.75rem',
           marginBottom: '0.5rem',
           fontSize: '0.9rem'
         }}>
           {rec.message}
         </div>
       ))}
       {getRecommendations().length === 0 && (
         <div style={{
           background: 'rgba(0, 200, 5, 0.2)',
           border: '1px solid #00C805',
           borderRadius: '6px',
           padding: '0.75rem',
           fontSize: '0.9rem'
         }}>
            Your mana curve looks well-balanced!
         </div>
       )}
     </div>
   </div>
 );
};

export default ManaCurveAnalyzer;
