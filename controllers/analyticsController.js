const pool = require('../config/db');

// Log a Visit
exports.logVisit = async (req, res) => {
    const ip_address = req.ip || req.connection.remoteAddress;
    const user_agent = req.headers['user-agent'];

    try {
        await pool.query('INSERT INTO website_views (ip_address, user_agent) VALUES ($1, $2)', [ip_address, user_agent]);
        res.status(200).json({ message: 'Visit logged' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Analytics Stats (Admin)
exports.getStats = async (req, res) => {
    try {
        const totalVisits = await pool.query('SELECT COUNT(*) FROM website_views');
        const uniqueVisitors = await pool.query('SELECT COUNT(DISTINCT ip_address) FROM website_views');
        const pendingReviews = await pool.query('SELECT COUNT(*) FROM reviews WHERE is_verified = FALSE');
        const totalReviews = await pool.query('SELECT COUNT(*) FROM reviews');

        res.json({
            totalVisits: parseInt(totalVisits.rows[0].count),
            uniqueVisitors: parseInt(uniqueVisitors.rows[0].count),
            pendingReviews: parseInt(pendingReviews.rows[0].count),
            totalReviews: parseInt(totalReviews.rows[0].count)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
