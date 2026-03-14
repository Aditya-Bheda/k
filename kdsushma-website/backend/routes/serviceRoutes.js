const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

const serviceValidation = [
  body('title').trim().notEmpty().withMessage('Service title is required'),
  body('description').trim().notEmpty().withMessage('Service description is required'),
];

// Public
router.get('/', getServices);

// Admin protected
router.post('/', protect, serviceValidation, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
