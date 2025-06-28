const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { getPortfolio, addItem } = require('../../controllers/portfolioController');

// @route   GET api/portfolio
// @desc    Get user portfolio
// @access  Private
router.get('/', auth, getPortfolio);

// @route   POST api/portfolio/add
// @desc    Add item to portfolio
// @access  Private
router.post('/add', auth, addItem);

module.exports = router;
