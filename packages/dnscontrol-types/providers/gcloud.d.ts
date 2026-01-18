/**
 * DNSControl Google Cloud DNS Provider Types
 * Google Cloud DNS-specific functions and modifiers
 *
 * @provider GCLOUD
 * @maintainer @riyadhalnur
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// GCLOUD CAPABILITIES
// =============================================================================

/**
 * Google Cloud DNS provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface GCloudCapabilities extends BaseProviderCapabilities {
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
  canUseSSHFP: true;
  canUseSVCB: true;
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
// GCLOUD NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Google Cloud DNS namespace with compile-time validation
 * Only includes record types supported by GCloud
 */
export namespace GCloud {
  // Standard record types
  export function A(name: string, address: IpAddress, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function AAAA(name: string, address: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
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
  export function SSHFP(name: string, algorithm: SshfpAlgorithm, fptype: SshfpFingerprintType, fingerprint: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function SVCB(name: string, priority: number, target: string, params: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TLSA(name: string, usage: TlsaCertUsage, selector: TlsaSelector, matchingType: TlsaMatchingType, certificate: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
  export function TXT(name: string, content: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;
}
