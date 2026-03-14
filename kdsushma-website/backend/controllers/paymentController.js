const crypto = require('crypto');
const Razorpay = require('razorpay');
const { validationResult } = require('express-validator');
const Payment = require('../models/Payment');

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create a Razorpay order
// @route   POST /api/payments/create-order
// @access  Public
const createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { amount, itemType, itemName, customerName, customerEmail, customerPhone } = req.body;

    // Create Razorpay order (amount is in paise)
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      notes: {
        itemType,
        itemName,
        customerName,
        customerEmail,
        customerPhone,
      },
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    // Save to database
    const payment = await Payment.create({
      razorpayOrderId: razorpayOrder.id,
      amount,
      currency: 'INR',
      itemType,
      itemName,
      customerName,
      customerEmail,
      customerPhone,
      status: 'created',
      notes: options.notes,
    });

    res.status(201).json({
      success: true,
      data: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        paymentId: payment._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payments/verify
// @access  Public
const verifyPayment = async (req, res, next) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification parameters',
      });
    }

    // Verify the signature
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isAuthentic = expectedSignature === razorpaySignature;

    if (isAuthentic) {
      // Update payment record
      const payment = await Payment.findOneAndUpdate(
        { razorpayOrderId },
        {
          razorpayPaymentId,
          razorpaySignature,
          status: 'paid',
        },
        { new: true }
      );

      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Payment record not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Payment verified successfully!',
        data: payment,
      });
    } else {
      // Update payment as failed
      await Payment.findOneAndUpdate(
        { razorpayOrderId },
        { status: 'failed' }
      );

      res.status(400).json({
        success: false,
        message: 'Payment verification failed. Signature mismatch.',
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all payments (admin)
// @route   GET /api/payments
// @access  Private (Admin)
const getPayments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { status, itemType } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (itemType) filter.itemType = itemType;

    const total = await Payment.countDocuments(filter);
    const payments = await Payment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: payments.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single payment by ID
// @route   GET /api/payments/:id
// @access  Private (Admin)
const getPaymentById = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      res.status(404);
      throw new Error('Payment not found');
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, verifyPayment, getPayments, getPaymentById };
