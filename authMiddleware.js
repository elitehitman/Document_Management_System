// authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Get token from request header or cookie
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify token
    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        req.user = decoded.user;
        next(); // Proceed to the next middleware
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authMiddleware;
