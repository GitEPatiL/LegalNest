const mongoose = require('mongoose');
const { DB_URI } = require('./env');
const logger = require('../utils/logger');

/**
 * Connect to MongoDB Database
 */
async function connectDB() {
    try {
        if (!DB_URI) {
            logger.warn('⚠️  DB_URI not configured. Skipping database connection.');
            return;
        }

        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        logger.info('✅ MongoDB connected successfully');

        mongoose.connection.on('error', (err) => {
            logger.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected');
        });

    } catch (error) {
        logger.error('❌ MongoDB connection failed:', error.message);
        // Don't exit process, allow server to run without DB for development
    }
}

/**
 * Disconnect from MongoDB
 */
async function disconnectDB() {
    try {
        await mongoose.connection.close();
        logger.info('MongoDB disconnected');
    } catch (error) {
        logger.error('Error disconnecting from MongoDB:', error);
    }
}

module.exports = { connectDB, disconnectDB };
