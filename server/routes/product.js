const express = require('express');
const Product = require('../db/productDB/models/Product');
// const {redisClient} = require('../cache/init_cache');
const {MultiCache}  = require("../cache/multiCache")
const router = express.Router();

// TODO: FROM a user perspective, user will only be able to hit "get" api, rest would be from admin side 
const ALL_PRODUCTS_CACHE_KEY = 'all_products';  // TODO: pass from env vars 

// Add a Product :  ADMIN Only 
router.post('/add', async (req, res) => {
  const { name, description, price, stock_quantity } = req.body;

  try {
    const product = await Product.addProduct(name, description, price, stock_quantity);
    await MultiCache.del(ALL_PRODUCTS_CACHE_KEY);
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

    // Invalidate cache
    await MultiCache.del(ALL_PRODUCTS_CACHE_KEY); // Invalidate all products cache
    await MultiCache.del(`product:${id}`); // Invalidate single product cache

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
     // Invalidate cache
     await MultiCache.del(ALL_PRODUCTS_CACHE_KEY); // Invalidate all products cache
     await MultiCache.del(`product:${id}`); // Invalidate single product cache

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const cachedProducts = await MultiCache.get(ALL_PRODUCTS_CACHE_KEY);
    if (cachedProducts) {
      return res.json(cachedProducts);
    }

    // Cache miss: Fetch from database
    const products = await Product.getAllProducts();

    // Store in cache
    await MultiCache.set(ALL_PRODUCTS_CACHE_KEY, products);
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

    // Check cache first
    const cachedProduct = await MultiCache.get(cacheKey);
    if (cachedProduct) {
      return res.json(cachedProduct);
    }

    // Cache miss: Fetch from database
    const product = await Product.getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Store in cache
    await MultiCache.set(cacheKey, product);

    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;