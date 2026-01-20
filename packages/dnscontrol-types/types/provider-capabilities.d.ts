/**
 * DNSControl Provider Capabilities
 *
 * This module aggregates and re-exports provider capabilities.
 * It provides:
 * 1. Re-exports from base-capabilities.d.ts (record types, base interface)
 * 2. Provider capability registry
 * 3. Type-safe utility types for provider validation
 * 4. Re-exports of all provider namespaces and capabilities
 *
 * Dependency chain (no circular dependencies):
 *   base.d.ts → base-capabilities.d.ts → providers/*.d.ts → provider-capabilities.d.ts
 *
 * @packageDocumentation
 */

/// <reference path="./base.d.ts" />
/// <reference path="./records.d.ts" />
/// <reference path="./base-capabilities.d.ts" />
/// <reference path="./providers/index.d.ts" />

// =============================================================================
// IMPORT BASE TYPES (for use in this file)
// =============================================================================

import type {
  StandardRecordType as _StandardRecordType,
  ExtendedRecordType as _ExtendedRecordType,
  PseudoRecordType as _PseudoRecordType,
  AllRecordTypes as _AllRecordTypes,
  ProviderName as _ProviderName,
  BaseProviderCapabilities as _BaseProviderCapabilities,
} from "./base-capabilities";

// =============================================================================
// RE-EXPORT FROM BASE-CAPABILITIES
// =============================================================================

/**
 * Re-export all types from base-capabilities.d.ts
 * These are the foundational types that providers extend
 */
export type StandardRecordType = _StandardRecordType;
export type ExtendedRecordType = _ExtendedRecordType;
export type PseudoRecordType = _PseudoRecordType;
export type AllRecordTypes = _AllRecordTypes;
export type ProviderName = _ProviderName;
export type BaseProviderCapabilities = _BaseProviderCapabilities;

/**
 * Partial capabilities interface for providers that don't need all flags
 * Use this when defining capabilities for providers with limited support
 */
export type PartialProviderCapabilities = Partial<_BaseProviderCapabilities>;

// =============================================================================
// PROVIDER CAPABILITY REGISTRY
// =============================================================================

/**
 * Registry mapping provider names to their capability interfaces
 * This enables type-safe provider configuration and validation
 *
 * To add a new provider to the registry:
 * 1. Create the provider file in providers/xxx.d.ts
 * 2. Define XxxCapabilities interface extending BaseProviderCapabilities
 * 3. Add the provider to this registry type
 *
 * @example
 * ```typescript
 * // In your provider file:
 * export interface MyProviderCapabilities extends BaseProviderCapabilities {
 *   canUseA: true;
 *   canUseAAAA: true;
 *   // ... define all capabilities
 * }
 *
 * // Then add to registry:
 * MYPROVIDER: MyProviderCapabilities;
 * ```
 */
