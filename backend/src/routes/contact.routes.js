import express from 'express';
import rateLimiter from '../middleware/rateLimiter.js';
import { validateContact } from '../middleware/validation.js';
import { createContact, getAllContacts } from '../controllers/contact.controller.js';

const router = express.Router();

// POST /api/contact - Create new contact
router.post('/', rateLimiter, validateContact, createContact);

// GET /api/contact - Get all contacts (admin only in production)
router.get('/', getAllContacts);

export default router;
