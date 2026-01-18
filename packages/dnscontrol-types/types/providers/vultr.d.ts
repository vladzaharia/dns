/**
 * DNSControl Vultr Provider Types
 * Vultr DNS-specific functions and modifiers
 *
 * @provider VULTR
 * @maintainer @geek1011
 *
 * ## Capabilities
 *
 * ### Supported Record Types
 * - ✅ A, AAAA, CNAME, MX, NS, TXT, SOA
 * - ✅ CAA (Certificate Authority Authorization)
 * - ✅ SRV (Service records)
 * - ✅ SSHFP (SSH Fingerprints)
 * - ❌ PTR (not supported)
 * - ❌ TLSA (not supported)
 * - ❌ NAPTR (not supported)
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
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// VULTR CAPABILITIES
// =============================================================================

/**
 * Vultr provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface VultrCapabilities extends BaseProviderCapabilities {
  // Standard record types
  canUseA: true;
  canUseAAAA: true;
  canUseCNAME: true;
  canUseMX: true;
  canUseNS: true;
  canUsePTR: false;
  canUseSOA: true;
  canUseSRV: true;
  canUseTXT: true;

  // Extended record types
  canUseCAA: true;
  canUseDNAME: false;
  canUseDNSKEY: false;
  canUseDS: false;
  canUseHTTPS: false;
  canUseLOC: false;
  canUseNAPTR: false;
  canUseOPENPGPKEY: false;
  canUseSMIMEA: false;
  canUseSSHFP: true;
  canUseSVCB: false;
  canUseTLSA: false;

  // Pseudo record types
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
// VULTR NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Vultr namespace with compile-time validation
 * Only includes record types supported by Vultr
 *
 * @example
 * ```typescript
 * D("example.com", REG_NONE, DnsProvider(DSP_VULTR),
 *   Vultr.A("@", "1.2.3.4"),
 *   Vultr.SSHFP("@", 1, 1, "..."),
 *   Vultr.CAA("@", "issue", "letsencrypt.org")
 * );
 * ```
 *
 * @note Vultr does NOT support: PTR, TLSA, NAPTR, LOC, HTTPS, SVCB, DNAME,
 *       DNSKEY, DS, OPENPGPKEY, SMIMEA, ALIAS, DHCID, FRAME, RP, URL, URL301
 */
export namespace Vultr {
  // Supported record types only
  export function A(
    name: string,
    address: IpAddress,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function AAAA(
    name: string,
    address: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function CAA(
    name: string,
    tag: CaaTag,
    value: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function CNAME(
    name: string,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function MX(
    name: string,
    priority: number,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function NS(
    name: string,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function SOA(
    name: string,
    mname: string,
    rname: string,
    serial: number,
    refresh: number,
    retry: number,
    expire: number,
    minimum: number,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function SRV(
    name: string,
    priority: number,
    weight: number,
    port: number,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function SSHFP(
    name: string,
    algorithm: SshfpAlgorithm,
    fptype: SshfpFingerprintType,
    fingerprint: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function TXT(
    name: string,
    ...contents: (string | RecordModifier | RecordMeta)[]
  ): DomainModifier;

  // Note: PTR, TLSA, NAPTR, LOC, HTTPS, SVCB, DNAME, DNSKEY, DS,
  // OPENPGPKEY, SMIMEA are NOT available
}
