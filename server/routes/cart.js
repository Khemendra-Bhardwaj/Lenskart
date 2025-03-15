const express = require('express');
const Cart = require('../db/userDB/models/Cart');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Add to Cart
router.post('/add', authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cartItem = await Cart.addToCart(userId, productId, quantity);
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove from Cart
router.delete('/remove', authenticateToken, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cartItem = await Cart.removeFromCart(userId, productId);
    res.json(cartItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Cart Items
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await Cart.getCartItems(userId);
    res.json(cartItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;