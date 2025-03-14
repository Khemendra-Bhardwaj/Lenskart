const { Pool } = require('pg');
require('dotenv').config();

// User Database Connection  : // would have , user-personal-details, wishlist and add to cart 
const userPool = new Pool({
  user: process.env.USER_DB_USER || 'postgres',
  host: process.env.USER_DB_HOST || 'user-db',
  database: process.env.USER_DB_NAME || 'userDB',
  password: process.env.USER_DB_PASSWORD || 'postgres',
  port: process.env.USER_DB_PORT || 5432,
});

// Product Database Connection
const productPool = new Pool({
  user: process.env.PRODUCT_DB_USER || 'postgres',
  host: process.env.PRODUCT_DB_HOST || 'product-db',
  database: process.env.PRODUCT_DB_NAME || 'productDB',
  password: process.env.PRODUCT_DB_PASSWORD || 'postgres',
  port: process.env.PRODUCT_DB_PORT || 5433,
});

// Orders Database Connection
const ordersPool = new Pool({
  user: process.env.ORDERS_DB_USER || 'postgres',
  host: process.env.ORDERS_DB_HOST || 'orders-db',
  database: process.env.ORDERS_DB_NAME || 'ordersDB',
  password: process.env.ORDERS_DB_PASSWORD || 'postgres',
  port: process.env.ORDERS_DB_PORT || 5434,
});


// TODO: Create an interface to create POOLS , may also learn strategies of pool management by using resuableb objects 

const createTables = async () => {
  // Create User Tables
  const userClient = await userPool.connect();
  try {
    const res = await userClient.query('SELECT current_database();');
    console.log('Connected to user database:', res.rows[0].current_database);

    await userClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('User tables created successfully');
  } catch (err) {
    console.error('Error creating user tables:', err);
  } finally {
    userClient.release();
  }

  // Create Product Tables
  const productClient = await productPool.connect();
  try {
    const res = await productClient.query('SELECT current_database();');
    console.log('Connected to product database:', res.rows[0].current_database);

    await productClient.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(50),
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Product tables created successfully');
  } catch (err) {
    console.error('Error creating product tables:', err);
  } finally {
    productClient.release();
  }

  // Create Order Tables
  const ordersClient = await ordersPool.connect();
  try {
    const res = await ordersClient.query('SELECT current_database();');
    console.log('Connected to orders database:', res.rows[0].current_database);

    await ordersClient.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Order tables created successfully');
  } catch (err) {
    console.error('Error creating order tables:', err);
  } finally {
    ordersClient.release();
  }
};

// Health check function
const checkDatabaseHealth = async () => {
  const results = {
    userDB: false,
    productDB: false,
    ordersDB: false
  };
  
  try {
    await userPool.query('SELECT 1');
    results.userDB = true;
  } catch (error) {
    console.error('User database health check failed:', error);
  }
  
  try {
    await productPool.query('SELECT 1');
    results.productDB = true;
  } catch (error) {
    console.error('Product database health check failed:', error);
  }
  
  try {
    await ordersPool.query('SELECT 1');
    results.ordersDB = true;
  } catch (error) {
    console.error('Orders database health check failed:', error);
  }
  
  return results;
};

module.exports = { 
  userPool, 
  productPool, 
  ordersPool, 
  createTables,
  checkDatabaseHealth
};