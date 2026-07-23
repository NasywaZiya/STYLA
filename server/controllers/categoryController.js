const pool = require('../config/db');

// @desc    Get all categories
// @route   GET /api/categories
const getCategories = async (req, res) => {
    try {
        const [categories] = await pool.query('SELECT * FROM CATEGORIES ORDER BY name ASC');
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single category
// @route   GET /api/categories/:id
const getCategoryById = async (req, res) => {
    try {
        const [categories] = await pool.query('SELECT * FROM CATEGORIES WHERE category_id = ?', [req.params.id]);
        if (categories.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(categories[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create category
// @route   POST /api/categories
const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }
    try {
        const [result] = await pool.query('INSERT INTO CATEGORIES (name) VALUES (?)', [name]);
        res.status(201).json({ category_id: result.insertId, name });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Category already exists' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update category
// @route   PUT /api/categories/:id
const updateCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
    }
    try {
        const [result] = await pool.query('UPDATE CATEGORIES SET name = ? WHERE category_id = ?', [name, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ category_id: parseInt(req.params.id), name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
const deleteCategory = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM CATEGORIES WHERE category_id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted' });
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ message: 'Cannot delete category that has products assigned' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
