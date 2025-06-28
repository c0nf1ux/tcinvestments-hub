// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      subscription: req.user.subscription,
      portfolio_value: req.user.portfolio_value,
      created_at: '2024-01-01',
      last_login: new Date(),
      stats: {
        total_cards: 1250,
        total_decks: 45,
        market_value: 125840.23,
        collections: {
          tcg: 800,
          sports: 450
        },
        grading_submissions: 25
      }
    };
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Mock profile update
    const updatedUser = {
      ...req.user,
      name: name || req.user.name,
      email: email || req.user.email,
      updated_at: new Date()
    };
    
    res.json({ 
      user: updatedUser,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
