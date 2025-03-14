const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'lenskartDB',
  password: 'postgres',
  port: 5432,
});

const createTables = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT current_database();');
    console.log('Connected to database:', res.rows[0].current_database);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    client.release();
  }
};

module.exports = { pool, createTables };
