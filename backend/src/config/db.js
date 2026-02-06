import mongoose from 'mongoose';
import logger from '../utils/logger.js';

// In-memory fallback storage
let inMemoryStorage = {
    contacts: [],
    enquiries: [],
};

let isConnected = false;
let useInMemory = false;

const connectDB = async () => {
    const dbUri = process.env.DB_URI;

    if (!dbUri || dbUri === 'mongodb://localhost:27017/legalnest') {
        logger.warn('⚠️  No valid DB_URI provided. Using in-memory storage.');
        useInMemory = true;
        isConnected = true;
        return;
    }

    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        useInMemory = false;
        logger.info(`✅ MongoDB connected successfully`);
    } catch (error) {
        logger.error(`❌ MongoDB connection failed: ${error.message}`);
        logger.warn('⚠️  Falling back to in-memory storage');
        useInMemory = true;
        isConnected = true;
    }
};

const getStorageMode = () => ({
    isConnected,
    useInMemory,
    storage: useInMemory ? inMemoryStorage : null,
});

export { connectDB, getStorageMode, inMemoryStorage };
export default connectDB;
