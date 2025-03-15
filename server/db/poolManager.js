// db/poolManager.js
const { Pool } = require('pg');
const userDBConfig = require('./userDB/config');
const productDBConfig = require('./productDB/config');


class PoolManager {
  constructor() {
    if (!PoolManager.instance) {
      this.userPool = new Pool(userDBConfig);
      this.productPool = new Pool(productDBConfig);
      PoolManager.instance = this;
    }
    return PoolManager.instance;
  }

  getUserPool() {
    return this.userPool;
  }

  getProductPool() {
    return this.productPool;
  }
}

const instance = new PoolManager();
Object.freeze(instance);

module.exports = instance;