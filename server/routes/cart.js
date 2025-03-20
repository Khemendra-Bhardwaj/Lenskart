const express = require('express');
const Cart = require('../db/userDB/models/Cart');
const { MultiCache } = require('../cache/multiCache');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();


// Cart Cache Key
const getCartCacheKey = (userId) => `cart:${userId}`;


// Add to Cart
router.post('/add', authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cartItem = await Cart.addToCart(userId, productId, quantity);
    await MultiCache.del(getCartCacheKey(userId));  
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
    await MultiCache.del(getCartCacheKey(userId));
    res.json(cartItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Cart Items
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const cacheKey = getCartCacheKey(userId);

  try {
    const cachedCart = await MultiCache.get(cacheKey);
    if (cachedCart) return res.json(cachedCart);

    const cartItems = await Cart.getCartItems(userId);
    await MultiCache.set(cacheKey, cartItems); // Cache result
    res.json(cartItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;