export type ProviderCapabilityRegistry = {
  // Tier 1: Major cloud providers
  CLOUDFLAREAPI: import("./providers/cloudflare").CloudflareCapabilities;
  ROUTE53: import("./providers/route53").Route53Capabilities;
  AZUREDNS: import("./providers/azure").AzureCapabilities;
  GCLOUD: import("./providers/gcloud").GCloudCapabilities;

  // Tier 1: DNS service providers
  AKAMAIEDGEDNS: import("./providers/akamai").AkamaiCapabilities;
  BUNNYDNS: import("./providers/bunnydns").BunnyDnsCapabilities;
  CLOUDNS: import("./providers/cloudns").ClouDnsCapabilities;
  DESEC: import("./providers/desec").DesecCapabilities;
  DNSIMPLE: import("./providers/dnsimple").DnsimpleCapabilities;
  GANDIV5: import("./providers/gandi").GandiCapabilities;
  HEDNS: import("./providers/hedns").HednsCapabilities;
  NAMECHEAP: import("./providers/namecheap").NamecheapCapabilities;
  NETLIFY: import("./providers/netlify").NetlifyCapabilities;
  NS1: import("./providers/ns1").Ns1Capabilities;
  PORKBUN: import("./providers/porkbun").PorkbunCapabilities;
  POWERDNS: import("./providers/powerdns").PowerdnsCapabilities;

  // Tier 2: Full-featured providers
  DIGITALOCEAN: import("./providers/digitalocean").DigitalOceanCapabilities;
  DOMAINNAMESHOP: import("./providers/domainnameshop").DomainnameshopCapabilities;
  EXOSCALE: import("./providers/exoscale").ExoscaleCapabilities;
  GCORE: import("./providers/gcore").GcoreCapabilities;
  HETZNER: import("./providers/hetzner").HetznerCapabilities;
  HETZNERV2: import("./providers/hetznerv2").Hetznerv2Capabilities;
  HOSTINGDE: import("./providers/hostingde").HostingdeCapabilities;
  INWX: import("./providers/inwx").InwxCapabilities;
  LINODE: import("./providers/linode").LinodeCapabilities;
  LUADNS: import("./providers/luadns").LuadnsCapabilities;
  OVH: import("./providers/ovh").OvhCapabilities;
  PACKETFRAME: import("./providers/packetframe").PacketframeCapabilities;
  TRANSIP: import("./providers/transip").TransipCapabilities;
  VERCEL: import("./providers/vercel").VercelCapabilities;
  VULTR: import("./providers/vultr").VultrCapabilities;

  // Tier 3: Standard providers
  ADGUARDHOME: import("./providers/adguardhome").AdguardhomeCapabilities;
  ALIDNS: import("./providers/alidns").AlidnsCapabilities;
  AUTODNS: import("./providers/autodns").AutodnsCapabilities;
  AXFRDDNS: import("./providers/axfrddns").AxfrddnsCapabilities;
  BIND: import("./providers/bind").BindCapabilities;
  CNR: import("./providers/cnr").CnrCapabilities;
  CSCGLOBAL: import("./providers/cscglobal").CscglobalCapabilities;
  DNSMADEEASY: import("./providers/dnsmadeeasy").DnsmadeeasyCapabilities;
  DNSOVERHTTPS: import("./providers/dnsoverhttps").DnsoverhttpsCapabilities;
  DNSCALE: import("./providers/dnscale").DnscaleCapabilities;
  DYNADOT: import("./providers/dynadot").DynadotCapabilities;
  EASYNAME: import("./providers/easyname").EasynameCapabilities;
  FORTIGATE: import("./providers/fortigate").FortigateCapabilities;
  HEXONET: import("./providers/hexonet").HexonetCapabilities;
  HUAWEICLOUD: import("./providers/huaweicloud").HuaweicloudCapabilities;
  JOKER: import("./providers/joker").JokerCapabilities;
  LOOPIA: import("./providers/loopia").LoopiaCapabilities;
  MYTHICBEASTS: import("./providers/mythicbeasts").MythicbeastsCapabilities;
  NAMEDOTCOM: import("./providers/namedotcom").NamedotcomCapabilities;
  NETCUP: import("./providers/netcup").NetcupCapabilities;
  ORACLE: import("./providers/oracle").OracleCapabilities;
  REALTIMEREGISTER: import("./providers/realtimeregister").RealtimeregisterCapabilities;
  RWTH: import("./providers/rwth").RwthCapabilities;
  SAKURACLOUD: import("./providers/sakuracloud").SakuracloudCapabilities;
  SOFTLAYER: import("./providers/softlayer").SoftlayerCapabilities;

  // Tier 4: Basic/Registrar providers
  INTERNETBS: import("./providers/internetbs").InternetbsCapabilities;
  OPENSRS: import("./providers/opensrs").OpensrsCapabilities;
};

// =============================================================================
// TYPE-SAFE PROVIDER UTILITIES
// =============================================================================

/**
 * Extract supported record types from a provider's capabilities
 *
 * @example
 * ```typescript
 * type CloudflareRecords = SupportedRecordTypes<CloudflareCapabilities>;
 * // Results in: "A" | "AAAA" | "CAA" | "CNAME" | ... (all supported types)
 * ```
 */
export type SupportedRecordTypes<C extends BaseProviderCapabilities> = {
  [K in keyof C]: K extends `canUse${infer R}`
    ? C[K] extends true
      ? R
      : never
    : never;
}[keyof C];

/**
 * Extract unsupported record types from a provider's capabilities
 *
 * @example
 * ```typescript
 * type PacketframeUnsupported = UnsupportedRecordTypes<PacketframeCapabilities>;
 * // Results in: "PTR" | "SSHFP" | "TLSA" | ... (all unsupported types)
 * ```
 */
export type UnsupportedRecordTypes<C extends BaseProviderCapabilities> = {
  [K in keyof C]: K extends `canUse${infer R}`
    ? C[K] extends false
      ? R
      : never
    : never;
}[keyof C];

/**
 * Validate that a record type is supported by a provider
 * Returns the record type if supported, never if not
 *
 * @example
 * ```typescript
 * type Valid = ValidateRecordType<CloudflareCapabilities, "CAA">; // "CAA"
 * type Invalid = ValidateRecordType<PacketframeCapabilities, "TLSA">; // never
 * ```
 */
export type ValidateRecordType<
  C extends BaseProviderCapabilities,
  R extends string
> = R extends SupportedRecordTypes<C> ? R : never;

/**
 * Provider-aware record type that provides helpful error messages
 * Returns DomainModifier if valid, or an error object if not
 *
 * @example
 * ```typescript
 * type Valid = ProviderAwareRecord<CloudflareCapabilities, "CAA">; // DomainModifier
 * type Invalid = ProviderAwareRecord<PacketframeCapabilities, "TLSA">;
 * // { _error: "Record type 'TLSA' is not supported"; _supportedTypes: ... }
 * ```
 */
export type ProviderAwareRecord<
  C extends BaseProviderCapabilities,
  R extends string
> = ValidateRecordType<C, R> extends never
  ? {
      _error: `Record type '${R}' is not supported by this provider`;
      _supportedTypes: SupportedRecordTypes<C>;
    }
  : DomainModifier;

/**
 * Check if a provider supports a specific feature
 *
 * @example
 * ```typescript
 * type HasDNSSEC = SupportsFeature<CloudflareCapabilities, "canAutoDNSSEC">; // true
 * type HasDNSSEC2 = SupportsFeature<PacketframeCapabilities, "canAutoDNSSEC">; // false
 * ```
 */
export type SupportsFeature<
  C extends BaseProviderCapabilities,
  F extends keyof BaseProviderCapabilities
> = C[F] extends true ? true : false;

// =============================================================================
// PROVIDER CONFIGURATION TYPES
// =============================================================================

/**
 * Type-safe provider configuration
 */
export interface ProviderConfig<P extends ProviderName> {
  /** Provider identifier */
  provider: P;
  /** Provider-specific configuration options */
  config?: Record<string, unknown>;
  /** Override default record type restrictions */
  allowedRecordTypes?: AllRecordTypes[];
}

/**
 * Provider metadata for NewDnsProvider() and NewRegistrar()
 */
export interface ProviderMetadata {
  /** Provider name/identifier */
  name: string;
  /** Provider-specific configuration */
  [key: string]: unknown;
}

// =============================================================================
// CAPABILITY-BASED RECORD FILTERING
// =============================================================================

/**
 * Filter record functions based on provider capabilities
 * Creates a type-safe subset of record functions for each provider
 *
 * @example
 * ```typescript
 * type CloudflareRecords = RecordFunctionsForProvider<CloudflareCapabilities>;
 * // { A: typeof A; AAAA: typeof AAAA; CAA: typeof CAA; ... }
 * ```
 */
