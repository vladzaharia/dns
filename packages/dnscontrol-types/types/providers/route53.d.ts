/**
 * DNSControl AWS Route53 Provider Types
 * Route53-specific functions and modifiers
 *
 * @provider ROUTE53
 * @maintainer @StackExchange
 *
 * ## Capabilities
 *
 * ### Supported Record Types
 * - ✅ A, AAAA, CNAME, MX, NS, TXT, SOA, PTR
 * - ✅ CAA (Certificate Authority Authorization)
 * - ✅ SRV (Service records)
 * - ✅ SSHFP (SSH Fingerprints)
 * - ✅ NAPTR (Naming Authority Pointer)
 * - ✅ DS (Delegation Signer for DNSSEC)
 * - ❌ TLSA (not supported)
 * - ❌ LOC (not supported)
 * - ❌ HTTPS/SVCB (not supported)
 *
 * ### Features
 * - ✅ Auto DNSSEC: Supported
 * - ✅ Can Create Domains: Yes
 * - ✅ Dual Host: Yes
 * - ✅ Officially Supported: Yes
 * - ✅ Can Concur: Yes (concurrent operations)
 * - ✅ Can Get Zones: Yes
 *
 * ### Custom Record Types
 * - **R53_ALIAS**: AWS resource aliases (ELB, CloudFront, S3, API Gateway, etc.)
 *
 * ### Advanced Features
 * - Health checks and failover routing
 * - Weighted routing policies
 * - Latency-based routing
 * - Geolocation routing
 * - Multivalue answer routing
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// ROUTE53 CAPABILITIES
// =============================================================================

/**
 * Route53 provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface Route53Capabilities extends BaseProviderCapabilities {
  // Standard record types
  canUseA: true;
  canUseAAAA: true;
  canUseCNAME: true;
  canUseMX: true;
  canUseNS: true;
  canUsePTR: true;
  canUseSOA: true;
  canUseSRV: true;
  canUseTXT: true;

  // Extended record types
  canUseCAA: true;
  canUseDNAME: false;
  canUseDNSKEY: true;
  canUseDS: true;
  canUseHTTPS: false;
  canUseLOC: false;
  canUseNAPTR: true;
  canUseOPENPGPKEY: false;
  canUseSMIMEA: false;
  canUseSSHFP: true;
  canUseSVCB: false;
  canUseTLSA: false;

  // Pseudo/Provider-specific record types
  canUseALIAS: false;
  canUseDHCID: false;
  canUseFRAME: false;
  canUseRP: false;
  canUseURL: false;
  canUseURL301: false;

  // Route53-specific (not in base)
  canUseDSForChildren: true;
  canUseRoute53Alias: true;

  // Features
  canAutoDNSSEC: true;
  canCreateDomains: true;
  canDualHost: true;
  canGetZones: true;
  canConcur: true;
  docOfficiallySupported: true;
}

// =============================================================================
// ROUTE53 NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Route53 namespace with compile-time validation
 * Only includes record types supported by Route53
 *
 * @example
 * ```typescript
 * D("example.com", REG_NONE, DnsProvider(DSP_ROUTE53),
 *   Route53.A("@", "1.2.3.4"),
 *   Route53.SSHFP("@", 1, 1, "..."),
 *   Route53.R53_ALIAS("www", "A", "my-elb.amazonaws.com", "Z123456")
 * );
 * ```
 *
 * @note Route53 does NOT support: TLSA, LOC, HTTPS, SVCB
 */
