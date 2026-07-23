const express = require('express');
const { getProfile, updateProfile, getAddresses, getAddressById, createAddress, updateAddress, deleteAddress } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Profile
router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile);

// Addresses
router.route('/addresses')
    .get(protect, getAddresses)
    .post(protect, createAddress);

router.route('/addresses/:id')
    .get(protect, getAddressById)
    .put(protect, updateAddress)
    .delete(protect, deleteAddress);

module.exports = router;
