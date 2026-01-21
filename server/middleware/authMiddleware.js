const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { ROLES } = require('../utils/roles'); // Import ROLES

const protect = async (req, res, next) => {
    // ... (This function remains exactly the same as before)
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === ROLES.ADMIN) { // Updated
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Admins only' });
    }
};

const verifyTeamHead = (req, res, next) => {
    if (req.user && req.user.role === ROLES.TEAM_HEAD) { // Updated
        next();
    } else {
        res.status(403).json({ message: 'Access denied: Team Heads only' });
    }
};

module.exports = { protect, verifyAdmin, verifyTeamHead };