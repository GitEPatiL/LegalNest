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
