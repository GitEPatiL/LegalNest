import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import data files
const servicesPath = path.resolve(__dirname, '../src/data/services.json');
const citiesPath = path.resolve(__dirname, '../src/data/cities.json');
const configPath = path.resolve(__dirname, '../src/config/siteConfig.js');

async function generateSitemap() {
    console.log('📍 Generating static sitemap.xml...\n');

    try {
        // Read data files
        const servicesData = await fs.readFile(servicesPath, 'utf-8');
        const citiesData = await fs.readFile(citiesPath, 'utf-8');

        const services = JSON.parse(servicesData);
        const cities = JSON.parse(citiesData);

        const baseUrl = 'https://legalnest.com'; // Update with actual production URL
        const urls = [];

        // Static pages
        const staticPages = [
            { url: '/', priority: 1.0, changefreq: 'daily' },
            { url: '/about-us', priority: 0.8, changefreq: 'monthly' },
            { url: '/contact-us', priority: 0.8, changefreq: 'monthly' },
            { url: '/services', priority: 0.9, changefreq: 'weekly' },
            { url: '/blog', priority: 0.7, changefreq: 'weekly' },
            { url: '/city', priority: 0.7, changefreq: 'monthly' },
        ];

        console.log(`✓ Adding ${staticPages.length} static pages`);
        staticPages.forEach(page => {
            urls.push({
                loc: `${baseUrl}${page.url}`,
                lastmod: new Date().toISOString(),
                changefreq: page.changefreq,
                priority: page.priority,
            });
        });

        // Service pages
        console.log(`✓ Adding ${services.length} service pages`);
        services.forEach(service => {
            urls.push({
                loc: `${baseUrl}${service.seo.canonical}`,
                lastmod: new Date().toISOString(),
                changefreq: 'weekly',
                priority: 0.8,
            });
        });

        // City-specific service pages
        const cityServiceCount = cities.length * services.length;
        console.log(`✓ Adding ${cityServiceCount} city-specific pages (${cities.length} cities × ${services.length} services)`);

        cities.forEach(city => {
            services.forEach(service => {
                urls.push({
                    loc: `${baseUrl}/city/${city.citySlug}/${service.slug}`,
                    lastmod: new Date().toISOString(),
                    changefreq: 'weekly',
                    priority: 0.7,
                });
            });
        });

        // Generate XML
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        urls.forEach(url => {
            xml += '  <url>\n';
            xml += `    <loc>${url.loc}</loc>\n`;
            xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
            xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
            xml += `    <priority>${url.priority}</priority>\n`;
            xml += '  </url>\n';
        });

        xml += '</urlset>';

        // Write to public directory
        const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
        await fs.writeFile(outputPath, xml, 'utf-8');

        console.log(`\n✅ Sitemap generated successfully!`);
        console.log(`   Total URLs: ${urls.length}`);
        console.log(`   Output: ${outputPath}`);
        console.log(`\n📊 Breakdown:`);
        console.log(`   - Static pages: ${staticPages.length}`);
        console.log(`   - Service pages: ${services.length}`);
        console.log(`   - City pages: ${cityServiceCount}`);

    } catch (error) {
        console.error('❌ Error generating sitemap:', error.message);
        process.exit(1);
    }
}

generateSitemap();
