const express = require('express');
const {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    getGuestCart,
    addToGuestCart,
    updateGuestCartItem,
    removeGuestCartItem,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Guest cart routes (no auth required)
router.get('/guest/:sessionId', getGuestCart);
router.post('/guest/:sessionId', addToGuestCart);
router.put('/guest/item/:cartItemId', updateGuestCartItem);
router.delete('/guest/item/:cartItemId', removeGuestCartItem);

// Authenticated cart routes
router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart);

router.route('/item/:id')
    .put(protect, updateCartItem)
    .delete(protect, removeCartItem);

module.exports = router;
