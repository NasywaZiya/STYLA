const express = require('express');
const { getVariantsByProduct, getVariantById, createVariant, updateVariant, deleteVariant } = require('../controllers/variantController');

const router = express.Router();

router.route('/')
    .post(createVariant);

router.route('/product/:productId')
    .get(getVariantsByProduct);

router.route('/:id')
    .get(getVariantById)
    .put(updateVariant)
    .delete(deleteVariant);

module.exports = router;
