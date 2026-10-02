// middleware/auth.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        // Format is usually "Bearer <token>", so we split by space
        const token = authHeader.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
        req.user = verified; // Save user data to request object
        next(); // Move on to the actual route
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
}

module.exports = verifyToken;