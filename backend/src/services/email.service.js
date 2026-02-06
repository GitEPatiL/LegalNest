const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = require('../config/env');
const logger = require('../utils/logger');

/**
 * Create email transporter
 */
const createTransporter = () => {
    if (!SMTP_USER || !SMTP_PASS) {
        logger.warn('⚠️  SMTP credentials not configured. Email sending disabled.');
        return null;
    }

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });
};

/**
 * Send contact form notification email
 */
async function sendContactNotification(contact) {
    const transporter = createTransporter();
    if (!transporter) return;

    const mailOptions = {
        from: `"LegalNest" <${SMTP_USER}>`,
        to: SMTP_USER, // Send to admin
        subject: `New Contact Form Submission - ${contact.name}`,
        html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message}</p>
      <hr>
      <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Contact notification sent for: ${contact.email}`);
    } catch (error) {
        logger.error('Failed to send contact notification:', error);
        throw error;
    }
}

/**
 * Send enquiry notification email
 */
async function sendEnquiryNotification(enquiry) {
    const transporter = createTransporter();
    if (!transporter) return;

    const mailOptions = {
        from: `"LegalNest" <${SMTP_USER}>`,
        to: SMTP_USER, // Send to admin
        subject: `New Service Enquiry - ${enquiry.service}`,
        html: `
      <h2>New Service Enquiry</h2>
      <p><strong>Name:</strong> ${enquiry.name}</p>
      <p><strong>Email:</strong> ${enquiry.email}</p>
      <p><strong>Phone:</strong> ${enquiry.phone}</p>
      <p><strong>Service:</strong> ${enquiry.service}</p>
      <p><strong>City:</strong> ${enquiry.city || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${enquiry.message || 'N/A'}</p>
      <hr>
      <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Enquiry notification sent for: ${enquiry.email}`);
    } catch (error) {
        logger.error('Failed to send enquiry notification:', error);
        throw error;
    }
}

module.exports = {
    sendContactNotification,
    sendEnquiryNotification,
};
