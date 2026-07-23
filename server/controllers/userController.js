const pool = require('../config/db');

// @desc    Get user profile
// @route   GET /api/users/profile
const getProfile = async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT user_id, name, email, phone, address, created_at FROM USERS WHERE user_id = ?',
            [req.user.userId]
        );
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(users[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateProfile = async (req, res) => {
    const { name, email, phone, address } = req.body;

    try {
        const [existing] = await pool.query('SELECT * FROM USERS WHERE user_id = ?', [req.user.userId]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = existing[0];
        const updated = {
            name: name ?? user.name,
            email: email ?? user.email,
            phone: phone ?? user.phone,
            address: address ?? user.address,
        };

        await pool.query(
            'UPDATE USERS SET name = ?, email = ?, phone = ?, address = ? WHERE user_id = ?',
            [updated.name, updated.email, updated.phone, updated.address, req.user.userId]
        );

        res.json({ user_id: req.user.userId, ...updated });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email already in use' });
        }
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// =================== USER ADDRESS ===================

// @desc    Get user addresses
// @route   GET /api/users/addresses
const getAddresses = async (req, res) => {
    try {
        const [addresses] = await pool.query(
            'SELECT * FROM USER_ADDRESS WHERE user_id = ? ORDER BY is_default DESC',
            [req.user.userId]
        );
        res.json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single address
// @route   GET /api/users/addresses/:id
const getAddressById = async (req, res) => {
    try {
        const [addresses] = await pool.query(
            'SELECT * FROM USER_ADDRESS WHERE address_id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );
        if (addresses.length === 0) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json(addresses[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create address
// @route   POST /api/users/addresses
const createAddress = async (req, res) => {
    const { receiver_name, phone, address, city, province, postal_code, is_default } = req.body;

    if (!receiver_name || !phone || !address || !city || !province || !postal_code) {
        return res.status(400).json({ message: 'All address fields are required' });
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // If this is set as default, unset the current default
        if (is_default) {
            await connection.query(
                'UPDATE USER_ADDRESS SET is_default = FALSE WHERE user_id = ?',
                [req.user.userId]
            );
        }

        const [result] = await connection.query(
            'INSERT INTO USER_ADDRESS (user_id, receiver_name, phone, address, city, province, postal_code, is_default) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [req.user.userId, receiver_name, phone, address, city, province, postal_code, is_default || false]
        );

        await connection.commit();
        res.status(201).json({
            address_id: result.insertId,
            user_id: req.user.userId,
            receiver_name, phone, address, city, province, postal_code, is_default: is_default || false,
        });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    } finally {
        connection.release();
    }
};

// @desc    Update address
// @route   PUT /api/users/addresses/:id
const updateAddress = async (req, res) => {
    const { receiver_name, phone, address, city, province, postal_code, is_default } = req.body;

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [existing] = await connection.query(
            'SELECT * FROM USER_ADDRESS WHERE address_id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );
        if (existing.length === 0) {
            await connection.rollback();
            return res.status(404).json({ message: 'Address not found' });
        }

        const addr = existing[0];
        const updated = {
            receiver_name: receiver_name ?? addr.receiver_name,
            phone: phone ?? addr.phone,
            address: address ?? addr.address,
            city: city ?? addr.city,
            province: province ?? addr.province,
            postal_code: postal_code ?? addr.postal_code,
            is_default: is_default ?? addr.is_default,
        };

        // If setting as default, unset the current one first
        if (is_default) {
            await connection.query(
                'UPDATE USER_ADDRESS SET is_default = FALSE WHERE user_id = ?',
                [req.user.userId]
            );
        }

        await connection.query(
            'UPDATE USER_ADDRESS SET receiver_name = ?, phone = ?, address = ?, city = ?, province = ?, postal_code = ?, is_default = ? WHERE address_id = ?',
            [updated.receiver_name, updated.phone, updated.address, updated.city, updated.province, updated.postal_code, updated.is_default, req.params.id]
        );

        await connection.commit();
        res.json({ address_id: parseInt(req.params.id), ...updated });
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    } finally {
        connection.release();
    }
};

// @desc    Delete address
// @route   DELETE /api/users/addresses/:id
const deleteAddress = async (req, res) => {
    try {
        const [result] = await pool.query(
            'DELETE FROM USER_ADDRESS WHERE address_id = ? AND user_id = ?',
            [req.params.id, req.user.userId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json({ message: 'Address deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
};
