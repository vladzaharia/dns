/**
 * Global type declarations for DNSControl environment
 */

/**
 * Console object for logging
 * Available in DNSControl's JavaScript runtime
 */
declare const console: {
  log(...args: unknown[]): void;
  error(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  info(...args: unknown[]): void;
  debug(...args: unknown[]): void;
};
