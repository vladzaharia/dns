/**
 * Record validation functions for polaris-dns
 *
 * Wraps validators from @vladzaharia/dnscontrol-types with
 * configuration-aware behavior (strict/warn/disabled modes).
 */

import type { ZodSchema, ZodError } from "zod";
import {
  validateRecord as baseValidateRecord,
  validateARecord as baseValidateARecord,
  validateAAAARecord as baseValidateAAAARecord,
  validateCnameRecord as baseValidateCnameRecord,
  validateMxRecord as baseValidateMxRecord,
  validateTxtRecord as baseValidateTxtRecord,
  validateCaaRecord as baseValidateCaaRecord,
  validateSrvRecord as baseValidateSrvRecord,
  validateTtl as baseValidateTtl,
  validateIpAddress as baseValidateIpAddress,
  validateDomainName as baseValidateDomainName,
  validateRecordName as baseValidateRecordName,
  validateHostname as baseValidateHostname,
  formatErrors,
  getErrorSummary,
  type ValidationResult,
  type FormattedError,
} from "@vladzaharia/dnscontrol-types";

import { getValidationConfig, logValidationWarning, shouldThrowOnError } from "../config.js";
import { RecordValidationError } from "../errors.js";

// Re-export types and utilities from dnscontrol-types
export type { ValidationResult, FormattedError };
export { formatErrors, getErrorSummary };

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
  result: ValidationResult<T>,
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
  const formattedErrors = result.errors ? formatErrors(result.errors) : [];

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
  const result = baseValidateRecord(schema, data);
  return wrapValidationResult(result, recordType);
}

// =============================================================================
// RECORD VALIDATORS (Config-aware wrappers)
// =============================================================================

export function validateARecord(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(baseValidateARecord(data), "A", (data as { name?: string })?.name);
}

export function validateAAAARecord(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(
    baseValidateAAAARecord(data),
    "AAAA",
    (data as { name?: string })?.name
  );
}

export function validateCnameRecord(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(
    baseValidateCnameRecord(data),
    "CNAME",
    (data as { name?: string })?.name
  );
}

export function validateMxRecord(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(baseValidateMxRecord(data), "MX", (data as { name?: string })?.name);
}

export function validateTxtRecord(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(
    baseValidateTxtRecord(data),
    "TXT",
    (data as { name?: string })?.name
  );
}

export function validateCaaRecord(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(
    baseValidateCaaRecord(data),
    "CAA",
    (data as { name?: string })?.name
  );
}

export function validateSrvRecord(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(
    baseValidateSrvRecord(data),
    "SRV",
    (data as { name?: string })?.name
  );
}

// =============================================================================
// PRIMITIVE VALIDATORS (Config-aware wrappers)
// =============================================================================

export function validateTtl(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(baseValidateTtl(data), "TTL");
}

export function validateIpAddress(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(baseValidateIpAddress(data), "IP Address");
}

export function validateDomainName(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(baseValidateDomainName(data), "Domain Name");
}

export function validateRecordName(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(baseValidateRecordName(data), "Record Name");
}

export function validateHostname(data: unknown): PolarisValidationResult<unknown> {
  return wrapValidationResult(baseValidateHostname(data), "Hostname");
}
