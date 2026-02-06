const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const { validateContact } = require('../middleware/validate');
const rateLimiter = require('../middleware/rateLimit');

// POST /api/contact - Submit contact form
router.post('/', rateLimiter, validateContact, contactController.submitContact);

module.exports = router;
