const express = require('express');
const { getPaymentByOrder, updatePayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/order/:orderId')
    .get(protect, getPaymentByOrder);

router.route('/:id')
    .put(protect, updatePayment);

module.exports = router;
