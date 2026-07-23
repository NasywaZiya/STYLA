const pool = require('../config/db');

// @desc    Create new order (Checkout) — fully server-validated
// @route   POST /api/orders
const createOrder = async (req, res) => {
    const { shippingAddress, paymentMethod, shippingOption } = req.body;

    if (!paymentMethod) {
        return res.status(400).json({ message: 'Payment method is required' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // 1. Get the user's cart
        const [carts] = await connection.query(
            'SELECT cart_id FROM CART WHERE user_id = ?',
            [req.user.userId]
        );
        if (carts.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Cart not found' });
        }
        const cartId = carts[0].cart_id;

        // 2. Get cart items with current prices from DB (never trust frontend)
        const [cartItems] = await connection.query(`
            SELECT 
                ci.cart_item_id,
                ci.variant_id,
                ci.quantity,
                v.stock,
                v.color_code,
                v.size,
                p.product_id,
                p.product_name,
                p.price,
                ps.sale_price,
                s.discount
            FROM CART_ITEMS ci
            JOIN VARIANT v ON ci.variant_id = v.variant_id
            JOIN PRODUCTS p ON v.product_id = p.product_id
            LEFT JOIN PRODUCT_SALE ps ON p.product_id = ps.product_id
            LEFT JOIN SALE s ON ps.sale_id = s.sale_id AND s.start_date <= NOW() AND s.end_date >= NOW()
            WHERE ci.cart_id = ?
        `, [cartId]);

        if (cartItems.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // 3. Validate stock for every item
        for (const item of cartItems) {
            if (item.quantity > item.stock) {
                await connection.rollback();
                return res.status(400).json({
                    message: `Insufficient stock for "${item.product_name}" (${item.color_code}/${item.size}). Available: ${item.stock}, Requested: ${item.quantity}`
                });
            }
        }

        // 4. Compute subtotal, discount, and total server-side
        let subtotal = 0;
        let totalDiscount = 0;
        const orderItemsData = cartItems.map(item => {
            const originalPrice = parseFloat(item.price);
            const salePrice = item.sale_price ? parseFloat(item.sale_price) : null;
            const effectivePrice = salePrice || originalPrice;
            const itemDiscount = salePrice ? (originalPrice - salePrice) * item.quantity : 0;

            subtotal += effectivePrice * item.quantity;
            totalDiscount += itemDiscount;

            return {
                product_id: item.product_id,
                variant_id: item.variant_id,
                quantity: item.quantity,
                price: effectivePrice,
            };
        });

        const shippingCost = shippingOption === 'express' ? 25000 : 15000;
        const totalPrice = subtotal + shippingCost;

        // 5. Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        // 6. Create the order
        const [orderResult] = await connection.query(
            'INSERT INTO ORDERS (order_number, user_id, shipping_address, subtotal, shipping_cost, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [orderNumber, req.user.userId, shippingAddress, subtotal, shippingCost, totalPrice, 'pending']
        );
        const orderId = orderResult.insertId;

        // 7. Generate invoice number
        const invoiceNumber = `INV-${Date.now()}-${orderId}`;

        // 8. Insert order items and reduce stock
        for (const item of orderItemsData) {
            await connection.query(
                'INSERT INTO ORDER_DETAILS (order_id, product_id, variant_id, quantity, price) VALUES (?, ?, ?, ?, ?)',
                [orderId, item.product_id, item.variant_id, item.quantity, item.price]
            );
            await connection.query(
                'UPDATE VARIANT SET stock = stock - ? WHERE variant_id = ?',
                [item.quantity, item.variant_id]
            );
        }

        // 9. Create shipment record
        const courier = shippingOption === 'express' ? 'Express' : 'JNE Reguler';
        await connection.query(
            'INSERT INTO SHIPMENTS (order_id, courier, shipment_status) VALUES (?, ?, ?)',
            [orderId, courier, 'pending']
        );

        // 10. Create payment record
        await connection.query(
            'INSERT INTO PAYMENTS (order_id, payment_method, amount, status) VALUES (?, ?, ?, ?)',
            [orderId, paymentMethod, totalPrice, 'pending']
        );

        // 11. Clear cart items
        await connection.query('DELETE FROM CART_ITEMS WHERE cart_id = ?', [cartId]);

        await connection.commit();

        res.status(201).json({
            message: 'Order created successfully',
            order_id: orderId,
            order_number: orderNumber,
            invoice: invoiceNumber,
            status: 'pending',
            subtotal,
            shipping_cost: shippingCost,
            total_discount: totalDiscount,
            total_price: totalPrice,
        });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    } finally {
        connection.release();
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
const getOrders = async (req, res) => {
    try {
        const [orders] = await pool.query(`
            SELECT o.*, 
            (SELECT COUNT(*) FROM ORDER_DETAILS od WHERE od.order_id = o.order_id) as item_count
            FROM ORDERS o 
            WHERE o.user_id = ? 
            ORDER BY o.order_date DESC
        `, [req.user.userId]);
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get order by ID (with details, payment, shipment)
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
    try {
        const [orders] = await pool.query(
            'SELECT * FROM ORDERS WHERE order_id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const order = orders[0];

        // Get order items
        const [details] = await pool.query(`
            SELECT od.*, p.product_name, v.color_code, v.size,
            (SELECT image_url FROM PRODUCTS_IMAGES pi WHERE pi.product_id = p.product_id AND pi.is_display = 1 LIMIT 1) as image_url
            FROM ORDER_DETAILS od
            JOIN PRODUCTS p ON od.product_id = p.product_id
            JOIN VARIANT v ON od.variant_id = v.variant_id
            WHERE od.order_id = ?
        `, [order.order_id]);
        order.items = details;

        // Get payment info
        const [payments] = await pool.query(
            'SELECT * FROM PAYMENTS WHERE order_id = ?',
            [order.order_id]
        );
        order.payment = payments.length > 0 ? payments[0] : null;

        // Get shipment info
        const [shipments] = await pool.query(
            'SELECT * FROM SHIPMENTS WHERE order_id = ?',
            [order.order_id]
        );
        order.shipment = shipments.length > 0 ? shipments[0] : null;

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
    const { status } = req.body;
    const validStatuses = ['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    try {
        const [result] = await pool.query(
            'UPDATE ORDERS SET status = ? WHERE order_id = ?',
            [status, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order status updated', order_id: parseInt(req.params.id), status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Cancel order (restore stock)
// @route   PUT /api/orders/:id/cancel
const cancelOrder = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [orders] = await connection.query(
            'SELECT * FROM ORDERS WHERE order_id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );

        if (orders.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Order not found' });
        }

        const order = orders[0];
        if (order.status !== 'pending' && order.status !== 'paid') {
            await connection.rollback();
            return res.status(400).json({ message: 'Only pending or paid orders can be cancelled' });
        }

        // Restore stock
        const [items] = await connection.query(
            'SELECT variant_id, quantity FROM ORDER_DETAILS WHERE order_id = ?',
            [req.params.id]
        );
        for (const item of items) {
            await connection.query(
                'UPDATE VARIANT SET stock = stock + ? WHERE variant_id = ?',
                [item.quantity, item.variant_id]
            );
        }

        // Update order status
        await connection.query(
            'UPDATE ORDERS SET status = ? WHERE order_id = ?',
            ['cancelled', req.params.id]
        );

        // Update payment status
        await connection.query(
            'UPDATE PAYMENTS SET status = ? WHERE order_id = ?',
            ['refunded', req.params.id]
        );

        await connection.commit();
        res.json({ message: 'Order cancelled successfully' });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    } finally {
        connection.release();
    }
};

// @desc    Track order
// @route   GET /api/orders/:orderNumber/track
const trackOrder = async (req, res) => {
    try {
        const [result] = await pool.query(`
            SELECT o.order_id, o.order_number, o.status as order_status, o.order_date, o.total_price, o.shipping_address, o.shipping_cost, o.subtotal,
                   s.shipment_id, s.tracking_number, s.courier, s.shipment_status, s.estimated_arrival, s.updated_at,
                   p.payment_method, p.status as payment_status
            FROM ORDERS o
            LEFT JOIN SHIPMENTS s ON o.order_id = s.order_id
            LEFT JOIN PAYMENTS p ON o.order_id = p.order_id
            WHERE o.order_number = ?
        `, [req.params.orderNumber]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Tracking information not found' });
        }

        const order = result[0];

        // Fetch products associated with this order
        const [products] = await pool.query(`
            SELECT od.quantity, od.price, 
                   v.color_code, v.size, 
                   pr.product_name, pr.product_id,
                   pi.image_url
            FROM ORDER_DETAILS od
            JOIN VARIANT v ON od.variant_id = v.variant_id
            JOIN PRODUCTS pr ON od.product_id = pr.product_id
            LEFT JOIN PRODUCTS_IMAGES pi ON pr.product_id = pi.product_id AND pi.is_display = 1
            WHERE od.order_id = ?
        `, [order.order_id]);

        order.products = products;

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
    trackOrder,
};
