const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

class AuthController {
 // Generate JWT token
 generateToken(userId) {
   return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
     expiresIn: process.env.JWT_EXPIRE || '7d'
   });
 }

 // Register new user
 async register(req, res) {
   try {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const { username, email, password, firstName, lastName } = req.body;

     // Check if user already exists
     const existingUser = await User.findOne({
       $or: [{ email }, { username }]
     });

     if (existingUser) {
       return res.status(400).json({
         error: existingUser.email === email 
           ? 'Email already registered' 
           : 'Username already taken'
       });
     }

     // Create new user
     const user = new User({
       username,
       email,
       password,
       profile: { firstName, lastName }
     });

     await user.save();

     // Generate token
     const token = this.generateToken(user._id);

     res.status(201).json({
       success: true,
       message: 'User registered successfully',
       token,
       user: user.toJSON()
     });
   } catch (error) {
     console.error('Registration error:', error);
     res.status(500).json({ error: 'Registration failed' });
   }
 }

 // Login user
 async login(req, res) {
   try {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const { login, password } = req.body; // login can be email or username

     // Find user by email or username
     const user = await User.findOne({
       $or: [
         { email: login.toLowerCase() },
         { username: login }
       ]
     });

     if (!user) {
       return res.status(401).json({ error: 'Invalid credentials' });
     }

     // Check password
     const isPasswordValid = await user.comparePassword(password);
     if (!isPasswordValid) {
       return res.status(401).json({ error: 'Invalid credentials' });
     }

     // Generate token
     const token = this.generateToken(user._id);

     res.json({
       success: true,
       message: 'Login successful',
       token,
       user: user.toJSON()
     });
   } catch (error) {
     console.error('Login error:', error);
     res.status(500).json({ error: 'Login failed' });
   }
 }

 // Get current user profile
 async getProfile(req, res) {
   try {
     res.json({
       success: true,
       user: req.user
     });
   } catch (error) {
     console.error('Profile fetch error:', error);
     res.status(500).json({ error: 'Failed to fetch profile' });
   }
 }

 // Update user profile
 async updateProfile(req, res) {
   try {
     const { firstName, lastName, bio, favoriteGames } = req.body;
     
     const updateData = {};
     if (firstName !== undefined) updateData['profile.firstName'] = firstName;
     if (lastName !== undefined) updateData['profile.lastName'] = lastName;
     if (bio !== undefined) updateData['profile.bio'] = bio;
     if (favoriteGames !== undefined) updateData['preferences.favoriteGames'] = favoriteGames;

     const user = await User.findByIdAndUpdate(
       req.user._id,
       { $set: updateData },
       { new: true, runValidators: true }
     );

     res.json({
       success: true,
       message: 'Profile updated successfully',
       user: user.toJSON()
     });
   } catch (error) {
     console.error('Profile update error:', error);
     res.status(500).json({ error: 'Failed to update profile' });
   }
 }
}

module.exports = new AuthController();






