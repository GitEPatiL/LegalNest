const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

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

    // Contact form submission
    async postContact(data) {
        return this.request('/api/contact', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Enquiry form submission
    async postEnquiry(data) {
        return this.request('/api/enquiry', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    // Get all services
    async getServices() {
        return this.request('/api/services', {
            method: 'GET',
        });
    }

    // Get service by slug
    async getServiceBySlug(slug) {
        return this.request(`/api/services/${slug}`, {
            method: 'GET',
        });
    }
}

const apiClient = new ApiClient(API_BASE_URL);

export default apiClient;
