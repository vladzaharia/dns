/**
 * DNSControl Namecheap Provider Types
 * Namecheap-specific functions and modifiers
 *
 * @provider NAMECHEAP
 * @maintainer @captncraig
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// NAMECHEAP CAPABILITIES
// =============================================================================

/**
 * Namecheap provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface NamecheapCapabilities extends BaseProviderCapabilities {
  // Standard record types
  canUseA: true;
  canUseAAAA: true;
  canUseCNAME: true;
  canUseMX: true;
  canUseNS: true;
  canUsePTR: false;
  canUseSOA: false;
  canUseSRV: false;
  canUseTXT: true;

  // Extended record types
  canUseCAA: false;
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
  canUseALIAS: true;
  canUseDHCID: false;
  canUseFRAME: true;
  canUseRP: false;
  canUseURL: true;
  canUseURL301: true;

  // Features
  canAutoDNSSEC: false;
  canCreateDomains: false;
  canDualHost: true;
  canGetZones: true;
  canConcur: false;
  docOfficiallySupported: true;
}

// =============================================================================
// NAMECHEAP NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Namecheap namespace with compile-time validation
 * Only includes record types supported by Namecheap
 */
export namespace Namecheap {
  // Standard record types
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function ALIAS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

  // Namecheap-specific
  export function URL(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function URL301(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function FRAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}

// =============================================================================
// NAMECHEAP URL REDIRECTS (GLOBAL)
// =============================================================================

/**
 * URL() creates a 302 temporary redirect (Namecheap-specific).
 * @param name - Record name
 * @param target - Target URL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/namecheap/url
 */
declare function URL(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * URL301() creates a 301 permanent redirect (Namecheap-specific).
 * @param name - Record name
 * @param target - Target URL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/namecheap/url301
 */
declare function URL301(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * FRAME() creates a frame/masking redirect (Namecheap-specific).
 * Displays the target URL in a frame while keeping the original URL in the browser.
 * @param name - Record name
 * @param target - Target URL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/namecheap/frame
 */
declare function FRAME(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;
