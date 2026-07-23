const pool = require('../config/db');

// @desc    Get all sales
// @route   GET /api/sales
const getSales = async (req, res) => {
    try {
        const [sales] = await pool.query('SELECT * FROM SALE ORDER BY start_date DESC');
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get active sales (currently running)
// @route   GET /api/sales/active
const getActiveSales = async (req, res) => {
    try {
        const [sales] = await pool.query(
            'SELECT * FROM SALE WHERE start_date <= NOW() AND end_date >= NOW()'
        );
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single sale
// @route   GET /api/sales/:id
const getSaleById = async (req, res) => {
    try {
        const [sales] = await pool.query('SELECT * FROM SALE WHERE sale_id = ?', [req.params.id]);
        if (sales.length === 0) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        const sale = sales[0];

        // Get products in this sale
        const [products] = await pool.query(`
            SELECT ps.product_sale_id, ps.sale_price, p.*, c.name as category_name,
            (SELECT image_url FROM PRODUCTS_IMAGES pi WHERE pi.product_id = p.product_id AND pi.is_display = 1 LIMIT 1) as image_url
            FROM PRODUCT_SALE ps
            JOIN PRODUCTS p ON ps.product_id = p.product_id
            LEFT JOIN CATEGORIES c ON p.category_id = c.category_id
            WHERE ps.sale_id = ?
        `, [req.params.id]);
        sale.products = products;

        res.json(sale);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create sale
// @route   POST /api/sales
const createSale = async (req, res) => {
    const { sale_name, discount, start_date, end_date } = req.body;

    if (!sale_name || !discount || !start_date || !end_date) {
        return res.status(400).json({ message: 'All sale fields are required' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO SALE (sale_name, discount, start_date, end_date) VALUES (?, ?, ?, ?)',
            [sale_name, discount, start_date, end_date]
        );
        res.status(201).json({ sale_id: result.insertId, sale_name, discount, start_date, end_date });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update sale
// @route   PUT /api/sales/:id
const updateSale = async (req, res) => {
    const { sale_name, discount, start_date, end_date } = req.body;

    try {
        const [existing] = await pool.query('SELECT * FROM SALE WHERE sale_id = ?', [req.params.id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Sale not found' });
        }

        const sale = existing[0];
        const updated = {
            sale_name: sale_name ?? sale.sale_name,
            discount: discount ?? sale.discount,
            start_date: start_date ?? sale.start_date,
            end_date: end_date ?? sale.end_date,
        };

        await pool.query(
            'UPDATE SALE SET sale_name = ?, discount = ?, start_date = ?, end_date = ? WHERE sale_id = ?',
            [updated.sale_name, updated.discount, updated.start_date, updated.end_date, req.params.id]
        );
        res.json({ sale_id: parseInt(req.params.id), ...updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete sale
// @route   DELETE /api/sales/:id
const deleteSale = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM SALE WHERE sale_id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        res.json({ message: 'Sale deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// =================== PRODUCT SALE (assign products to a sale) ===================

// @desc    Add product to sale
// @route   POST /api/sales/:saleId/products
const addProductToSale = async (req, res) => {
    const { product_id, sale_price } = req.body;

    if (!product_id || !sale_price) {
        return res.status(400).json({ message: 'product_id and sale_price are required' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO PRODUCT_SALE (product_id, sale_id, sale_price) VALUES (?, ?, ?)',
            [product_id, req.params.saleId, sale_price]
        );
        res.status(201).json({ product_sale_id: result.insertId, product_id, sale_id: parseInt(req.params.saleId), sale_price });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove product from sale
// @route   DELETE /api/sales/:saleId/products/:productSaleId
const removeProductFromSale = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM PRODUCT_SALE WHERE product_sale_id = ? AND sale_id = ?',
            [req.params.productSaleId, req.params.saleId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product-Sale link not found' });
        }
        res.json({ message: 'Product removed from sale' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getSales,
    getActiveSales,
    getSaleById,
    createSale,
    updateSale,
    deleteSale,
    addProductToSale,
    removeProductFromSale,
};
