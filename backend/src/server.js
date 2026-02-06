import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import config from './config/env.js';
import logger from './utils/logger.js';

// Database connection removed in favor of JSON storage

// Start Server
const server = app.listen(config.port, () => {
    logger.info(`🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`);
    logger.info(`📡 API available at http://localhost:${config.port}/api`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
    });
});

process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});
