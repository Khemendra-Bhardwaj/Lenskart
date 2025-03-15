const { productPool } = require('../../init_db');

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
          category_id INT REFERENCES categories(id) ON DELETE SET NULL,
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

  static async findById(productId) {
    const client = await productPool.connect();
    try {
      const res = await client.query('SELECT * FROM products WHERE id = $1', [productId]);
      return res.rows[0];
    } catch (err) {
      console.error('Error finding product by ID:', err);
      throw err;
    } finally {
      client.release();
    }
  }
}

module.exports = Product;