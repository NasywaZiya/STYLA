const pool = require('../config/db');

// @desc    Get variants for a product
// @route   GET /api/variants/product/:productId
const getVariantsByProduct = async (req, res) => {
    try {
        const [variants] = await pool.query('SELECT * FROM VARIANT WHERE product_id = ?', [req.params.productId]);
        res.json(variants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single variant
// @route   GET /api/variants/:id
const getVariantById = async (req, res) => {
    try {
        const [variants] = await pool.query('SELECT * FROM VARIANT WHERE variant_id = ?', [req.params.id]);
        if (variants.length === 0) {
            return res.status(404).json({ message: 'Variant not found' });
        }
        res.json(variants[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create variant
// @route   POST /api/variants
const createVariant = async (req, res) => {
    const { product_id, color_code, size, stock, sku } = req.body;

    if (!product_id || !color_code || !size) {
        return res.status(400).json({ message: 'product_id, color_code, and size are required' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO VARIANT (product_id, color_code, size, stock, sku) VALUES (?, ?, ?, ?, ?)',
            [product_id, color_code, size, stock || 0, sku || null]
        );
        res.status(201).json({
            variant_id: result.insertId,
            product_id, color_code, size, stock: stock || 0, sku
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'SKU already exists' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update variant
// @route   PUT /api/variants/:id
const updateVariant = async (req, res) => {
    const { color_code, size, stock, sku } = req.body;

    try {
        const [existing] = await pool.query('SELECT * FROM VARIANT WHERE variant_id = ?', [req.params.id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Variant not found' });
        }

        const variant = existing[0];
        const updated = {
            color_code: color_code ?? variant.color_code,
            size: size ?? variant.size,
            stock: stock ?? variant.stock,
            sku: sku ?? variant.sku,
        };

        await pool.query(
            'UPDATE VARIANT SET color_code = ?, size = ?, stock = ?, sku = ? WHERE variant_id = ?',
            [updated.color_code, updated.size, updated.stock, updated.sku, req.params.id]
        );
        res.json({ variant_id: parseInt(req.params.id), ...updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete variant
// @route   DELETE /api/variants/:id
const deleteVariant = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM VARIANT WHERE variant_id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Variant not found' });
        }
        res.json({ message: 'Variant deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getVariantsByProduct,
    getVariantById,
    createVariant,
    updateVariant,
    deleteVariant,
};
