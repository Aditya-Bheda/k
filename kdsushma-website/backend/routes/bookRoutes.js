const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

const bookValidation = [
  body('title').trim().notEmpty().withMessage('Book title is required'),
];

// Public
router.get('/', getBooks);

// Admin protected
router.post('/', protect, bookValidation, createBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;
