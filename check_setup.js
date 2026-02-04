const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'college_hunt_db',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
});

async function check() {
    console.log("Checking Database Connection...");
    try {
        const client = await pool.connect();
        console.log("✅ Database Connected Successfully!");

        console.log("Checking Tables...");
        const tables = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);

        const tableNames = tables.rows.map(r => r.table_name);
        console.log("Found Tables:", tableNames);

        const required = ['users', 'reviews', 'website_views'];
        const missing = required.filter(t => !tableNames.includes(t));

        if (missing.length > 0) {
            console.error("❌ MISSING TABLES:", missing);
            console.log("Attempting to run seed script to fix...");
            await runSeed();
        } else {
            console.log("✅ All Tables Present!");

            // Check Admin
            const admin = await client.query("SELECT * FROM users WHERE email = 'admin@example.com'");
            if (admin.rows.length === 0) {
                console.error("❌ Admin user missing!");
            } else {
                console.log("✅ Admin user found.");
            }
        }

        client.release();
        process.exit(0);

    } catch (err) {
        console.error("❌ DATABASE ERROR:", err.message);
        if (err.message.includes('password authentication failed')) {
            console.error("-> Your DB Password in .env is incorrect.");
        } else if (err.message.includes('database "college_hunt_db" does not exist')) {
            console.error("-> The database 'college_hunt_db' does not exist. Please create it using pgAdmin or SQL Shell.");
        }
        process.exit(1);
    }
}

async function runSeed() {
    // Logic from seed.js
    const fs = require('fs');
    const path = require('path');
    try {
        const schema = fs.readFileSync(path.join(__dirname, 'db', 'schema.sql'), 'utf8');
        await pool.query(schema);
        console.log("✅ Schema applied successfully.");

        await pool.query(`
          INSERT INTO users (name, email, password, role)
          VALUES ('Admin', 'admin@example.com', 'admin123', 'admin')
          ON CONFLICT (email) DO NOTHING
      `);
        console.log("✅ Admin user seeded.");
    } catch (e) {
        console.error("Error seeding:", e);
    }
}

check();
