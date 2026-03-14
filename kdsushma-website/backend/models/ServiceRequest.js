const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    requirement: {
      type: String,
      required: [true, 'Requirement details are required'],
      trim: true,
      maxlength: [2000, 'Requirement cannot exceed 2000 characters'],
    },
    serviceType: {
      type: String,
      required: [true, 'Service type is required'],
      enum: {
        values: ['corporate-training', 'market-development'],
        message: 'Service type must be either corporate-training or market-development',
      },
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);
