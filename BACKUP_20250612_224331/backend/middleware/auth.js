﻿const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');
   
   if (!token) {
     return res.status(401).json({ error: 'Access denied. No token provided.' });
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   const user = await User.findById(decoded.id).select('-password');
   
   if (!user) {
     return res.status(401).json({ error: 'Invalid token.' });
   }

   req.user = user;
   next();
 } catch (error) {
   if (error.name === 'JsonWebTokenError') {
     return res.status(401).json({ error: 'Invalid token.' });
   }
   if (error.name === 'TokenExpiredError') {
     return res.status(401).json({ error: 'Token expired.' });
   }
   res.status(500).json({ error: 'Authentication error.' });
 }
};

const optionalAuth = async (req, res, next) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');
   
   if (token) {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findById(decoded.id).select('-password');
     req.user = user;
   }
   
   next();
 } catch (error) {
   // Continue without authentication
   next();
 }
};

module.exports = { auth, optionalAuth };


