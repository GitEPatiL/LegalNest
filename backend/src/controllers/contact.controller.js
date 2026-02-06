const Contact = require('../models/Contact');
const emailService = require('../services/email.service');
const logger = require('../utils/logger');

/**
 * Submit contact form
 * @route POST /api/contact
 */
exports.submitContact = async (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;

        // Create contact record
        const contact = await Contact.create({
            name,
            email,
            phone,
            message,
        });

        // Send email notification
        try {
            await emailService.sendContactNotification(contact);
        } catch (emailError) {
            logger.error('Email sending failed:', emailError);
            // Continue even if email fails
        }

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us. We will get back to you soon.',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
            },
        });
    } catch (error) {
        logger.error('Contact submission error:', error);
        next(error);
    }
};