export type RecordFunctionsForProvider<C extends BaseProviderCapabilities> = {
  [K in AllRecordTypes as `canUse${K}` extends keyof C
    ? C[`canUse${K}` & keyof C] extends true
      ? K
      : never
    : never]: K extends "A"
    ? typeof A
    : K extends "AAAA"
    ? typeof AAAA
    : K extends "CAA"
    ? typeof CAA
    : K extends "CNAME"
    ? typeof CNAME
    : K extends "DNAME"
    ? typeof DNAME
    : K extends "DNSKEY"
    ? typeof DNSKEY
    : K extends "DS"
    ? typeof DS
    : K extends "HTTPS"
    ? typeof HTTPS
    : K extends "LOC"
    ? typeof LOC
    : K extends "MX"
    ? typeof MX
    : K extends "NAPTR"
    ? typeof NAPTR
    : K extends "NS"
    ? typeof NS
    : K extends "PTR"
    ? typeof PTR
    : K extends "SOA"
    ? typeof SOA
    : K extends "SRV"
    ? typeof SRV
    : K extends "SSHFP"
    ? typeof SSHFP
    : K extends "SVCB"
    ? typeof SVCB
    : K extends "TLSA"
    ? typeof TLSA
    : K extends "TXT"
    ? typeof TXT
    : K extends "ALIAS"
    ? typeof ALIAS
    : never;
};

// =============================================================================
// RE-EXPORT PROVIDER NAMESPACES AND CAPABILITIES
// =============================================================================

/**
 * Re-export provider namespaces for easy access
 * Each namespace contains only the record types supported by that provider
 */
// Tier 1: Major cloud providers
export { Cloudflare } from './providers/cloudflare';
export { Route53 } from './providers/route53';
export { Azure } from './providers/azure';
export { GCloud } from './providers/gcloud';

// Tier 1: DNS service providers
export { Akamai } from './providers/akamai';
export { BunnyDns } from './providers/bunnydns';
export { ClouDns } from './providers/cloudns';
export { Desec } from './providers/desec';
export { Dnsimple } from './providers/dnsimple';
export { Gandi } from './providers/gandi';
export { Hedns } from './providers/hedns';
export { Namecheap } from './providers/namecheap';
export { Netlify } from './providers/netlify';
export { Ns1 } from './providers/ns1';
export { Porkbun } from './providers/porkbun';
export { Powerdns } from './providers/powerdns';

// Tier 2: Full-featured providers
export { DigitalOcean } from './providers/digitalocean';
export { Domainnameshop } from './providers/domainnameshop';
export { Exoscale } from './providers/exoscale';
export { Gcore } from './providers/gcore';
export { Hetzner } from './providers/hetzner';
export { Hetznerv2 } from './providers/hetznerv2';
export { Hostingde } from './providers/hostingde';
export { Inwx } from './providers/inwx';
export { Linode } from './providers/linode';
export { Luadns } from './providers/luadns';
export { Ovh } from './providers/ovh';
export { Packetframe } from './providers/packetframe';
export { Transip } from './providers/transip';
export { Vercel } from './providers/vercel';
export { Vultr } from './providers/vultr';

// Tier 3: Standard providers
export { Adguardhome } from './providers/adguardhome';
export { Alidns } from './providers/alidns';
export { Autodns } from './providers/autodns';
export { Axfrddns } from './providers/axfrddns';
export { Bind } from './providers/bind';
export { Cnr } from './providers/cnr';
export { Cscglobal } from './providers/cscglobal';
export { Dnsmadeeasy } from './providers/dnsmadeeasy';
export { Dnsoverhttps } from './providers/dnsoverhttps';
export { Dnscale } from './providers/dnscale';
export { Dynadot } from './providers/dynadot';
export { Easyname } from './providers/easyname';
export { Fortigate } from './providers/fortigate';
export { Hexonet } from './providers/hexonet';
export { Huaweicloud } from './providers/huaweicloud';
export { Joker } from './providers/joker';
export { Loopia } from './providers/loopia';
export { Mythicbeasts } from './providers/mythicbeasts';
export { Namedotcom } from './providers/namedotcom';
export { Netcup } from './providers/netcup';
export { Oracle } from './providers/oracle';
export { Realtimeregister } from './providers/realtimeregister';
export { Rwth } from './providers/rwth';
export { Sakuracloud } from './providers/sakuracloud';
export { Softlayer } from './providers/softlayer';

