const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Google OAuth login route
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Google OAuth callback route
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
    session: false
  }),
  (req, res) => {
    try {
      if (!req.user) {
        throw new Error('No user data received from Google');
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Prepare user data
      const userData = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        image: req.user.image,
        role: req.user.role
      };

      // Send HTML response that posts message to opener window
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'GOOGLE_AUTH_SUCCESS',
                  token: '${token}',
                  user: ${JSON.stringify(userData)}
                }, '${process.env.CLIENT_URL}');
                window.close();
              } else {
                window.location.href = '${process.env.CLIENT_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}';
              }
            </script>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('Auth callback error:', error);
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: 'GOOGLE_AUTH_ERROR',
                  error: '${error.message}'
                }, '${process.env.CLIENT_URL}');
                window.close();
              } else {
                window.location.href = '${process.env.CLIENT_URL}/login?error=${encodeURIComponent(error.message)}';
              }
            </script>
          </body>
        </html>
      `);
    }
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.redirect(`${process.env.CLIENT_URL}/login?error=logout_failed`);
    }
    res.redirect(process.env.CLIENT_URL);
  });
});

module.exports = router; 