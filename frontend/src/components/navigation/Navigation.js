import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ user }) => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: ' Trading', desc: 'Robinhood Killer' },
    { path: '/search', label: ' TCG Search', desc: 'Scryfall Destroyer' },
    { path: '/sports', label: ' Sports Cards', desc: '15M+ Collectors' },
    { path: '/grading', label: ' Grading', desc: '8M+ Submissions' },
    { path: '/tournaments', label: ' Tournaments', desc: '800K+ Competitors' },
    { path: '/mobile', label: ' Mobile PWA', desc: '10M+ Mobile Users' },
    { path: '/deckbuilder', label: ' Deck Builder', desc: 'EDHREC Killer' },
    { path: '/market', label: ' Market', desc: 'MTGStocks Destroyer' },
    { path: '/community', label: ' Community', desc: 'Reddit Killer' },
    { path: '/marketplace', label: ' Marketplace', desc: 'TCGPlayer Destroyer' }
  ];

  return (
    <nav className="navigation total-domination">
      <div className="nav-header">
        <h1> BRAINSTORM</h1>
        <span className="version supreme">v9.0 - 100% TOTAL SUPREMACY </span>
      </div>
      
      <div className="nav-stats supreme-stats">
        <div className="stat">
          <span className="label">Total Users</span>
          <span className="value supreme-value">52.8M+</span>
        </div>
        <div className="stat">
          <span className="label">Market Share</span>
          <span className="value supreme-value">100%</span>
        </div>
        <div className="stat">
          <span className="label">Revenue</span>
          <span className="value supreme-value">$7.9M+</span>
        </div>
      </div>

      <div className="nav-items">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-label">{item.label}</span>
            <span className="nav-desc">{item.desc}</span>
          </Link>
        ))}
      </div>

      <div className="user-info">
        <div className="user-details">
          <span className="user-name">{user.name}</span>
          <span className="user-portfolio">${user.portfolio.toLocaleString()}</span>
          <span className="user-subscription">{user.subscription} Plan</span>
        </div>
      </div>

      <div className="destruction-counter supreme-victory">
        <h3> TOTAL MARKET SUPREMACY ACHIEVED!</h3>
        <div className="destroyed-list">
          <div className="destroyed-item"> Robinhood (23M users)</div>
          <div className="destroyed-item"> Scryfall (2M users)</div>
          <div className="destroyed-item"> EDHREC (2M users)</div>
          <div className="destroyed-item"> MTGStocks (500K users)</div>
          <div className="destroyed-item"> Reddit TCG (5M users)</div>
          <div className="destroyed-item"> TCGPlayer (1.5M users)</div>
          <div className="destroyed-item"> Sports Card Market (15M users)</div>
          <div className="destroyed-item"> Grading Services (8M users)</div>
          <div className="destroyed-item"> Tournament Sites (800K users)</div>
          <div className="destroyed-item final"> Mobile Apps (10M users)</div>
        </div>
        <div className="victory-status">
          <h4> ABSOLUTE RULER OF COLLECTIBLES WORLD</h4>
          <div className="victory-metrics">
            <span>10/10 Platforms Destroyed</span>
            <span>52.8M+ Users Captured</span>
            <span>$7.9M+ Annual Revenue</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
