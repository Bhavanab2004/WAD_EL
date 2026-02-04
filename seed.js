const pool = require('./config/db');
require('dotenv').config();

const seed = async () => {
    try {
        // Create tables if they don't exist (handled in schema.sql but good to be safe or run schema here)
        // For now, assuming schema.sql was run or I run it here? 
        // I haven't actually RUN the schema.sql against the DB yet. I should do that.

        const fs = require('fs');
        const path = require('path');
        const schema = fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf8');

        await pool.query(schema);
        console.log('Schema applied');

        await pool.query(`
            INSERT INTO users (name, email, password, role)
            VALUES ('Admin', 'admin@example.com', 'admin123', 'admin')
            ON CONFLICT (email) DO NOTHING
        `);
        console.log('Admin seeded: admin@example.com / admin123');
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
seed();
