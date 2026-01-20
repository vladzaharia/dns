/**
 * Record validation functions for polaris-dns
 *
 * Wraps validators from @vladzaharia/dnscontrol-types with
 * configuration-aware behavior (strict/warn/disabled modes).
 */

import type { ZodSchema, ZodError } from "zod";
import * as dnscontrolTypes from "@vladzaharia/dnscontrol-types";

import { getValidationConfig, logValidationWarning, shouldThrowOnError } from "../config.js";
import { RecordValidationError } from "../errors.js";

// Re-export types and utilities from dnscontrol-types
export type ValidationResult<T> = dnscontrolTypes.ValidationResult<T>;
export type FormattedError = dnscontrolTypes.FormattedError;
export const formatErrors = dnscontrolTypes.formatErrors;
export const getErrorSummary = dnscontrolTypes.getErrorSummary;

/**
 * Polaris-specific validation result that includes formatted errors
 */
export interface PolarisValidationResult<T> {
  success: boolean;
  data?: T;
  errors: FormattedError[];
  zodErrors?: ZodError;
}

/**
 * Wrap a validation result with config-aware behavior
 */
function wrapValidationResult<T>(
  result: { success: boolean; data?: T; errors?: ZodError },
  recordType?: string,
  recordName?: string
): PolarisValidationResult<T> {
  const config = getValidationConfig();

  // If validation is disabled, always return success
  if (config.mode === "disabled") {
    return {
      success: true,
      data: result.data,
      errors: [],
    };
  }

  // If validation succeeded, return as-is
  if (result.success) {
    return {
      success: true,
      data: result.data,
      errors: [],
    };
  }

  // Validation failed - format errors
  const formattedErrors: FormattedError[] = result.errors
    ? dnscontrolTypes.formatErrors(result.errors)
    : [];

  // In warn mode, log and return success with errors attached
  if (config.mode === "warn") {
    logValidationWarning(`${recordType ?? "Record"} validation failed:`, formattedErrors);
    return {
      success: true,
      data: result.data,
      errors: formattedErrors,
      zodErrors: result.errors,
    };
  }

  // In strict mode, throw or return failure
  if (shouldThrowOnError()) {
    throw new RecordValidationError(
      `${recordType ?? "Record"} validation failed`,
      formattedErrors,
      recordType,
      recordName
    );
  }

  return {
    success: false,
    errors: formattedErrors,
    zodErrors: result.errors,
  };
}

/**
 * Validate data against a schema with config-aware behavior
 */
export function validateWithConfig<T>(
  schema: ZodSchema<T>,
  data: unknown,
  recordType?: string
): PolarisValidationResult<T> {
  const result = dnscontrolTypes.validateRecord(schema, data) as {
    success: boolean;
    data?: T;
    errors?: ZodError;
  };
  return wrapValidationResult(result, recordType);
}

// =============================================================================
// RECORD VALIDATORS (Config-aware wrappers)
// =============================================================================

export function validateARecord(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateARecord(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "A", (data as { name?: string })?.name);
}

export function validateAAAARecord(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateAAAARecord(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "AAAA", (data as { name?: string })?.name);
}

export function validateCnameRecord(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateCnameRecord(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "CNAME", (data as { name?: string })?.name);
}

export function validateMxRecord(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateMxRecord(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "MX", (data as { name?: string })?.name);
}

export function validateTxtRecord(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateTxtRecord(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "TXT", (data as { name?: string })?.name);
}

export function validateCaaRecord(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateCaaRecord(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "CAA", (data as { name?: string })?.name);
}

export function validateSrvRecord(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateSrvRecord(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "SRV", (data as { name?: string })?.name);
}

// =============================================================================
// PRIMITIVE VALIDATORS (Config-aware wrappers)
// =============================================================================

export function validateTtl(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateTtl(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "TTL");
}

export function validateIpAddress(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateIpAddress(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "IP Address");
}

export function validateDomainName(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateDomainName(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "Domain Name");
}

export function validateRecordName(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateRecordName(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "Record Name");
}

export function validateHostname(data: unknown): PolarisValidationResult<unknown> {
  const result = dnscontrolTypes.validateHostname(data) as {
    success: boolean;
    data?: unknown;
    errors?: ZodError;
  };
  return wrapValidationResult(result, "Hostname");
}
