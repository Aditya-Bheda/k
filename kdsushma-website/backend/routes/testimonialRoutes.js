const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');

const testimonialValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('message').trim().notEmpty().withMessage('Testimonial message is required'),
];

// Public
router.get('/', getTestimonials);

// Admin protected
router.get('/all', protect, getAllTestimonials);
router.post('/', protect, testimonialValidation, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;
