const mongoose = require('mongoose');
const { ROLES } = require('../utils/roles'); // Import ROLES

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        // Object.values creates an array: ['Participant', 'Admin', 'TeamHead']
        enum: Object.values(ROLES), 
        default: ROLES.PARTICIPANT 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);