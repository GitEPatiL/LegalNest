import siteConfig from '@/config/siteConfig';

/**
 * Generate metadata for SEO
 * @param {Object} page - Page-specific metadata overrides
 * @returns {Object} Metadata object for Next.js
 */
export function generateMetadata(page = {}) {
    return {
        title: page.title || siteConfig.title,
        description: page.description || siteConfig.description,
        keywords: page.keywords || siteConfig.keywords.join(', '),
        authors: [{ name: siteConfig.author }],
        openGraph: {
            title: page.title || siteConfig.title,
            description: page.description || siteConfig.description,
            url: `${siteConfig.websiteUrl}${page.path || ''}`,
            siteName: siteConfig.companyName,
            type: 'website',
            images: page.image ? [{ url: page.image }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: page.title || siteConfig.title,
            description: page.description || siteConfig.description,
            images: page.image ? [page.image] : [],
        },
    };
}

/**
 * Generate JSON-LD structured data
 * @param {string} type - Schema.org type
 * @param {Object} data - Additional structured data
 * @returns {Object} JSON-LD object
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

/**
 * Generate organization structured data
 * @returns {Object} Organization JSON-LD
 */
export function generateOrganizationData() {
    return generateStructuredData('Organization', {
        name: siteConfig.companyName,
        url: siteConfig.websiteUrl,
        logo: `${siteConfig.websiteUrl}${siteConfig.logo.url}`,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: siteConfig.contactNumber,
            email: siteConfig.email,
            contactType: 'Customer Service',
        },
        sameAs: [
            `https://twitter.com/${siteConfig.social.twitter}`,
            `https://linkedin.com/${siteConfig.social.linkedin}`,
            `https://facebook.com/${siteConfig.social.facebook}`,
        ],
    });
}
