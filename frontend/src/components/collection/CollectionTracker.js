import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './CollectionTracker.css';

const CollectionTracker = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function properly declared before use
  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/collections`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data);
        setError(null);
      } else {
        throw new Error("Failed to fetch portfolio data");
      }
    } catch (err) {
      console.error("Portfolio fetch error:", err);
      setError("Unable to load portfolio data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
    const interval = setInterval(fetchPortfolioData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="collection-tracker loading">
        <div className="loading-spinner"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="collection-tracker error">
        <p> {error}</p>
        <button onClick={fetchPortfolioData} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="collection-tracker">
        <p>No portfolio data available</p>
      </div>
    );
  }

  const pieColors = ['#8B5CF6', '#A78BFA', '#C4B5FD', '#DDD6FE'];
  const performanceData = [
    { name: 'Jan', value: 115000 },
    { name: 'Feb', value: 118000 },
    { name: 'Mar', value: 121000 },
    { name: 'Apr', value: 119000 },
    { name: 'May', value: 123000 },
    { name: 'Jun', value: 125840 }
  ];

  const gameBreakdownData = portfolioData.gameBreakdown ? 
    Object.entries(portfolioData.gameBreakdown).map(([game, data]) => ({
      name: game.charAt(0).toUpperCase() + game.slice(1),
      value: data.value,
      count: data.count
    })) : [];

  return (
    <div className="collection-tracker">
      <div className="portfolio-header">
        <h2>Portfolio Overview</h2>
        <div className="portfolio-stats">
          <div className="stat-card total-value">
            <h3>${portfolioData.totalValue?.toLocaleString() || '0'}</h3>
            <p>Total Portfolio Value</p>
            <span className={`change ${portfolioData.dailyChange >= 0 ? 'positive' : 'negative'}`}>
              {portfolioData.dailyChange >= 0 ? '+' : ''}{portfolioData.dailyChange}% today
            </span>
          </div>
          <div className="stat-card">
            <h3>{portfolioData.cardCount || 0}</h3>
            <p>Total Cards</p>
          </div>
          <div className="stat-card">
            <h3>{portfolioData.weeklyChange >= 0 ? '+' : ''}{portfolioData.weeklyChange}%</h3>
            <p>7-Day Change</p>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-section">
          <h3>Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section">
          <h3>Game Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gameBreakdownData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percentage }) => `${name} ${(percentage || 0).toFixed(1)}%`}
              >
                {gameBreakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {portfolioData.topPerformers && portfolioData.topPerformers.length > 0 && (
        <div className="top-performers">
          <h3>Top Performers</h3>
          <div className="performers-grid">
            {portfolioData.topPerformers.map((card, index) => (
              <div key={index} className="performer-card">
                <h4>{card.name}</h4>
                <p className="game">{card.game.toUpperCase()}</p>
                <p className="value">${card.value?.toLocaleString()}</p>
                <span className="gain positive">+{card.gain}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="refresh-info">
        <p>Last updated: {new Date(portfolioData.lastUpdated || Date.now()).toLocaleTimeString()}</p>
        <button onClick={fetchPortfolioData} className="refresh-button">
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default CollectionTracker;
