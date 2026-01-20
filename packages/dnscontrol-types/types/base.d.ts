/**
 * DNSControl Base Types
 * Core type definitions used throughout DNSControl DSL
 *
 * @packageDocumentation
 */

// =============================================================================
// PRIMITIVE TYPES
// =============================================================================

/** TTL value - can be a number (seconds) or a string duration (e.g., "1h", "1d", "300") */
declare type Ttl = string | number;

/** IP address type - can be a string or numeric value from IP() */
declare type IpAddress = string | number;

// =============================================================================
// MODIFIER TYPES
// =============================================================================

/** Domain modifier - returned by record functions and domain configuration functions */
declare type DomainModifier = unknown;

/** Record modifier - returned by TTL() and provider-specific record modifiers */
declare type RecordModifier = unknown;

// =============================================================================
// METADATA TYPES
// =============================================================================

/** Provider metadata object for NewDnsProvider() and NewRegistrar() */
declare type ProviderMeta = Record<string, unknown>;

/** Record metadata object for custom properties passed to record functions */
declare type RecordMeta = Record<string, unknown>;

// =============================================================================
// DNSSEC TYPES
// =============================================================================

/** DNSSEC algorithm numbers */
declare type DnssecAlgorithm =
  | 1   // RSA/MD5 (deprecated)
  | 3   // DSA/SHA1 (deprecated)
  | 5   // RSA/SHA-1
  | 6   // DSA-NSEC3-SHA1
  | 7   // RSASHA1-NSEC3-SHA1
  | 8   // RSA/SHA-256
  | 10  // RSA/SHA-512
  | 12  // GOST R 34.10-2001
  | 13  // ECDSA Curve P-256 with SHA-256
  | 14  // ECDSA Curve P-384 with SHA-384
  | 15  // Ed25519
  | 16; // Ed448

/** DNSSEC digest types */
declare type DnssecDigestType =
  | 1  // SHA-1
  | 2  // SHA-256
  | 4; // SHA-384

// =============================================================================
// CAA TYPES
// =============================================================================

/** CAA record tag types */
declare type CaaTag =
  | "issue"         // Authorize CA to issue certificates
  | "issuewild"     // Authorize CA to issue wildcard certificates
  | "iodef"         // Incident report URL
  | "contactemail"  // Contact email (RFC 8657)
  | "contactphone"  // Contact phone (RFC 8657)
  | "issuemail"     // S/MIME certificate issuance (draft)
  | "issuevmc";     // Verified Mark Certificate issuance

// =============================================================================
// TLSA TYPES
// =============================================================================

/** TLSA certificate usage values */
declare type TlsaCertUsage =
  | 0  // PKIX-TA: CA constraint
  | 1  // PKIX-EE: Service certificate constraint
  | 2  // DANE-TA: Trust anchor assertion
  | 3; // DANE-EE: Domain-issued certificate

/** TLSA selector values */
declare type TlsaSelector =
  | 0  // Full certificate
  | 1; // SubjectPublicKeyInfo

/** TLSA matching type values */
declare type TlsaMatchingType =
  | 0  // No hash (full content)
  | 1  // SHA-256
  | 2; // SHA-512

// =============================================================================
// SSHFP TYPES
// =============================================================================

/** SSHFP algorithm values */
declare type SshfpAlgorithm =
  | 1  // RSA
  | 2  // DSA
  | 3  // ECDSA
  | 4  // Ed25519
  | 6; // Ed448

/** SSHFP fingerprint type values */
declare type SshfpFingerprintType =
  | 1  // SHA-1
  | 2; // SHA-256

// =============================================================================
// NAPTR TYPES
// =============================================================================

/** NAPTR service field values (common) */
declare type NaptrService =
  | "SIP+D2U"   // SIP over UDP
  | "SIP+D2T"   // SIP over TCP
  | "SIP+D2S"   // SIP over SCTP
  | "SIPS+D2T"  // SIPS over TLS/TCP
  | "E2U+sip"   // ENUM SIP
  | "E2U+email" // ENUM email
  | string;     // Other services

// =============================================================================
// LOCATION TYPES
// =============================================================================

/** Cardinal direction for latitude */
declare type LatitudeDirection = "N" | "S";

/** Cardinal direction for longitude */
declare type LongitudeDirection = "E" | "W";

