const poolManager = require('../../poolManager');
const userPool = poolManager.getUserPool();

class Cart {
    static async createTable() {
        const client = await userPool.connect();
        try {
          await client.query(`
            CREATE TABLE IF NOT EXISTS carts (
              id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(id) ON DELETE CASCADE,
              product_id INT REFERENCES products(id) ON DELETE CASCADE,
              quantity INT NOT NULL DEFAULT 1,
              created_at TIMESTAMP DEFAULT NOW()
            );
          `);
          console.log('Cart table created successfully');
        } catch (err) {
          console.error('Error creating cart table:', err);
        } finally {
          client.release();
        }
      }
      
  static async addToCart(userId, productId, quantity = 1) {
    const client = await userPool.connect();
    try {
      const result = await client.query(
        'INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [userId, productId, quantity]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error adding to cart:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async removeFromCart(userId, productId) {
    const client = await userPool.connect();
    try {
      const result = await client.query(
        'DELETE FROM carts WHERE user_id = $1 AND product_id = $2 RETURNING *',
        [userId, productId]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error removing from cart:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async getCartItems(userId) {
    const client = await userPool.connect();
    try {
      const result = await client.query(
        'SELECT * FROM carts WHERE user_id = $1',
        [userId]
      );
      return result.rows;
    } catch (err) {
      console.error('Error fetching cart items:', err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = Cart;