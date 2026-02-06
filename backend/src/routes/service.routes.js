import express from 'express';
import { getServices, getServiceBySlug } from '../controllers/service.controller.js';

const router = express.Router();

// GET /api/services - Get all services
router.get('/', getServices);

// GET /api/services/:slug - Get service by slug
router.get('/:slug', getServiceBySlug);

export default router;
