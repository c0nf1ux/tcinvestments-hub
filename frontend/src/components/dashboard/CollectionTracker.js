import React from 'react';

const CollectionTracker = ({ user }) => {
  return (
    <div className="collection-tracker">
      {/* Portfolio Overview from Battle Plan - $125,840.23 with real-time tracking (+1.69% today) */}
      <div className="portfolio-overview">
        <h2 className="section-title">Portfolio Overview</h2>
        
        <div className="portfolio-value-section">
          <div className="portfolio-value">$125,840.23</div>
          <div className="portfolio-label">Total Portfolio Value</div>
          <div className="portfolio-change positive">+1.69% today</div>
        </div>
        
        <div className="portfolio-metrics">
          <div className="metric-item">
            <div className="metric-value">847</div>
            <div className="metric-label">Total Cards</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">+4.32%</div>
            <div className="metric-label">7-Day Change</div>
          </div>
        </div>
      </div>

      {/* Bloomberg Charts - Professional trend visualization */}
      <div className="performance-section">
        <h3 className="chart-title">Performance Trend</h3>
        <div className="chart-container">
          <svg width="100%" height="200" className="performance-chart">
            <defs>
              <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B7CF6" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#trendGradient)"
              strokeWidth="3"
              points="50,150 150,140 250,130 350,120 450,110 550,100 650,90 750,80"
            />
            <circle cx="50" cy="150" r="4" fill="#8B7CF6" />
            <circle cx="150" cy="140" r="4" fill="#8B7CF6" />
            <circle cx="250" cy="130" r="4" fill="#8B7CF6" />
            <circle cx="350" cy="120" r="4" fill="#8B7CF6" />
            <circle cx="450" cy="110" r="4" fill="#8B7CF6" />
            <circle cx="550" cy="100" r="4" fill="#8B7CF6" />
            <circle cx="650" cy="90" r="4" fill="#8B7CF6" />
            <circle cx="750" cy="80" r="4" fill="#8B7CF6" />
          </svg>
        </div>
      </div>

      {/* Collection Breakdown - Missing pie chart added */}
      <div className="breakdown-section">
        <h3 className="chart-title">Collection Breakdown</h3>
        <div className="pie-chart-container">
          <svg width="180" height="180" className="pie-chart">
            <defs>
              <linearGradient id="pokemonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B7CF6" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
              <linearGradient id="magicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#8B7CF6" />
              </linearGradient>
              <linearGradient id="yugiohGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
              <linearGradient id="sportsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DDD6FE" />
                <stop offset="100%" stopColor="#C4B5FD" />
              </linearGradient>
            </defs>
            
            {/* Pokemon - 45% */}
            <path d="M 90,90 L 90,20 A 70,70 0 0,1 135.75,45.75 z" fill="url(#pokemonGrad)" />
            {/* Magic - 30% */}
            <path d="M 90,90 L 135.75,45.75 A 70,70 0 0,1 135.75,134.25 z" fill="url(#magicGrad)" />
            {/* Yu-Gi-Oh - 15% */}
            <path d="M 90,90 L 135.75,134.25 A 70,70 0 0,1 90,160 z" fill="url(#yugiohGrad)" />
            {/* Sports - 10% */}
            <path d="M 90,90 L 90,160 A 70,70 0 0,1 90,20 z" fill="url(#sportsGrad)" />
            
            <circle cx="90" cy="90" r="25" fill="rgba(0,0,0,0.8)" />
            <text x="90" y="95" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">TCG</text>
          </svg>
          
          <div className="pie-legend">
            <div className="legend-item">
              <div className="legend-color pokemon"></div>
              <span>Pokemon (45%)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color magic"></div>
              <span>Magic (30%)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color yugioh"></div>
              <span>Yu-Gi-Oh (15%)</span>
            </div>
            <div className="legend-item">
              <div className="legend-color sports"></div>
              <span>Sports (10%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionTracker;