const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load Config
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Allows parsing JSON body
app.use(cors()); // Allows Frontend to talk to Backend

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/queries', require('./routes/queryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));