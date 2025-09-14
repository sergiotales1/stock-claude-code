/**
 * Logging utilities for debugging and monitoring
 */

// Log levels
export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

// Log entry structure
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: unknown;
}

/**
 * Creates a formatted log entry
 */
function createLogEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
  error?: unknown
): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
    error,
  };
}

/**
 * Sanitizes error objects to remove sensitive information
 */
function sanitizeError(error: unknown): unknown {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    };
  }

  // For non-Error objects, return a safe representation
  if (typeof error === 'object' && error !== null) {
    return {
      type: 'unknown_error',
      value: String(error),
    };
  }

  return {
    type: typeof error,
    value: String(error),
  };
}

/**
 * Formats log entry for console output
 */
function formatLogForConsole(entry: LogEntry): string {
  const { level, message, timestamp, context } = entry;
  let logString = `[${timestamp}] ${level}: ${message}`;

  if (context && Object.keys(context).length > 0) {
    logString += ` | Context: ${JSON.stringify(context)}`;
  }

  return logString;
}

/**
 * Base logger class
 */
class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isProduction = process.env.NODE_ENV === 'production';

  /**
   * Log an error with context
   */
  error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    const sanitizedError = error ? sanitizeError(error) : undefined;
    const logEntry = createLogEntry(LogLevel.ERROR, message, context, sanitizedError);

    console.error(formatLogForConsole(logEntry));

    if (sanitizedError) {
      console.error('Error details:', sanitizedError);
    }
  }

  /**
   * Log a warning with context
   */
  warn(message: string, context?: Record<string, unknown>): void {
    const logEntry = createLogEntry(LogLevel.WARN, message, context);
    console.warn(formatLogForConsole(logEntry));
  }

  /**
   * Log an info message with context
   */
  info(message: string, context?: Record<string, unknown>): void {
    const logEntry = createLogEntry(LogLevel.INFO, message, context);
    console.info(formatLogForConsole(logEntry));
  }

  /**
   * Log a debug message (only in development)
   */
  debug(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      const logEntry = createLogEntry(LogLevel.DEBUG, message, context);
      console.debug(formatLogForConsole(logEntry));
    }
  }

  /**
   * Log database operations
   */
  database(operation: string, context?: Record<string, unknown>, error?: unknown): void {
    const message = `Database operation: ${operation}`;

    if (error) {
      this.error(message, error, { ...context, operation });
    } else {
      this.debug(message, { ...context, operation });
    }
  }

  /**
   * Log API requests and responses
   */
  api(method: string, endpoint: string, context?: Record<string, unknown>, error?: unknown): void {
    const message = `API ${method} ${endpoint}`;

    if (error) {
      this.error(message, error, { ...context, method, endpoint });
    } else {
      this.info(message, { ...context, method, endpoint });
    }
  }
}

// Export singleton logger instance
export const logger = new Logger();

// Export specific logging functions for convenience
export const logError = (message: string, error?: unknown, context?: Record<string, unknown>) =>
  logger.error(message, error, context);

export const logWarn = (message: string, context?: Record<string, unknown>) =>
  logger.warn(message, context);

export const logInfo = (message: string, context?: Record<string, unknown>) =>
  logger.info(message, context);

export const logDebug = (message: string, context?: Record<string, unknown>) =>
  logger.debug(message, context);

export const logDatabase = (operation: string, context?: Record<string, unknown>, error?: unknown) =>
  logger.database(operation, context, error);

export const logApi = (method: string, endpoint: string, context?: Record<string, unknown>, error?: unknown) =>
  logger.api(method, endpoint, context, error);