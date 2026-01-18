/**
 * DNSControl Akamai Edge DNS Provider Types
 * Akamai-specific functions and modifiers
 *
 * @provider AKAMAIEDGEDNS
 * @maintainer @svernick
 *
 * ## Capabilities
 *
 * ### Supported Record Types
 * - ✅ A, AAAA, CNAME, MX, NS, TXT, SOA, PTR
 * - ✅ CAA (Certificate Authority Authorization)
 * - ✅ SRV (Service records)
 * - ✅ SSHFP (SSH Fingerprints)
 * - ✅ TLSA (TLS Authentication)
 * - ✅ NAPTR (Naming Authority Pointer)
 * - ✅ LOC (Geographic Location)
 * - ✅ HTTPS (HTTPS service binding)
 * - ✅ SVCB (Service Binding)
 * - ✅ DS (Delegation Signer)
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
 * - **AKAMAICDN**: Akamai CDN record
 * - **AKAMAITLC**: Akamai Traffic Load Controller record
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// AKAMAI CAPABILITIES
// =============================================================================

/**
 * Akamai Edge DNS provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface AkamaiCapabilities extends BaseProviderCapabilities {
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
  canUseDNSKEY: false;
  canUseDS: true;
  canUseHTTPS: true;
  canUseLOC: true;
  canUseNAPTR: true;
  canUseOPENPGPKEY: false;
  canUseSMIMEA: false;
  canUseSSHFP: true;
  canUseSVCB: true;
  canUseTLSA: true;

  // Pseudo record types
  canUseALIAS: true; // Via AKAMAICDN
  canUseDHCID: false;
  canUseFRAME: false;
  canUseRP: false;
  canUseURL: false;
  canUseURL301: false;

  // Akamai-specific
  canUseAkamaiCDN: true;
  canUseAkamaiTLC: true;

  // Features
  canAutoDNSSEC: true;
  canCreateDomains: true;
  canDualHost: true;
  canGetZones: true;
  canConcur: true;
  docOfficiallySupported: true;
}

// =============================================================================
// AKAMAI NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Akamai namespace with compile-time validation
 * Only includes record types supported by Akamai Edge DNS
 *
 * @example
 * ```typescript
 * D("example.com", REG_NONE, DnsProvider(DSP_AKAMAIEDGEDNS),
 *   Akamai.A("@", "1.2.3.4"),
 *   Akamai.AKAMAICDN("cdn", "example.akamaized.net"),
 *   Akamai.TLSA("_443._tcp", 3, 1, 1, "...")
 * );
 * ```
 */
export namespace Akamai {
  // Standard record types
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
  export function DS(
    name: string,
    keytag: number,
    algorithm: DnssecAlgorithm,
    digestType: DnssecDigestType,
    digest: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function HTTPS(
    name: string,
    priority: number,
    target: string,
    params: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function LOC(
    name: string,
    d1: number,
    m1: number,
    s1: number,
    ns: string,
    d2: number,
    m2: number,
    s2: number,
    ew: string,
    alt: number,
    siz: number,
    hp: number,
    vp: number,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function MX(
    name: string,
    priority: number,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function NAPTR(
    name: string,
    order: number,
    preference: number,
    flags: string,
    service: string,
    regexp: string,
    replacement: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function NS(
    name: string,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function PTR(
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
  export function SVCB(
    name: string,
    priority: number,
    target: string,
    params: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function TLSA(
    name: string,
    usage: TlsaCertUsage,
    selector: TlsaSelector,
    matchingType: TlsaMatchingType,
    certificate: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function TXT(
    name: string,
    ...contents: (string | RecordModifier | RecordMeta)[]
  ): DomainModifier;

  // Akamai-specific functions
  export function AKAMAICDN(
    name: string,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function AKAMAITLC(
    name: string,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
}

// =============================================================================
// AKAMAI GLOBAL FUNCTIONS
// =============================================================================

/**
 * AKAMAICDN() creates an Akamai CDN record.
 * Points to Akamai's Content Delivery Network.
 * @param name - Record name
 * @param target - Target CDN hostname
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/akamai/akamaicdn
 */
declare function AKAMAICDN(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * AKAMAITLC() creates an Akamai Traffic Load Controller record.
 * Used for advanced traffic management and load balancing.
 * @param name - Record name
 * @param target - Target TLC hostname
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/akamai/akamaitlc
 */
declare function AKAMAITLC(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;
