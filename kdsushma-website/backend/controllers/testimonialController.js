const Testimonial = require('../models/Testimonial');

// @desc    Get all active testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all testimonials (including inactive)
// @route   GET /api/testimonials/all
// @access  Private (Admin)
const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private (Admin)
const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin)
const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!testimonial) {
      res.status(404);
      throw new Error('Testimonial not found');
    }

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      res.status(404);
      throw new Error('Testimonial not found');
    }

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
