import React from 'react';

const NewsIntegration = () => {
  return (
    <div style={{padding: '20px', background: '#2D2D2D', borderRadius: '8px', margin: '10px'}}>
      <h3 style={{color: '#C5C5FF'}}>Market News & Analysis</h3>
      <div style={{padding: '15px', background: '#0D0D0D', borderRadius: '8px', margin: '10px 0'}}>
        <div style={{color: '#E6E6FF', fontWeight: 'bold'}}>MTG Card Prices Surge 15%</div>
        <div style={{color: '#9999FF', fontSize: '0.9em'}}>Tournament results drive market gains</div>
      </div>
      <div style={{padding: '15px', background: '#0D0D0D', borderRadius: '8px', margin: '10px 0'}}>
        <div style={{color: '#E6E6FF', fontWeight: 'bold'}}>New Set Announcement</div>
        <div style={{color: '#9999FF', fontSize: '0.9em'}}>Legacy market reacts to reprint news</div>
      </div>
    </div>
  );
};

export default NewsIntegration;
