/**
 * DNS-specific validation schemas
 *
 * These schemas provide validation for DNS-specific values like
 * domain names, hostnames, record names, etc.
 *
 * @packageDocumentation
 */

import { z } from "zod";

// =============================================================================
// DOMAIN NAME VALIDATION
// =============================================================================

/**
 * Validates a DNS label (single component of a domain name)
 * - 1-63 characters
 * - Alphanumeric and hyphens only
 * - Cannot start or end with hyphen
 */
export const DnsLabelSchema = z
  .string()
  .min(1)
  .max(63)
  .regex(/^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)$/, {
    error:
      "DNS label must be 1-63 characters, alphanumeric and hyphens, cannot start or end with hyphen",
  });
export type DnsLabel = z.infer<typeof DnsLabelSchema>;

/**
 * Validates a fully qualified domain name (FQDN)
 * - Total length 1-253 characters
 * - Each label 1-63 characters
 * - May end with a trailing dot
 */
export const FqdnSchema = z
  .string()
  .min(1)
  .max(253)
  .regex(/^(?=.{1,253}$)(?:(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)*(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.?$/, {
    error: "Invalid FQDN format",
  });
export type Fqdn = z.infer<typeof FqdnSchema>;

/**
 * Validates a domain name (may or may not be fully qualified)
 */
export const DomainNameSchema = z
  .string()
  .min(1)
  .max(253)
  .regex(/^(?=.{1,253}$)(?:(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)*(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.?$/, {
    error: "Invalid domain name format",
  });
export type DomainName = z.infer<typeof DomainNameSchema>;

// =============================================================================
// RECORD NAME VALIDATION
// =============================================================================

/**
 * Validates a DNS record name
 * - Can be "@" for apex
 * - Can be "*" for wildcard
 * - Can be a subdomain label or path
 */
export const RecordNameSchema = z.union([
  z.literal("@"),
  z.literal("*"),
  z
    .string()
    .min(1)
    .max(253)
    .regex(/^(?:\*\.)?(?:(?!-)[a-zA-Z0-9_-]{1,63}(?<!-)\.)*(?!-)[a-zA-Z0-9_-]{1,63}(?<!-)$/, {
      error: "Invalid record name format",
    }),
]);
export type RecordName = z.infer<typeof RecordNameSchema>;

/**
 * Validates a hostname (target for CNAME, MX, etc.)
 * Should typically end with a dot for FQDN
 */
export const HostnameSchema = z
  .string()
  .min(1)
  .max(253)
  .regex(/^(?=.{1,253}$)(?:(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)*(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.?$/, {
    error: "Invalid hostname format",
  });
export type Hostname = z.infer<typeof HostnameSchema>;

// =============================================================================
// PORT AND PRIORITY VALIDATION
// =============================================================================

/**
 * Validates a port number (0-65535)
 */
export const PortSchema = z.number().int().min(0).max(65535);
export type Port = z.infer<typeof PortSchema>;

/**
 * Validates a priority value (0-65535, used in MX, SRV records)
 */
export const PrioritySchema = z.number().int().min(0).max(65535);
export type Priority = z.infer<typeof PrioritySchema>;

/**
 * Validates a weight value (0-65535, used in SRV records)
 */
export const WeightSchema = z.number().int().min(0).max(65535);
export type Weight = z.infer<typeof WeightSchema>;

// =============================================================================
// TEXT RECORD VALIDATION
// =============================================================================

/**
 * Validates TXT record content
 * Can be a single string or array of strings
 */
export const TxtContentSchema = z.union([z.string().max(65535), z.array(z.string().max(255))]);
export type TxtContent = z.infer<typeof TxtContentSchema>;

// =============================================================================
// HEX STRING VALIDATION
// =============================================================================

/**
 * Validates a hexadecimal string (used in TLSA, SSHFP, DS records)
 */
export const HexStringSchema = z
  .string()
  .regex(/^[a-fA-F0-9]+$/, { error: "Must be a valid hexadecimal string" });
export type HexString = z.infer<typeof HexStringSchema>;

/**
 * Validates a base64-encoded string (used in DNSKEY, DKIM records)
 * Uses Zod 4's native z.base64() for validation
 */
export const Base64StringSchema = z.base64({ error: "Must be a valid base64 string" });
export type Base64String = z.infer<typeof Base64StringSchema>;
