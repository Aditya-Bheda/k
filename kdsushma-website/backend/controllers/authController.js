const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      res.status(401);
      throw new Error('Invalid credentials');
    }

    res.status(200).json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.admin,
  });
};

// @desc    Register admin (first-time setup only)
// @route   POST /api/auth/register
// @access  Public (only if no admin exists)
const registerAdmin = async (req, res, next) => {
  try {
    const adminExists = await Admin.countDocuments();

    if (adminExists > 0) {
      res.status(403);
      throw new Error('Admin already exists. Registration disabled.');
    }

    const { name, email, password } = req.body;

    const admin = await Admin.create({ name, email, password });

    res.status(201).json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginAdmin, getProfile, registerAdmin };
