import siteConfig from '@/config/siteConfig';

export async function GET() {
    const robotsTxt = `# *
User-agent: *
Allow: /

# Disallow admin paths (if any in future)
# Disallow: /admin

# Sitemap
Sitemap: ${siteConfig.websiteUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1
`;

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400',
        },
    });
}
