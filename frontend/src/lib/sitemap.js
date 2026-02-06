import { getAllServices, getCities } from './dataLoader';
import siteConfig from '@/config/siteConfig';

/**
 * Generate complete sitemap URLs
 */
export async function generateSitemapUrls() {
    const services = await getAllServices();
    const cities = await getCities();
    const baseUrl = siteConfig.websiteUrl;

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

    staticPages.forEach(page => {
        urls.push({
            loc: `${baseUrl}${page.url}`,
            lastmod: new Date().toISOString(),
            changefreq: page.changefreq,
            priority: page.priority,
        });
    });

    // Service pages
    services.forEach(service => {
        urls.push({
            loc: `${baseUrl}${service.seo.canonical}`,
            lastmod: new Date().toISOString(),
            changefreq: 'weekly',
            priority: 0.8,
        });
    });

    // City-specific service pages
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

    return urls;
}

/**
 * Generate XML sitemap string
 */
export async function generateSitemapXML() {
    const urls = await generateSitemapUrls();

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

    return xml;
}
