const express = require('express');
const Product = require('../db/productDB/models/Product');
const router = express.Router();

// TODO: FROM a user perspective, user will only be able to hit "get" api, rest would be from admin side 

// Add a Product
router.post('/add', async (req, res) => {
  const { name, description, price, stock_quantity } = req.body;

  try {
    const product = await Product.addProduct(name, description, price, stock_quantity);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a Product
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.updateProduct(id, updates);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Product
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.deleteProduct(id);
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a Single Product by ID
router.get('/get/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;