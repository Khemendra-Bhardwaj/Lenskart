// db/init_tables.js
const User = require('./userDB/models/User');
const Product = require('./productDB/models/Product');
const Wishlist = require('./userDB/models/Wishlist');
const Cart  = require('./userDB/models/Cart')

const initializeDatabase = async () => {
  try {
    
    // TODO : Check DB Health 
    await User.createTable();
    await Product.createTable();

    // // TODO : WTF is this ?? , implement a retry mechanism 
    // console.log('Waiting for 5 seconds before creating dependent tables...');
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // 5-second delay

    await Cart.createTable();
    await Wishlist.createTable();
    

    console.log('All tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
    throw err;
  }
};

module.exports = initializeDatabase;