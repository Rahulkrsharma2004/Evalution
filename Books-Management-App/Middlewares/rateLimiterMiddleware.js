// middlewares/rateLimiterMiddleware.js
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const rateLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS,
  max: process.env.RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests, please try again later.',
});

module.exports = rateLimiter;
