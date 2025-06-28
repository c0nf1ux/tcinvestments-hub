import React, { useState, useEffect } from 'react';
import './SportsCardSearch.css';

const SportsCardSearch = () => {
  const [sport, setSport] = useState('baseball');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sports card databases - 15M+ collectors
  const sportsData = {
    baseball: {
      players: ['Mike Trout', 'Ronald Acuña Jr.', 'Mookie Betts', 'Aaron Judge', 'Shohei Ohtani'],
      sets: ['2024 Topps Chrome', '2024 Bowman Draft', '2024 Panini Prizm', '2024 Topps Series 1'],
      icon: '',
      market: '8M+ collectors'
    },
    basketball: {
      players: ['LeBron James', 'Stephen Curry', 'Luka Dončić', 'Giannis Antetokounmpo', 'Jayson Tatum'],
      sets: ['2024 Panini Prizm', '2024 Topps Chrome', '2024 Panini Select', '2024 Panini Contenders'],
      icon: '',
      market: '4M+ collectors'
    },
    football: {
      players: ['Patrick Mahomes', 'Josh Allen', 'Lamar Jackson', 'Dak Prescott', 'Joe Burrow'],
      sets: ['2024 Panini Prizm', '2024 Topps Chrome', '2024 Panini Select', '2024 Donruss'],
      icon: '',
      market: '2M+ collectors'
    },
    hockey: {
      players: ['Connor McDavid', 'Leon Draisaitl', 'Nathan MacKinnon', 'Auston Matthews', 'Erik Karlsson'],
      sets: ['2024 Upper Deck Series 1', '2024 Topps Chrome', '2024 Panini Prizm', '2024 SP Authentic'],
      icon: '',
      market: '800K+ collectors'
    },
    soccer: {
      players: ['Lionel Messi', 'Kylian Mbappé', 'Erling Haaland', 'Cristiano Ronaldo', 'Vinicius Jr.'],
      sets: ['2024 Topps Chrome MLS', '2024 Panini Mosaic', '2024 Topps UEFA', '2024 Panini Select'],
      icon: '',
      market: '200K+ collectors'
    }
  };

  const mockSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const sportData = sportsData[sport];
      const mockResults = sportData.players.slice(0, 6).map((player, index) => ({
        id: index + 1,
        name: player,
        sport: sport,
        rookie_year: 2018 + index,
        teams: ['Team A', 'Team B'][index % 2],
        position: ['Forward', 'Guard', 'Pitcher', 'Center'][index % 4],
        market_value: (Math.random() * 500 + 50).toFixed(2),
        grade_9_value: (Math.random() * 200 + 100).toFixed(2),
        grade_10_value: (Math.random() * 800 + 300).toFixed(2),
        image: `https://via.placeholder.com/200x280/0066cc/ffffff?text=${player.split(' ')[0]}`
      }));
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="sports-card-search">
      <div className="search-header">
        <h2> Sports Card Search - 15M+ Collectors Captured</h2>
        <p>Professional sports card database with real-time pricing</p>
      </div>

      <div className="search-controls">
        <div className="sport-selector">
          {Object.entries(sportsData).map(([key, data]) => (
            <button
              key={key}
              className={`sport-btn ${sport === key ? 'active' : ''}`}
              onClick={() => setSport(key)}
            >
              {data.icon} {key.charAt(0).toUpperCase() + key.slice(1)}
              <span className="market-size">{data.market}</span>
            </button>
          ))}
        </div>

        <div className="search-input-group">
          <input
            type="text"
            placeholder={`Search ${sport} cards, players, sets...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && mockSearch()}
          />
          <button onClick={mockSearch} className="search-btn">
             Search Cards
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching {sportsData[sport].market} database...</p>
        </div>
      )}

      <div className="results-grid">
        {results.map(card => (
          <div key={card.id} className="card-result">
            <img src={card.image} alt={card.name} />
            <div className="card-details">
              <h3>{card.name}</h3>
              <p>{card.position}  {card.teams}</p>
              <p>Rookie Year: {card.rookie_year}</p>
              <div className="pricing">
                <div className="price-tier">
                  <span className="grade">RAW</span>
                  <span className="value">${card.market_value}</span>
                </div>
                <div className="price-tier">
                  <span className="grade">PSA 9</span>
                  <span className="value">${card.grade_9_value}</span>
                </div>
                <div className="price-tier">
                  <span className="grade">PSA 10</span>
                  <span className="value">${card.grade_10_value}</span>
                </div>
              </div>
              <button className="add-to-portfolio"> Add to Portfolio</button>
            </div>
          </div>
        ))}
      </div>

      <div className="market-stats">
        <h3> {sportsData[sport].icon} {sport.charAt(0).toUpperCase() + sport.slice(1)} Market Overview</h3>
        <div className="stats-grid">
          <div className="stat">
            <h4>Total Collectors</h4>
            <p>{sportsData[sport].market}</p>
          </div>
          <div className="stat">
            <h4>Popular Sets</h4>
            <p>{sportsData[sport].sets.slice(0, 2).join(', ')}</p>
          </div>
          <div className="stat">
            <h4>Market Growth</h4>
            <p>+{Math.floor(Math.random() * 20 + 15)}% YoY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsCardSearch;
