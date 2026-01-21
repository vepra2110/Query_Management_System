const User = require('../models/User');
const Query = require('../models/Query');
const { ROLES, QUERY_STATUS } = require('../utils/roles'); // Import

const getTeamHeads = async (req, res) => {
    // 1. Find users where role is TEAM_HEAD
    const heads = await User.find({ role: ROLES.TEAM_HEAD }).select('username _id');
    
    // 2. Count 'ASSIGNED' queries
    const headsWithStats = await Promise.all(heads.map(async (head) => {
        const count = await Query.countDocuments({ 
            assignedTo: head._id, 
            status: QUERY_STATUS.ASSIGNED 
        });
        return { ...head._doc, activeQueries: count };
    }));

    res.json(headsWithStats);
};

module.exports = { getTeamHeads };