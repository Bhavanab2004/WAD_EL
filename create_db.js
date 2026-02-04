const { Client } = require('pg');
require('dotenv').config();

const config = {
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: 'postgres', // Connect to default DB first
    password: process.env.DB_PASSWORD || 'admin123',
    port: process.env.DB_PORT || 5432,
};

async function createDB() {
    const client = new Client(config);
    try {
        await client.connect();

        // Check if DB exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname='college_hunt_db'");
        if (res.rows.length === 0) {
            console.log("Creating database 'college_hunt_db'...");
            await client.query('CREATE DATABASE college_hunt_db');
            console.log("✅ Database created successfully!");
        } else {
            console.log("Database 'college_hunt_db' already exists.");
        }

    } catch (err) {
        console.error("Error creating database:", err);
    } finally {
        await client.end();
    }
}

createDB();
