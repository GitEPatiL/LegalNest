const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');

// GET /api/services - Get all services
router.get('/', serviceController.getAllServices);

// GET /api/services/:id - Get service by ID
router.get('/:id', serviceController.getServiceById);

module.exports = router;
