const { Pool } = require('pg');
require('dotenv').config();

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
};

