/**
 * DNSControl Realtime Register Provider Types
 * Realtime Register DNS-specific functions and modifiers
 *
 * @provider REALTIMEREGISTER
 * @maintainer @JorisAndrade
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// REALTIMEREGISTER CAPABILITIES
// =============================================================================

/**
 * Realtime Register DNS provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface RealtimeregisterCapabilities extends BaseProviderCapabilities {
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
  canUseDS: true;
  canUseHTTPS: false;
  canUseLOC: false;
  canUseNAPTR: true;
  canUseOPENPGPKEY: false;
  canUseSMIMEA: false;
  canUseSSHFP: true;
  canUseSVCB: false;
  canUseTLSA: true;

  // Pseudo/Provider-specific record types
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
// REALTIMEREGISTER NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Realtime Register DNS namespace with compile-time validation
 * Only includes record types supported by Realtime Register
 */
export namespace Realtimeregister {
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DS(name: string, keyTag: number, algorithm: DnssecAlgorithm, digestType: DnssecDigestType, digest: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NAPTR(name: string, order: number, preference: number, flags: string, service: string, regexp: string, replacement: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SSHFP(name: string, algorithm: SshfpAlgorithm, fptype: SshfpFingerprintType, fingerprint: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TLSA(name: string, usage: TlsaCertUsage, selector: TlsaSelector, matchingType: TlsaMatchingType, certificate: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}
