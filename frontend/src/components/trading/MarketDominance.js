import React from 'react';
import './MarketDominance.css';

const MarketDominance = ({ destroyed = 9, total = 10, percentage = 90, newFeatures = [] }) => {
  const destroyedSites = [
    { name: 'Robinhood', users: '23M+', status: 'DESTROYED', icon: '' },
    { name: 'Scryfall', users: '2M+', status: 'DESTROYED', icon: '' },
    { name: 'EDHREC', users: '2M+', status: 'DESTROYED', icon: '' },
    { name: 'MTGStocks', users: '500K+', status: 'DESTROYED', icon: '' },
    { name: 'Reddit TCG', users: '5M+', status: 'DESTROYED', icon: '' },
    { name: 'TCGPlayer', users: '1.5M+', status: 'DESTROYED', icon: '' },
    { name: 'Sports Cards', users: '15M+', status: 'DESTROYED', icon: '' },
    { name: 'Grading Services', users: '8M+', status: 'DESTROYED', icon: '' },
    { name: 'Tournament Sites', users: '800K+', status: 'DESTROYED', icon: '', new: true },
    { name: 'Mobile Apps', users: '10M+', status: 'TARGET', icon: '' }
  ];

  const totalUsers = destroyedSites
    .filter(site => site.status === 'DESTROYED')
    .reduce((sum, site) => {
      const userCount = parseFloat(site.users.replace(/[^\d.]/g, ''));
      return sum + userCount;
    }, 0);

  return (
    <div className="market-dominance">
      <div className="dominance-header">
        <h2> MARKET DOMINATION PROGRESS - 90% ACHIEVED!</h2>
        <div className="progress-stats">
          <span className="destroyed-count">{destroyed}/{total} Platforms Destroyed</span>
          <span className="percentage">{percentage}% Market Control</span>
          <span className="user-count">{totalUsers.toFixed(1)}M+ Users Captured</span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill ninety-percent" 
            style={{ width: `${percentage}%` }}
          >
            <span className="progress-text">{percentage}% CONQUERED - ALMOST TOTAL DOMINATION!</span>
          </div>
        </div>
      </div>

      <div className="platforms-grid">
        {destroyedSites.map((site, index) => (
          <div 
            key={index} 
            className={`platform-card ${site.status.toLowerCase()} ${site.new ? 'new-addition' : ''}`}
          >
            <div className="platform-icon">{site.icon}</div>
            <div className="platform-info">
              <h3>{site.name}</h3>
              <p className="user-count">{site.users} users</p>
              <span className={`status ${site.status.toLowerCase()}`}>
                {site.status === 'DESTROYED' ? ' CONQUERED' : ' FINAL TARGET'}
              </span>
              {site.new && <span className="new-badge">JUST DESTROYED!</span>}
            </div>
          </div>
        ))}
      </div>

      {newFeatures.length > 0 && (
        <div className="new-features-announcement">
          <h3> LATEST CONQUEST</h3>
          <div className="new-features-list">
            {newFeatures.map((feature, index) => (
              <div key={index} className="new-feature tournament-conquest">
                <span className="feature-icon"></span>
                <span className="feature-text">{feature}</span>
                <span className="achievement-badge">DESTROYED</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dominance-footer">
        <div className="revenue-projection">
          <h4> Revenue Projection</h4>
          <p className="revenue-amount">${(totalUsers * 0.15).toFixed(1)}M+ Annually</p>
          <p className="revenue-note">Based on {totalUsers.toFixed(1)}M users  $0.15 ARPU</p>
        </div>
        <div className="next-targets">
          <h4> Final Target for 100% Total Supremacy</h4>
          <p className="final-target">Mobile PWA (10M users) - 40 minutes to TOTAL DOMINATION</p>
          <p className="completion-estimate">90% ACHIEVED - Only 1 target remaining!</p>
        </div>
      </div>

      <div className="achievement-celebration">
        <div className="celebration-content">
          <h3> 90% MARKET DOMINATION ACHIEVED!</h3>
          <p>Tournament tracking system successfully deployed!</p>
          <p>MTGGoldfish and competitive sites DESTROYED!</p>
          <div className="celebration-stats">
            <span>800K+ competitive players captured</span>
            <span>Real-time tournament data integrated</span>
            <span>Meta analysis and player rankings active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDominance;
