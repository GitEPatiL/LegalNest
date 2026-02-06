import siteConfig from '@/config/siteConfig';

/**
 * Generate metadata for service pages
 */
export function generateServiceMetadata(service) {
    return {
        title: service.seo.title,
        description: service.seo.description,
        openGraph: {
            title: service.seo.title,
            description: service.seo.description,
            type: 'website',
            url: `${siteConfig.websiteUrl}${service.seo.canonical}`,
            siteName: siteConfig.companyName,
        },
        twitter: {
            card: 'summary_large_image',
            title: service.seo.title,
            description: service.seo.description,
        },
        alternates: {
            canonical: service.seo.canonical,
        },
    };
}

/**
 * Generate metadata for city-specific service pages
 */
export function generateCityServiceMetadata(service, city) {
    const cityTitle = `${service.title} in ${city.cityName}`;
    const cityDescription = `${service.seo.description} ${city.seoModifier}`;
    const cityCanonical = `/city/${city.citySlug}/${service.slug}`;

    return {
        title: `${cityTitle} - ${siteConfig.companyName}`,
        description: cityDescription,
        openGraph: {
            title: cityTitle,
            description: cityDescription,
            type: 'website',
            url: `${siteConfig.websiteUrl}${cityCanonical}`,
            siteName: siteConfig.companyName,
        },
        twitter: {
            card: 'summary_large_image',
            title: cityTitle,
            description: cityDescription,
        },
        alternates: {
            canonical: cityCanonical,
        },
    };
}

/**
 * Generate JSON-LD structured data for legal services
 */
export function generateLegalServiceSchema(service, city = null) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: city ? `${service.title} in ${city.cityName}` : service.title,
        description: service.seo.description,
        provider: {
            '@type': 'Organization',
            name: siteConfig.companyName,
            url: siteConfig.websiteUrl,
            logo: `${siteConfig.websiteUrl}${siteConfig.logo.url}`,
            contactPoint: {
                '@type': 'ContactPoint',
                telephone: siteConfig.contactNumber,
                email: siteConfig.email,
                contactType: 'Customer Service',
                availableLanguage: ['English', 'Hindi'],
            },
        },
        url: city
            ? `${siteConfig.websiteUrl}/city/${city.citySlug}/${service.slug}`
            : `${siteConfig.websiteUrl}${service.seo.canonical}`,
    };

    // Add area served for city-specific pages
    if (city) {
        schema.areaServed = {
            '@type': 'City',
            name: city.cityName,
            containedIn: {
                '@type': 'State',
                name: city.state,
            },
        };
    } else {
        schema.areaServed = {
            '@type': 'Country',
            name: 'India',
        };
    }

    return schema;
}

/**
 * Generate Organization schema for website
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'LegalService',
        name: siteConfig.companyName,
        url: siteConfig.websiteUrl,
        logo: `${siteConfig.websiteUrl}${siteConfig.logo.url}`,
        description: siteConfig.tagline,
        telephone: siteConfig.contactNumber,
        email: siteConfig.email,
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN',
        },
        sameAs: Object.values(siteConfig.socialMedia || {}),
    };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteConfig.websiteUrl}${item.url}`,
        })),
    };
}
