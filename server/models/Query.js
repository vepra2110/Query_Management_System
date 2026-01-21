const mongoose = require('mongoose');
const { QUERY_STATUS } = require('../utils/roles'); // Import QUERY_STATUS

const querySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String, 
        enum: Object.values(QUERY_STATUS), 
        default: QUERY_STATUS.UNASSIGNED 
    },
    answer: { type: String },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    assignedTo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        default: null 
    }
}, { timestamps: true });

module.exports = mongoose.model('Query', querySchema);