/**
 * Simple logger utility
 */
class Logger {
    log(level, message, data = {}) {
        const timestamp = new Date().toISOString();
        const logData = typeof data === 'object' ? JSON.stringify(data) : data;
        console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, logData !== '{}' ? logData : '');
    }

    info(message, data) {
        this.log('info', message, data);
    }

    warn(message, data) {
        this.log('warn', message, data);
    }

    error(message, data) {
        this.log('error', message, data);
    }

    debug(message, data) {
        if (process.env.NODE_ENV === 'development') {
            this.log('debug', message, data);
        }
    }
}

module.exports = new Logger();
