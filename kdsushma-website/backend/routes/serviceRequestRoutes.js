const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createServiceRequest,
  getServiceRequests,
  updateServiceRequestStatus,
  deleteServiceRequest,
} = require('../controllers/serviceRequestController');
const { protect } = require('../middleware/authMiddleware');

// Validation rules
const serviceRequestValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('requirement')
    .trim()
    .notEmpty()
    .withMessage('Requirement details are required')
    .isLength({ max: 2000 })
    .withMessage('Requirement cannot exceed 2000 characters'),
  body('serviceType')
    .trim()
    .notEmpty()
    .withMessage('Service type is required')
    .isIn(['corporate-training', 'market-development'])
    .withMessage('Service type must be either corporate-training or market-development'),
];

// Public
router.post('/', serviceRequestValidation, createServiceRequest);

// Admin protected
router.get('/', protect, getServiceRequests);
router.put('/:id', protect, updateServiceRequestStatus);
router.delete('/:id', protect, deleteServiceRequest);

module.exports = router;
