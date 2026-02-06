const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiry.controller');
const { validateEnquiry } = require('../middleware/validate');
const rateLimiter = require('../middleware/rateLimit');

// POST /api/enquiry - Submit service enquiry
router.post('/', rateLimiter, validateEnquiry, enquiryController.submitEnquiry);

module.exports = router;
