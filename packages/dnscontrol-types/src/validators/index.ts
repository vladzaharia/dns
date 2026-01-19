/**
 * DNSControl Validation Utilities
 *
 * High-level validation functions for DNSControl configurations.
 *
 * @example
 * ```typescript
 * import { validateRecord, validateDomainConfig } from '@vladzaharia/dnscontrol-types/validators';
 * import { ARecordSchema } from '@vladzaharia/dnscontrol-types/schemas';
 *
 * // Validate a single record
 * const result = validateRecord(ARecordSchema, {
 *   name: '@',
 *   address: '192.0.2.1'
 * });
 *
 * if (result.success) {
 *   console.log('Valid:', result.data);
 * } else {
 *   console.error('Errors:', result.errors);
 * }
 * ```
 *
 * @packageDocumentation
 */

import type { z, ZodError, ZodSchema } from "zod";
import * as schemas from "../schemas/index.js";

// =============================================================================
// VALIDATION RESULT TYPES
// =============================================================================

/**
 * Result of a validation operation
 */
export interface ValidationResult<T> {
  /** Whether validation succeeded */
  success: boolean;
  /** Validated data (only present if success is true) */
  data?: T;
  /** Validation errors (only present if success is false) */
  errors?: ZodError;
}

/**
 * Formatted validation error for display
 */
export interface FormattedError {
  /** Path to the invalid field */
  path: string;
  /** Error message */
  message: string;
  /** Error code */
  code: string;
}

// =============================================================================
// GENERIC VALIDATION FUNCTIONS
// =============================================================================

/**
 * Validate data against a Zod schema
 *
 * @param schema - Zod schema to validate against
 * @param data - Data to validate
 * @returns Validation result with typed data or errors
 *
 * @example
 * ```typescript
 * const result = validateRecord(ARecordSchema, { name: '@', address: '1.2.3.4' });
 * ```
 */
