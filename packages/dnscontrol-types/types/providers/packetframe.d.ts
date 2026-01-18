/**
 * DNSControl Packetframe Provider Types
 * Packetframe DNS-specific functions and modifiers
 *
 * @provider PACKETFRAME
 * @maintainer @packetframe
 * 
 * ## Capabilities
 * 
 * ### Supported Record Types
 * - ✅ A, AAAA, CNAME, MX, NS, TXT, SOA
 * - ✅ CAA (Certificate Authority Authorization)
 * - ✅ SRV (Service records)
 * - ❌ PTR (not supported)
 * - ❌ SSHFP (not supported)
 * - ❌ TLSA (not supported)
 * - ❌ NAPTR (not supported)
 * - ❌ LOC (not supported)
 * - ❌ HTTPS/SVCB (not supported)
 * 
 * ### Features
 * - ❌ Auto DNSSEC: Not supported
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
// PACKETFRAME CAPABILITIES
// =============================================================================

/**
 * Packetframe provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface PacketframeCapabilities extends BaseProviderCapabilities {
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
  canUseSSHFP: false;
  canUseSVCB: false;
  canUseTLSA: false;

  // Pseudo/Provider-specific record types
  canUseALIAS: false;
  canUseDHCID: false;
  canUseFRAME: false;
  canUseRP: false;
  canUseURL: false;
  canUseURL301: false;

  // Features
  canAutoDNSSEC: false;
  canCreateDomains: true;
  canDualHost: true;
  canGetZones: true;
  canConcur: true;
  docOfficiallySupported: true;
}

// =============================================================================
// PACKETFRAME NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Packetframe namespace with compile-time validation
 * Only includes record types supported by Packetframe
 *
 * @example
 * ```typescript
 * D("example.com", REG_NONE, DnsProvider(DSP_PACKETFRAME),
 *   Packetframe.A("@", "1.2.3.4"),
 *   Packetframe.CAA("@", "issue", "letsencrypt.org"),
 *   Packetframe.MX("@", 10, "mail.example.com.")
 * );
 * ```
 *
 * @note Packetframe does NOT support: SSHFP, TLSA, PTR, DNSKEY, DS, HTTPS, SVCB, NAPTR, LOC
 */
export namespace Packetframe {
  // Supported record types only
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SOA(name: string, mname: string, rname: string, serial: number, refresh: number, retry: number, expire: number, minimum: number, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, ...contents: (string | RecordModifier | RecordMeta)[]): DomainModifier;

  // Note: SSHFP, TLSA, PTR, DNSKEY, DS, HTTPS, SVCB, NAPTR, LOC are NOT available
}

