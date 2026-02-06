import nodemailer from 'nodemailer';
import config from '../config/env.js';
import logger from '../utils/logger.js';

class EmailService {
    constructor() {
        this.transporter = null;
        this.initialize();
    }

    initialize() {
        if (!config.smtp.user || !config.smtp.pass) {
            logger.warn('⚠️  SMTP credentials not configured. Email service disabled.');
            return;
        }

        // Use createTransport (standard method)
        this.transporter = nodemailer.createTransport({
            host: config.smtp.host,
            port: config.smtp.port,
            secure: false, // Use TLS
            auth: {
                user: config.smtp.user,
                pass: config.smtp.pass,
            },
        });

        logger.info('✅ Email service initialized');
    }

    async sendContactNotification(contactData) {
        if (!this.transporter) {
            logger.warn('📧 Email service not available. Skipping notification.');
            return { success: false, message: 'Email service not configured' };
        }

        try {
            const mailOptions = {
                from: config.smtp.user,
                to: config.smtp.user, // Send to self
                subject: `New Contact Form Submission from ${contactData.name}`,
                html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message}</p>
          <hr>
          <p style="color: gray; font-size: 12px;">Received at: ${new Date().toLocaleString()}</p>
        `,
            };

            const info = await this.transporter.sendMail(mailOptions);
            logger.info(`📧 Email sent: ${info.messageId}`);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            logger.error(`📧 Email send failed: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    async sendEnquiryNotification(enquiryData) {
        if (!this.transporter) {
            logger.warn('📧 Email service not available. Skipping notification.');
            return { success: false, message: 'Email service not configured' };
        }

        try {
            const mailOptions = {
                from: config.smtp.user,
                to: config.smtp.user,
                subject: `New Enquiry for ${enquiryData.service || 'General Service'}`,
                html: `
          <h2>New Enquiry Received</h2>
          <p><strong>Name:</strong> ${enquiryData.name}</p>
          <p><strong>Email:</strong> ${enquiryData.email}</p>
          <p><strong>Phone:</strong> ${enquiryData.phone}</p>
          <p><strong>Service:</strong> ${enquiryData.service || 'Not specified'}</p>
          <p><strong>Details:</strong></p>
          <p>${enquiryData.details || 'No additional details provided'}</p>
          <hr>
          <p style="color: gray; font-size: 12px;">Received at: ${new Date().toLocaleString()}</p>
        `,
            };

            const info = await this.transporter.sendMail(mailOptions);
            logger.info(`📧 Email sent: ${info.messageId}`);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            logger.error(`📧 Email send failed: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
}

export default new EmailService();
