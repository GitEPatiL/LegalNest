require('dotenv').config();
const app = require('./app');
const { PORT } = require('./config/env');
const { connectDB } = require('./config/db');
const logger = require('./utils/logger');

// Connect to Database
connectDB();

// Start Server
const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    logger.info(`📡 API available at http://localhost:${PORT}/api`);
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
    logger.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});
