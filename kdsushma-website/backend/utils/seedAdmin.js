const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
  try {
    console.log('Admin Model:', typeof Admin);
    console.log('Connecting to:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Success: Connected to MongoDB.');

    const adminEmail = 'admin@kdsushma.com';
    const adminData = {
      name: 'KDSushma Admin',
      email: adminEmail,
      password: 'admin123',
    };

    // Delete existing to force recreation and hook trigger
    await Admin.deleteOne({ email: adminEmail });
    const admin = await Admin.create(adminData);

    console.log('Admin user recreated and hashed:', admin.email);
    mongoose.connection.close();
  } catch (err) {
    console.error('SEED ERROR:', err.message);
    if (err.errors) {
      Object.keys(err.errors).forEach(key => {
        console.error(`- ${key}: ${err.errors[key].message}`);
      });
    }
    process.exit(1);
  }
};

seedAdmin();
