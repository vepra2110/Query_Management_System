const express = require('express');
const router = express.Router();
const { protect, verifyAdmin, verifyTeamHead } = require('../middleware/authMiddleware');
const { 
    createQuery, 
    getQueries, 
    assignQuery, 
    resolveQuery, 
    dismantleQuery 
} = require('../controllers/queryController');

// Shared Routes (Behavior changes based on Role)
router.route('/').post(protect, createQuery).get(protect, getQueries);

// Admin Only Routes
router.patch('/:id/assign', protect, verifyAdmin, assignQuery);

// Team Head Only Routes
router.patch('/:id/resolve', protect, verifyTeamHead, resolveQuery);

// Both Admin & Head can Dismantle/Reject
router.patch('/:id/reject', protect, dismantleQuery);

module.exports = router;