export function validateRecord<T extends ZodSchema>(
  schema: T,
  data: unknown
): ValidationResult<z.infer<T>> {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Format validation errors for display
 *
 * @param errors - Zod validation errors
 * @returns Array of formatted error objects
 */
export function formatErrors(errors: ZodError): FormattedError[] {
  return errors.issues.map((issue) => ({
    path: issue.path.join(".") || "(root)",
    message: issue.message,
    code: issue.code,
  }));
}

/**
 * Get a human-readable error summary
 *
 * @param errors - Zod validation errors
 * @returns Single string summarizing all errors
 */
export function getErrorSummary(errors: ZodError): string {
  const formatted = formatErrors(errors);
  return formatted.map((e) => `${e.path}: ${e.message}`).join("; ");
}

// =============================================================================
// RECORD-SPECIFIC VALIDATORS
// =============================================================================

/**
 * Validate an A record configuration
 */
export function validateARecord(
  data: unknown
): ValidationResult<z.infer<typeof schemas.ARecordSchema>> {
  return validateRecord(schemas.ARecordSchema, data);
}

/**
 * Validate an AAAA record configuration
 */
export function validateAAAARecord(
  data: unknown
): ValidationResult<z.infer<typeof schemas.AAAARecordSchema>> {
  return validateRecord(schemas.AAAARecordSchema, data);
}

/**
 * Validate a CNAME record configuration
 */
export function validateCnameRecord(
  data: unknown
): ValidationResult<z.infer<typeof schemas.CnameRecordSchema>> {
  return validateRecord(schemas.CnameRecordSchema, data);
}

/**
 * Validate an MX record configuration
 */
export function validateMxRecord(
  data: unknown
): ValidationResult<z.infer<typeof schemas.MxRecordSchema>> {
  return validateRecord(schemas.MxRecordSchema, data);
}

/**
 * Validate a TXT record configuration
 */
export function validateTxtRecord(
  data: unknown
): ValidationResult<z.infer<typeof schemas.TxtRecordSchema>> {
  return validateRecord(schemas.TxtRecordSchema, data);
}

/**
 * Validate a CAA record configuration
 */
export function validateCaaRecord(
  data: unknown
): ValidationResult<z.infer<typeof schemas.CaaRecordSchema>> {
  return validateRecord(schemas.CaaRecordSchema, data);
}

/**
 * Validate an SRV record configuration
 */
export function validateSrvRecord(
  data: unknown
): ValidationResult<z.infer<typeof schemas.SrvRecordSchema>> {
  return validateRecord(schemas.SrvRecordSchema, data);
}

/**
 * Validate any DNS record (auto-detects type)
 */
export function validateDnsRecord(
  data: unknown
): ValidationResult<z.infer<typeof schemas.DnsRecordSchema>> {
  return validateRecord(schemas.DnsRecordSchema, data);
}

// =============================================================================
// BUILDER VALIDATORS
// =============================================================================

/**
 * Validate a CAA_BUILDER configuration
 */
export function validateCaaBuilder(
  data: unknown
): ValidationResult<z.infer<typeof schemas.CaaBuilderConfigSchema>> {
  return validateRecord(schemas.CaaBuilderConfigSchema, data);
}

/**
 * Validate a DKIM_BUILDER configuration
 */
export function validateDkimBuilder(
  data: unknown
): ValidationResult<z.infer<typeof schemas.DkimBuilderConfigSchema>> {
  return validateRecord(schemas.DkimBuilderConfigSchema, data);
}

/**
 * Validate a DMARC_BUILDER configuration
 */
export function validateDmarcBuilder(
  data: unknown
): ValidationResult<z.infer<typeof schemas.DmarcBuilderConfigSchema>> {
  return validateRecord(schemas.DmarcBuilderConfigSchema, data);
}

/**
 * Validate an SPF_BUILDER configuration
 */
export function validateSpfBuilder(
  data: unknown
): ValidationResult<z.infer<typeof schemas.SpfBuilderConfigSchema>> {
  return validateRecord(schemas.SpfBuilderConfigSchema, data);
}

/**
 * Validate an M365_BUILDER configuration
 */
export function validateM365Builder(
  data: unknown
): ValidationResult<z.infer<typeof schemas.M365BuilderConfigSchema>> {
  return validateRecord(schemas.M365BuilderConfigSchema, data);
}

// =============================================================================
// DOMAIN CONFIGURATION VALIDATORS
// =============================================================================

/**
 * Validate a domain configuration (D() function input)
 */
export function validateDomainConfig(
  data: unknown
): ValidationResult<z.infer<typeof schemas.DomainConfigSchema>> {
  return validateRecord(schemas.DomainConfigSchema, data);
}

/**
 * Validate a DNS provider configuration
 */
export function validateDnsProviderConfig(
  data: unknown
): ValidationResult<z.infer<typeof schemas.DnsProviderConfigSchema>> {
  return validateRecord(schemas.DnsProviderConfigSchema, data);
}

/**
 * Validate a registrar configuration
 */
export function validateRegistrarConfig(
  data: unknown
): ValidationResult<z.infer<typeof schemas.RegistrarConfigSchema>> {
  return validateRecord(schemas.RegistrarConfigSchema, data);
}

/**
 * Validate a complete DNSControl configuration
 */
export function validateDnsControlConfig(
  data: unknown
): ValidationResult<z.infer<typeof schemas.DnsControlConfigSchema>> {
  return validateRecord(schemas.DnsControlConfigSchema, data);
}

// =============================================================================
// PRIMITIVE VALIDATORS
// =============================================================================

/**
 * Validate a TTL value
 */
export function validateTtl(data: unknown): ValidationResult<z.infer<typeof schemas.TtlSchema>> {
  return validateRecord(schemas.TtlSchema, data);
}

/**
 * Validate an IP address (v4 or v6)
 */
export function validateIpAddress(
  data: unknown
): ValidationResult<z.infer<typeof schemas.IpAddressSchema>> {
  return validateRecord(schemas.IpAddressSchema, data);
}

/**
 * Validate a domain name
 */
export function validateDomainName(
  data: unknown
): ValidationResult<z.infer<typeof schemas.DomainNameSchema>> {
  return validateRecord(schemas.DomainNameSchema, data);
}

/**
 * Validate a record name (subdomain, @, or *)
 */
export function validateRecordName(
  data: unknown
): ValidationResult<z.infer<typeof schemas.RecordNameSchema>> {
  return validateRecord(schemas.RecordNameSchema, data);
}

/**
 * Validate a hostname
 */
export function validateHostname(
  data: unknown
): ValidationResult<z.infer<typeof schemas.HostnameSchema>> {
  return validateRecord(schemas.HostnameSchema, data);
}
