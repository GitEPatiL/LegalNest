import jsonStorage from '../utils/jsonStorage.js';
import emailService from '../services/email.service.js';
import logger from '../utils/logger.js';

export const createEnquiry = async (req, res, next) => {
    try {
        const { name, email, phone, service, details } = req.body;

        // Save to JSON
        const newEnquiry = await jsonStorage.add('enquiries', {
            name,
            email,
            phone,
            service,
            details,
            status: 'pending'
        });
        logger.info(`💾 Enquiry saved to JSON: ${newEnquiry._id}`);

        // Send Email Notification
        emailService.sendEnquiryNotification(newEnquiry).catch(err => {
            logger.error(`Failed to send enquiry notification: ${err.message}`);
        });

        res.status(201).json({
            success: true,
            message: 'Enquiry received successfully',
            id: newEnquiry._id,
            data: newEnquiry
        });
    } catch (error) {
        logger.error(`Enquiry creation error: ${error.message}`);
        next(error);
    }
};

export const getAllEnquiries = async (req, res, next) => {
    try {
        const enquiries = await jsonStorage.readData('enquiries');

        res.status(200).json({
            success: true,
            count: enquiries.length,
            data: enquiries.reverse(),
        });
    } catch (error) {
        logger.error(`Fetch enquiries error: ${error.message}`);
        next(error);
    }
};
