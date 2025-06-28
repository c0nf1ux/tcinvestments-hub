// Get user portfolio
const getPortfolio = async (req, res) => {
  try {
    const portfolio = {
      user_id: req.user.id,
      total_value: 125840.23,
      daily_change: 2340.50,
      daily_change_percent: 1.89,
      holdings: [
        {
          id: 1,
          name: 'Black Lotus (Alpha)',
          type: 'tcg',
          game: 'Magic: The Gathering',
          quantity: 1,
          avg_cost: 25000,
          current_value: 35000,
          grade: 'PSA 9',
          change_24h: 500,
          change_percent: 1.45
        },
        {
          id: 2,
          name: 'Charizard Base Set Shadowless',
          type: 'tcg',
          game: 'Pokemon',
          quantity: 3,
          avg_cost: 8000,
          current_value: 12000,
          grade: 'PSA 10',
          change_24h: 200,
          change_percent: 1.69
        },
        {
          id: 3,
          name: 'Mike Trout 2009 Bowman Chrome',
          type: 'sports',
          sport: 'Baseball',
          quantity: 2,
          avg_cost: 15000,
          current_value: 18500,
          grade: 'BGS 9.5',
          change_24h: 300,
          change_percent: 1.65
        },
        {
          id: 4,
          name: 'LeBron James 2003 Topps Chrome',
          type: 'sports',
          sport: 'Basketball',
          quantity: 1,
          avg_cost: 25000,
          current_value: 28000,
          grade: 'PSA 10',
          change_24h: 400,
          change_percent: 1.45
        }
      ],
      performance: {
        total_invested: 98000,
        total_return: 27840.23,
        return_percentage: 28.4,
        best_performer: 'Charizard Base Set Shadowless',
        worst_performer: 'None (all gains)'
      },
      breakdown: {
        tcg: 47000,
        sports: 46500,
        graded: 78500,
        raw: 47340.23
      }
    };
    
    res.json({ portfolio });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add item to portfolio
const addItem = async (req, res) => {
  try {
    const { name, type, game_or_sport, quantity, cost, grade } = req.body;
    
    const newItem = {
      id: Date.now(),
      name,
      type,
      game_or_sport,
      quantity,
      avg_cost: cost,
      current_value: cost * 1.15, // Mock 15% gain
      grade,
      change_24h: cost * 0.02,
      change_percent: 2.0,
      added_at: new Date()
    };
    
    res.json({ 
      item: newItem,
      message: 'Item added to portfolio successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getPortfolio,
  addItem
};
