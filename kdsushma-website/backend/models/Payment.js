const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    razorpayOrderId: {
      type: String,
      required: [true, 'Razorpay order ID is required'],
      unique: true,
    },
    razorpayPaymentId: {
      type: String,
      default: '',
    },
    razorpaySignature: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [1, 'Amount must be at least 1'],
    },
    currency: {
      type: String,
      default: 'INR',
    },
    itemType: {
      type: String,
      required: [true, 'Item type is required'],
      enum: {
        values: ['consultation', 'book'],
        message: 'Item type must be either consultation or book',
      },
    },
    itemName: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, 'Customer email is required'],
      trim: true,
      lowercase: true,
    },
    customerPhone: {
      type: String,
      required: [true, 'Customer phone is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['created', 'paid', 'failed'],
      default: 'created',
    },
    notes: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
