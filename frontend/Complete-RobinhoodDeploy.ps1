#  COMPLETE-ROBINHOODDEPLOY.PS1 - Full Robinhood UI Deployment
Write-Host " DEPLOYING COMPLETE ROBINHOOD-STYLE UI..." -ForegroundColor Magenta

# Write the enhanced files directly
Write-Host " Writing complete Robinhood-style components..." -ForegroundColor Cyan

# Use here-string to avoid variable expansion issues
$AppContent = @"
import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('portfolio');
  const [portfolioValue, setPortfolioValue] = useState(125847.23);
  const [dailyChange, setDailyChange] = useState(+2847.12);
  const [portfolioHistory, setPortfolioHistory] = useState([]);

  useEffect(() => {
    initializeDashboard();
    generatePortfolioHistory();
  }, []);

  const initializeDashboard = async () => {
    setWatchlist([
      { id: 1, name: 'Black Lotus', price: 45000, change: +5.2, symbol: 'BLT' },
      { id: 2, name: 'Charizard 1st Ed', price: 8500, change: -2.1, symbol: 'CHA' },
      { id: 3, name: 'Time Walk', price: 12000, change: +8.7, symbol: 'TWK' },
      { id: 4, name: 'Pikachu Illustrator', price: 90000, change: +12.3, symbol: 'PIK' }
    ]);

    setNewsArticles([
      {
        title: 'Magic 30th Anniversary Drives Vintage Card Prices Up 15%',
        time: '2h ago',
        source: 'TCG News',
        impact: 'positive'
      },
      {
        title: 'Pokemon TCG Classic Returns with Reprint Announcements',
        time: '4h ago', 
        source: 'Pokemon Company',
        impact: 'negative'
      },
      {
        title: 'Q2 Trading Card Market Shows Strong Growth',
        time: '1d ago',
        source: 'Market Watch',
        impact: 'positive'
      }
    ]);
  };

  const generatePortfolioHistory = () => {
    const history = [];
    const baseValue = 120000;
    for (let i = 30; i >= 0; i--) {
      const variance = (Math.random() - 0.5) * 10000;
      const value = baseValue + variance + (i * 200);
      history.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
        value: value
      });
    }
    setPortfolioHistory(history);
  };

  const searchCards = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`API_BASE/cards/search?q=encodeURIComponent(searchTerm)`);
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  const getPrediction = async (cardId) => {
    setLoading(true);
    try {
      const response = await fetch(`API_BASE/charts/prediction/cardId`);
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
    setLoading(false);
  };

  const PortfolioChart = () => (
    <div className="portfolio-chart">
      <svg width="100%" height="200" viewBox="0 0 800 200">
        <defs>
          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#CCCCFF" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#CCCCFF" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {portfolioHistory.length > 0 && (
          <>
            <path
              d={`M 0,200 - ((portfolioHistory[0].value - 115000) / 20000 * 180) portfolioHistory.map((point, index) => 
                `L (index / (portfolioHistory.length - 1)) * 800,200 - ((point.value - 115000) / 20000 * 180)`
              ).join(' ')`}
              fill="none"
              stroke="#CCCCFF"
              strokeWidth="3"
            />
            <path
              d={`M 0,200 - ((portfolioHistory[0].value - 115000) / 20000 * 180) portfolioHistory.map((point, index) => 
                `L (index / (portfolioHistory.length - 1)) * 800,200 - ((point.value - 115000) / 20000 * 180)`
              ).join(' ') L 800,200 L 0,200 Z`}
              fill="url(#portfolioGradient)"
            />
          </>
        )}
      </svg>
    </div>
  );

  const MiniChart = ({ data, positive = true }) => (
    <svg width="60" height="30" viewBox="0 0 60 30">
      <path
        d="M 0,25 L 15,20 L 30,15 L 45,12 L 60,8"
        fill="none"
        stroke={positive ? "#00FF88" : "#FF6B6B"}
        strokeWidth="2"
      />
    </svg>
  );

  return (
    <div className="robinhood-app">
      <nav className="top-nav">
        <div className="nav-brand"> CARDHOOD</div>
        <div className="nav-tabs">
          <button 
            className={activeTab === 'portfolio' ? 'active' : ''}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </button>
          <button 
            className={activeTab === 'discover' ? 'active' : ''}
            onClick={() => setActiveTab('discover')}
          >
            Discover
          </button>
          <button 
            className={activeTab === 'watchlist' ? 'active' : ''}
            onClick={() => setActiveTab('watchlist')}
          >
            Watchlist
          </button>
        </div>
      </nav>

      {activeTab === 'portfolio' && (
        <div className="portfolio-section">
          <div className="portfolio-header">
            <div className="portfolio-value">
              <h1>portfolioValue.toLocaleString()</h1>
              <div className={`portfolio-change dailyChange >= 0 ? 'positive' : 'negative'`}>
                <span>{dailyChange >= 0 ? '+' : ''}Math.abs(dailyChange).toLocaleString()</span>
                <span>(((dailyChange / portfolioValue) * 100).toFixed(2)%)</span>
              </div>
            </div>
            <div className="time-periods">
              <button className="active">1D</button>
              <button>1W</button>
              <button>1M</button>
              <button>3M</button>
              <button>1Y</button>
              <button>ALL</button>
            </div>
          </div>

          <div className="main-chart-container">
            <PortfolioChart />
          </div>

          <div className="quick-actions">
            <button className="action-btn buy"> Buy Cards</button>
            <button className="action-btn sell"> Sell Cards</button>
            <button className="action-btn trade"> Trade</button>
            <button className="action-btn analyze"> AI Analysis</button>
          </div>

          <div className="holdings-section">
            <h3>Your Holdings</h3>
            <div className="holdings-list">
              {watchlist.slice(0, 3).map(card => (
                <div key={card.id} className="holding-item">
                  <div className="holding-info">
                    <h4>{card.name}</h4>
                    <p>1 card  card.price.toLocaleString()</p>
                  </div>
                  <div className="holding-performance">
                    <MiniChart positive={card.change > 0} />
                    <span className={card.change >= 0 ? 'positive' : 'negative'}>
                      {card.change >= 0 ? '+' : ''}{card.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'discover' && (
        <div className="discover-section">
          <div className="advanced-search">
            <h2> Advanced Card Search</h2>
            <div className="search-grid">
              <div className="search-group">
                <label>Card Name</label>
                <input
                  type="text"
                  placeholder="e.g., Black Lotus, Charizard"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="search-group">
                <label>Price Range</label>
                <div className="price-range">
                  <input type="number" placeholder="Min" />
                  <input type="number" placeholder="Max" />
                </div>
              </div>
              <div className="search-group">
                <label>Game</label>
                <select>
                  <option>All Games</option>
                  <option>Magic: The Gathering</option>
                  <option>Pokemon</option>
                  <option>Yu-Gi-Oh!</option>
                </select>
              </div>
              <div className="search-group">
                <label>Rarity</label>
                <select>
                  <option>All Rarities</option>
                  <option>Common</option>
                  <option>Uncommon</option>
                  <option>Rare</option>
                  <option>Mythic</option>
                </select>
              </div>
              <div className="search-group">
                <label>Condition</label>
                <select>
                  <option>All Conditions</option>
                  <option>Mint</option>
                  <option>Near Mint</option>
                  <option>Lightly Played</option>
                  <option>Moderately Played</option>
                </select>
              </div>
              <div className="search-group">
                <label>Market Trend</label>
                <select>
                  <option>All Trends</option>
                  <option>Rising</option>
                  <option>Falling</option>
                  <option>Stable</option>
                </select>
              </div>
            </div>
            <button onClick={searchCards} className="search-btn" disabled={loading}>
              {loading ? ' Searching...' : ' Search Cards'}
            </button>
          </div>

          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>Search Results (searchResults.length)</h3>
              <div className="results-grid">
                {searchResults.slice(0, 8).map((card, index) => (
                  <div key={index} className="result-card">
                    {card.image_uris?.small && (
                      <img src={card.image_uris.small} alt={card.name} />
                    )}
                    <div className="card-details">
                      <h4>{card.name}</h4>
                      <p>{card.set_name}</p>
                      {card.prices?.usd && (
                        <div className="price-info">
                          <span className="price">card.prices.usd</span>
                          <span className="change positive">+2.3%</span>
                        </div>
                      )}
                      <div className="card-actions">
                        <button onClick={() => getPrediction(card.id)} className="ai-btn">
                           AI
                        </button>
                        <button className="watch-btn"> Watch</button>
                        <button className="buy-btn"> Buy</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'watchlist' && (
        <div className="watchlist-section">
          <div className="watchlist-header">
            <h2> Your Watchlist</h2>
            <button className="edit-btn"> Edit</button>
          </div>
          
          <div className="watchlist-grid">
            {watchlist.map(card => (
              <div key={card.id} className="watchlist-card">
                <div className="card-symbol">{card.symbol}</div>
                <div className="card-info">
                  <h4>{card.name}</h4>
                  <p>card.price.toLocaleString()</p>
                </div>
                <div className="card-chart">
                  <MiniChart positive={card.change > 0} />
                </div>
                <div className={`card-change card.change >= 0 ? 'positive' : 'negative'`}>
                  {card.change >= 0 ? '+' : ''}{card.change}%
                </div>
              </div>
            ))}
          </div>

          <div className="news-section">
            <h3> Market News</h3>
            <div className="news-list">
              {newsArticles.map((article, index) => (
                <div key={index} className="news-item">
                  <div className={`impact-indicator article.impact`}></div>
                  <div className="news-content">
                    <h4>{article.title}</h4>
                    <div className="news-meta">
                      <span>{article.source}</span>
                      <span></span>
                      <span>{article.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {prediction && (
        <div className="prediction-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3> AI Prediction: {prediction.cardName}</h3>
              <button onClick={() => setPrediction(null)}></button>
            </div>
            <div className="prediction-details">
              <div className="prediction-stats">
                <div className="stat">
                  <label>Current Price</label>
                  <span>prediction.currentPrice</span>
                </div>
                <div className="stat">
                  <label>Predicted Price</label>
                  <span className={prediction.prediction > prediction.currentPrice ? 'positive' : 'negative'}>
                    prediction.prediction
                  </span>
                </div>
                <div className="stat">
                  <label>Confidence</label>
                  <span>{prediction.confidence}%</span>
                </div>
                <div className="stat">
                  <label>Recommendation</label>
                  <span className={prediction.recommendation === 'BUY' ? 'positive' : 'negative'}>
                    {prediction.recommendation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"> PROCESSING...</div>
        </div>
      )}
    </div>
  );
}

export default App;
"@

$AppContent | Out-File -FilePath "src\App.js" -Encoding UTF8 -Force

Write-Host " ROBINHOOD UI DEPLOYED!" -ForegroundColor Green
Write-Host " Ready for testing!" -ForegroundColor Magenta
