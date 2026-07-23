const pool = require('../config/db');

// @desc    Get images for a product
// @route   GET /api/images/product/:productId
const getImagesByProduct = async (req, res) => {
    try {
        const [images] = await pool.query(
            'SELECT * FROM PRODUCTS_IMAGES WHERE product_id = ? ORDER BY is_display DESC',
            [req.params.productId]
        );
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add image to product
// @route   POST /api/images
const createImage = async (req, res) => {
    const { product_id, image_url, is_display } = req.body;

    if (!product_id || !image_url) {
        return res.status(400).json({ message: 'product_id and image_url are required' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO PRODUCTS_IMAGES (product_id, image_url, is_display) VALUES (?, ?, ?)',
            [product_id, image_url, is_display || false]
        );
        res.status(201).json({
            image_id: result.insertId,
            product_id, image_url, is_display: is_display || false,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update image
// @route   PUT /api/images/:id
const updateImage = async (req, res) => {
    const { image_url, is_display } = req.body;

    try {
        const [existing] = await pool.query('SELECT * FROM PRODUCTS_IMAGES WHERE image_id = ?', [req.params.id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const img = existing[0];
        const updated = {
            image_url: image_url ?? img.image_url,
            is_display: is_display ?? img.is_display,
        };

        await pool.query(
            'UPDATE PRODUCTS_IMAGES SET image_url = ?, is_display = ? WHERE image_id = ?',
            [updated.image_url, updated.is_display, req.params.id]
        );
        res.json({ image_id: parseInt(req.params.id), ...updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete image
// @route   DELETE /api/images/:id
const deleteImage = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM PRODUCTS_IMAGES WHERE image_id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.json({ message: 'Image deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getImagesByProduct,
    createImage,
    updateImage,
    deleteImage,
};
