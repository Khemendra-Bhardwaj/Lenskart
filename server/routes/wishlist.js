const express = require('express');
const Wishlist = require('../db/userDB/models/Wishlist');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

// Add to Wishlist
router.post('/add', authenticateToken, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const wishlistItem = await Wishlist.addToWishlist(userId, productId);
    res.status(201).json(wishlistItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove from Wishlist
router.delete('/remove', authenticateToken, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const wishlistItem = await Wishlist.removeFromWishlist(userId, productId);
    res.json(wishlistItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Wishlist Items
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlistItems = await Wishlist.getWishlistItems(userId);
    res.json(wishlistItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;