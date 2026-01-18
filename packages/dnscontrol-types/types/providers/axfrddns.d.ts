/**
 * DNSControl AXFR+DDNS Provider Types
 * AXFR+DDNS-specific functions and modifiers
 *
 * @provider AXFRDDNS
 * @maintainer @tlimoncelli
 *
 * @note Uses AXFR (zone transfer) to read zones
 * @note Uses DDNS (Dynamic DNS) to update records
 * @note Useful for managing DNS servers that support these protocols
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// AXFRDDNS CAPABILITIES
// =============================================================================

/**
 * AXFR+DDNS provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface AxfrddnsCapabilities extends BaseProviderCapabilities {
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

  // Pseudo/Provider-specific record types
  canUseALIAS: false;
  canUseDHCID: true;
  canUseFRAME: false;
  canUseRP: true;
  canUseURL: false;
  canUseURL301: false;

  // Features
  canAutoDNSSEC: false;
  canCreateDomains: false;
  canDualHost: true;
  canGetZones: true;
  canConcur: false;
  docOfficiallySupported: true;
}

// =============================================================================
// AXFRDDNS NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * AXFR+DDNS namespace with compile-time validation
 * Only includes record types supported by AXFR+DDNS
 */
export namespace Axfrddns {
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DHCID(name: string, digest: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
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
  export function RP(name: string, mbox: string, txt: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SMIMEA(name: string, usage: number, selector: number, matchingType: number, certificate: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SSHFP(name: string, algorithm: SshfpAlgorithm, fptype: SshfpFingerprintType, fingerprint: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SVCB(name: string, priority: number, target: string, params: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TLSA(name: string, usage: TlsaCertUsage, selector: TlsaSelector, matchingType: TlsaMatchingType, certificate: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}
