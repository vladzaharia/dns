/**
 * DNSControl Hetzner DNS API Provider Types (v2)
 * Hetzner DNS API-specific functions and modifiers
 *
 * @provider HETZNERV2
 * @maintainer @das7pad
 *
 * @note This is the newer Hetzner DNS API provider
 * @note Recommended over the legacy HETZNER provider
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// HETZNERV2 CAPABILITIES
// =============================================================================

/**
 * Hetzner DNS API provider capability interface (v2)
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface Hetznerv2Capabilities extends BaseProviderCapabilities {
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
  canUseNAPTR: false;
  canUseOPENPGPKEY: false;
  canUseSMIMEA: false;
  canUseSSHFP: false;
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
  canAutoDNSSEC: false;
  canCreateDomains: true;
  canDualHost: true;
  canGetZones: true;
  canConcur: true;
  docOfficiallySupported: true;
}

// =============================================================================
// HETZNERV2 NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Hetzner DNS API namespace with compile-time validation
 * Only includes record types supported by Hetzner v2
 */
export namespace Hetznerv2 {
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DS(name: string, keyTag: number, algorithm: DnssecAlgorithm, digestType: DnssecDigestType, digest: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TLSA(name: string, usage: TlsaCertUsage, selector: TlsaSelector, matchingType: TlsaMatchingType, certificate: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}
