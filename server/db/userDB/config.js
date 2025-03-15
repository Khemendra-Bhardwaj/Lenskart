require('dotenv').config();

module.exports = {
  user: process.env.USER_DB_USER || 'postgres',
  host: process.env.USER_DB_HOST || 'user-db',
  database: process.env.USER_DB_NAME || 'userDB',
  password: process.env.USER_DB_PASSWORD || 'postgres',
  port: process.env.USER_DB_PORT || 5432,
};