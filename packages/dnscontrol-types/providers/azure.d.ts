/**
 * DNSControl Azure Provider Types
 * Azure DNS and Azure Private DNS specific functions
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />

// =============================================================================
// AZURE DNS ALIAS
// =============================================================================

/** Azure alias target resource types */
type AzureAliasType =
  | "A"
  | "AAAA"
  | "CNAME";

/**
 * AZURE_ALIAS() creates an Azure DNS alias record.
 * Alias records point to Azure resources like Traffic Manager, CDN, Public IP, etc.
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

