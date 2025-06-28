const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Mock tournament data
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
    location: 'Dallas, TX'
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
    winner: 'Ryan_Plays_Magic'
  }
];

// @route   GET api/tournaments
// @desc    Get all tournaments
// @access  Public
router.get('/', (req, res) => {
  try {
    res.json({
      tournaments: mockTournaments,
      total_active: mockTournaments.filter(t => t.status === 'Live').length,
      total_players: mockTournaments.reduce((sum, t) => sum + t.players, 0),
      total_prize_pool: mockTournaments.reduce((sum, t) => sum + t.prizePool, 0)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET api/tournaments/live
// @desc    Get live tournaments only
// @access  Public
router.get('/live', (req, res) => {
  try {
    const liveTournaments = mockTournaments.filter(t => t.status === 'Live');
    res.json({ tournaments: liveTournaments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET api/tournaments/meta/:format
// @desc    Get meta breakdown for format
// @access  Public
router.get('/meta/:format', (req, res) => {
  try {
    const { format } = req.params;
    
    const metaData = {
      Standard: [
        { deck: 'Azorius Control', percentage: 18.5, change: '+2.3%', winRate: 54.2 },
        { deck: 'Mono-Red Aggro', percentage: 16.2, change: '+1.8%', winRate: 52.8 },
        { deck: 'Temur Midrange', percentage: 14.7, change: '-0.5%', winRate: 51.9 }
      ],
      Modern: [
        { deck: 'Izzet Murktide', percentage: 22.1, change: '+1.5%', winRate: 55.7 },
        { deck: 'Hammer Time', percentage: 15.8, change: '-2.1%', winRate: 53.2 },
        { deck: 'Living End', percentage: 13.4, change: '+0.8%', winRate: 52.1 }
      ]
    };
    
    res.json({ 
      format,
      meta: metaData[format] || [],
      last_updated: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET api/tournaments/rankings
// @desc    Get player rankings
// @access  Public
router.get('/rankings', (req, res) => {
  try {
    const rankings = [
      { rank: 1, player: 'Alex Chen', points: 2840, winRate: 67.3, recentFinishes: ['1st', '2nd', '1st', '4th'] },
      { rank: 2, player: 'Maria Santos', points: 2720, winRate: 65.8, recentFinishes: ['1st', '3rd', '2nd', '1st'] },
      { rank: 3, player: 'David Kim', points: 2680, winRate: 64.2, recentFinishes: ['2nd', '1st', '5th', '2nd'] }
    ];
    
    res.json({ rankings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
