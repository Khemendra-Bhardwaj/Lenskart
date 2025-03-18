const express = require('express');
// const {pool, createTables, userPool} = require('./db/init_db');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const productRoutes = require('./routes/product');

const jwt = require('jsonwebtoken');

const {checkDatabaseHealth} = require("./db/healthCheck")
const {  initRedis, testRedisConnection } = require('./cache/init_cache'); // Import Redis client an

const initializeDatabase = require("./db/init_tables")

const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 4000;


// Middleware
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/cart', cartRoutes); // Cart routes
app.use('/wishlist', wishlistRoutes); // Wishlist routes
app.use('/products', productRoutes);


app.get('/health', async (req, res) => {
  try {
    const dbStatus = await checkDatabaseHealth();

    // Check Redis connection
    await testRedisConnection()
    console.log('Redis is up');

    res.status(200).json({
      status: 'ok',
      databases: dbStatus,
      redis: 'ok',
    });
    console.log('All DBs and Redis are up');
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Health check failed',
    });
  }
});


app.get('/', (req, res) => {
  res.send('Hello, PostgreSQL with Express!');
});


app.listen(PORT, async () => {
  try {
    await initializeDatabase(); // Initialize the database
    await initRedis();
    console.log(`Server running on http://localhost:${PORT}`);
    
  } catch (err) {
    console.error('Failed to initialize database:', err);
    process.exit(1); // Exit the process if initialization fails
  }
});
