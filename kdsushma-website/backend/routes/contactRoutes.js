const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

// Validation rules
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('requirement')
    .optional()
    .isLength({ max: 2000 })
    .withMessage('Requirement cannot exceed 2000 characters'),
];

// Public
router.post('/', contactValidation, createContact);

// Admin protected
router.get('/', protect, getContacts);
router.put('/:id', protect, updateContactStatus);
router.delete('/:id', protect, deleteContact);

module.exports = router;
