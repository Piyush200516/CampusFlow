export interface LogContext {
  requestId?: string;
  service?: string;
  userId?: string;
  [key: string]: unknown;
}

export interface Logger {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
}

export const createLogger = (service: string): Logger => {
  const write = (level: string, message: string, context: LogContext = {}) => {
    console.log(JSON.stringify({ level, message, service, timestamp: new Date().toISOString(), ...context }));
  };

  return {
    info: (message, context) => write("info", message, context),
    warn: (message, context) => write("warn", message, context),
    error: (message, context) => write("error", message, context),
    debug: (message, context) => write("debug", message, context),
  };
};
