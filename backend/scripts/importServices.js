import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple Service model for storing in DB
const ServiceSchema = new mongoose.Schema({
    id: String,
    title: String,
    slug: { type: String, unique: true },
    category: String,
    subCategory: String,
    layoutVariant: String,
    seo: {
        title: String,
        description: String,
        canonical: String,
    },
    contentBlocks: [mongoose.Schema.Types.Mixed],
    createdAt: { type: Date, default: Date.now },
});

const Service = mongoose.model('Service', ServiceSchema);

async function importServices() {
    const dbUri = process.env.DB_URI;

    if (!dbUri) {
        console.log('❌ No DB_URI provided in .env file. Cannot import services.');
        console.log('   Please set DB_URI to a valid MongoDB connection string.');
        process.exit(1);
    }

    try {
        // Connect to MongoDB
        await mongoose.connect(dbUri);
        console.log('✅ Connected to MongoDB');

        // Read services.json
        const servicesPath = path.resolve(__dirname, '../../frontend/src/data/services.json');
        const data = await fs.readFile(servicesPath, 'utf-8');
        const services = JSON.parse(data);

        console.log(`📖 Found ${services.length} services to import`);

        // Clear existing services
        await Service.deleteMany({});
        console.log('🗑️  Cleared existing services');

        // Insert services
        const result = await Service.insertMany(services);
        console.log(`✅ Successfully imported ${result.length} services`);

        // Display sample
        console.log('\nSample services:');
        result.slice(0, 3).forEach(s => {
            console.log(`  - ${s.title} (${s.slug})`);
        });

        mongoose.connection.close();
        console.log('\n✅ Import complete. Database connection closed.');
    } catch (error) {
        console.error('❌ Import failed:', error.message);
        process.exit(1);
    }
}

importServices();
