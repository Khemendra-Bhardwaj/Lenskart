// const { userPool } = require('../../init_db');
const poolManager = require('../../poolManager');
const userPool = poolManager.getUserPool();


class Wishlist {
  static async createTable() {
    const client = await userPool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS wishlists (
          id SERIAL PRIMARY KEY,
          user_id INT REFERENCES users(id) ON DELETE CASCADE,
          product_id INT REFERENCES products(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log('Wishlist table created successfully');
    } catch (err) {
      console.error('Error creating wishlist table:', err);
    } finally {
      client.release();
    }
  }

  static async addToWishlist(userId, productId) {
    const client = await userPool.connect();
    try {
      const result = await client.query(
        'INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2) RETURNING *',
        [userId, productId]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error adding to wishlist:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async removeFromWishlist(userId, productId) {
    const client = await userPool.connect();
    try {
      const result = await client.query(
        'DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2 RETURNING *',
        [userId, productId]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async getWishlistItems(userId) {
    const client = await userPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM wishlists WHERE user_id = $1',
        [userId]
      );
      return result.rows;
    } catch (err) {
      console.error('Error fetching wishlist items:', err);
      throw err;
    } finally {
      client.release();
    }
  }


}

module.exports =  Wishlist ;


