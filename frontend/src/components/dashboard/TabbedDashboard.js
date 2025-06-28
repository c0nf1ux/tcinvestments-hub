import React, { useState } from 'react';
import CollectionTracker from './CollectionTracker';

const TabbedDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('collection');

  const renderContent = () => {
    switch (activeTab) {
      case 'collection':
        return <CollectionTracker user={user} />;
      case 'search':
        return (
          <div className="tab-content">
            <h2 className="content-title">Search & Watch</h2>
            <div className="search-section">
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="Search cards across all TCGs..."
                  className="search-input"
                />
                <button className="search-button">Search</button>
              </div>
              
              <div className="filter-chips">
                <button className="filter-chip active">All TCGs</button>
                <button className="filter-chip">Pokemon</button>
                <button className="filter-chip">Magic</button>
                <button className="filter-chip">Yu-Gi-Oh</button>
                <button className="filter-chip">Sports</button>
              </div>

              <div className="trending-section">
                <h3>Trending Cards</h3>
                <div className="card-grid">
                  <div className="card-item">
                    <div className="card-image"></div>
                    <div className="card-name">Charizard VMAX</div>
                    <div className="card-price">$89.99</div>
                    <div className="card-change positive">+12.5%</div>
                  </div>
                  <div className="card-item">
                    <div className="card-image"></div>
                    <div className="card-name">Black Lotus</div>
                    <div className="card-price">$8,500</div>
                    <div className="card-change positive">+5.2%</div>
                  </div>
                  <div className="card-item">
                    <div className="card-image"></div>
                    <div className="card-name">Blue-Eyes White Dragon</div>
                    <div className="card-price">$299.99</div>
                    <div className="card-change negative">-2.1%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'community':
        return (
          <div className="tab-content">
            <h2 className="content-title">Community</h2>
            <div className="community-stats">
              <div className="stat-card">
                <div className="stat-number">24,891</div>
                <div className="stat-label">Active Traders</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">156,743</div>
                <div className="stat-label">Cards Tracked</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">$2.8M</div>
                <div className="stat-label">Daily Volume</div>
              </div>
            </div>
            
            <div className="news-section">
              <h3>TCG Market News</h3>
              <div className="news-items">
                <div className="news-item">
                  <div className="news-time">2 hours ago</div>
                  <div className="news-title">Pokemon 25th Anniversary Set Breaks Records</div>
                  <div className="news-summary">Charizard cards see 40% price increase...</div>
                </div>
                <div className="news-item">
                  <div className="news-time">5 hours ago</div>
                  <div className="news-title">Magic: The Gathering Vintage Tournament</div>
                  <div className="news-summary">Power Nine cards maintain strong performance...</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <CollectionTracker user={user} />;
    }
  };

  return (
    <>
      {/* App.js - Enhanced Header Design from Battle Plan */}
      <header className="app-header">
        <div className="header-container">
          <div className="header-left">
            <h1 className="app-title">Brainstorm</h1>
          </div>
          <div className="header-right">
            <span className="welcome-message">Welcome, {user.firstName}!</span>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {/* TabbedDashboard.js - Main Interface */}
      <div className="tabbed-dashboard">
        {/* Clean Navigation: Collection | Search & Watch | Community */}
        <nav className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'collection' ? 'active' : ''}`}
            onClick={() => setActiveTab('collection')}
          >
            Collection
          </button>
          <button
            className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => setActiveTab('search')}
          >
            Search & Watch
          </button>
          <button
            className={`tab-button ${activeTab === 'community' ? 'active' : ''}`}
            onClick={() => setActiveTab('community')}
          >
            Community
          </button>
        </nav>

        <div className="tab-content-container">
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default TabbedDashboard;