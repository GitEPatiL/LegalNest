const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
};

class Logger {
    info(message) {
        console.log(`${colors.cyan}[INFO]${colors.reset} ${message}`);
    }

    warn(message) {
        console.log(`${colors.yellow}[WARN]${colors.reset} ${message}`);
    }

    error(message) {
        console.log(`${colors.red}[ERROR]${colors.reset} ${message}`);
    }

    success(message) {
        console.log(`${colors.green}[SUCCESS]${colors.reset} ${message}`);
    }

    debug(message) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`${colors.magenta}[DEBUG]${colors.reset} ${message}`);
        }
    }
}

export default new Logger();
