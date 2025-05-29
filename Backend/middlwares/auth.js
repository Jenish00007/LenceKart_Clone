const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  try {
    console.log('Auth middleware - Headers:', req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Auth middleware - Token:', token);
    
    if (!token) {
      console.log('Auth middleware - No token provided');
      return res.status(401).json({ 
        message: 'Authentication required',
        error: 'No token provided'
      });
    }

    if (!process.env.JWT_SECRET) {
      console.warn('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ 
        message: 'Server configuration error',
        error: 'JWT secret is not configured'
      });
    }

    console.log('Auth middleware - JWT_SECRET:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - Decoded token:', decoded);
    
    if (!decoded || (!decoded.userID && !decoded._id)) {
      console.log('Auth middleware - Invalid token structure:', decoded);
      return res.status(401).json({ 
        message: 'Invalid token',
        error: 'Token verification failed'
      });
    }

    req.user = {
      _id: decoded.userID || decoded._id
    };
    console.log('Auth middleware - User set:', req.user);
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      message: 'Authentication failed',
      error: error.message
    });
  }
};

module.exports = auth; 