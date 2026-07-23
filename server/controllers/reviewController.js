const pool = require('../config/db');

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
const getReviewsByProduct = async (req, res) => {
    try {
        const [reviews] = await pool.query(`
            SELECT r.*, u.name as user_name
            FROM REVIEWS r
            JOIN USERS u ON r.user_id = u.user_id
            WHERE r.product_id = ?
            ORDER BY r.created_at DESC
        `, [req.params.productId]);
        res.json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create review
// @route   POST /api/reviews
const createReview = async (req, res) => {
    const { product_id, rating, comment } = req.body;

    if (!product_id || !rating) {
        return res.status(400).json({ message: 'product_id and rating are required' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    try {
        // Check if user already reviewed this product
        const [existing] = await pool.query(
            'SELECT * FROM REVIEWS WHERE user_id = ? AND product_id = ?',
            [req.user.userId, product_id]
        );
        if (existing.length > 0) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }

        const [result] = await pool.query(
            'INSERT INTO REVIEWS (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
            [req.user.userId, product_id, rating, comment || null]
        );

        res.status(201).json({
            review_id: result.insertId,
            user_id: req.user.userId,
            product_id,
            rating,
            comment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
const updateReview = async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const [existing] = await pool.query(
            'SELECT * FROM REVIEWS WHERE review_id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Review not found or not yours' });
        }

        const review = existing[0];
        const updatedRating = rating ?? review.rating;
        const updatedComment = comment ?? review.comment;

        await pool.query(
            'UPDATE REVIEWS SET rating = ?, comment = ? WHERE review_id = ?',
            [updatedRating, updatedComment, req.params.id]
        );

        res.json({ review_id: parseInt(req.params.id), rating: updatedRating, comment: updatedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM REVIEWS WHERE review_id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Review not found or not yours' });
        }
        res.json({ message: 'Review deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getReviewsByProduct,
    createReview,
    updateReview,
    deleteReview,
};
