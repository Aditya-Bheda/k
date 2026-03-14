const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createOrder,
  verifyPayment,
  getPayments,
  getPaymentById,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Create order validation
const createOrderValidation = [
  body('amount').isNumeric().withMessage('Amount must be a number').custom((value) => {
    if (value < 1) throw new Error('Amount must be at least ₹1');
    return true;
  }),
  body('itemType')
    .isIn(['consultation', 'book'])
    .withMessage('Item type must be either consultation or book'),
  body('itemName').trim().notEmpty().withMessage('Item name is required'),
  body('customerName').trim().notEmpty().withMessage('Customer name is required'),
  body('customerEmail').isEmail().withMessage('Please enter a valid email'),
  body('customerPhone').trim().notEmpty().withMessage('Phone number is required'),
];

// Public routes
router.post('/create-order', createOrderValidation, createOrder);
router.post('/verify', verifyPayment);

// Admin protected
router.get('/', protect, getPayments);
router.get('/:id', protect, getPaymentById);

module.exports = router;
