const express = require('express');
const router = express.Router();
const { protect, verifyAdmin } = require('../middleware/authMiddleware');
const { getTeamHeads } = require('../controllers/adminController');

router.get('/heads', protect, verifyAdmin, getTeamHeads);

module.exports = router;