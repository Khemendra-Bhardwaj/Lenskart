// db/userDB/models/User.js
const poolManager = require('../../poolManager');
const userPool = poolManager.getUserPool();

class User {
  static async createTable() {
    const client = await userPool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log('User table created successfully');
    } catch (err) {
      console.error('Error creating user table:', err);
    } finally {
      client.release();
    }
  }

  static async findByEmail(email) {
    const client = await userPool.connect();
    try {
      const res = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      return res.rows[0];
    } catch (err) {
      console.error('Error finding user by email:', err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = User;