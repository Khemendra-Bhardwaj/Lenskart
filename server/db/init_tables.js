const { User, Wishlist, Product } = require('./init_db');

const initializeDatabase = async () => {
  try {
    // Create User table
    await User.createTable();
    console.log('User table created successfully');

    // Create Wishlist table
    await Wishlist.createTable();
    console.log('Wishlist table created successfully');

    // Create Product table
    await Product.createTable();
    console.log('Product table created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
    throw err; // Re-throw the error to handle it in the caller
  }
};

module.exports = initializeDatabase;
