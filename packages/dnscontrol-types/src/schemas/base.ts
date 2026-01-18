/**
 * Base Zod schemas for DNSControl primitive types
 *
 * These schemas mirror the TypeScript types defined in base.d.ts
 * and provide runtime validation for DNSControl configurations.
 *
 * @packageDocumentation
 */

import { z } from 'zod';

// =============================================================================
// PRIMITIVE TYPES
// =============================================================================

/**
 * TTL value schema - can be a number (seconds) or a string duration
 * @example 300, "5m", "1h", "1d"
 */
export const TtlSchema = z.union([
  z.number().int().min(0).max(2147483647),
  z.string().regex(/^\d+[smhdw]?$/, { error: 'Invalid TTL format. Use number or duration string (e.g., "300", "5m", "1h")' }),
]);
export type Ttl = z.infer<typeof TtlSchema>;

/**
 * IPv4 address schema
 * Uses Zod 4's native z.ipv4() for validation
 */
export const Ipv4AddressSchema = z.ipv4({ error: 'Invalid IPv4 address' });
export type Ipv4Address = z.infer<typeof Ipv4AddressSchema>;

/**
 * IPv6 address schema
 * Uses Zod 4's native z.ipv6() for validation
 */
export const Ipv6AddressSchema = z.ipv6({ error: 'Invalid IPv6 address' });
export type Ipv6Address = z.infer<typeof Ipv6AddressSchema>;

/**
 * IP address schema - can be IPv4, IPv6, or a numeric value from IP()
 */
export const IpAddressSchema = z.union([
  Ipv4AddressSchema,
  Ipv6AddressSchema,
  z.number(),
]);
export type IpAddress = z.infer<typeof IpAddressSchema>;

// =============================================================================
// DNSSEC TYPES
// =============================================================================

/**
 * DNSSEC algorithm numbers
 * @see https://www.iana.org/assignments/dns-sec-alg-numbers/dns-sec-alg-numbers.xhtml
 */
export const DnssecAlgorithmSchema = z.union([
  z.literal(1),   // RSA/MD5 (deprecated)
  z.literal(3),   // DSA/SHA1 (deprecated)
  z.literal(5),   // RSA/SHA-1
  z.literal(6),   // DSA-NSEC3-SHA1
  z.literal(7),   // RSASHA1-NSEC3-SHA1
  z.literal(8),   // RSA/SHA-256
  z.literal(10),  // RSA/SHA-512
  z.literal(12),  // GOST R 34.10-2001
  z.literal(13),  // ECDSA Curve P-256 with SHA-256
  z.literal(14),  // ECDSA Curve P-384 with SHA-384
  z.literal(15),  // Ed25519
  z.literal(16),  // Ed448
]);
export type DnssecAlgorithm = z.infer<typeof DnssecAlgorithmSchema>;

/**
 * DNSSEC digest types
 */
export const DnssecDigestTypeSchema = z.union([
  z.literal(1),  // SHA-1
  z.literal(2),  // SHA-256
  z.literal(4),  // SHA-384
]);
export type DnssecDigestType = z.infer<typeof DnssecDigestTypeSchema>;

// =============================================================================
// CAA TYPES
// =============================================================================

/**
 * CAA record tag types
 * @see https://datatracker.ietf.org/doc/html/rfc6844
 */
export const CaaTagSchema = z.enum([
  'issue',         // Authorize CA to issue certificates
  'issuewild',     // Authorize CA to issue wildcard certificates
  'iodef',         // Incident report URL
  'contactemail',  // Contact email (RFC 8657)
  'contactphone',  // Contact phone (RFC 8657)
  'issuemail',     // S/MIME certificate issuance (draft)
  'issuevmc',      // Verified Mark Certificate issuance
]);
export type CaaTag = z.infer<typeof CaaTagSchema>;

// =============================================================================
// TLSA TYPES
// =============================================================================

/**
 * TLSA certificate usage values
 * @see https://datatracker.ietf.org/doc/html/rfc6698
 */
