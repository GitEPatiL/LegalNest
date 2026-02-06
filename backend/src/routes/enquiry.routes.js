import express from 'express';
import rateLimiter from '../middleware/rateLimiter.js';
import { validateEnquiry } from '../middleware/validation.js';
import { createEnquiry, getAllEnquiries } from '../controllers/enquiry.controller.js';

const router = express.Router();

// POST /api/enquiry - Create new enquiry
router.post('/', rateLimiter, validateEnquiry, createEnquiry);

// GET /api/enquiry - Get all enquiries (admin only in production)
router.get('/', getAllEnquiries);

export default router;