// Tier 4: Basic/Registrar providers
export { Internetbs } from './providers/internetbs';
export { Opensrs } from './providers/opensrs';

/**
 * Re-export provider capability interfaces
 */
// Tier 1: Major cloud providers
export type { CloudflareCapabilities } from './providers/cloudflare';
export type { Route53Capabilities } from './providers/route53';
export type { AzureCapabilities } from './providers/azure';
export type { GCloudCapabilities } from './providers/gcloud';

// Tier 1: DNS service providers
export type { AkamaiCapabilities } from './providers/akamai';
export type { BunnyDnsCapabilities } from './providers/bunnydns';
export type { ClouDnsCapabilities } from './providers/cloudns';
export type { DesecCapabilities } from './providers/desec';
export type { DnsimpleCapabilities } from './providers/dnsimple';
export type { GandiCapabilities } from './providers/gandi';
export type { HednsCapabilities } from './providers/hedns';
export type { NamecheapCapabilities } from './providers/namecheap';
export type { NetlifyCapabilities } from './providers/netlify';
export type { Ns1Capabilities } from './providers/ns1';
export type { PorkbunCapabilities } from './providers/porkbun';
export type { PowerdnsCapabilities } from './providers/powerdns';

// Tier 2: Full-featured providers
export type { DigitalOceanCapabilities } from './providers/digitalocean';
export type { DomainnameshopCapabilities } from './providers/domainnameshop';
export type { ExoscaleCapabilities } from './providers/exoscale';
export type { GcoreCapabilities } from './providers/gcore';
export type { HetznerCapabilities } from './providers/hetzner';
export type { Hetznerv2Capabilities } from './providers/hetznerv2';
export type { HostingdeCapabilities } from './providers/hostingde';
export type { InwxCapabilities } from './providers/inwx';
export type { LinodeCapabilities } from './providers/linode';
export type { LuadnsCapabilities } from './providers/luadns';
export type { OvhCapabilities } from './providers/ovh';
export type { PacketframeCapabilities } from './providers/packetframe';
export type { TransipCapabilities } from './providers/transip';
export type { VercelCapabilities } from './providers/vercel';
export type { VultrCapabilities } from './providers/vultr';

// Tier 3: Standard providers
export type { AdguardhomeCapabilities } from './providers/adguardhome';
export type { AlidnsCapabilities } from './providers/alidns';
export type { AutodnsCapabilities } from './providers/autodns';
export type { AxfrddnsCapabilities } from './providers/axfrddns';
export type { BindCapabilities } from './providers/bind';
export type { CnrCapabilities } from './providers/cnr';
export type { CscglobalCapabilities } from './providers/cscglobal';
export type { DnsmadeeasyCapabilities } from './providers/dnsmadeeasy';
export type { DnsoverhttpsCapabilities } from './providers/dnsoverhttps';
export type { DnscaleCapabilities } from './providers/dnscale';
export type { DynadotCapabilities } from './providers/dynadot';
export type { EasynameCapabilities } from './providers/easyname';
export type { FortigateCapabilities } from './providers/fortigate';
export type { HexonetCapabilities } from './providers/hexonet';
export type { HuaweicloudCapabilities } from './providers/huaweicloud';
export type { JokerCapabilities } from './providers/joker';
export type { LoopiaCapabilities } from './providers/loopia';
export type { MythicbeastsCapabilities } from './providers/mythicbeasts';
export type { NamedotcomCapabilities } from './providers/namedotcom';
export type { NetcupCapabilities } from './providers/netcup';
export type { OracleCapabilities } from './providers/oracle';
export type { RealtimeregisterCapabilities } from './providers/realtimeregister';
export type { RwthCapabilities } from './providers/rwth';
export type { SakuracloudCapabilities } from './providers/sakuracloud';
export type { SoftlayerCapabilities } from './providers/softlayer';

// Tier 4: Basic/Registrar providers
export type { InternetbsCapabilities } from './providers/internetbs';
export type { OpensrsCapabilities } from './providers/opensrs';
