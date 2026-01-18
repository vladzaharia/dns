/**
 * DNSControl Cloudflare Provider Types
 * Cloudflare-specific functions and modifiers
 *
 * @provider CLOUDFLAREAPI
 * @maintainer @StackExchange
 *
 * ## Capabilities
 *
 * ### Supported Record Types
 * - ✅ A, AAAA, CNAME, MX, NS, TXT, SOA, PTR
 * - ✅ CAA (Certificate Authority Authorization)
 * - ✅ SRV (Service records)
 * - ✅ SSHFP (SSH Fingerprints)
 * - ✅ TLSA (TLS Authentication)
 * - ✅ HTTPS (HTTPS service binding)
 * - ✅ SVCB (Service binding)
 * - ✅ DNSKEY (DNSSEC public keys)
 * - ✅ DS (Delegation Signer for DNSSEC)
 * - ✅ NAPTR (Naming Authority Pointer)
 * - ✅ LOC (Geographic location)
 * - ✅ SMIMEA (S/MIME Certificate Association)
 * - ✅ OPENPGPKEY (OpenPGP public keys)
 * - ✅ DNAME (Delegation name)
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
 * - **CF_WORKER_ROUTE**: Cloudflare Worker routes
 * - **CF_REDIRECT**: 301 permanent redirects via Page Rules
 * - **CF_TEMP_REDIRECT**: 302 temporary redirects via Page Rules
 * - **CF_SINGLE_REDIRECT**: Bulk redirects (more efficient than Page Rules)
 * - **CF_PROXY_ON/OFF/DEFAULT**: Orange cloud proxy control
 * - **CF_UNIVERSALSSL_ON/OFF**: Universal SSL control
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// CLOUDFLARE CAPABILITIES
// =============================================================================

/**
 * Cloudflare provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface CloudflareCapabilities extends BaseProviderCapabilities {
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
  canUseDNAME: true;
  canUseDNSKEY: true;
  canUseDS: true;
  canUseHTTPS: true;
  canUseLOC: true;
  canUseNAPTR: true;
  canUseOPENPGPKEY: true;
  canUseSMIMEA: true;
  canUseSSHFP: true;
  canUseSVCB: true;
  canUseTLSA: true;

  // Pseudo/Provider-specific record types (not supported)
  canUseALIAS: false;
  canUseDHCID: false;
  canUseFRAME: false;
  canUseRP: false;
  canUseURL: false;
  canUseURL301: false;

  // Features
  canAutoDNSSEC: true;
  canCreateDomains: true;
  canDualHost: true;
  canGetZones: true;
  canConcur: true;
  docOfficiallySupported: true;
}

// =============================================================================
// CLOUDFLARE NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Cloudflare namespace with compile-time validation
 * Only includes record types supported by Cloudflare
 *
 * @example
 * ```typescript
 * D("example.com", REG_NONE, DnsProvider(DSP_CLOUDFLARE),
 *   Cloudflare.A("@", "1.2.3.4"),
 *   Cloudflare.SSHFP("@", 1, 1, "..."),
 *   Cloudflare.CF_PROXY_ON()
 * );
 * ```
 */
