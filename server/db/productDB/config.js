require('dotenv').config();

module.exports = {
  user: process.env.PRODUCT_DB_USER || 'postgres',
  host: process.env.PRODUCT_DB_HOST || 'product-db',
  database: process.env.PRODUCT_DB_NAME || 'productDB',
  password: process.env.PRODUCT_DB_PASSWORD || 'postgres',
  port: process.env.PRODUCT_DB_PORT || 5433,
};