import Enquiry from '../models/Enquiry.js';
import { getStorageMode, inMemoryStorage } from '../config/db.js';
import emailService from '../services/email.service.js';
import logger from '../utils/logger.js';

export const createEnquiry = async (req, res, next) => {
    try {
        const { name, email, phone, service, details } = req.body;
        const { useInMemory } = getStorageMode();

        let enquiry;
        let enquiryId;

        if (useInMemory) {
            // In-memory storage
            enquiryId = Date.now().toString();
            enquiry = {
                _id: enquiryId,
                name,
                email,
                phone,
                service,
                details,
                status: 'pending',
                createdAt: new Date(),
            };
            inMemoryStorage.enquiries.push(enquiry);
            logger.info(`💾 Enquiry saved to memory: ${enquiryId}`);
        } else {
            // MongoDB storage
            enquiry = new Enquiry({ name, email, phone, service, details });
            await enquiry.save();
            enquiryId = enquiry._id.toString();
            logger.info(`💾 Enquiry saved to DB: ${enquiryId}`);
        }

        // Send email notification
        await emailService.sendEnquiryNotification({ name, email, phone, service, details });

        res.status(201).json({
            success: true,
            message: 'Enquiry received successfully',
            id: enquiryId,
        });
    } catch (error) {
        logger.error(`Enquiry creation error: ${error.message}`);
        next(error);
    }
};

export const getAllEnquiries = async (req, res, next) => {
    try {
        const { useInMemory } = getStorageMode();

        let enquiries;
        if (useInMemory) {
            enquiries = inMemoryStorage.enquiries;
        } else {
            enquiries = await Enquiry.find().sort({ createdAt: -1 });
        }

        res.status(200).json({
            success: true,
            count: enquiries.length,
            data: enquiries,
        });
    } catch (error) {
        logger.error(`Fetch enquiries error: ${error.message}`);
        next(error);
    }
};
