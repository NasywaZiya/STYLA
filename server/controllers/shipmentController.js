const pool = require('../config/db');

// @desc    Get shipment by order ID
// @route   GET /api/shipments/order/:orderId
const getShipmentByOrder = async (req, res) => {
    try {
        const [shipments] = await pool.query(
            'SELECT * FROM SHIPMENTS WHERE order_id = ?',
            [req.params.orderId]
        );
        if (shipments.length === 0) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.json(shipments[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update shipment
// @route   PUT /api/shipments/:id
const updateShipment = async (req, res) => {
    const { tracking_number, courier, shipment_status, estimated_arrival } = req.body;
    const validStatuses = ['pending', 'packed', 'shipped', 'in_transit', 'delivered', 'returned'];

    if (shipment_status && !validStatuses.includes(shipment_status)) {
        return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    try {
        const [existing] = await pool.query('SELECT * FROM SHIPMENTS WHERE shipment_id = ?', [req.params.id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Shipment not found' });
        }

        const shipment = existing[0];
        const updated = {
            tracking_number: tracking_number ?? shipment.tracking_number,
            courier: courier ?? shipment.courier,
            shipment_status: shipment_status ?? shipment.shipment_status,
            estimated_arrival: estimated_arrival ?? shipment.estimated_arrival,
        };

        await pool.query(
            'UPDATE SHIPMENTS SET tracking_number = ?, courier = ?, shipment_status = ?, estimated_arrival = ? WHERE shipment_id = ?',
            [updated.tracking_number, updated.courier, updated.shipment_status, updated.estimated_arrival, req.params.id]
        );

        // Sync order status with shipment status
        if (shipment_status === 'shipped') {
            await pool.query('UPDATE ORDERS SET status = ? WHERE order_id = ?', ['shipped', shipment.order_id]);
        } else if (shipment_status === 'delivered') {
            await pool.query('UPDATE ORDERS SET status = ? WHERE order_id = ?', ['completed', shipment.order_id]);
        }

        res.json({ shipment_id: parseInt(req.params.id), ...updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getShipmentByOrder,
    updateShipment,
};
