/**
 * Safety-Critical Logging Utility
 * Centralizes error reporting and allows for easy integration with monitoring services.
 */

const IS_PRODUCTION = import.meta.env.PROD;

const logger = {
    info: (message, data = {}) => {
        if (!IS_PRODUCTION) {
            console.log(`%c[INFO] ${message}`, 'color: #3b82f6; font-weight: bold;', data);
        }
    },

    warn: (message, data = {}) => {
        console.warn(`%c[WARN] ${message}`, 'color: #f59e0b; font-weight: bold;', {
            ...data,
            timestamp: new Date().toISOString()
        });
    },

    error: (message, error = {}, context = {}) => {
        // In production, this would send to Sentry/LogRocket
        console.error(`%c[CRITICAL] ${message}`, 'color: #ef4444; font-weight: bold;', {
            error: error?.message || error,
            stack: error?.stack,
            ...context,
            timestamp: new Date().toISOString()
        });

        // Add a breadcrumb for future debugging if possible
    },

    emergency: (message, error = {}, context = {}) => {
        // High-priority emergency logging
        console.error(`%c[EMERGENCY] ${message}`, 'background: #ef4444; color: white; font-weight: bold; padding: 2px 4px;', {
            error: error?.message || error,
            ...context,
            timestamp: new Date().toISOString()
        });
    }
};

export default logger;
