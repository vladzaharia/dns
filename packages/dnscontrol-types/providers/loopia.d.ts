/**
 * DNSControl Loopia Provider Types
 * Loopia DNS-specific functions and modifiers
 *
 * @provider LOOPIA
 * @maintainer @daenney
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// LOOPIA CAPABILITIES
// =============================================================================

/**
 * Loopia DNS provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface LoopiaCapabilities extends BaseProviderCapabilities {
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
  canUseNAPTR: true;
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
// LOOPIA NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Loopia DNS namespace with compile-time validation
 * Only includes record types supported by Loopia
 */
export namespace Loopia {
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NAPTR(name: string, order: number, preference: number, flags: string, service: string, regexp: string, replacement: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}
