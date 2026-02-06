import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getServices = async (req, res, next) => {
    try {
        // Path to frontend services.json
        const servicesPath = path.resolve(__dirname, '../../../frontend/src/data/services.json');

        const data = await fs.readFile(servicesPath, 'utf-8');
        const services = JSON.parse(data);

        res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });
    } catch (error) {
        logger.error(`Get services error: ${error.message}`);

        if (error.code === 'ENOENT') {
            return res.status(404).json({
                success: false,
                message: 'Services data file not found',
            });
        }

        next(error);
    }
};

export const getServiceBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const servicesPath = path.resolve(__dirname, '../../../frontend/src/data/services.json');

        const data = await fs.readFile(servicesPath, 'utf-8');
        const services = JSON.parse(data);

        const service = services.find(s => s.slug === slug);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found',
            });
        }

        res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        logger.error(`Get service error: ${error.message}`);
        next(error);
    }
};
