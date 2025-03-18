const express = require('express');
const Product = require('../db/productDB/models/Product');
const {redisClient} = require('../cache/init_cache');
const router = express.Router();

// TODO: FROM a user perspective, user will only be able to hit "get" api, rest would be from admin side 
const ALL_PRODUCTS_CACHE_KEY = 'all_products';  // TODO: pass from env vars 

// Add a Product :  ADMIN Only 
router.post('/add', async (req, res) => {
  const { name, description, price, stock_quantity } = req.body;

  try {
    const product = await Product.addProduct(name, description, price, stock_quantity);
    await redisClient.del(ALL_PRODUCTS_CACHE_KEY);

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a Product : ADMIN Only 
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.updateProduct(id, updates);

    // Invalidate the cache for all products and this specific product
    await redisClient.del(ALL_PRODUCTS_CACHE_KEY);
    await redisClient.del(`product:${id}`);


    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Product :  ADMIN Only  
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.deleteProduct(id);
     // Invalidate the cache for all products and this specific product
     await redisClient.del(ALL_PRODUCTS_CACHE_KEY);
     await redisClient.del(`product:${id}`);

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const cachedProducts = await redisClient.get(ALL_PRODUCTS_CACHE_KEY);
    if (cachedProducts) {
      console.log('Cache hit: Returning products from Redis');
      return res.json(JSON.parse(cachedProducts));
    }

    // Cache miss: Fetch from database
    console.log('Cache miss: Fetching products from database');
    const products = await Product.getAllProducts();

    // Cache the products in Redis
    await redisClient.set(ALL_PRODUCTS_CACHE_KEY, JSON.stringify(products), {
      EX: 3600, // Set expiration time (1 hour)
    });

    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a Single Product by ID
router.get('/get/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const cacheKey = `product:${id}`;

    // Check Redis cache
    const cachedProduct = await redisClient.get(cacheKey);
    if (cachedProduct) {
      console.log('Cache hit: Returning product from Redis');
      return res.json(JSON.parse(cachedProduct));
    }

    // Cache miss: Fetch from database
    console.log('Cache miss: Fetching product from database');
    const product = await Product.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Cache the product in Redis
    await redisClient.set(cacheKey, JSON.stringify(product), {
      EX: 3600, // Set expiration time (1 hour)
    });

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;