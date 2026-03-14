const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Testimonial message is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
