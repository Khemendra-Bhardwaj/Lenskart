const {userPool, productPool} = require("./init_db")


const checkDatabaseHealth = async () => {
    const results = {
      userDB: false,
      productDB: false,
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
    
    return results;
  };


  module.exports = {checkDatabaseHealth}; 
