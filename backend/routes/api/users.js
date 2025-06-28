const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { getProfile, updateProfile } = require('../../controllers/userController');

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateProfile);

module.exports = router;
