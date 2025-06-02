const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('181176318329-5ip416gavqi3jo22u6egr124f6a06nn9.apps.googleusercontent.com');
const { generateToken } = require('../utils/jwt.utils');

router.post('/auth/google', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '181176318329-5ip416gavqi3jo22u6egr124f6a06nn9.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    // Find or create user in your DB
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = await User.create({
        email: payload.email,
        name: payload.name,
        avatar: payload.picture,
        // ...any other fields
      });
    }
    // Generate your JWT/session as usual
    const jwtToken = generateToken(user._id);
    res.json({ token: jwtToken, user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid Google token' });
  }
}); 