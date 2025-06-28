const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Validation rules
const registerValidation = [
 body('username')
   .isLength({ min: 3, max: 30 })
   .withMessage('Username must be 3-30 characters')
   .matches(/^[a-zA-Z0-9_]+$/)
   .withMessage('Username can only contain letters, numbers, and underscores'),
 body('email')
   .isEmail()
   .normalizeEmail()
   .withMessage('Valid email required'),
 body('password')
   .isLength({ min: 6 })
   .withMessage('Password must be at least 6 characters')
   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
   .withMessage('Password must contain uppercase, lowercase, and number')
];

const loginValidation = [
 body('login')
   .notEmpty()
   .withMessage('Email or username required'),
 body('password')
   .notEmpty()
   .withMessage('Password required')
];

// Auth routes
router.post('/register', registerValidation, authController.register);
router.post('/login', loginValidation, authController.login);
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, authController.updateProfile);

// Logout (client-side token removal)
router.post('/logout', (req, res) => {
 res.json({
   success: true,
   message: 'Logout successful'
 });
});

module.exports = router;


