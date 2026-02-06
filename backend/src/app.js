import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/env.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './utils/logger.js';

// Import Routes
import contactRoutes from './routes/contact.routes.js';
import enquiryRoutes from './routes/enquiry.routes.js';
import serviceRoutes from './routes/service.routes.js';

const app = express();

// Security Middleware
app.use(helmet());

// CORS Configuration
app.use(cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Request Logging
app.use(morgan('combined', {
    stream: { write: message => logger.info(message.trim()) }
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/services', serviceRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error Handler (must be last)
app.use(errorHandler);

export default app;
