import siteConfig from '@/config/siteConfig';

/**
 * Generate sitemap entries
 */
export function generateSitemapEntries(routes) {
    return routes.map((route) => ({
        url: `${siteConfig.url}${route.path}`,
        lastModified: route.lastModified || new Date(),
        changeFrequency: route.changeFrequency || 'weekly',
        priority: route.priority || 0.7,
    }));
}

/**
 * Generate robots.txt content
 */
export function generateRobotsTxt() {
    return `User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap.xml`;
}
