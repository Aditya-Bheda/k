const Book = require('../models/Book');

// @desc    Get all active books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create book
// @route   POST /api/books
// @access  Private (Admin)
const createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private (Admin)
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private (Admin)
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      res.status(404);
      throw new Error('Book not found');
    }

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBooks, createBook, updateBook, deleteBook };
