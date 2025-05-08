const { verifyToken } = require('../utils/jwt.utils');

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        
        req.user = { userId: decoded.userId };
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: 'Invalid or expired token',
            error: error.message 
        });
    }
};

module.exports = { authenticate };
