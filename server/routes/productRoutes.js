const express = require('express');
const {
    getProducts,
    getProductById,
    getWomenProducts,
    getMenProducts,
    getRecommendationProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getSaleProducts
} = require('../controllers/productController');

const router = express.Router();

// Gender-specific routes (MUST be before /:id to avoid conflicts)
router.get('/women', getWomenProducts);
router.get('/men', getMenProducts);
router.get('/recommendation', getRecommendationProducts);
router.get('/sale', getSaleProducts);

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
