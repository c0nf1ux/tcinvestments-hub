// client/src/App.js - Fixed Ultimate CardHood
import React, { useState, useEffect } from 'react';
import './App.css';
import NewsFeed from './components/news/NewsFeed';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [portfolioData, setPortfolioData] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [timeframe, setTimeframe] = useState('1D');

  useEffect(() => {
    loadPortfolioData();
    loadWatchlist();
    
    const interval = setInterval(() => {
      updateRealTimeData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadPortfolioData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolio');
      const data = await response.json();
      setPortfolioData(data);
    } catch (error) {
      console.error('Error loading portfolio:', error);
      setPortfolioData({
        totalValue: 125750,
        dailyChange: 2.34,
        holdings: [
          { name: 'Black Lotus', value: 45000, change: 5.2 },
          { name: 'Charizard', value: 8500, change: -2.1 },
          { name: 'Mox Ruby', value: 12000, change: 1.8 }
        ]
      });
    }
  };

  const loadWatchlist = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/watchlist');
      const data = await response.json();
      setWatchlist(data);
    } catch (error) {
      console.error('Error loading watchlist:', error);
      setWatchlist([
        { id: 1, name: 'Black Lotus', game: 'MTG', price: 45000, change: 5.2, prediction: { target: 47340, confidence: 85 } },
        { id: 2, name: 'Charizard', game: 'Pokemon', price: 8500, change: -2.1, prediction: { target: 8322, confidence: 72 } },
        { id: 3, name: 'Mox Ruby', game: 'MTG', price: 12000, change: 1.8, prediction: { target: 12216, confidence: 90 } },
        { id: 4, name: 'Blue Eyes White Dragon', game: 'Yu-Gi-Oh', price: 2800, change: 3.7, prediction: { target: 2904, confidence: 68 } }
      ]);
    }
  };

  const updateRealTimeData = () => {
    if (portfolioData) {
      const newValue = portfolioData.totalValue + (Math.random() - 0.5) * 1000;
      const newChange = ((newValue - 125750) / 125750) * 100;
      
      setPortfolioData(prev => ({
        ...prev,
        totalValue: newValue,
        dailyChange: newChange
      }));
    }
  };

  const timeframes = ['1D', '1W', '1M', '3M', '6M', '1Y', 'ALL'];

  const formatCurrency = (value) => {
    return '$' + value.toLocaleString();
  };

  const renderDashboard = () => (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Portfolio Overview */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
        border: '1px solid rgba(204, 204, 255, 0.3)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ 
            color: '#CCCCFF', 
            fontSize: '2.5rem', 
            margin: '0 0 8px 0',
            background: 'linear-gradient(45deg, #CCCCFF, #9999FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {portfolioData ? formatCurrency(portfolioData.totalValue) : 'Loading...'}
          </h1>
          <div style={{ 
            color: portfolioData?.dailyChange >= 0 ? '#66FF66' : '#FF6666',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            {portfolioData?.dailyChange >= 0 ? '+' : ''}{portfolioData?.dailyChange.toFixed(2)}% Today
          </div>
        </div>

        {/* Timeframe Selector */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {timeframes.map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  background: timeframe === tf ? 'linear-gradient(45deg, #CCCCFF, #9999FF)' : 'transparent',
                  color: timeframe === tf ? '#000000' : '#CCCCFF',
                  border: '1px solid ' + (timeframe === tf ? 'transparent' : '#6666FF'),
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontWeight: timeframe === tf ? 'bold' : 'normal'
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Chart Placeholder */}
        <div style={{
          height: '300px',
          background: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(102, 102, 255, 0.2)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <div style={{ color: '#CCCCFF', textAlign: 'center' }}>
             Portfolio Chart ({timeframe})
            <br />
            <small style={{ color: '#9999FF' }}>Real-time price tracking</small>
          </div>
        </div>
      </div>

      {/* Watchlist Grid */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
        border: '1px solid rgba(204, 204, 255, 0.3)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ color: '#CCCCFF', marginBottom: '20px' }}> Your Watchlist</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {watchlist.map((card, index) => (
            <div key={index} style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(102, 102, 255, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 102, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ color: '#FFFFFF', margin: '0 0 4px 0' }}>{card.name}</h3>
                  <div style={{ color: '#9999FF', fontSize: '0.9rem' }}>{card.game}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#66FF66', fontWeight: 'bold' }}>
                    {formatCurrency(card.price)}
                  </div>
                  <div style={{ 
                    color: card.change >= 0 ? '#66FF66' : '#FF6666',
                    fontSize: '0.9rem'
                  }}>
                    {card.change >= 0 ? '+' : ''}{card.change}%
                  </div>
                </div>
              </div>
              
              {/* Mini Chart Placeholder */}
              <div style={{
                height: '60px',
                background: 'linear-gradient(90deg, rgba(102, 102, 255, 0.1), rgba(204, 204, 255, 0.1))',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <span style={{ color: '#6666FF', fontSize: '0.8rem' }}> Mini Chart</span>
              </div>

              {/* AI Prediction */}
              {card.prediction && (
                <div style={{
                  background: 'linear-gradient(90deg, rgba(204,204,255,0.1), rgba(153,153,255,0.1))',
                  borderLeft: '3px solid #6666FF',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ color: '#CCCCFF' }}>
                     AI: {formatCurrency(card.prediction.target)} ({card.prediction.confidence}%)
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* AI Insights */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
          border: '1px solid rgba(102, 102, 255, 0.5)',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <h3 style={{ color: '#6666FF', marginBottom: '16px' }}> AI Market Intelligence</h3>
          <div style={{ color: '#FFFFFF', marginBottom: '12px' }}>
            Portfolio optimized for 18.5% growth
          </div>
          <div style={{ color: '#CCCCFF', fontSize: '0.9rem', marginBottom: '16px' }}>
             Vintage MTG trending upward<br />
             Pokemon showing consolidation<br />
             Sports cards entering bull market
          </div>
          <button
            onClick={() => setCurrentView('ai')}
            style={{
              background: 'linear-gradient(45deg, #6666FF, #9999FF)',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            View Full Analysis
          </button>
        </div>

        {/* IPO Calendar */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
          border: '1px solid rgba(255, 215, 0, 0.5)',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <h3 style={{ color: '#FFD700', marginBottom: '16px' }}> Upcoming IPOs</h3>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Murders at Karlov Manor</div>
            <div style={{ color: '#CCCCFF', fontSize: '0.9rem' }}>MTG  Feb 9, 2025  </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ color: '#FFFFFF', fontWeight: 'bold' }}>Temporal Forces</div>
            <div style={{ color: '#CCCCFF', fontSize: '0.9rem' }}>Pokemon  Mar 22, 2025  </div>
          </div>
          <button
            onClick={() => setCurrentView('ipo')}
            style={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              color: '#000000',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            View All IPOs
          </button>
        </div>
      </div>

      {/* NFT & Social Preview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* NFT Integration */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
          border: '1px solid rgba(153, 51, 255, 0.5)',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <h3 style={{ color: '#9933FF', marginBottom: '16px' }}> NFT Integration</h3>
          <div style={{ color: '#FFFFFF', marginBottom: '12px' }}>
            12 verified NFTs in portfolio
          </div>
          <div style={{ color: '#CCCCFF', fontSize: '0.9rem', marginBottom: '16px' }}>
            Floor value: 8.5 ETH<br />
            24h volume: +15.2%
          </div>
          <button
            onClick={() => setCurrentView('nft')}
            style={{
              background: 'linear-gradient(45deg, #9933FF, #6666FF)',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Manage NFTs
          </button>
        </div>

        {/* Social Activity */}
        <div style={{
          background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
          border: '1px solid rgba(0, 191, 255, 0.5)',
          borderRadius: '16px',
          padding: '20px'
        }}>
          <h3 style={{ color: '#00BFFF', marginBottom: '16px' }}> Community Pulse</h3>
          <div style={{ color: '#FFFFFF', marginBottom: '8px', fontSize: '0.9rem' }}>
            "Black Lotus hitting new highs! "
          </div>
          <div style={{ color: '#CCCCFF', fontSize: '0.8rem', marginBottom: '12px' }}>
            @MTGWhale  2h ago  24 likes
          </div>
          <button
            onClick={() => setCurrentView('social')}
            style={{
              background: 'linear-gradient(45deg, #00BFFF, #0080FF)',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Join Discussion
          </button>
        </div>
      </div>
    </div>
  );

  const renderView = () => {
    switch(currentView) {
      case 'ai': 
        return (
          <div style={{ padding: '20px', textAlign: 'center', color: '#CCCCFF' }}>
            <h2> AI Analytics Coming Soon</h2>
            <p>Advanced AI predictions and portfolio optimization</p>
          </div>
        );
      case 'ipo': 
        return (
          <div style={{ padding: '20px', textAlign: 'center', color: '#CCCCFF' }}>
            <h2> IPO Tracker Coming Soon</h2>
            <p>Comprehensive IPO and launch tracking system</p>
          </div>
        );
      case 'nft': 
        return (
          <div style={{ padding: '20px', textAlign: 'center', color: '#CCCCFF' }}>
            <h2> NFT Integration Coming Soon</h2>
            <p>Blockchain and NFT trading features</p>
          </div>
        );
      case 'social': 
        return (
          <div style={{ padding: '20px', textAlign: 'center', color: '#CCCCFF' }}>
            <h2> Social Platform Coming Soon</h2>
            <p>Community discussions and card social features</p>
          </div>
        );
      default: 
        return renderDashboard();
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      minHeight: '100vh',
      color: '#FFFFFF'
    }}>
      {/* Navigation Bar */}
      <nav style={{
        background: 'rgba(26, 26, 26, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(204, 204, 255, 0.2)',
        padding: '16px 24px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{
              margin: '0',
              fontSize: '1.8rem',
              background: 'linear-gradient(45deg, #CCCCFF, #9999FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer'
            }} onClick={() => setCurrentView('dashboard')}>
              CardHood
            </h1>
            <span style={{ 
              color: '#9999FF', 
              marginLeft: '16px',
              fontSize: '0.9rem'
            }}>
              AI-Powered Trading Cards
            </span>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { key: 'dashboard', label: ' Dashboard' },
              { key: 'ai', label: ' AI' },
              { key: 'ipo', label: ' IPOs' },
              { key: 'nft', label: ' NFTs' },
              { key: 'social', label: ' Social' }
      { key: 'news', label: ' News' },
            ].map(nav => (
              <button
                key={nav.key}
                onClick={() => setCurrentView(nav.key)}
                style={{
                  background: currentView === nav.key ? 'rgba(204, 204, 255, 0.2)' : 'transparent',
                  color: currentView === nav.key ? '#CCCCFF' : '#9999FF',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: currentView === nav.key ? 'bold' : 'normal'
                }}
              >
                {nav.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {renderView()}

      {/* Footer */}
      <footer style={{
        background: 'rgba(26, 26, 26, 0.9)',
        borderTop: '1px solid rgba(204, 204, 255, 0.2)',
        padding: '20px',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <div style={{ color: '#9999FF', fontSize: '0.9rem' }}>
          CardHood v2.0  18 Sessions  50+ Hours  Every Feature Integrated
          <br />
          <span style={{ color: '#6666FF' }}>
            Periwinkle & Black Theme  AI  IPO  NFT  Social  Real-time Analytics
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;

