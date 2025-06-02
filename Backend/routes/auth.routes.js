const { OAuth2Client } = require('google-auth-library');
const express = require('express');
const router = express.Router();
const { generateToken } = require('../utils/jwt.utils');
const User = require('../Models/user.model');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    
    if (!payload.email) {
      return res.status(400).json({ error: 'No email provided by Google' });
    }

    // Find or create user in your DB
    let user = await User.findOne({ email: payload.email });
    
    if (!user) {
      // Create new user
      user = await User.create({
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        avatar: payload.picture,
        isGoogleUser: true,
        isVerified: true // Google accounts are pre-verified
      });
    } else if (!user.isGoogleUser) {
      // If user exists but wasn't created via Google, update their info
      user.isGoogleUser = true;
      user.avatar = payload.picture;
      user.name = payload.name || user.name;
      await user.save();
    }
    
    // Generate JWT token
    const jwtToken = generateToken(user._id);
    
    // Send response
    res.json({ 
      token: jwtToken, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isGoogleUser: user.isGoogleUser
      }
    });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(401).json({ 
      error: 'Invalid Google token',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router; 