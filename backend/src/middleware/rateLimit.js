const rateLimit = require('express-rate-limit');
const { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } = require('../config/env');

/**
 * Rate limiting middleware
 */
const rateLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW_MS, // 15 minutes by default
    max: RATE_LIMIT_MAX_REQUESTS, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = rateLimiter;
