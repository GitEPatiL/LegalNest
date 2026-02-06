const siteConfig = {
    // Company Information
    companyName: 'LegalNest',
    tagline: 'Your Trusted Legal Compliance Partner',

    // Logo Configuration
    logo: {
        text: 'LegalNest',
        url: '/assets/logo.svg',
        alt: 'LegalNest - Legal Compliance Platform',
        favicon: '/favicon.ico',
    },

    // Website Configuration
    websiteUrl: 'https://legalnest.com',
    title: 'LegalNest - Legal Compliance Platform',
    description: 'Comprehensive legal compliance solutions for businesses across India',
    author: 'LegalNest Team',
    keywords: ['legal compliance', 'business law', 'legal services', 'compliance solutions', 'GST registration', 'company incorporation'],

    // Contact Information
    email: 'info@legalnest.com',
    contactNumber: '+91-9876543210',
    whatsappNumber: '+91-9876543210',

    // Social Media
    social: {
        twitter: '@legalnest',
        linkedin: 'company/legalnest',
        facebook: 'legalnest',
        instagram: '@legalnest',
        youtube: 'legalnest',
    },

    // Theme Colors (Yellow + Black Palette)
    themeColors: {
        // Primary Yellow Shades
        primary: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',  // Main yellow
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
            950: '#451a03',
        },
        // Dark/Black Shades
        dark: {
            50: '#f7f7f7',
            100: '#e3e3e3',
            200: '#c8c8c8',
            300: '#a4a4a4',
            400: '#818181',
            500: '#666666',
            600: '#515151',
            700: '#434343',
            800: '#383838',
            900: '#1a1a1a',  // Main dark
            950: '#0a0a0a',  // Deepest black
        },
        // Accent Colors
        accent: {
            yellow: '#fbbf24',
            gold: '#f59e0b',
            lightYellow: '#fde68a',
            darkGray: '#383838',
        },
        // Semantic Colors
        semantic: {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6',
        },
    },

    // Notification Settings
    notifications: {
        enabled: true,
        position: 'top-right', // top-right, top-left, bottom-right, bottom-left
        duration: 5000, // milliseconds
        showCloseButton: true,
        pauseOnHover: true,
        types: {
            success: {
                icon: '✓',
                backgroundColor: '#10b981',
                textColor: '#ffffff',
            },
            error: {
                icon: '✕',
                backgroundColor: '#ef4444',
                textColor: '#ffffff',
            },
            warning: {
                icon: '⚠',
                backgroundColor: '#f59e0b',
                textColor: '#ffffff',
            },
            info: {
                icon: 'ℹ',
                backgroundColor: '#3b82f6',
                textColor: '#ffffff',
            },
        },
    },

    // Live Chat Settings
    liveChat: {
        enabled: true,
        provider: 'whatsapp', // whatsapp, tawk, intercom, custom
        position: 'bottom-right', // bottom-right, bottom-left
        welcomeMessage: 'Hi! How can we help you with your legal compliance needs?',
        offlineMessage: 'We\'re currently offline. Please leave a message and we\'ll get back to you soon.',
        workingHours: {
            enabled: true,
            timezone: 'Asia/Kolkata',
            schedule: {
                monday: { start: '09:00', end: '18:00', available: true },
                tuesday: { start: '09:00', end: '18:00', available: true },
                wednesday: { start: '09:00', end: '18:00', available: true },
                thursday: { start: '09:00', end: '18:00', available: true },
                friday: { start: '09:00', end: '18:00', available: true },
                saturday: { start: '10:00', end: '16:00', available: true },
                sunday: { start: '00:00', end: '00:00', available: false },
            },
        },
        buttonText: 'Chat with us',
        buttonColor: '#f59e0b',
    },

    // Business Hours
    businessHours: {
        timezone: 'Asia/Kolkata',
        openDays: 'Monday - Saturday',
        openHours: '9:00 AM - 6:00 PM',
    },

    // Features
    features: {
        darkMode: true,
        multiLanguage: false,
        blog: true,
        testimonials: true,
        faq: true,
    },
};

/**
 * Get theme color by name
 * @param {string} name - Color name in dot notation (e.g., 'primary.500', 'dark.900', 'accent.yellow')
 * @returns {string} Hex color value
 */
export function getThemeColor(name) {
    const parts = name.split('.');
    let color = siteConfig.themeColors;

    for (const part of parts) {
        if (color && color[part] !== undefined) {
            color = color[part];
        } else {
            console.warn(`Theme color "${name}" not found. Falling back to primary yellow.`);
            return siteConfig.themeColors.primary[500];
        }
    }

    return color;
}

export default siteConfig;
