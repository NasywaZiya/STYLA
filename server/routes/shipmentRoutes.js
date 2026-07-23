const express = require('express');
const { getShipmentByOrder, updateShipment } = require('../controllers/shipmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/order/:orderId')
    .get(protect, getShipmentByOrder);

router.route('/:id')
    .put(protect, updateShipment);

module.exports = router;
