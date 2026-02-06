import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DATA_DIR = path.resolve(__dirname, '../src/data');
const OUTPUT_DIR = path.resolve(__dirname, '../output');
const BASE_URL = 'https://legalnest.com'; // Update with production URL

// Parse command line arguments
const args = process.argv.slice(2);
const flags = {
    sitemapOnly: args.includes('--sitemap-only'),
    csv: args.includes('--csv'),
    json: args.includes('--json') || !args.includes('--csv'),
    verbose: args.includes('--verbose') || args.includes('-v'),
};

/**
 * Read JSON file
 */
async function readJSON(filename) {
    const filePath = path.join(DATA_DIR, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
}

/**
 * Ensure output directory exists
 */
async function ensureOutputDir() {
    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
    } catch (error) {
        // Directory already exists
    }
}

/**
 * Generate route data for a single page
 */
function generateRoute(type, data) {
    const routes = [];

    switch (type) {
        case 'static':
            routes.push({
                path: data.path,
                title: data.title,
                description: data.description,
                type: 'static',
                priority: data.priority,
                changefreq: data.changefreq,
            });
            break;

        case 'service':
            routes.push({
                path: data.seo.canonical,
                title: data.seo.title,
                description: data.seo.description,
                type: 'service',
                category: data.category,
                subCategory: data.subCategory,
                slug: data.slug,
                priority: 0.8,
                changefreq: 'weekly',
            });
            break;

        case 'city-service':
            routes.push({
                path: `/city/${data.city.citySlug}/${data.service.slug}`,
                title: `${data.service.title} in ${data.city.cityName} - LegalNest`,
                description: `${data.service.seo.description} ${data.city.seoModifier}`,
                type: 'city-service',
                city: data.city.cityName,
                state: data.city.state,
                service: data.service.title,
                category: data.service.category,
                priority: 0.7,
                changefreq: 'weekly',
            });
            break;
    }

    return routes;
}

/**
 * Generate all routes
 */
async function generateAllRoutes() {
    const services = await readJSON('services.json');
    const cities = await readJSON('cities.json');

    const routes = [];
    let count = 0;

    // Static pages
    const staticPages = [
        { path: '/', title: 'Home - LegalNest', description: 'Your Trusted Legal Compliance Partner', priority: 1.0, changefreq: 'daily' },
        { path: '/about-us', title: 'About Us - LegalNest', description: 'Learn about our mission and team', priority: 0.8, changefreq: 'monthly' },
        { path: '/contact-us', title: 'Contact Us - LegalNest', description: 'Get in touch with our experts', priority: 0.8, changefreq: 'monthly' },
        { path: '/services', title: 'Our Services - LegalNest', description: 'Browse our legal and compliance services', priority: 0.9, changefreq: 'weekly' },
        { path: '/blog', title: 'Blog - LegalNest', description: 'Legal insights and updates', priority: 0.7, changefreq: 'weekly' },
        { path: '/city', title: 'Service Locations - LegalNest', description: 'Our service locations across India', priority: 0.7, changefreq: 'monthly' },
    ];

    if (flags.verbose) console.log('📄 Processing static pages...');
    staticPages.forEach(page => {
        routes.push(...generateRoute('static', page));
        count++;
    });

    // Service pages
    if (flags.verbose) console.log('🔧 Processing service pages...');
    services.forEach(service => {
        routes.push(...generateRoute('service', service));
        count++;
        if (flags.verbose && count % 10 === 0) process.stdout.write('.');
    });
    if (flags.verbose) console.log('');

    // City-specific service pages
    if (flags.verbose) console.log('🌍 Processing city-specific pages...');
    let cityCount = 0;
    cities.forEach(city => {
        services.forEach(service => {
            routes.push(...generateRoute('city-service', { city, service }));
            count++;
            cityCount++;
            if (flags.verbose && cityCount % 50 === 0) process.stdout.write('.');
        });
    });
    if (flags.verbose) console.log('');

    return routes;
}

