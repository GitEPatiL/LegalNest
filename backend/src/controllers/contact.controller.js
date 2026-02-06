import Contact from '../models/Contact.js';
import { getStorageMode, inMemoryStorage } from '../config/db.js';
import emailService from '../services/email.service.js';
import logger from '../utils/logger.js';

export const createContact = async (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;
        const { useInMemory } = getStorageMode();

        let contact;
        let contactId;

        if (useInMemory) {
            // In-memory storage
            contactId = Date.now().toString();
            contact = {
                _id: contactId,
                name,
                email,
                phone,
                message,
                status: 'new',
                createdAt: new Date(),
            };
            inMemoryStorage.contacts.push(contact);
            logger.info(`💾 Contact saved to memory: ${contactId}`);
        } else {
            // MongoDB storage
            contact = new Contact({ name, email, phone, message });
            await contact.save();
            contactId = contact._id.toString();
            logger.info(`💾 Contact saved to DB: ${contactId}`);
        }

        // Send email notification
        await emailService.sendContactNotification({ name, email, phone, message });

        res.status(201).json({
            success: true,
            message: 'Contact message received successfully',
            id: contactId,
        });
    } catch (error) {
        logger.error(`Contact creation error: ${error.message}`);
        next(error);
    }
};

export const getAllContacts = async (req, res, next) => {
    try {
        const { useInMemory } = getStorageMode();

        let contacts;
        if (useInMemory) {
            contacts = inMemoryStorage.contacts;
        } else {
            contacts = await Contact.find().sort({ createdAt: -1 });
        }

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        logger.error(`Fetch contacts error: ${error.message}`);
        next(error);
    }
};
