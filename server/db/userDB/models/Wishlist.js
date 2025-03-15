const { userPool } = require('../../init_db');

class Wishlist {
  static async createTable() {
    const client = await userPool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS Wishlist (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100)
        );
      `);
      console.log('Wishlist table created successfully');
    } catch (err) {
      console.error('Error creating wishlist table:', err);
    } finally {
      client.release();
    }
  }
}

module.exports = { Wishlist };


