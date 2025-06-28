import React, { useState } from 'react';
import './App.css';

function App() {
  const [portfolioData] = useState({
    totalValue: 125840.23,
    dayChange: 2340.50,
    dayChangePercent: 1.89,
    buyingPower: 15420.50
  });

  const [cryptoData] = useState([
    { symbol: 'LOTUS', price: 3.48, shares: '265,764' },
    { symbol: 'CHAR', price: 0.01, shares: '0.000004' },
    { symbol: 'PIKA', price: 0.00, shares: '0.000095' }
  ]);

  const [trendingCards] = useState([
    { symbol: 'LOTUS', price: 48000, change: 15.77 },
    { symbol: 'CHAR', price: 9200, change: 12.03 },
    { symbol: 'RECALL', price: 12500, change: 8.91 }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPrice = (price) => {
    if (price >= 1000) {
      return '$' + (price / 1000).toFixed(1) + 'K';
    }
    return '$' + price.toFixed(2);
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="app">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="time">{getCurrentTime()}</div>
        <div className="status-icons">
            38
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <div className="header-left">
          <span className="investing-label">Brainstorm</span>
          <span className="status-dot"></span>
        </div>
        <div className="header-right">
          <span style={{fontSize: '20px'}}></span>
          <span style={{fontSize: '20px'}}></span>
          <button className="earn-button">Earn </button>
        </div>
      </div>

      {/* Portfolio Value */}
      <div className="portfolio-section">
        <div className="portfolio-value">
          {formatCurrency(portfolioData.totalValue)}
        </div>
        <div className="portfolio-change">
          <div className="change-arrow"></div>
          <span>
             ({portfolioData.dayChangePercent.toFixed(2)}%) Today
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">
        <div className="price-chart">
          <svg viewBox="0 0 300 120" style={{width: '100%', height: '100%'}}>
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00C805" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#00C805" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path
              d="M0,100 Q50,80 100,60 T200,30 T300,20 L300,120 L0,120 Z"
              fill="url(#chartGradient)"
            />
            <path
              d="M0,100 Q50,80 100,60 T200,30 T300,20"
              stroke="#00C805"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="300" cy="20" r="4" fill="#00C805"/>
          </svg>
        </div>
        <div className="chart-controls">
          <button className="chart-control">LIVE</button>
          <button className="chart-control active">1D</button>
          <button className="chart-control">1W</button>
          <button className="chart-control">1M</button>
          <button className="chart-control">3M</button>
          <button className="chart-control">YTD</button>
          <button className="chart-control">1Y</button>
        </div>
      </div>

      {/* Buying Power */}
      <div className="buying-power">
        <span className="buying-power-label">Buying power</span>
        <div className="buying-power-value">
          {formatCurrency(portfolioData.buyingPower)}
          <div className="chevron-right"></div>
        </div>
      </div>

      {/* Card Tokens */}
      <div className="cards-section">
        <div className="section-title">Card Tokens</div>
        <div style={{fontSize: '15px', color: '#8E8E93', marginBottom: '20px'}}>
          Offered by Brainstorm Crypto
        </div>
        {cryptoData.map((crypto, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 0',
            borderBottom: '1px solid #48484A'
          }}>
            <div>
              <div style={{fontSize: '17px', fontWeight: '600', color: '#FFFFFF'}}>
                {crypto.symbol}
              </div>
              <div style={{fontSize: '15px', color: '#8E8E93'}}>
                {crypto.shares}
              </div>
            </div>
            <div style={{width: '60px', height: '30px'}}>
              <svg viewBox="0 0 60 30" style={{width: '100%', height: '100%'}}>
                <path
                  d="M0,25 Q15,20 30,15 T60,10"
                  stroke="#00C805"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{fontSize: '17px', fontWeight: '600', color: '#FFFFFF'}}>
                {formatCurrency(crypto.price)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trending */}
      <div className="cards-section">
        <div className="section-title">Trending</div>
        <div style={{fontSize: '15px', color: '#8E8E93', marginBottom: '20px'}}>
          Cards with largest percentage increase in traders
        </div>
        <div style={{display: 'flex', gap: '12px', overflowX: 'auto', padding: '0 0 20px'}}>
          {trendingCards.map((card, index) => (
            <div key={index} style={{
              background: '#1C1C1E',
              borderRadius: '12px',
              padding: '16px',
              minWidth: '140px',
              flexShrink: 0
            }}>
              <div style={{fontSize: '17px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px'}}>
                {card.symbol}
              </div>
              <div style={{fontSize: '15px', color: '#FFFFFF', marginBottom: '8px'}}>
                {formatPrice(card.price)}
              </div>
              <div style={{fontSize: '13px', color: '#00C805', fontWeight: '600'}}>
                 {card.change.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <div className="nav-icon"></div>
        </div>
        <div className="nav-item">
          <div className="nav-icon"></div>
        </div>
        <div className="nav-item">
          <div className="nav-icon"></div>
        </div>
        <div className="nav-item">
          <div className="nav-icon"></div>
        </div>
        <div className="nav-item">
          <div className="nav-icon"></div>
        </div>
      </div>
    </div>
  );
}

export default App;

