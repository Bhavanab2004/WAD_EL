const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Test DB Connection
db.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully:', res.rows[0]);
    }
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
