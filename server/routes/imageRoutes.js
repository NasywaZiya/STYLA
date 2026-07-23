const express = require('express');
const { getImagesByProduct, createImage, updateImage, deleteImage } = require('../controllers/imageController');

const router = express.Router();

router.route('/')
    .post(createImage);

router.route('/product/:productId')
    .get(getImagesByProduct);

router.route('/:id')
    .put(updateImage)
    .delete(deleteImage);

module.exports = router;
