const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// --------------- SECURITY MIDDLEWARE ---------------

// Helmet — set security headers
app.use(helmet());

// CORS — allow frontend origin
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production'
      ? 'https://kdsushma.com'
      : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);

// Rate limiting — prevent brute-force & DDoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again after 15 minutes.',
  },
});
app.use('/api/', apiLimiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes.',
  },
});

// --------------- BODY PARSING ---------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// --------------- LOGGING ---------------
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// --------------- HEALTH CHECK ---------------
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'KDSushma API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// --------------- ROUTES ---------------
app.use('/api/auth', authLimiter, require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/service-requests', require('./routes/serviceRequestRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// --------------- ERROR HANDLING ---------------
app.use(notFound);
app.use(errorHandler);

// --------------- START SERVER ---------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 KDSushma API Server`);
  console.log(`   Environment: ${process.env.NODE_ENV}`);
  console.log(`   Port:        ${PORT}`);
  console.log(`   URL:         http://localhost:${PORT}`);
  console.log(`   Health:      http://localhost:${PORT}/api/health\n`);
});
