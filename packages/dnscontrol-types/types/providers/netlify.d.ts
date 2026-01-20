/**
 * DNSControl Netlify Provider Types
 * Netlify DNS-specific functions and modifiers
 *
 * @provider NETLIFY
 * @maintainer @koesie10
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// NETLIFY CAPABILITIES
// =============================================================================

/**
 * Netlify DNS provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface NetlifyCapabilities extends BaseProviderCapabilities {
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
  canUseALIAS: true;
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
// NETLIFY NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Netlify DNS namespace with compile-time validation
 * Only includes record types supported by Netlify
 */
export namespace Netlify {
  // Standard record types
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function ALIAS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

  // Netlify-specific
  export function NETLIFY(name: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NETLIFYv6(name: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}

// =============================================================================
// NETLIFY REDIRECT RECORDS (GLOBAL)
// =============================================================================

/**
 * NETLIFY() creates a Netlify IPv4 redirect record.
 * Points to Netlify's load balancer for automatic routing to your Netlify site.
 * @param name - Record name
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/netlify/netlify
 */
declare function NETLIFY(
  name: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * NETLIFYv6() creates a Netlify IPv6 redirect record.
 * Points to Netlify's IPv6 load balancer for automatic routing to your Netlify site.
 * @param name - Record name
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/netlify/netlifyv6
 */
declare function NETLIFYv6(
  name: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;
