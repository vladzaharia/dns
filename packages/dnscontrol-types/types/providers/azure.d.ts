/**
 * DNSControl Azure Provider Types
 * Azure DNS and Azure Private DNS specific functions
 *
 * @provider AZUREDNS, AZUREPRIVATEDNS
 * @maintainer @vatsalyagoel
 *
 * ## Capabilities (Azure DNS)
 *
 * ### Supported Record Types
 * - ✅ A, AAAA, CNAME, MX, NS, TXT, SOA, PTR
 * - ✅ CAA (Certificate Authority Authorization)
 * - ✅ SRV (Service records)
 * - ❌ SSHFP (not supported)
 * - ❌ TLSA (not supported)
 * - ❌ NAPTR (not supported)
 * - ❌ LOC (not supported)
 * - ❌ HTTPS/SVCB (not supported)
 *
 * ### Features
 * - ❌ Auto DNSSEC: Not supported
 * - ✅ Can Create Domains: Yes
 * - ✅ Dual Host: Yes
 * - ✅ Officially Supported: Yes
 * - ✅ Can Concur: Yes (concurrent operations)
 * - ✅ Can Get Zones: Yes
 *
 * ### Custom Record Types
 * - **AZURE_ALIAS**: Azure resource aliases (Traffic Manager, CDN, Public IP, etc.)
 *
 * ## Capabilities (Azure Private DNS)
 *
 * Similar to Azure DNS but for private/internal DNS zones within Azure VNets.
 * Also supports AZURE_ALIAS for private endpoints and other Azure resources.
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />
/// <reference path="../records.d.ts" />
/// <reference path="../base-capabilities.d.ts" />

import type { BaseProviderCapabilities } from "../base-capabilities";

// =============================================================================
// AZURE CAPABILITIES
// =============================================================================

/**
 * Azure DNS provider capability interface
 * Extends BaseProviderCapabilities to inherit documentation
 */
export interface AzureCapabilities extends BaseProviderCapabilities {
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
  canUseHTTPS: false;
  canUseLOC: false;
  canUseNAPTR: false;
  canUseOPENPGPKEY: false;
  canUseSMIMEA: false;
  canUseSSHFP: false;
  canUseSVCB: false;
  canUseTLSA: false;

  // Pseudo record types
  canUseALIAS: true; // Via AZURE_ALIAS
  canUseDHCID: false;
  canUseFRAME: false;
  canUseRP: false;
  canUseURL: false;
  canUseURL301: false;

  // Azure-specific
  canUseAzureAlias: true;

  // Features
  canAutoDNSSEC: false;
  canCreateDomains: true;
  canDualHost: true;
  canGetZones: true;
  canConcur: true;
  docOfficiallySupported: true;
}

// =============================================================================
// AZURE NAMESPACE (STRICT MODE)
// =============================================================================

/**
 * Azure namespace with compile-time validation
 * Only includes record types supported by Azure DNS
 *
 * @example
 * ```typescript
 * D("example.com", REG_NONE, DnsProvider(DSP_AZUREDNS),
 *   Azure.A("@", "1.2.3.4"),
 *   Azure.CAA("@", "issue", "letsencrypt.org"),
 *   Azure.AZURE_ALIAS("www", "A", "/subscriptions/.../publicIPAddresses/myIP")
 * );
 * ```
 *
 * @note Azure does NOT support: SSHFP, TLSA, NAPTR, LOC, HTTPS, SVCB, DNAME,
 *       DNSKEY, DS, OPENPGPKEY, SMIMEA
 */
export namespace Azure {
  // Supported record types
  export function A(
    name: string,
    address: IpAddress,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function AAAA(
    name: string,
    address: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function CAA(
    name: string,
    tag: CaaTag,
    value: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function CNAME(
    name: string,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function MX(
    name: string,
    priority: number,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function NS(
    name: string,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function PTR(
    name: string,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function SOA(
    name: string,
    mname: string,
    rname: string,
    serial: number,
    refresh: number,
    retry: number,
    expire: number,
    minimum: number,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function SRV(
    name: string,
    priority: number,
    weight: number,
    port: number,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;
  export function TXT(
    name: string,
    ...contents: (string | RecordModifier | RecordMeta)[]
  ): DomainModifier;

  // Azure-specific functions
  export function AZURE_ALIAS(
    name: string,
    type: AzureAliasType,
    target: string,
    ...modifiers: (RecordModifier | RecordMeta)[]
  ): DomainModifier;

  // Note: SSHFP, TLSA, NAPTR, LOC, HTTPS, SVCB, DNAME, DNSKEY, DS,
  // OPENPGPKEY, SMIMEA are NOT available
}

// =============================================================================
// AZURE DNS ALIAS (GLOBAL FUNCTIONS)
// =============================================================================

/** Azure alias target resource types */
type AzureAliasType = "A" | "AAAA" | "CNAME";

/**
 * AZURE_ALIAS() creates an Azure DNS alias record.
 * Alias records point to Azure resources like Traffic Manager, CDN, Public IP.
 * @param name - Record name
 * @param type - Alias record type (A, AAAA, or CNAME)
 * @param target - Target Azure resource ID
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/azure/azure_alias
 */
declare function AZURE_ALIAS(
  name: string,
  type: AzureAliasType,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;
