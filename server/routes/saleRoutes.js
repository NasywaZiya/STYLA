const express = require('express');
const { getSales, getActiveSales, getSaleById, createSale, updateSale, deleteSale, addProductToSale, removeProductFromSale } = require('../controllers/saleController');

const router = express.Router();

router.route('/')
    .get(getSales)
    .post(createSale);

router.route('/active')
    .get(getActiveSales);

router.route('/:id')
    .get(getSaleById)
    .put(updateSale)
    .delete(deleteSale);

// Product-Sale assignments
router.route('/:saleId/products')
    .post(addProductToSale);

router.route('/:saleId/products/:productSaleId')
    .delete(removeProductFromSale);

module.exports = router;
