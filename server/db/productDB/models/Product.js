// db/productDB/models/Product.js
const poolManager = require('../../poolManager');
const productPool = poolManager.getProductPool();

class Product {
  static async createTable() {
    const client = await productPool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT,
          price DECIMAL(10, 2) NOT NULL,
          stock_quantity INT NOT NULL DEFAULT 0,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      console.log('Product table created successfully');
    } catch (err) {
      console.error('Error creating product table:', err);
    } finally {
      client.release();
    }
  }
}

module.exports = Product;