const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Service = require('../models/Service');
const Testimonial = require('../models/Testimonial');
const Book = require('../models/Book');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // --- Seed Admin ---
    const adminExists = await Admin.countDocuments();
    if (adminExists === 0) {
      await Admin.create({
        name: 'KDSushma Admin',
        email: 'admin@kdsushma.com',
        password: 'admin123456',
      });
      console.log('✅ Admin seeded (email: admin@kdsushma.com / pass: admin123456)');
    } else {
      console.log('ℹ️  Admin already exists, skipping...');
    }

    // --- Seed Services ---
    const servicesExist = await Service.countDocuments();
    if (servicesExist === 0) {
      await Service.insertMany([
        {
          title: 'Export–Import 1-on-1 Consultation',
          description:
            'Get personalized expert guidance tailored to your product, market, and business goals. From documentation to logistics, we cover every aspect of starting and running a successful export-import business.',
          icon: 'FiMessageCircle',
          buttonText: 'Get Started',
          link: '#contact',
          order: 1,
        },
        {
          title: 'Export Startup Mentorship',
          description:
            'A comprehensive mentorship program designed for aspiring exporters. Learn product selection, compliance, buyer identification, and market entry strategies with hands-on support from start to first order.',
          icon: 'FiTarget',
          buttonText: 'Get Started',
          link: '#contact',
          order: 2,
        },
        {
          title: 'Corporate Export Training',
          description:
            'Customized corporate training programs for organizations looking to expand into international markets. Build internal export capabilities with structured workshops and strategic framework development.',
          icon: 'FiUsers',
          buttonText: 'Get Started',
          link: '#contact',
          order: 3,
        },
        {
          title: 'Market Development & Buyer Outreach Strategy',
          description:
            'Strategic market research and buyer outreach services to identify high-potential international markets. We help you craft targeted entry strategies and connect with verified buyers globally.',
          icon: 'FiTrendingUp',
          buttonText: 'Get Started',
          link: '#contact',
          order: 4,
        },
      ]);
      console.log('✅ Services seeded');
    } else {
      console.log('ℹ️  Services already exist, skipping...');
    }

    // --- Seed Testimonials ---
    const testimonialsExist = await Testimonial.countDocuments();
    if (testimonialsExist === 0) {
      await Testimonial.insertMany([
        {
          name: 'Rajesh Patel',
          designation: 'Textile Exporter, Gujarat',
          message:
            "KDSushma's guidance transformed my understanding of international trade. Within 6 months of coaching, I successfully exported my first shipment to the UAE.",
          rating: 5,
        },
        {
          name: 'Sunita Sharma',
          designation: 'Agriculture Export Business Owner',
          message:
            "The Export Startup Mentorship program was exactly what I needed. KDSushma doesn't just teach theory — she walks you through every real-world challenge.",
          rating: 5,
        },
        {
          name: 'Amit Verma',
          designation: 'Director, V-Tech Industries',
          message:
            "Our corporate team attended KDSushma's export training workshop. The strategies she shared helped us enter three new international markets within the year.",
          rating: 5,
        },
        {
          name: 'Priya Nair',
          designation: 'Handicraft Exporter, Kerala',
          message:
            'I was completely new to exports when I approached KDSushma. Her step-by-step guidance on compliance and documentation was invaluable.',
          rating: 5,
        },
        {
          name: 'Deepak Joshi',
          designation: 'CEO, Spice World Exports',
          message:
            'The market development strategy KDSushma developed for our company connected us with buyers we never would have found on our own.',
          rating: 5,
        },
      ]);
      console.log('✅ Testimonials seeded');
    } else {
      console.log('ℹ️  Testimonials already exist, skipping...');
    }

    // --- Seed Books ---
    const booksExist = await Book.countDocuments();
    if (booksExist === 0) {
      await Book.insertMany([
        {
          title: 'Global Fortune – Export Import Guide',
          description:
            'A comprehensive guide covering everything from export documentation to international logistics.',
          image: '/images/book-global-fortune.png',
          purchaseLink: '#contact',
        },
        {
          title: 'Agriculture Export Guide',
          description:
            'Specialized guide for agricultural product exports with market insights and compliance strategies.',
          image: '/images/book-agriculture.png',
          purchaseLink: '#contact',
        },
      ]);
      console.log('✅ Books seeded');
    } else {
      console.log('ℹ️  Books already exist, skipping...');
    }

    console.log('\n🎉 Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedData();
