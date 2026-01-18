/**
 * DNSControl DNSimple Provider Types
 * DNSimple-specific functions and modifiers
 *
 * @provider DNSIMPLE
 * @maintainer @aeden
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// DNSIMPLE CAPABILITIES
// =============================================================================

/**
 * DNSimple provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface DnsimpleCapabilities extends BaseProviderCapabilities {
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
  canUseDS: false;
  canUseHTTPS: true;
  canUseLOC: false;
  canUseNAPTR: true;
  canUseOPENPGPKEY: false;
  canUseSMIMEA: false;
  canUseSSHFP: true;
  canUseSVCB: true;
  canUseTLSA: false;

  // Pseudo/Provider-specific record types
  canUseALIAS: true;
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
// DNSIMPLE NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * DNSimple namespace with compile-time validation
 * Only includes record types supported by DNSimple
 */
export namespace Dnsimple {
  // Standard record types
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function ALIAS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function HTTPS(name: string, priority: number, target: string, params: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NAPTR(name: string, order: number, preference: number, flags: string, service: string, regexp: string, replacement: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function PTR(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SSHFP(name: string, algorithm: SshfpAlgorithm, fptype: SshfpFingerprintType, fingerprint: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SVCB(name: string, priority: number, target: string, params: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

  // DNSimple-specific
  export function DNSIMPLE_URL(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}

// =============================================================================
// DNSIMPLE URL (GLOBAL)
// =============================================================================

/**
 * DNSIMPLE_URL() creates a DNSimple URL record.
 * @param name - Record name
 * @param target - Target URL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/dnsimple/dnsimple_url
 */
declare function DNSIMPLE_URL(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;
