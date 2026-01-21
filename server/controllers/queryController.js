const Query = require('../models/Query');
const { ROLES, QUERY_STATUS } = require('../utils/roles'); // Import BOTH

const createQuery = async (req, res) => {
    const { title, description } = req.body;
    const query = await Query.create({
        title,
        description,
        createdBy: req.user._id,
        status: QUERY_STATUS.UNASSIGNED // Explicitly set default (optional but good practice)
    });
    res.status(201).json(query);
};

const getQueries = async (req, res) => {
    let queries;
    
    // Switch logic using constants
    switch (req.user.role) {
        case ROLES.PARTICIPANT:
            queries = await Query.find({ createdBy: req.user._id });
            break;
        case ROLES.ADMIN:
            queries = await Query.find({}).populate('assignedTo', 'username');
            break;
        case ROLES.TEAM_HEAD:
            queries = await Query.find({ assignedTo: req.user._id });
            break;
        default:
            queries = [];
    }
    
    res.json(queries);
};

const assignQuery = async (req, res) => {
    const { teamHeadId } = req.body;
    const query = await Query.findById(req.params.id);

    if (query) {
        query.assignedTo = teamHeadId;
        query.status = QUERY_STATUS.ASSIGNED; // Update Status
        await query.save();
        res.json(query);
    } else {
        res.status(404).json({ message: 'Query not found' });
    }
};

const resolveQuery = async (req, res) => {
    const { answer } = req.body;
    const query = await Query.findById(req.params.id);

    if (query.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    query.answer = answer;
    query.status = QUERY_STATUS.RESOLVED; // Update Status
    await query.save();
    res.json(query);
};

const dismantleQuery = async (req, res) => {
    const query = await Query.findById(req.params.id);
    
    if (req.user.role === ROLES.TEAM_HEAD && query.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    query.status = QUERY_STATUS.DISMANTLED; // Update Status
    await query.save();
    res.json(query);
};

module.exports = { createQuery, getQueries, assignQuery, resolveQuery, dismantleQuery };