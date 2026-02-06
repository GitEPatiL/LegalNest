import siteConfig from '@/config/siteConfig';

/**
 * Generate metadata for SEO
 */
export function generateMetadata(page) {
    return {
        title: page.title || siteConfig.title,
        description: page.description || siteConfig.description,
        keywords: page.keywords || siteConfig.keywords,
        openGraph: {
            title: page.title || siteConfig.title,
            description: page.description || siteConfig.description,
            url: `${siteConfig.url}${page.path || ''}`,
            siteName: siteConfig.name,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: page.title || siteConfig.title,
            description: page.description || siteConfig.description,
        },
    };
}

/**
 * Generate JSON-LD structured data
 */
export function generateStructuredData(type, data) {
    const baseData = {
        '@context': 'https://schema.org',
        '@type': type,
    };

    return {
        ...baseData,
        ...data,
    };
}
