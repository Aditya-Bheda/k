const Contact = require('../models/Contact');

// @desc    Submit contact inquiry
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res, next) => {
  try {
    const { name, email, phone, requirement } = req.body;

    const contact = await Contact.create({ name, email, phone, requirement });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact leads (with pagination)
// @route   GET /api/contact
// @access  Private (Admin)
const getContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    const filter = {};
    if (status) filter.status = status;

    const total = await Contact.countDocuments(filter);
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Private (Admin)
const updateContactStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(404);
      throw new Error('Contact not found');
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createContact, getContacts, updateContactStatus, deleteContact };
