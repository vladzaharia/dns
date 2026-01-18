/**
 * DNSControl AdGuard Home Provider Types
 * AdGuard Home-specific functions and modifiers
 *
 * @provider ADGUARDHOME
 * @maintainer @tlimoncelli
 *
 * @note Local DNS server with ad-blocking capabilities
 * @note Supports passthrough records for selective filtering bypass
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// ADGUARDHOME CAPABILITIES
// =============================================================================

/**
 * AdGuard Home provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface AdguardhomeCapabilities extends BaseProviderCapabilities {
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
// ADGUARD HOME PASSTHROUGH
// =============================================================================

/**
 * ADGUARDHOME_A_PASSTHROUGH() creates an A record that passes through to upstream DNS.
 * Used for selective DNS filtering bypass.
 * @param name - Record name
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/service-provider-specific/adguard-home/adguardhome_a_passthrough
 */
declare function ADGUARDHOME_A_PASSTHROUGH(
  name: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

/**
 * ADGUARDHOME_AAAA_PASSTHROUGH() creates an AAAA record that passes through to upstream DNS.
 * Used for selective DNS filtering bypass for IPv6.
 * @param name - Record name
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/service-provider-specific/adguard-home/adguardhome_aaaa_passthrough
 */
declare function ADGUARDHOME_AAAA_PASSTHROUGH(
  name: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// ADGUARDHOME NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * AdGuard Home namespace with compile-time validation
 * Only includes record types supported by AdGuard Home
 */
export namespace Adguardhome {
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function A_PASSTHROUGH(name: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA_PASSTHROUGH(name: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}
