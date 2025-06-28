const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { 
  getPlans, 
  createSubscription, 
  getUserSubscription 
} = require('../../controllers/subscriptionController');

// @route   GET api/subscription/plans
// @desc    Get all subscription plans
// @access  Public
router.get('/plans', getPlans);

// @route   POST api/subscription/create
// @desc    Create new subscription
// @access  Private
router.post('/create', auth, createSubscription);

// @route   GET api/subscription/user
// @desc    Get user subscription
// @access  Private
router.get('/user', auth, getUserSubscription);

module.exports = router;
