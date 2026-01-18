/**
 * DNSControl NS1 Provider Types
 * NS1-specific functions and modifiers
 *
 * @provider NS1
 * @maintainer @costasd
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// NS1 CAPABILITIES
// =============================================================================

/**
 * NS1 provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface Ns1Capabilities extends BaseProviderCapabilities {
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
  canUseLOC: false;
  canUseNAPTR: true;
  canUseOPENPGPKEY: false;
  canUseSMIMEA: false;
  canUseSSHFP: false;
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
// NS1 NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * NS1 namespace with compile-time validation
 * Only includes record types supported by NS1
 */
export namespace Ns1 {
  // Standard record types
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function ALIAS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DNSKEY(name: string, flags: number, protocol: number, algorithm: DnssecAlgorithm, publicKey: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function DS(name: string, keyTag: number, algorithm: DnssecAlgorithm, digestType: DnssecDigestType, digest: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function HTTPS(name: string, priority: number, target: string, params: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NAPTR(name: string, order: number, preference: number, flags: string, service: string, regexp: string, replacement: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function PTR(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SVCB(name: string, priority: number, target: string, params: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

  // NS1-specific
  export function NS1_URLFWD(name: string, target: string, options?: { code?: 301 | 302 | "masking"; forwardPath?: boolean; forwardQuery?: boolean; }): DomainModifier;
}

// =============================================================================
// NS1 URL FORWARD (GLOBAL)
// =============================================================================

/**
 * NS1_URLFWD() creates an NS1 URL forward record.
 * @param name - Record name
 * @param target - Target URL
 * @param options - Forward options
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/ns1/ns1_urlfwd
 */
declare function NS1_URLFWD(
  name: string,
  target: string,
  options?: {
    /** Redirect code (301, 302, or masking) */
    code?: 301 | 302 | "masking";
    /** Forward path */
    forwardPath?: boolean;
    /** Forward query */
    forwardQuery?: boolean;
  }
): DomainModifier;
