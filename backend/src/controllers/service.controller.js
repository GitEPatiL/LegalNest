const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

// Load services from JSON file (placeholder)
const servicesData = [
    {
        id: 'gst-registration',
        title: 'GST Registration',
        description: 'Complete GST registration and compliance services',
        category: 'tax',
    },
    {
        id: 'company-incorporation',
        title: 'Company Incorporation',
        description: 'Business registration and incorporation services',
        category: 'business',
    },
    {
        id: 'trademark-registration',
        title: 'Trademark Registration',
        description: 'Protect your brand with trademark registration',
        category: 'intellectual-property',
    },
];

/**
 * Get all services
 * @route GET /api/services
 */
exports.getAllServices = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            count: servicesData.length,
            data: servicesData,
        });
    } catch (error) {
        logger.error('Get services error:', error);
        next(error);
    }
};

/**
 * Get service by ID
 * @route GET /api/services/:id
 */
exports.getServiceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const service = servicesData.find(s => s.id === id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        logger.error('Get service error:', error);
        next(error);
    }
};
