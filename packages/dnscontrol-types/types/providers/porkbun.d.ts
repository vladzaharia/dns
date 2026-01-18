/**
 * DNSControl Porkbun Provider Types
 * Porkbun-specific functions and modifiers
 *
 * @provider PORKBUN
 * @maintainer @captncraig
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// PORKBUN CAPABILITIES
// =============================================================================

/**
 * Porkbun provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface PorkbunCapabilities extends BaseProviderCapabilities {
  // Standard record types
  canUseA: true;
  canUseAAAA: true;
  canUseCNAME: true;
  canUseMX: true;
  canUseNS: true;
  canUsePTR: false;
  canUseSOA: false;
  canUseSRV: true;
  canUseTXT: true;

  // Extended record types
  canUseCAA: true;
  canUseDNAME: false;
  canUseDNSKEY: false;
  canUseDS: false;
  canUseHTTPS: true;
  canUseLOC: false;
  canUseNAPTR: false;
  canUseOPENPGPKEY: false;
  canUseSMIMEA: false;
  canUseSSHFP: true;
  canUseSVCB: false;
  canUseTLSA: true;

  // Pseudo/Provider-specific record types
  canUseALIAS: true;
  canUseDHCID: false;
  canUseFRAME: false;
  canUseRP: false;
  canUseURL: true;
  canUseURL301: true;

  // Features
  canAutoDNSSEC: false;
  canCreateDomains: true;
  canDualHost: true;
  canGetZones: true;
  canConcur: true;
  docOfficiallySupported: true;
}

// =============================================================================
// PORKBUN NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Porkbun namespace with compile-time validation
 * Only includes record types supported by Porkbun
 */
export namespace Porkbun {
  // Standard record types
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function ALIAS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function HTTPS(name: string, priority: number, target: string, params: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SSHFP(name: string, algorithm: SshfpAlgorithm, fptype: SshfpFingerprintType, fingerprint: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TLSA(name: string, usage: TlsaCertUsage, selector: TlsaSelector, matchingType: TlsaMatchingType, certificate: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

  // Porkbun-specific
  export function PORKBUN_URLFWD(name: string, target: string, options?: PorkbunUrlForwardOptions): DomainModifier;
  export function URL(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function URL301(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}

// =============================================================================
// PORKBUN URL FORWARDING (GLOBAL)
// =============================================================================

/** Porkbun URL forward options */
interface PorkbunUrlForwardOptions {
  /** Include path in redirect (default: false) */
  includePath?: boolean;
  /** Wildcard redirect (default: false) */
  wildcard?: boolean;
}

/**
 * PORKBUN_URLFWD() creates a Porkbun URL forward record.
 * @param name - Record name
 * @param target - Target URL
 * @param options - Forward options (optional)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/porkbun/porkbun_urlfwd
 */
declare function PORKBUN_URLFWD(
  name: string,
  target: string,
  options?: PorkbunUrlForwardOptions
): DomainModifier;

/**
 * URL() creates a 302 temporary redirect (Porkbun-specific).
 * @param name - Record name
 * @param target - Target URL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/porkbun/url
 */
declare function URL(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * URL301() creates a 301 permanent redirect (Porkbun-specific).
 * @param name - Record name
 * @param target - Target URL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/porkbun/url301
 */
declare function URL301(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;
