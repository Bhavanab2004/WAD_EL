const pool = require('./config/db');
const fs = require('fs');

async function debugReviews() {
    try {
        const res = await pool.query('SELECT college_name, course, is_verified, created_at FROM reviews ORDER BY created_at DESC LIMIT 5');

        const output = {
            reviews: res.rows,
            firstCharCodes: res.rows.length > 0 ? res.rows[0].college_name.split('').map(c => c.charCodeAt(0)) : []
        };

        fs.writeFileSync('debug_output.json', JSON.stringify(output, null, 2));
        console.log("Wrote to debug_output.json");

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

debugReviews();
