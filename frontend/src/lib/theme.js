import siteConfig, { getThemeColor } from '@/config/siteConfig';

/**
 * Get CSS variable name for a theme color
 * @param {string} name - Color name in dot notation
 * @returns {string} CSS variable reference
 */
export function getThemeColorVar(name) {
    const parts = name.split('.');

    if (parts.length === 1) {
        // Handle semantic colors or accent colors
        if (siteConfig.themeColors.semantic[parts[0]]) {
            return `var(--color-${parts[0]})`;
        }
        if (siteConfig.themeColors.accent[parts[0]]) {
            return `var(--color-accent-${parts[0].replace(/([A-Z])/g, '-$1').toLowerCase()})`;
        }
    }

    if (parts.length === 2) {
        // Handle primary.500 or dark.900 format
        return `var(--color-${parts[0]}-${parts[1]})`;
    }

    return `var(--brand-primary)`;
}

/**
 * Generate inline style object with theme colors
 * @param {Object} colorMap - Object mapping CSS properties to theme color names
 * @returns {Object} Style object
 */
export function getThemeStyles(colorMap) {
    const styles = {};

    for (const [property, colorName] of Object.entries(colorMap)) {
        styles[property] = getThemeColor(colorName);
    }

    return styles;
}

/**
 * Check if live chat is currently available based on working hours
 * @returns {boolean} Whether live chat is available
 */
export function isLiveChatAvailable() {
    if (!siteConfig.liveChat.enabled || !siteConfig.liveChat.workingHours.enabled) {
        return siteConfig.liveChat.enabled;
    }

    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = days[now.getDay()];
    const schedule = siteConfig.liveChat.workingHours.schedule[currentDay];

    if (!schedule || !schedule.available) {
        return false;
    }

    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [startHour, startMin] = schedule.start.split(':').map(Number);
    const [endHour, endMin] = schedule.end.split(':').map(Number);
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    return currentTime >= startTime && currentTime < endTime;
}

/**
 * Get WhatsApp chat URL
 * @param {string} message - Pre-filled message (optional)
 * @returns {string} WhatsApp URL
 */
export function getWhatsAppUrl(message = '') {
    const number = siteConfig.whatsappNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(message || siteConfig.liveChat.welcomeMessage);
    return `https://wa.me/${number}?text=${text}`;
}

/**
 * Get notification configuration for a specific type
 * @param {string} type - Notification type (success, error, warning, info)
 * @returns {Object} Notification configuration
 */
export function getNotificationConfig(type = 'info') {
    const baseConfig = {
        position: siteConfig.notifications.position,
        duration: siteConfig.notifications.duration,
        showCloseButton: siteConfig.notifications.showCloseButton,
        pauseOnHover: siteConfig.notifications.pauseOnHover,
    };

    const typeConfig = siteConfig.notifications.types[type] || siteConfig.notifications.types.info;

    return {
        ...baseConfig,
        ...typeConfig,
    };
}

/**
 * Format contact number for display
 * @param {string} number - Phone number
 * @returns {string} Formatted number
 */
export function formatContactNumber(number) {
    if (!number) return '';

    // Remove all non-digits
    const cleaned = number.replace(/\D/g, '');

    // Format as +91-XXXXX-XXXXX for Indian numbers
    if (cleaned.startsWith('91') && cleaned.length === 12) {
        return `+91-${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }

    return number;
}

export { getThemeColor };
