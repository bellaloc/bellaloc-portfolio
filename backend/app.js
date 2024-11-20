const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));  // Logging HTTP requests
app.use(helmet());  // Adds security-related HTTP headers
app.use(express.json());  // Middleware to parse JSON requests

// Rate Limiting (for basic protection against brute force)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use(limiter);

// Routes
app.use('/api/users', userRoutes);

// Error Handler (always last middleware)
app.use(errorHandler);

module.exports = app;
