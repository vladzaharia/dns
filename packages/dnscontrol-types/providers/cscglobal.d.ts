/**
 * DNSControl CSC Global Provider Types
 * CSC Global DNS-specific functions and modifiers
 *
 * @provider CSCGLOBAL
 * @maintainer @hnrgrgr
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// CSCGLOBAL CAPABILITIES
// =============================================================================

/**
 * CSC Global DNS provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface CscglobalCapabilities extends BaseProviderCapabilities {
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
// CSCGLOBAL NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * CSC Global DNS namespace with compile-time validation
 * Only includes record types supported by CSC Global
 */
export namespace Cscglobal {
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CAA(name: string, tag: CaaTag, value: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function CNAME(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function MX(name: string, priority: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function NS(name: string, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SRV(name: string, priority: number, weight: number, port: number, target: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}
