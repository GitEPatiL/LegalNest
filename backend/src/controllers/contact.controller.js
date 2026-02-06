import jsonStorage from '../utils/jsonStorage.js';
import emailService from '../services/email.service.js';
import logger from '../utils/logger.js';

export const createContact = async (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;

        // Save to JSON
        const newContact = await jsonStorage.add('contacts', {
            name,
            email,
            phone,
            message,
            status: 'new'
        });
        logger.info(`💾 Contact saved to JSON: ${newContact._id}`);

        // Send Email Notification (Async - don't block response)
        emailService.sendContactNotification(newContact).catch(err => {
            logger.error(`Failed to send contact notification: ${err.message}`);
        });

        res.status(201).json({
            success: true,
            message: 'Contact message received successfully',
            id: newContact._id,
            data: newContact
        });
    } catch (error) {
        logger.error(`Contact creation error: ${error.message}`);
        next(error);
    }
};

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await jsonStorage.readData('contacts');

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts.reverse(), // Newest first
        });
    } catch (error) {
        logger.error(`Fetch contacts error: ${error.message}`);
        next(error);
    }
};
