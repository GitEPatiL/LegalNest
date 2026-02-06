import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');

class JsonStorage {
    constructor() {
        this.ensureDataDir();
    }

    async ensureDataDir() {
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
        } catch (error) {
            console.error('Error creating data directory:', error);
        }
    }

    getFilePath(filename) {
        return path.join(DATA_DIR, `${filename}.json`);
    }

    async readData(filename) {
        const filePath = this.getFilePath(filename);
        try {
            await fs.access(filePath);
            const data = await fs.readFile(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                return []; // Return empty array if file doesn't exist
            }
            throw error;
        }
    }

    async writeData(filename, data) {
        const filePath = this.getFilePath(filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    }

    async add(filename, item) {
        const data = await this.readData(filename);
        const newItem = {
            _id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            ...item
        };
        data.push(newItem);
        await this.writeData(filename, data);
        return newItem;
    }
}

export default new JsonStorage();
