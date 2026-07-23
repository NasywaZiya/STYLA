const pool = require('../config/db');

// =============================================
// GUEST CART (session-based, no auth required)
// =============================================

// Helper: get or create a guest user + cart by sessionId
const getOrCreateGuestCart = async (sessionId) => {
    // Check if a guest user already exists for this session
    const [users] = await pool.query(
        "SELECT user_id FROM USERS WHERE email = ?",
        [`guest_${sessionId}@styla.local`]
    );

    let userId;
    if (users.length > 0) {
        userId = users[0].user_id;
    } else {
        // Create a guest user
        const [result] = await pool.query(
            "INSERT INTO USERS (name, email, password) VALUES (?, ?, ?)",
            ['Guest', `guest_${sessionId}@styla.local`, 'no-password']
        );
        userId = result.insertId;
    }

    // Get or create cart
    const [carts] = await pool.query('SELECT cart_id FROM CART WHERE user_id = ?', [userId]);
    if (carts.length > 0) {
        return { cartId: carts[0].cart_id, userId };
    } else {
        const [result] = await pool.query('INSERT INTO CART (user_id) VALUES (?)', [userId]);
        return { cartId: result.insertId, userId };
    }
};

// @desc    Get guest cart
// @route   GET /api/cart/guest/:sessionId
const getGuestCart = async (req, res) => {
    try {
        const { cartId } = await getOrCreateGuestCart(req.params.sessionId);

        const [items] = await pool.query(`
            SELECT 
                ci.cart_item_id,
                ci.quantity,
                v.variant_id,
                v.color_code,
                v.size,
                v.stock,
                p.product_id,
                p.product_name,
                p.price,
                (SELECT pi.image_url FROM PRODUCTS_IMAGES pi WHERE pi.product_id = p.product_id AND pi.is_display = 1 LIMIT 1) as image,
                ps.sale_price,
                s.discount
            FROM CART_ITEMS ci
            JOIN VARIANT v ON ci.variant_id = v.variant_id
            JOIN PRODUCTS p ON v.product_id = p.product_id
            LEFT JOIN PRODUCT_SALE ps ON p.product_id = ps.product_id
            LEFT JOIN SALE s ON ps.sale_id = s.sale_id AND s.start_date <= NOW() AND s.end_date >= NOW()
            WHERE ci.cart_id = ?
        `, [cartId]);

        const formattedItems = items.map(item => {
            const originalPrice = parseFloat(item.price);
            const salePrice = item.sale_price ? parseFloat(item.sale_price) : null;
            const effectivePrice = salePrice || originalPrice;
            return {
                cart_item_id: item.cart_item_id,
                product_id: item.product_id,
                product_name: item.product_name,
                image: item.image,
                color: item.color_code,
                size: item.size,
                quantity: item.quantity,
                price: originalPrice,
                sale_price: salePrice,
                discount: item.discount ? parseFloat(item.discount) : null,
                effective_price: effectivePrice,
                stock: item.stock,
                subtotal: effectivePrice * item.quantity,
            };
        });

        const total = formattedItems.reduce((sum, item) => sum + item.subtotal, 0);

        res.json({
            cart_id: cartId,
            items: formattedItems,
            total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add item to guest cart
// @route   POST /api/cart/guest/:sessionId
const addToGuestCart = async (req, res) => {
    const { variant_id, quantity } = req.body;

    if (!variant_id || !quantity) {
        return res.status(400).json({ message: 'variant_id and quantity are required' });
    }

    try {
        // Validate stock
        const [variants] = await pool.query('SELECT stock FROM VARIANT WHERE variant_id = ?', [variant_id]);
        if (variants.length === 0) {
            return res.status(404).json({ message: 'Variant not found' });
        }

        const { cartId } = await getOrCreateGuestCart(req.params.sessionId);

        // Check if already in cart
        const [existing] = await pool.query(
            'SELECT cart_item_id, quantity FROM CART_ITEMS WHERE cart_id = ? AND variant_id = ?',
            [cartId, variant_id]
        );

        const currentQty = existing.length > 0 ? existing[0].quantity : 0;
        const newQty = currentQty + quantity;

        if (newQty > variants[0].stock) {
            return res.status(400).json({ message: `Insufficient stock. Available: ${variants[0].stock}, Requested: ${newQty}` });
        }

        if (existing.length > 0) {
            await pool.query(
                'UPDATE CART_ITEMS SET quantity = ? WHERE cart_item_id = ?',
                [newQty, existing[0].cart_item_id]
            );
        } else {
            await pool.query(
                'INSERT INTO CART_ITEMS (cart_id, variant_id, quantity) VALUES (?, ?, ?)',
                [cartId, variant_id, quantity]
            );
        }

        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update guest cart item quantity
// @route   PUT /api/cart/guest/item/:cartItemId
const updateGuestCartItem = async (req, res) => {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
        return res.status(400).json({ message: 'Valid quantity is required' });
    }

    try {
        // Validate stock
        const [items] = await pool.query(`
            SELECT ci.cart_item_id, v.stock 
            FROM CART_ITEMS ci 
            JOIN VARIANT v ON ci.variant_id = v.variant_id 
            WHERE ci.cart_item_id = ?
        `, [req.params.cartItemId]);

        if (items.length === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        if (quantity > items[0].stock) {
            return res.status(400).json({ message: `Insufficient stock. Available: ${items[0].stock}` });
        }

        await pool.query(
            'UPDATE CART_ITEMS SET quantity = ? WHERE cart_item_id = ?',
            [quantity, req.params.cartItemId]
        );

        res.json({ message: 'Cart updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove guest cart item
// @route   DELETE /api/cart/guest/item/:cartItemId
const removeGuestCartItem = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM CART_ITEMS WHERE cart_item_id = ?',
            [req.params.cartItemId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// =============================================
// AUTHENTICATED CART (existing, JWT-protected)
// =============================================

const getOrCreateCart = async (userId) => {
    const [carts] = await pool.query('SELECT cart_id FROM CART WHERE user_id = ?', [userId]);
    if (carts.length > 0) {
        return carts[0].cart_id;
    } else {
        const [result] = await pool.query('INSERT INTO CART (user_id) VALUES (?)', [userId]);
        return result.insertId;
    }
};

// @desc    Get user's cart
// @route   GET /api/cart
const getCart = async (req, res) => {
    try {
        const cartId = await getOrCreateCart(req.user.userId);

        const [items] = await pool.query(`
            SELECT 
                ci.cart_item_id,
                ci.quantity,
                v.variant_id,
                v.color_code,
                v.size,
                v.stock,
                p.product_id,
                p.product_name,
                p.price,
                (SELECT pi.image_url FROM PRODUCTS_IMAGES pi WHERE pi.product_id = p.product_id AND pi.is_display = 1 LIMIT 1) as image,
                ps.sale_price,
                s.discount
            FROM CART_ITEMS ci
            JOIN VARIANT v ON ci.variant_id = v.variant_id
            JOIN PRODUCTS p ON v.product_id = p.product_id
            LEFT JOIN PRODUCT_SALE ps ON p.product_id = ps.product_id
            LEFT JOIN SALE s ON ps.sale_id = s.sale_id AND s.start_date <= NOW() AND s.end_date >= NOW()
            WHERE ci.cart_id = ?
        `, [cartId]);

        const formattedItems = items.map(item => {
            const originalPrice = parseFloat(item.price);
            const salePrice = item.sale_price ? parseFloat(item.sale_price) : null;
            const effectivePrice = salePrice || originalPrice;
            return {
                cart_item_id: item.cart_item_id,
                product_id: item.product_id,
                product_name: item.product_name,
                image: item.image,
                color: item.color_code,
                size: item.size,
                quantity: item.quantity,
                price: originalPrice,
                sale_price: salePrice,
                discount: item.discount ? parseFloat(item.discount) : null,
                effective_price: effectivePrice,
                stock: item.stock,
                subtotal: effectivePrice * item.quantity,
            };
        });

        const total = formattedItems.reduce((sum, item) => sum + item.subtotal, 0);

        res.json({
            cart_id: cartId,
            items: formattedItems,
            total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
const addToCart = async (req, res) => {
    const { variant_id, quantity } = req.body;

    if (!variant_id || !quantity) {
        return res.status(400).json({ message: 'Variant ID and quantity are required' });
    }

    try {
        const [variants] = await pool.query('SELECT stock FROM VARIANT WHERE variant_id = ?', [variant_id]);
        if (variants.length === 0) {
            return res.status(404).json({ message: 'Variant not found' });
        }

        const cartId = await getOrCreateCart(req.user.userId);

        const [existing] = await pool.query(
            'SELECT cart_item_id, quantity FROM CART_ITEMS WHERE cart_id = ? AND variant_id = ?',
            [cartId, variant_id]
        );

        const currentQty = existing.length > 0 ? existing[0].quantity : 0;
        const newQty = currentQty + quantity;

        if (newQty > variants[0].stock) {
            return res.status(400).json({ message: `Insufficient stock. Available: ${variants[0].stock}, Requested: ${newQty}` });
        }

        if (existing.length > 0) {
            await pool.query(
                'UPDATE CART_ITEMS SET quantity = ? WHERE cart_item_id = ?',
                [newQty, existing[0].cart_item_id]
            );
        } else {
            await pool.query(
                'INSERT INTO CART_ITEMS (cart_id, variant_id, quantity) VALUES (?, ?, ?)',
                [cartId, variant_id, quantity]
            );
        }

        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/item/:id
const updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
        return res.status(400).json({ message: 'Valid quantity is required' });
    }

    try {
        const [items] = await pool.query(`
            SELECT ci.cart_item_id, v.stock 
            FROM CART_ITEMS ci 
            JOIN VARIANT v ON ci.variant_id = v.variant_id 
            WHERE ci.cart_item_id = ?
        `, [req.params.id]);

        if (items.length === 0) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        if (quantity > items[0].stock) {
            return res.status(400).json({ message: `Insufficient stock. Available: ${items[0].stock}` });
        }

        await pool.query(
            'UPDATE CART_ITEMS SET quantity = ? WHERE cart_item_id = ?',
            [quantity, req.params.id]
        );

        res.json({ message: 'Cart updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/item/:id
const removeCartItem = async (req, res) => {
    try {
        await pool.query(
            'DELETE FROM CART_ITEMS WHERE cart_item_id = ?',
            [req.params.id]
        );

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    getGuestCart,
    addToGuestCart,
    updateGuestCartItem,
    removeGuestCartItem,
};
