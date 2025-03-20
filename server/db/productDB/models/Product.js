// db/productDB/models/Product.js
const poolManager = require('../../poolManager');
const userPool = poolManager.getUserPool();

class Product {
  static async createTable() {
    const client = await userPool.connect();
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

  static async addProduct(name, description, price, stock_quantity) {
    const client = await userPool.connect();
    try {
      const result = await client.query(
        'INSERT INTO products (name, description, price, stock_quantity) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, stock_quantity]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error adding product:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async updateProduct(id, updates) {
    const client = await userPool.connect();
    try {
      const { name, description, price, stock_quantity } = updates;
      const result = await client.query(
        'UPDATE products SET name = $1, description = $2, price = $3, stock_quantity = $4 WHERE id = $5 RETURNING *',
        [name, description, price, stock_quantity, id]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async deleteProduct(id) {
    const client = await userPool.connect();
    try {
      const result = await client.query(
        'DELETE FROM products WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error deleting product:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async getAllProducts() {
    const client = await userPool.connect();
    try {
      const result = await client.query('SELECT * FROM products');
      return result.rows;
    } catch (err) {
      console.error('Error fetching products:', err);
      throw err;
    } finally {
      client.release();
    }
  }

  static async getProductById(id) {
    const client = await userPool.connect();
    try {
      const result = await client.query('SELECT * FROM products WHERE id = $1', [id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error fetching product:', err);
      throw err;
    } finally {
      client.release();
    }
  }
  
}

module.exports = Product;