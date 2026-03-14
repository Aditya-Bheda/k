const { validationResult } = require('express-validator');
const ServiceRequest = require('../models/ServiceRequest');

// @desc    Submit a service inquiry (Corporate Training / Market Development)
// @route   POST /api/service-requests
// @access  Public
const createServiceRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, phone, requirement, serviceType } = req.body;

    const serviceRequest = await ServiceRequest.create({
      name,
      email,
      phone,
      requirement,
      serviceType,
    });

    res.status(201).json({
      success: true,
      message: 'Your service inquiry has been submitted successfully! We will contact you shortly.',
      data: serviceRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all service requests (with pagination & filtering)
// @route   GET /api/service-requests
// @access  Private (Admin)
const getServiceRequests = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { status, serviceType } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (serviceType) filter.serviceType = serviceType;

    const total = await ServiceRequest.countDocuments(filter);
    const serviceRequests = await ServiceRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: serviceRequests.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: serviceRequests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service request status
// @route   PUT /api/service-requests/:id
// @access  Private (Admin)
const updateServiceRequestStatus = async (req, res, next) => {
  try {
    const serviceRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!serviceRequest) {
      res.status(404);
      throw new Error('Service request not found');
    }

    res.status(200).json({
      success: true,
      data: serviceRequest,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service request
// @route   DELETE /api/service-requests/:id
// @access  Private (Admin)
const deleteServiceRequest = async (req, res, next) => {
  try {
    const serviceRequest = await ServiceRequest.findByIdAndDelete(req.params.id);

    if (!serviceRequest) {
      res.status(404);
      throw new Error('Service request not found');
    }

    res.status(200).json({
      success: true,
      message: 'Service request deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createServiceRequest,
  getServiceRequests,
  updateServiceRequestStatus,
  deleteServiceRequest,
};
