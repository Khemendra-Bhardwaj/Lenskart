const express = require('express');
const Wishlist = require('../db/userDB/models/Wishlist');

const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();


const getWishlistCacheKey = (userId) => `wishlist:${userId}`;


// Add to Wishlist
router.post('/add', authenticateToken, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const wishlistItem = await Wishlist.addToWishlist(userId, productId); 
    await MultiCache.del(getWishlistCacheKey(userId));
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
    await MultiCache.del(getWishlistCacheKey(userId));
    res.json(wishlistItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Wishlist Items
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const cacheKey = getWishlistCacheKey(userId);

  try {
    const cachedWishlist = await MultiCache.get(cacheKey);
    if (cachedWishlist) return res.json(cachedWishlist);

    const wishlistItems = await Wishlist.getWishlistItems(userId);
    await MultiCache.set(cacheKey, wishlistItems); // Cache result
    res.json(wishlistItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;