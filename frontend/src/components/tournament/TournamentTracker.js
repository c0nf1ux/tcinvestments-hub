import React, { useState, useEffect } from 'react';
import './TournamentTracker.css';

const TournamentTracker = () => {
  const [activeFormat, setActiveFormat] = useState('Standard');
  const [tournaments, setTournaments] = useState([]);
  const [liveResults, setLiveResults] = useState([]);
  const [metaBreakdown, setMetaBreakdown] = useState({});

  // Tournament formats and their competitive scenes
  const formats = {
    Standard: { players: '120K+', events: '450/week', prize: '$50K+' },
    Modern: { players: '200K+', events: '380/week', prize: '$75K+' },
    Legacy: { players: '80K+', events: '120/week', prize: '$25K+' },
    Vintage: { players: '25K+', events: '40/week', prize: '$15K+' },
    Pioneer: { players: '95K+', events: '200/week', prize: '$30K+' },
    Commander: { players: '280K+', events: '600/week', prize: '$20K+' }
  };

  // Mock tournament data - 800K+ competitive players
  const mockTournaments = [
    {
      id: 1,
      name: 'SCG Open Dallas',
      format: 'Standard',
      date: '2024-06-16',
      status: 'Live',
      players: 342,
      rounds: 9,
      currentRound: 6,
      prizePool: 15000,
      location: 'Dallas, TX',
      topDecks: ['Azorius Control', 'Mono-Red Aggro', 'Temur Midrange']
    },
    {
      id: 2,
      name: 'Modern Challenge',
      format: 'Modern',
      date: '2024-06-15',
      status: 'Completed',
      players: 128,
      rounds: 7,
      currentRound: 7,
      prizePool: 8000,
      location: 'MTGO',
      winner: 'Ryan_Plays_Magic',
      winningDeck: 'Izzet Murktide'
    },
    {
      id: 3,
      name: 'Legacy Showcase',
      format: 'Legacy',
      date: '2024-06-17',
      status: 'Upcoming',
      players: 96,
      rounds: 6,
      currentRound: 0,
      prizePool: 12000,
      location: 'Philadelphia, PA',
      preregister: true
    },
    {
      id: 4,
      name: 'Pioneer Regional Championship',
      format: 'Pioneer',
      date: '2024-06-16',
      status: 'Live',
      players: 256,
      rounds: 8,
      currentRound: 4,
      prizePool: 25000,
      location: 'Los Angeles, CA',
      topDecks: ['Izzet Phoenix', 'Mono-Green Devotion', 'Azorius Control']
    }
  ];

  // Meta analysis data
  const metaData = {
    Standard: [
      { deck: 'Azorius Control', percentage: 18.5, change: '+2.3%', winRate: 54.2 },
      { deck: 'Mono-Red Aggro', percentage: 16.2, change: '+1.8%', winRate: 52.8 },
      { deck: 'Temur Midrange', percentage: 14.7, change: '-0.5%', winRate: 51.9 },
      { deck: 'Esper Legends', percentage: 12.3, change: '+3.1%', winRate: 56.1 },
      { deck: 'Golgari Midrange', percentage: 11.1, change: '-1.2%', winRate: 49.8 }
    ],
    Modern: [
      { deck: 'Izzet Murktide', percentage: 22.1, change: '+1.5%', winRate: 55.7 },
      { deck: 'Hammer Time', percentage: 15.8, change: '-2.1%', winRate: 53.2 },
      { deck: 'Living End', percentage: 13.4, change: '+0.8%', winRate: 52.1 },
      { deck: 'Burn', percentage: 12.9, change: '+1.2%', winRate: 50.9 },
      { deck: 'Amulet Titan', percentage: 10.7, change: '-1.8%', winRate: 54.3 }
    ]
  };

  // Live results simulation
  const mockLiveResults = [
    { tournament: 'SCG Open Dallas', round: 6, table: 1, player1: 'Alex Chen', player2: 'Maria Santos', deck1: 'Azorius Control', deck2: 'Mono-Red Aggro', status: 'Game 2', time: '12:34' },
    { tournament: 'SCG Open Dallas', round: 6, table: 2, player1: 'David Kim', player2: 'Sarah Wilson', deck1: 'Temur Midrange', deck2: 'Esper Legends', status: 'Game 1', time: '8:21' },
    { tournament: 'Pioneer Regional', round: 4, table: 1, player1: 'Jake Morrison', player2: 'Lisa Chang', deck1: 'Izzet Phoenix', deck2: 'Mono-Green', status: 'Game 3', time: '15:45' }
  ];

  useEffect(() => {
    setTournaments(mockTournaments);
    setLiveResults(mockLiveResults);
    setMetaBreakdown(metaData);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Live': return '#ff6b6b';
      case 'Completed': return '#4ecdc4';
      case 'Upcoming': return '#45b7d1';
      default: return '#888';
    }
  };

  return (
    <div className="tournament-tracker">
      <div className="tracker-header">
        <h2> Tournament Tracker - 800K+ Competitive Players Captured</h2>
        <p>Real-time tournament data, meta analysis, and competitive intelligence</p>
        <div className="competitive-stats">
          <div className="stat">
            <h4>Active Tournaments</h4>
            <p>147 Live Events</p>
          </div>
          <div className="stat">
            <h4>Weekly Prize Pool</h4>
            <p>$2.4M Total</p>
          </div>
          <div className="stat">
            <h4>Players Tracked</h4>
            <p>800K+ Competitors</p>
          </div>
        </div>
      </div>

      {/* Format Selector */}
      <div className="format-selector">
        <h3> Format Analysis</h3>
        <div className="format-buttons">
          {Object.entries(formats).map(([format, data]) => (
            <button
              key={format}
              className={`format-btn ${activeFormat === format ? 'active' : ''}`}
              onClick={() => setActiveFormat(format)}
            >
              <span className="format-name">{format}</span>
              <span className="format-players">{data.players} players</span>
              <span className="format-events">{data.events}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Meta Breakdown */}
      <div className="meta-analysis">
        <h3> {activeFormat} Meta Analysis</h3>
        <div className="meta-grid">
          {metaBreakdown[activeFormat]?.map((deck, index) => (
            <div key={index} className="meta-card">
              <div className="deck-info">
                <h4>{deck.deck}</h4>
                <div className="meta-stats">
                  <span className="percentage">{deck.percentage}%</span>
                  <span className={`change ${deck.change.includes('+') ? 'positive' : 'negative'}`}>
                    {deck.change}
                  </span>
                </div>
              </div>
              <div className="win-rate">
                <span>Win Rate: {deck.winRate}%</span>
                <div className="win-rate-bar">
                  <div 
                    className="win-rate-fill" 
                    style={{ width: `${deck.winRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Tournaments */}
      <div className="live-tournaments">
        <h3> Live Tournaments</h3>
        <div className="tournaments-grid">
          {tournaments.map(tournament => (
            <div key={tournament.id} className="tournament-card">
              <div className="tournament-header">
                <h4>{tournament.name}</h4>
                <span 
                  className="status"
                  style={{ backgroundColor: getStatusColor(tournament.status) }}
                >
                  {tournament.status}
                </span>
              </div>
              
              <div className="tournament-details">
                <div className="detail-row">
                  <span>Format:</span>
                  <span>{tournament.format}</span>
                </div>
                <div className="detail-row">
                  <span>Players:</span>
                  <span>{tournament.players}</span>
                </div>
                <div className="detail-row">
                  <span>Prize Pool:</span>
                  <span>${tournament.prizePool.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span>Location:</span>
                  <span>{tournament.location}</span>
                </div>
                
                {tournament.status === 'Live' && (
                  <div className="progress-info">
                    <span>Round {tournament.currentRound}/{tournament.rounds}</span>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(tournament.currentRound / tournament.rounds) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {tournament.topDecks && (
                  <div className="top-decks">
                    <strong>Top Decks:</strong>
                    <div className="deck-list">
                      {tournament.topDecks.map((deck, i) => (
                        <span key={i} className="deck-tag">{deck}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                {tournament.winner && (
                  <div className="winner-info">
                    <strong>Winner:</strong> {tournament.winner}
                    <br />
                    <strong>Deck:</strong> {tournament.winningDeck}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Results Feed */}
      <div className="live-results">
        <h3> Live Results Feed</h3>
        <div className="results-feed">
          {liveResults.map((result, index) => (
            <div key={index} className="result-item">
              <div className="result-header">
                <span className="tournament-name">{result.tournament}</span>
                <span className="round-info">Round {result.round} - Table {result.table}</span>
                <span className="timer">{result.time}</span>
              </div>
              <div className="match-info">
                <div className="player">
                  <span className="player-name">{result.player1}</span>
                  <span className="deck-name">{result.deck1}</span>
                </div>
                <div className="vs">VS</div>
                <div className="player">
                  <span className="player-name">{result.player2}</span>
                  <span className="deck-name">{result.deck2}</span>
                </div>
              </div>
              <div className="match-status">
                <span className="status-indicator live"></span>
                {result.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Player Rankings */}
      <div className="player-rankings">
        <h3> Top Players</h3>
        <div className="rankings-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Points</th>
                <th>Win Rate</th>
                <th>Recent Finishes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Alex Chen</td>
                <td>2,840</td>
                <td>67.3%</td>
                <td>1st, 2nd, 1st, 4th</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Maria Santos</td>
                <td>2,720</td>
                <td>65.8%</td>
                <td>1st, 3rd, 2nd, 1st</td>
              </tr>
              <tr>
                <td>3</td>
                <td>David Kim</td>
                <td>2,680</td>
                <td>64.2%</td>
                <td>2nd, 1st, 5th, 2nd</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Sarah Wilson</td>
                <td>2,590</td>
                <td>63.7%</td>
                <td>1st, 4th, 1st, 3rd</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Jake Morrison</td>
                <td>2,510</td>
                <td>62.1%</td>
                <td>3rd, 2nd, 1st, 6th</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tournament Calendar */}
      <div className="tournament-calendar">
        <h3> Upcoming Major Events</h3>
        <div className="calendar-grid">
          <div className="event-card">
            <div className="event-date">JUN 22-23</div>
            <div className="event-info">
              <h4>Regional Championship</h4>
              <p>Standard  $50K Prize Pool</p>
              <p>Chicago, IL</p>
            </div>
          </div>
          <div className="event-card">
            <div className="event-date">JUN 29-30</div>
            <div className="event-info">
              <h4>Modern Masters</h4>
              <p>Modern  $75K Prize Pool</p>
              <p>Seattle, WA</p>
            </div>
          </div>
          <div className="event-card">
            <div className="event-date">JUL 6-7</div>
            <div className="event-info">
              <h4>Legacy Open</h4>
              <p>Legacy  $25K Prize Pool</p>
              <p>Las Vegas, NV</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentTracker;
