const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const finalAuthTest = async () => {
  try {
    console.log('Connecting to:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected.');

    const pass = 'admin123';
    const email = 'admin@kdsushma.com';

    let admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      console.log('Admin not found!');
      process.exit(1);
    }

    console.log('Stored Hash:', admin.password);
    const match = await bcrypt.compare(pass, admin.password);
    console.log('Initial Match:', match);

    if (!match) {
      console.log('Fixing hash...');
      admin.password = pass; // Triggers pre-save hook
      await admin.save();
      console.log('Hash fixed and saved.');
      
      const updatedAdmin = await Admin.findOne({ email }).select('+password');
      console.log('New Stored Hash:', updatedAdmin.password);
      const newMatch = await bcrypt.compare(pass, updatedAdmin.password);
      console.log('Match After Fix:', newMatch);
    }

    mongoose.connection.close();
    console.log('TEST COMPLETE');
  } catch (err) {
    console.error('TEST FAILED:', err);
    process.exit(1);
  }
};

finalAuthTest();
