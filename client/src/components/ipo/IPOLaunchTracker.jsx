import React, { useState, useEffect } from 'react';

const IPOLaunchTracker = () => {
  const [launches, setLaunches] = useState([]);
  const [preOrders, setPreOrders] = useState([]);

  useEffect(() => {
    const mockLaunches = [
      {
        id: 1,
        name: 'Murders at Karlov Manor',
        game: 'MTG',
        launchDate: '2025-02-09',
        preOrderPrice: 120,
        estimatedValue: 'High',
        allocationStatus: 'Available',
        keyCards: ['Deadly Cover-Up', 'Case File'],
        expectedROI: '25-40%',
        riskLevel: 'Medium'
      },
      {
        id: 2,
        name: 'Temporal Forces',
        game: 'Pokemon',
        launchDate: '2025-03-22',
        preOrderPrice: 150,
        estimatedValue: 'Medium-High',
        allocationStatus: 'Limited',
        keyCards: ['Iron Valiant ex', 'Roaring Moon ex'],
        expectedROI: '15-30%',
        riskLevel: 'Low'
      }
    ];
    
    setLaunches(mockLaunches);
  }, []);

  const handlePreOrder = (launchId) => {
    setPreOrders([...preOrders, launchId]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#CCCCFF', marginBottom: '24px' }}> IPO Launch Calendar</h2>
      
      {launches.map(launch => (
        <div key={launch.id} style={{
          background: 'rgba(26, 26, 26, 0.8)',
          border: '1px solid rgba(204, 204, 255, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: '#FFFFFF', margin: '0 0 8px 0' }}>{launch.name}</h3>
              <div style={{ color: '#9999FF', marginBottom: '12px' }}>
                {launch.game}  {launch.launchDate}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ color: '#CCCCFF', fontSize: '0.9rem' }}>Pre-order Price</div>
                  <div style={{ color: '#66FF66', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    
                  </div>
                </div>
                <div>
                  <div style={{ color: '#CCCCFF', fontSize: '0.9rem' }}>Expected ROI</div>
                  <div style={{ color: '#FFD700', fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {launch.expectedROI}
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ color: '#CCCCFF', fontSize: '0.9rem', marginBottom: '4px' }}>Key Cards:</div>
                <div style={{ color: '#FFFFFF' }}>
                  {launch.keyCards.join(', ')}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <span style={{
                  background: launch.allocationStatus === 'Available' ? '#66FF66' : '#FFD700',
                  color: '#000000',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {launch.allocationStatus}
                </span>
                <span style={{
                  background: launch.riskLevel === 'Low' ? '#66FF66' : 
                            launch.riskLevel === 'Medium' ? '#FFD700' : '#FF6666',
                  color: '#000000',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold'
                }}>
                  {launch.riskLevel} Risk
                </span>
              </div>
            </div>
            
            <button
              onClick={() => handlePreOrder(launch.id)}
              disabled={preOrders.includes(launch.id)}
              style={{
                background: preOrders.includes(launch.id) 
                  ? 'rgba(102, 255, 102, 0.3)' 
                  : 'linear-gradient(45deg, #CCCCFF, #9999FF)',
                color: preOrders.includes(launch.id) ? '#66FF66' : '#000000',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: preOrders.includes(launch.id) ? 'default' : 'pointer'
              }}
            >
              {preOrders.includes(launch.id) ? ' Pre-ordered' : 'Pre-order Now'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IPOLaunchTracker;
