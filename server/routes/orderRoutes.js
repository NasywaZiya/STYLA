const express = require('express');
const { createOrder, getOrders, getOrderById, updateOrderStatus, cancelOrder, trackOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createOrder)
    .get(protect, getOrders);

router.route('/:id')
    .get(protect, getOrderById);

router.route('/:id/status')
    .put(protect, updateOrderStatus);

router.route('/:id/cancel')
    .put(protect, cancelOrder);

router.route('/:orderNumber/track')
    .get(trackOrder);

module.exports = router;
