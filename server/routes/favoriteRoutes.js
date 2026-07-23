const express = require('express');
const { getFavorites, addFavorite, removeFavorite, getFavoriteStatus } = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// GET  /api/favorites          → get all favorites for logged-in user
// POST /api/favorites          → add a product to favorites
router.route('/')
    .get(protect, getFavorites)
    .post(protect, addFavorite);

// GET /api/favorites/status/:productId → check if product is favorited
router.get('/status/:productId', protect, getFavoriteStatus);

// DELETE /api/favorites/:productId → remove a product from favorites
router.delete('/:productId', protect, removeFavorite);

module.exports = router;
