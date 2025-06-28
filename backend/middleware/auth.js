const jwt = require('jsonwebtoken');

// Mock auth middleware for development
const auth = (req, res, next) => {
  try {
    // For development, we'll use a mock user
    req.user = {
      id: 'heath_davis_001',
      email: 'onepunchllc@outlook.com',
      name: 'Heath Davis',
      subscription: 'Enterprise',
      portfolio_value: 125840.23
    };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
