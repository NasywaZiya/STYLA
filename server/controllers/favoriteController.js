const pool = require('../config/db');

// @desc    Get user's favorite products (rich data with joins)
// @route   GET /api/favorites
const getFavorites = async (req, res) => {
    try {
        const [favorites] = await pool.query(`
            SELECT 
                f.favorite_id,
                p.product_id,
                p.product_name,
                p.price,
                c.name AS category,
                (SELECT pi.image_url FROM PRODUCTS_IMAGES pi WHERE pi.product_id = p.product_id ORDER BY pi.is_display DESC LIMIT 1) as image,
                ps.sale_price,
                s.discount
            FROM FAVORITE f
            JOIN PRODUCTS p ON f.product_id = p.product_id
            LEFT JOIN CATEGORIES c ON p.category_id = c.category_id
            LEFT JOIN PRODUCT_SALE ps ON ps.product_id = p.product_id
            LEFT JOIN SALE s ON ps.sale_id = s.sale_id
                AND NOW() BETWEEN s.start_date AND s.end_date
            WHERE f.user_id = ?
            ORDER BY f.created_at DESC
        `, [req.user.userId]);

        // Fetch colors and sizes for each product
        const productIds = favorites.map(f => f.product_id);

        let colorsMap = {};
        let sizesMap = {};

        if (productIds.length > 0) {
            const placeholders = productIds.map(() => '?').join(',');

            const [variants] = await pool.query(`
                SELECT product_id, color_code, size
                FROM VARIANT
                WHERE product_id IN (${placeholders})
            `, productIds);

            for (const v of variants) {
                // Colors
                if (!colorsMap[v.product_id]) colorsMap[v.product_id] = new Set();
                colorsMap[v.product_id].add(v.color_code);

                // Sizes
                if (!sizesMap[v.product_id]) sizesMap[v.product_id] = new Set();
                sizesMap[v.product_id].add(v.size);
            }
        }

        const result = favorites.map(f => ({
            favorite_id: f.favorite_id,
            product_id: f.product_id,
            product_name: f.product_name,
            image: f.image,
            price: f.price,
            sale_price: f.sale_price || null,
            discount: f.discount || null,
            category: f.category,
            colors: colorsMap[f.product_id] ? [...colorsMap[f.product_id]] : [],
            sizes: sizesMap[f.product_id] ? [...sizesMap[f.product_id]] : [],
        }));

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add product to favorites (INSERT IGNORE handles duplicates)
// @route   POST /api/favorites
const addFavorite = async (req, res) => {
    const { product_id } = req.body;

    if (!product_id) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        await pool.query(
            'INSERT IGNORE INTO FAVORITE (user_id, product_id) VALUES (?, ?)',
            [req.user.userId, product_id]
        );

        res.status(201).json({ message: 'Product added to favorites', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove product from favorites
// @route   DELETE /api/favorites/:productId
const removeFavorite = async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        await pool.query(
            'DELETE FROM FAVORITE WHERE user_id = ? AND product_id = ?',
            [req.user.userId, productId]
        );

        res.json({ message: 'Product removed from favorites', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Check if a product is in user's favorites
// @route   GET /api/favorites/status/:productId
const getFavoriteStatus = async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
    }

    try {
        const [rows] = await pool.query(
            'SELECT favorite_id FROM FAVORITE WHERE user_id = ? AND product_id = ?',
            [req.user.userId, productId]
        );

        res.json({ isFavorite: rows.length > 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite,
    getFavoriteStatus,
};
