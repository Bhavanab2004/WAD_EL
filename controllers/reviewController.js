const pool = require('../config/db');

// Submit a Review
exports.submitReview = async (req, res) => {
    const { user_name, user_email, course, college_name, review_text, rating } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO reviews (user_name, user_email, course, college_name, review_text, rating, is_verified) VALUES ($1, $2, $3, $4, $5, $6, TRUE) RETURNING *',
            [user_name, user_email, course, college_name, review_text, rating]
        );

        res.status(201).json({ message: 'Review submitted successfully. It is now visible.', review: result.rows[0] });
    } catch (err) {
        console.error("FULL ERROR DETAILS:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Verified Reviews (Public)
exports.getReviews = async (req, res) => {
    const { course, college_name } = req.query;

    let query = 'SELECT * FROM reviews WHERE is_verified = TRUE';
    let params = [];

    if (course) {
        params.push(course);
        query += ` AND course = $${params.length}`;
    }

    if (college_name) {
        params.push(college_name);
        query += ` AND college_name = $${params.length}`;
    }

    query += ' ORDER BY created_at DESC';

    try {
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Pending Reviews (Admin)
exports.getPendingReviews = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reviews WHERE is_verified = FALSE ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Reviews (Admin)
exports.getAllReviews = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Approve Review (Admin)
exports.approveReview = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('UPDATE reviews SET is_verified = TRUE WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review approved', review: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Review (Admin)
exports.deleteReview = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM reviews WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
