/**
 * Custom validation error classes for polaris-dns
 *
 * These error classes provide structured error handling for different
 * validation contexts (records, servers, services, configuration).
 */

import type { FormattedError } from "@vladzaharia/dnscontrol-types";

// Extend Error interface to include V8-specific captureStackTrace
declare global {
  interface ErrorConstructor {
    captureStackTrace?(targetObject: object, constructorOpt?: NewableFunction): void;
  }
}

/**
 * Base validation error class
 * All validation errors extend this class for consistent error handling
 */
export class ValidationError extends Error {
  public readonly errors: FormattedError[];
  public readonly context?: string;

  constructor(message: string, errors: FormattedError[], context?: string) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
    this.context = context;

    // Maintains proper stack trace for where error was thrown (V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }

  /**
   * Get a formatted summary of all errors
   */
  getSummary(): string {
    if (this.errors.length === 0) {
      return this.message;
    }

    const errorLines = this.errors.map((e) => `  - ${e.path}: ${e.message} (${e.code})`);
    return `${this.message}\n${errorLines.join("\n")}`;
  }

  /**
   * Convert to a plain object for serialization
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      errors: this.errors,
      context: this.context,
    };
  }
}

/**
 * Error thrown when DNS record validation fails
 */
export class RecordValidationError extends ValidationError {
  public readonly recordType?: string;
  public readonly recordName?: string;

  constructor(message: string, errors: FormattedError[], recordType?: string, recordName?: string) {
    super(message, errors, `record:${recordType ?? "unknown"}`);
    this.name = "RecordValidationError";
    this.recordType = recordType;
    this.recordName = recordName;
  }
}

/**
 * Error thrown when server validation fails
 */
export class ServerValidationError extends ValidationError {
  public readonly serverName?: string;

  constructor(message: string, errors: FormattedError[], serverName?: string) {
    super(message, errors, `server:${serverName ?? "unknown"}`);
    this.name = "ServerValidationError";
    this.serverName = serverName;
  }
}

/**
 * Error thrown when service validation fails
 */
export class ServiceValidationError extends ValidationError {
  public readonly serviceName?: string;

  constructor(message: string, errors: FormattedError[], serviceName?: string) {
    super(message, errors, `service:${serviceName ?? "unknown"}`);
    this.name = "ServiceValidationError";
    this.serviceName = serviceName;
  }
}

/**
 * Error thrown when configuration validation fails
 */
export class ConfigValidationError extends ValidationError {
  public readonly configKey?: string;

  constructor(message: string, errors: FormattedError[], configKey?: string) {
    super(message, errors, `config:${configKey ?? "unknown"}`);
    this.name = "ConfigValidationError";
    this.configKey = configKey;
  }
}

/**
 * Type guard to check if an error is a ValidationError
 */
export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

/**
 * Type guard to check if an error is a RecordValidationError
 */
export function isRecordValidationError(error: unknown): error is RecordValidationError {
  return error instanceof RecordValidationError;
}

/**
 * Type guard to check if an error is a ServerValidationError
 */
export function isServerValidationError(error: unknown): error is ServerValidationError {
  return error instanceof ServerValidationError;
}

/**
 * Type guard to check if an error is a ServiceValidationError
 */
export function isServiceValidationError(error: unknown): error is ServiceValidationError {
  return error instanceof ServiceValidationError;
}

/**
 * Type guard to check if an error is a ConfigValidationError
 */
export function isConfigValidationError(error: unknown): error is ConfigValidationError {
  return error instanceof ConfigValidationError;
}