export const TlsaCertUsageSchema = z.union([
  z.literal(0),  // PKIX-TA: CA constraint
  z.literal(1),  // PKIX-EE: Service certificate constraint
  z.literal(2),  // DANE-TA: Trust anchor assertion
  z.literal(3),  // DANE-EE: Domain-issued certificate
]);
export type TlsaCertUsage = z.infer<typeof TlsaCertUsageSchema>;

/**
 * TLSA selector values
 */
export const TlsaSelectorSchema = z.union([
  z.literal(0),  // Full certificate
  z.literal(1),  // SubjectPublicKeyInfo
]);
export type TlsaSelector = z.infer<typeof TlsaSelectorSchema>;

/**
 * TLSA matching type values
 */
export const TlsaMatchingTypeSchema = z.union([
  z.literal(0),  // No hash (full content)
  z.literal(1),  // SHA-256
  z.literal(2),  // SHA-512
]);
export type TlsaMatchingType = z.infer<typeof TlsaMatchingTypeSchema>;

// =============================================================================
// SSHFP TYPES
// =============================================================================

/**
 * SSHFP algorithm values
 * @see https://datatracker.ietf.org/doc/html/rfc4255
 */
export const SshfpAlgorithmSchema = z.union([
  z.literal(1),  // RSA
  z.literal(2),  // DSA
  z.literal(3),  // ECDSA
  z.literal(4),  // Ed25519
  z.literal(6),  // Ed448
]);
export type SshfpAlgorithm = z.infer<typeof SshfpAlgorithmSchema>;

/**
 * SSHFP fingerprint type values
 */
export const SshfpFingerprintTypeSchema = z.union([
  z.literal(1),  // SHA-1
  z.literal(2),  // SHA-256
]);
export type SshfpFingerprintType = z.infer<typeof SshfpFingerprintTypeSchema>;

// =============================================================================
// LOCATION TYPES
// =============================================================================

/**
 * Cardinal direction for latitude
 */
export const LatitudeDirectionSchema = z.enum(['N', 'S']);
export type LatitudeDirection = z.infer<typeof LatitudeDirectionSchema>;

/**
 * Cardinal direction for longitude
 */
export const LongitudeDirectionSchema = z.enum(['E', 'W']);
export type LongitudeDirection = z.infer<typeof LongitudeDirectionSchema>;

// =============================================================================
// METADATA TYPES
// =============================================================================

/**
 * Provider metadata object for NewDnsProvider() and NewRegistrar()
 */
export const ProviderMetaSchema = z.record(z.string(), z.unknown());
export type ProviderMeta = z.infer<typeof ProviderMetaSchema>;

/**
 * Record metadata object for custom properties passed to record functions
 */
export const RecordMetaSchema = z.record(z.string(), z.unknown());
export type RecordMeta = z.infer<typeof RecordMetaSchema>;

// =============================================================================
// DNS RECORD TYPE ENUMS
// =============================================================================

/**
 * Standard DNS record types supported by most providers
 */
export const StandardRecordTypeSchema = z.enum([
  'A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT',
]);
export type StandardRecordType = z.infer<typeof StandardRecordTypeSchema>;

/**
 * Extended DNS record types (not all providers support these)
 */
export const ExtendedRecordTypeSchema = z.enum([
  'CAA', 'DNAME', 'DNSKEY', 'DS', 'HTTPS', 'LOC', 'NAPTR',
  'OPENPGPKEY', 'SMIMEA', 'SSHFP', 'SVCB', 'TLSA',
]);
export type ExtendedRecordType = z.infer<typeof ExtendedRecordTypeSchema>;

/**
 * Pseudo/Provider-specific record types
 */
export const PseudoRecordTypeSchema = z.enum([
  'ALIAS', 'DHCID', 'FRAME', 'RP', 'URL', 'URL301',
]);
export type PseudoRecordType = z.infer<typeof PseudoRecordTypeSchema>;

/**
 * All DNS record types supported by DNSControl
 */
export const AllRecordTypesSchema = z.union([
  StandardRecordTypeSchema,
  ExtendedRecordTypeSchema,
  PseudoRecordTypeSchema,
]);
export type AllRecordTypes = z.infer<typeof AllRecordTypesSchema>;

