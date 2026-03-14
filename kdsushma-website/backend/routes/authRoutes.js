const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { loginAdmin, getProfile, registerAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Validation rules
const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

router.post('/login', loginValidation, loginAdmin);
router.post('/register', registerValidation, registerAdmin);
router.get('/profile', protect, getProfile);

module.exports = router;
