const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ROLES } = require('../utils/roles'); // Import ROLES

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = async (req, res) => {
    const { username, password, role, secretCode } = req.body;

    // VALIDATION: Check Code for Admin/TeamHead using constants
    if (role === ROLES.ADMIN || role === ROLES.TEAM_HEAD) {
        if (secretCode !== process.env.ADMIN_SECRET_CODE) {
            return res.status(403).json({ message: 'Invalid Secret Code for this role' });
        }
    }

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        username,
        password: hashedPassword,
        // Default to PARTICIPANT if no role provided
        role: role || ROLES.PARTICIPANT 
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            role: user.role,
            token: generateToken(user.id)
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

const loginUser = async (req, res) => {
    // ... (This function remains exactly the same as before)
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            role: user.role, 
            token: generateToken(user.id)
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

module.exports = { registerUser, loginUser };