export namespace Cloudflare {
  // Standard record types
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DNSKEY(name: string, flags: number, protocol: number, algorithm: DnssecAlgorithm, publicKey: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DS(name: string, keyTag: number, algorithm: DnssecAlgorithm, digestType: DnssecDigestType, digest: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function HTTPS(name: string, priority: number, target: string, params: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function LOC(name: string, latitude: string, longitude: string, altitude: number, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NAPTR(name: string, order: number, preference: number, flags: string, service: string, regexp: string, replacement: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function OPENPGPKEY(name: string, publicKey: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function PTR(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SMIMEA(name: string, usage: number, selector: number, matchingType: number, certificate: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SOA(name: string, mname: string, rname: string, serial: number, refresh: number, retry: number, expire: number, minimum: number, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SSHFP(name: string, algorithm: SshfpAlgorithm, fptype: SshfpFingerprintType, fingerprint: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SVCB(name: string, priority: number, target: string, params: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TLSA(name: string, usage: TlsaCertUsage, selector: TlsaSelector, matchingType: TlsaMatchingType, certificate: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, ...contents: (string | RecordModifier | RecordMeta)[]): DomainModifier;

  // Cloudflare-specific functions
  export function CF_PROXY_ON(): RecordModifier;
  export function CF_PROXY_OFF(): RecordModifier;
  export function CF_PROXY_DEFAULT(): RecordModifier;
  export function CF_REDIRECT(source: string, destination: string): DomainModifier;
  export function CF_TEMP_REDIRECT(source: string, destination: string): DomainModifier;
  export function CF_SINGLE_REDIRECT(source: string, destination: string, options?: CfSingleRedirectOptions): DomainModifier;
  export function CF_WORKER_ROUTE(pattern: string, script: string): DomainModifier;
  export function CF_UNIVERSALSSL_ON(): DomainModifier;
  export function CF_UNIVERSALSSL_OFF(): DomainModifier;
}

// =============================================================================
// CLOUDFLARE PROXY (GLOBAL FUNCTIONS)
// =============================================================================

/**
 * CF_PROXY_ON() enables Cloudflare proxy (orange cloud) for a record.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_proxy_on
 */
declare function CF_PROXY_ON(): RecordModifier;

/**
 * CF_PROXY_OFF() disables Cloudflare proxy (grey cloud) for a record.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_proxy_off
 */
declare function CF_PROXY_OFF(): RecordModifier;

/**
 * CF_PROXY_DEFAULT() uses default proxy setting for a record.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_proxy_default
 */
declare function CF_PROXY_DEFAULT(): RecordModifier;

// =============================================================================
// CLOUDFLARE REDIRECTS
// =============================================================================

/**
 * CF_REDIRECT() creates a 301 permanent redirect using Cloudflare Page Rules.
 * @param source - Source URL pattern (with wildcards)
 * @param destination - Destination URL (can use $1, $2 for captures)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_redirect
 */
declare function CF_REDIRECT(source: string, destination: string): DomainModifier;

/**
 * CF_TEMP_REDIRECT() creates a 302 temporary redirect using Cloudflare Page Rules.
 * @param source - Source URL pattern (with wildcards)
 * @param destination - Destination URL (can use $1, $2 for captures)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_temp_redirect
 */
declare function CF_TEMP_REDIRECT(source: string, destination: string): DomainModifier;

// =============================================================================
// CLOUDFLARE SINGLE REDIRECTS (Bulk Redirects)
// =============================================================================

/** CF_SINGLE_REDIRECT options */
interface CfSingleRedirectOptions {
  /** HTTP status code (301 or 302, default: 301) */
  code?: 301 | 302;
  /** Preserve query string (default: false) */
  preserveQueryString?: boolean;
  /** Include subdomains (default: false) */
  subdomainMatching?: boolean;
  /** Preserve path suffix (default: false) */
  preservePathSuffix?: boolean;
}

/**
 * CF_SINGLE_REDIRECT() creates a redirect using Cloudflare Bulk Redirects.
 * More efficient than Page Rules for simple redirects.
 * @param name - Redirect rule name
 * @param source - Source URL
 * @param destination - Destination URL
 * @param options - Redirect options (optional)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_single_redirect
 */
declare function CF_SINGLE_REDIRECT(
  name: string,
  source: string,
  destination: string,
  options?: CfSingleRedirectOptions
): DomainModifier;

// =============================================================================
// CLOUDFLARE WORKERS
// =============================================================================

/**
 * CF_WORKER_ROUTE() creates a Cloudflare Worker route.
 * @param pattern - URL pattern to match (e.g., "example.com/*")
 * @param workerName - Name of the Worker script to run
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_worker_route
 */
declare function CF_WORKER_ROUTE(pattern: string, workerName: string): DomainModifier;

// =============================================================================
// CLOUDFLARE UNIVERSAL SSL
// =============================================================================

/**
 * CF_UNIVERSALSSL_ON() enables Universal SSL for the domain.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_universalssl
 */
declare function CF_UNIVERSALSSL_ON(): DomainModifier;

/**
 * CF_UNIVERSALSSL_OFF() disables Universal SSL for the domain.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudflare/cf_universalssl
 */
declare function CF_UNIVERSALSSL_OFF(): DomainModifier;