export namespace Route53 {
  // Supported record types
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DNSKEY(name: string, flags: number, protocol: number, algorithm: DnssecAlgorithm, publicKey: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DS(name: string, keyTag: number, algorithm: DnssecAlgorithm, digestType: DnssecDigestType, digest: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NAPTR(name: string, order: number, preference: number, flags: string, service: string, regexp: string, replacement: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function PTR(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SOA(name: string, mname: string, rname: string, serial: number, refresh: number, retry: number, expire: number, minimum: number, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SSHFP(name: string, algorithm: SshfpAlgorithm, fptype: SshfpFingerprintType, fingerprint: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, ...contents: (string | RecordModifier | RecordMeta)[]): DomainModifier;

  // Route53-specific functions
  export function R53_ALIAS(name: string, type: R53AliasType, target: string, zoneId?: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function R53_ZONE(zoneId: string): DomainModifier;

  // Routing policy modifiers
  export function R53_WEIGHT(weight: number, identifier: string): RecordModifier;
  export function R53_GEO(location: string, identifier: string): RecordModifier;
  export function R53_FAILOVER(failoverType: "PRIMARY" | "SECONDARY", identifier: string): RecordModifier;
  export function R53_LATENCY(region: string, identifier: string): RecordModifier;

  // Note: TLSA, LOC, HTTPS, SVCB are NOT available
}

// =============================================================================
// ROUTE53 ALIAS (GLOBAL FUNCTIONS)
// =============================================================================

/** Route53 alias target types */
type R53AliasType =
  | "A"
  | "AAAA"
  | "CNAME"
  | "MX"
  | "NAPTR"
  | "PTR"
  | "SPF"
  | "SRV"
  | "TXT";

/**
 * R53_ALIAS() creates a Route53 alias record.
 * Points to AWS resources like ELB, CloudFront, S3, etc.
 * @param name - Record name
 * @param type - Alias record type
 * @param target - Target (hosted zone ID or resource)
 * @param zoneId - Target hosted zone ID (optional, for cross-zone aliases)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/route53/r53_alias
 */
declare function R53_ALIAS(
  name: string,
  type: R53AliasType,
  target: string,
  zoneId?: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// ROUTE53 RECORD MODIFIERS
// =============================================================================

/**
 * R53_ZONE() specifies the Route53 hosted zone ID for a record.
 * Useful when multiple hosted zones exist for the same domain.
 * @param zoneId - The hosted zone ID
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_zone
 */
declare function R53_ZONE(zoneId: string): RecordModifier;

/**
 * R53_EVALUATE_TARGET_HEALTH() enables health evaluation for alias targets.
 * @param evaluate - Whether to evaluate target health (default: true)
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_evaluate_target_health
 */
declare function R53_EVALUATE_TARGET_HEALTH(evaluate?: boolean): RecordModifier;

// =============================================================================
// ROUTE53 HEALTH CHECKS (Advanced)
// =============================================================================

/** Route53 health check types */
type R53HealthCheckType =
  | "HTTP"
  | "HTTPS"
  | "HTTP_STR_MATCH"
  | "HTTPS_STR_MATCH"
  | "TCP"
  | "CALCULATED"
  | "CLOUDWATCH_METRIC";

/** Route53 failover types */
type R53FailoverType = "PRIMARY" | "SECONDARY";

/**
 * R53_HEALTH_CHECK() associates a health check with a record.
 * @param healthCheckId - The health check ID
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_health_check
 */
declare function R53_HEALTH_CHECK(healthCheckId: string): RecordModifier;

/**
 * R53_FAILOVER() configures failover routing for a record.
 * @param failoverType - PRIMARY or SECONDARY
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_failover
 */
declare function R53_FAILOVER(failoverType: R53FailoverType): RecordModifier;

/**
 * R53_SET_IDENTIFIER() sets a unique identifier for routing policies.
 * Required for weighted, latency, geolocation, and failover routing.
 * @param identifier - Unique identifier string
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_set_identifier
 */
declare function R53_SET_IDENTIFIER(identifier: string): RecordModifier;

/**
 * R53_WEIGHT() sets the weight for weighted routing policy.
 * @param weight - Weight value (0-255)
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_weight
 */
declare function R53_WEIGHT(weight: number): RecordModifier;

/**
 * R53_REGION() sets the region for latency-based routing.
 * @param region - AWS region code (e.g., "us-east-1")
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_region
 */
declare function R53_REGION(region: string): RecordModifier;

/**
 * R53_GEO() sets geolocation routing parameters.
 * @param continentCode - Continent code (optional)
 * @param countryCode - Country code (optional)
 * @param subdivisionCode - Subdivision code (optional)
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_geo
 */
declare function R53_GEO(
  continentCode?: string,
  countryCode?: string,
  subdivisionCode?: string
): RecordModifier;

/**
 * R53_MULTIVALUE() enables multivalue answer routing.
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_multivalue
 */
declare function R53_MULTIVALUE(): RecordModifier;

