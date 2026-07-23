const pool = require('../config/db');

// @desc    Get payment by order ID
// @route   GET /api/payments/order/:orderId
const getPaymentByOrder = async (req, res) => {
    try {
        const [payments] = await pool.query(
            'SELECT * FROM PAYMENTS WHERE order_id = ?',
            [req.params.orderId]
        );
        if (payments.length === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(payments[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id
const updatePayment = async (req, res) => {
    const { status, transaction_id } = req.body;
    const validStatuses = ['pending', 'paid', 'failed', 'expired', 'refunded'];

    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    try {
        const [existing] = await pool.query('SELECT * FROM PAYMENTS WHERE payment_id = ?', [req.params.id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        const payment = existing[0];
        const updated = {
            status: status ?? payment.status,
            transaction_id: transaction_id ?? payment.transaction_id,
        };

        await pool.query(
            'UPDATE PAYMENTS SET status = ?, transaction_id = ? WHERE payment_id = ?',
            [updated.status, updated.transaction_id, req.params.id]
        );

        // If paid, update order status to 'paid' as well
        if (status === 'paid') {
            await pool.query(
                'UPDATE ORDERS SET status = ? WHERE order_id = ?',
                ['paid', payment.order_id]
            );
        }

        res.json({ payment_id: parseInt(req.params.id), ...updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getPaymentByOrder,
    updatePayment,
};
