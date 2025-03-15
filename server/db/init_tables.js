// db/init_tables.js
const { userPool, productPool } = require('./init_db');

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
}


class Wishlist {
    static async createTable() {
      const client = await userPool.connect();
      try {
        // Drop the existing table (if it exists)
        await client.query('DROP TABLE IF EXISTS wishlists');
  
        // Create the new table
        await client.query(`
          CREATE TABLE wishlists (
            id SERIAL PRIMARY KEY,
            wow VARCHAR(100),
            name VARCHAR(20)
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

const initializeDatabase = async () => {
  try {
    await User.createTable();
    await Product.createTable();
    await Wishlist.createTable();
  } catch (err) {
    console.error('Error creating tables:', err);
    throw err;
  }
};

module.exports = initializeDatabase;