const pool = require('./config/db');
const fs = require('fs');

async function debugReviews() {
    try {
        console.log("Searching for 'Christ' reviews...");
        const res = await pool.query("SELECT * FROM reviews WHERE college_name ILIKE '%Christ%' ORDER BY created_at DESC");

        const output = {
            found: res.rows.length,
            reviews: res.rows.map(r => ({
                id: r.id,
                college_name: r.college_name,
                course: r.course,
                is_verified: r.is_verified,
                created_at: r.created_at
            }))
        };

        fs.writeFileSync('debug_christ_reviews.json', JSON.stringify(output, null, 2));
        console.log("Wrote to debug_christ_reviews.json");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

debugReviews();
