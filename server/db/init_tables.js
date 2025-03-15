// db/init_tables.js
const User = require('./userDB/models/User');
const Product = require('./productDB/models/Product');
const Wishlist = require('./userDB/models/Wishlist');

const initializeDatabase = async () => {
  try {
    
    // TODO : Check DB Health 
    await User.createTable();
    await Product.createTable();
    await Wishlist.createTable();
    console.log('All tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
    throw err;
  }
};

module.exports = initializeDatabase;