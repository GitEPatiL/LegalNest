const Enquiry = require('../models/Enquiry');
const emailService = require('../services/email.service');
const logger = require('../utils/logger');

/**
 * Submit service enquiry
 * @route POST /api/enquiry
 */
exports.submitEnquiry = async (req, res, next) => {
    try {
        const { name, email, phone, service, city, message } = req.body;

        // Create enquiry record
        const enquiry = await Enquiry.create({
            name,
            email,
            phone,
            service,
            city,
            message,
        });

        // Send email notification
        try {
            await emailService.sendEnquiryNotification(enquiry);
        } catch (emailError) {
            logger.error('Email sending failed:', emailError);
            // Continue even if email fails
        }

        res.status(201).json({
            success: true,
            message: 'Thank you for your enquiry. Our team will contact you shortly.',
            data: {
                id: enquiry._id,
                name: enquiry.name,
                email: enquiry.email,
                service: enquiry.service,
            },
        });
    } catch (error) {
        logger.error('Enquiry submission error:', error);
        next(error);
    }
};
