/**
 * Format currency in Indian Rupees
 */
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
}

/**
 * Format date
 */
export function formatDate(date, format = 'short') {
    return new Intl.DateTimeFormat('en-IN', {
        dateStyle: format,
    }).format(new Date(date));
}

/**
 * Slugify text
 */
export function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

/**
 * Truncate text
 */
export function truncate(text, length = 100) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}

/**
 * Search services by title or slug
 * @param {Array} services - Array of service objects from services.json
 * @param {string} query - Search query string
 * @returns {Array} Filtered services matching the query
 */
export function searchServices(services, query) {
    if (!query || query.trim() === '') {
        return services;
    }

    const searchTerm = query.toLowerCase().trim();

    return services.filter((service) => {
        const titleMatch = service.title?.toLowerCase().includes(searchTerm);
        const slugMatch = service.slug?.toLowerCase().includes(searchTerm);
        const categoryMatch = service.category?.toLowerCase().includes(searchTerm);
        const subCategoryMatch = service.subCategory?.toLowerCase().includes(searchTerm);

        return titleMatch || slugMatch || categoryMatch || subCategoryMatch;
    });
}

/**
 * Get service by slug
 * @param {Array} services - Array of service objects
 * @param {string} slug - Service slug to find
 * @returns {Object|null} Service object or null if not found
 */
export function getServiceBySlug(services, slug) {
    return services.find((service) => service.slug === slug) || null;
}

/**
 * Filter services by category
 * @param {Array} services - Array of service objects
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered services
 */
export function filterServicesByCategory(services, category) {
    if (!category) return services;
    return services.filter((service) => service.category === category);
}
