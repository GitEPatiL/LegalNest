/**
 * API Client for LegalNest Frontend
 * Handles all HTTP requests to the backend API
 */

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Generic API request handler
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;

    const config = {
        method: options.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Submit contact form
 * @param {Object} payload - Contact form data
 */
export async function postContact(payload) {
    return apiRequest('/api/contact', {
        method: 'POST',
        body: payload,
    });
}

/**
 * Submit enquiry form
 * @param {Object} payload - Enquiry form data
 */
export async function postEnquiry(payload) {
    return apiRequest('/api/enquiry', {
        method: 'POST',
        body: payload,
    });
}

/**
 * Get all services
 */
export async function getServices() {
    return apiRequest('/api/services');
}

/**
 * Get service by ID
 * @param {string} id - Service ID
 */
export async function getServiceById(id) {
    return apiRequest(`/api/services/${id}`);
}

/**
 * Health check
 */
export async function checkHealth() {
    return apiRequest('/health');
}
