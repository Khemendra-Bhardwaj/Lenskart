const { Pool } = require('pg');
require('dotenv').config();

// User Database Connection  : // would have , user-personal-details, wishlist and add to cart 
// const userPool = new Pool({
//   user: process.env.USER_DB_USER || 'postgres',
//   host: process.env.USER_DB_HOST || 'user-db',
//   database: process.env.USER_DB_NAME || 'userDB',
//   password: process.env.USER_DB_PASSWORD || 'postgres',
//   port: process.env.USER_DB_PORT || 5432,
// });

// // Product Database Connection
// const productPool = new Pool({
//   user: process.env.PRODUCT_DB_USER || 'postgres',
//   host: process.env.PRODUCT_DB_HOST || 'product-db',
//   database: process.env.PRODUCT_DB_NAME || 'productDB',
//   password: process.env.PRODUCT_DB_PASSWORD || 'postgres',
//   port: process.env.PRODUCT_DB_PORT || 5433,
// });


const userDBConfig = require('./userDB/config');
const productDBConfig = require('./productDB/config');

// Initialize userPool
const userPool = new Pool(userDBConfig);

// Initialize productPool
const productPool = new Pool(productDBConfig);

// Export pools and models
module.exports = {
  userPool,
  productPool,
  User: require('./userDB/models/User'),
  // Address: require('./userDB/models/Address'),
  // Wishlist: require('./userDB/models/Wishlist'),
  // Cart: require('./userDB/models/Cart'),
  Product: require('./productDB/models/Product'),
  // ProductInventory: require('./productDB/models/ProductInventory'),
  // ProductReview: require('./productDB/models/ProductReview'),
  // Category: require('./productDB/models/Category'),
};


// TODO: Create an interface to create POOLS , may also learn strategies of pool management by using resuableb objects 
/*
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


};

// Health check function


module.exports = { 
  userPool, 
  productPool, 
  ordersPool, 
  createTables,
  checkDatabaseHealth
};

*/