/**
 * Write JSON manifest
 */
async function writeJSON(routes) {
    await ensureOutputDir();
    const outputPath = path.join(OUTPUT_DIR, 'routes-manifest.json');

    const manifest = {
        generated: new Date().toISOString(),
        totalRoutes: routes.length,
        baseUrl: BASE_URL,
        routes: routes,
    };

    await fs.writeFile(outputPath, JSON.stringify(manifest, null, 2), 'utf-8');
    console.log(`✅ JSON manifest written to: ${outputPath}`);
    return outputPath;
}

/**
 * Write CSV using streams for performance
 */
async function writeCSV(routes) {
    await ensureOutputDir();
    const outputPath = path.join(OUTPUT_DIR, 'routes-manifest.csv');
    const stream = createWriteStream(outputPath);

    // Write header
    stream.write('Path,Title,Description,Type,Category,City,State,Priority,Change Frequency\n');

    // Write rows
    routes.forEach(route => {
        const row = [
            route.path,
            `"${route.title}"`,
            `"${route.description}"`,
            route.type,
            route.category || '',
            route.city || '',
            route.state || '',
            route.priority,
            route.changefreq,
        ].join(',');
        stream.write(row + '\n');
    });

    stream.end();

    return new Promise((resolve, reject) => {
        stream.on('finish', () => {
            console.log(`✅ CSV written to: ${outputPath}`);
            resolve(outputPath);
        });
        stream.on('error', reject);
    });
}

/**
 * Print sitemap entries (no file write)
 */
function printSitemapEntries(routes) {
    console.log('\n📋 Sitemap Entries:\n');
    routes.forEach(route => {
        console.log(`${BASE_URL}${route.path}`);
    });
}

/**
 * Print statistics
 */
function printStats(routes) {
    const stats = {
        total: routes.length,
        static: routes.filter(r => r.type === 'static').length,
        service: routes.filter(r => r.type === 'service').length,
        cityService: routes.filter(r => r.type === 'city-service').length,
    };

    console.log('\n📊 Route Statistics:');
    console.log(`   Total Routes: ${stats.total}`);
    console.log(`   - Static Pages: ${stats.static}`);
    console.log(`   - Service Pages: ${stats.service}`);
    console.log(`   - City-Specific Pages: ${stats.cityService}`);

    // Category breakdown
    const categories = {};
    routes.forEach(route => {
        if (route.category) {
            categories[route.category] = (categories[route.category] || 0) + 1;
        }
    });

    console.log('\n📂 By Category:');
    Object.entries(categories).forEach(([cat, count]) => {
        console.log(`   - ${cat}: ${count} pages`);
    });
}

/**
 * Main execution
 */
async function main() {
    console.log('🚀 LegalNest Route Generator\n');

    const startTime = Date.now();

    try {
        // Generate all routes
        const routes = await generateAllRoutes();

        // Output based on flags
        if (flags.sitemapOnly) {
            printSitemapEntries(routes);
        } else {
            if (flags.json) {
                await writeJSON(routes);
            }
            if (flags.csv) {
                await writeCSV(routes);
            }
        }

        // Print statistics
        printStats(routes);

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`\n⏱️  Completed in ${duration}s`);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

// Show usage if --help flag
if (args.includes('--help') || args.includes('-h')) {
    console.log(`
LegalNest Route Generator

Usage:
  node scripts/generatePages.js [options]

Options:
  --json              Generate JSON manifest (default)
  --csv               Generate CSV file
  --sitemap-only      Only print sitemap URLs (no file output)
  --verbose, -v       Show detailed progress
  --help, -h          Show this help message

Examples:
  node scripts/generatePages.js
  node scripts/generatePages.js --csv --verbose
  node scripts/generatePages.js --sitemap-only
  node scripts/generatePages.js --json --csv

Output:
  Files are written to /frontend/output/ directory
  - routes-manifest.json
  - routes-manifest.csv
  `);
    process.exit(0);
}

main();
