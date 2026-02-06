import siteConfig from '@/config/siteConfig';

/**
 * Generate sitemap entries
 * @param {Array} routes - Array of route objects
 * @returns {Array} Sitemap entries
 */
export function generateSitemapEntries(routes) {
    return routes.map((route) => ({
        url: `${siteConfig.websiteUrl}${route.path}`,
        lastModified: route.lastModified || new Date(),
        changeFrequency: route.changeFrequency || 'weekly',
        priority: route.priority || 0.7,
    }));
}

/**
 * Generate robots.txt content
 * @returns {string} Robots.txt content
 */
export function generateRobotsTxt() {
    return `User-agent: *
Allow: /

Sitemap: ${siteConfig.websiteUrl}/sitemap.xml`;
}
