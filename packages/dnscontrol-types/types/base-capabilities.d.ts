/**
 * DNSControl Base Provider Capabilities
 *
 * This module defines the foundational types for provider capabilities.
 * It is designed to be imported by provider files WITHOUT creating circular
 * dependencies.
 *
 * Dependency chain:
 *   base.d.ts → base-capabilities.d.ts → providers/*.d.ts → provider-capabilities.d.ts
 *
 * @packageDocumentation
 */

/// <reference path="./base.d.ts" />

// =============================================================================
// DNS RECORD TYPE DEFINITIONS
// =============================================================================

/**
 * Standard DNS record types supported by most providers.
 * These are the core record types defined in RFC 1035 and common extensions.
 */
export type StandardRecordType =
  | "A" // IPv4 address (RFC 1035)
  | "AAAA" // IPv6 address (RFC 3596)
  | "CNAME" // Canonical name (RFC 1035)
  | "MX" // Mail exchange (RFC 1035)
  | "NS" // Nameserver (RFC 1035)
  | "PTR" // Pointer (RFC 1035)
  | "SOA" // Start of authority (RFC 1035)
  | "SRV" // Service locator (RFC 2782)
  | "TXT"; // Text (RFC 1035)

/**
 * Extended DNS record types (not all providers support these).
 * These are newer or specialized record types.
 */
export type ExtendedRecordType =
  | "CAA" // Certificate Authority Authorization (RFC 6844)
  | "DNAME" // Delegation name (RFC 6672)
  | "DNSKEY" // DNSSEC public key (RFC 4034)
  | "DS" // Delegation signer (RFC 4034)
  | "HTTPS" // HTTPS service binding (RFC 9460)
  | "LOC" // Geographic location (RFC 1876)
  | "NAPTR" // Naming authority pointer (RFC 3403)
  | "OPENPGPKEY" // OpenPGP public key (RFC 7929)
  | "SMIMEA" // S/MIME certificate association (RFC 8162)
  | "SSHFP" // SSH fingerprint (RFC 4255)
  | "SVCB" // Service binding (RFC 9460)
  | "TLSA"; // TLS authentication (RFC 6698)

/**
 * Pseudo/Provider-specific record types.
 * These are not standard DNS records but are supported by specific providers.
 */
export type PseudoRecordType =
  | "ALIAS" // ANAME/flattened CNAME at apex
  | "DHCID" // DHCP identifier (RFC 4701)
  | "FRAME" // Frame/masking redirect (provider-specific)
  | "RP" // Responsible person (RFC 1183)
  | "URL" // 302 redirect (provider-specific)
  | "URL301"; // 301 redirect (provider-specific)

/**
 * All DNS record types supported by DNSControl.
 */
export type AllRecordTypes =
  | StandardRecordType
  | ExtendedRecordType
  | PseudoRecordType;

// =============================================================================
// PROVIDER NAME DEFINITIONS
// =============================================================================

/**
 * All DNS provider names supported by DNSControl.
 * This is the canonical list of provider identifiers.
 */
export type ProviderName =
  // Tier 1: Major cloud providers
  | "AKAMAIEDGEDNS"
  | "AZUREDNS"
  | "AZUREPRIVATEDNS"
  | "CLOUDFLAREAPI"
  | "GCLOUD"
  | "ROUTE53"
  // Tier 1: DNS service providers
  | "BUNNYDNS"
  | "CLOUDNS"
  | "DESEC"
  | "DNSIMPLE"
  | "GANDI_V5"
  | "HEDNS"
  | "NAMECHEAP"
  | "NETLIFY"
  | "NS1"
  | "PORKBUN"
  | "POWERDNS"
  // Tier 2: Full-featured providers
  | "DIGITALOCEAN"
  | "DOMAINNAMESHOP"
  | "EXOSCALE"
  | "GCORE"
  | "HETZNER"
  | "HETZNER_V2"
  | "HOSTINGDE"
  | "HUAWEICLOUD"
  | "INWX"
  | "LINODE"
  | "NAMEDOTCOM"
  | "NETCUP"
  | "ORACLE"
  | "OVH"
  | "PACKETFRAME"
  | "REALTIMEREGISTER"
  | "SAKURACLOUD"
  | "TRANSIP"
  | "VULTR"
  // Tier 3: Standard providers
  | "ADGUARDHOME"
  | "ALIDNS"
  | "AUTODNS"
  | "AXFRDDNS"
  | "BIND"
  | "CNR"
  | "CSCGLOBAL"
  | "DNSMADEEASY"
  | "DNSOVERHTTPS"
  | "DNSCALE"
  | "DYNADOT"
  | "EASYNAME"
  | "FORTIGATE"
  | "HEXONET"
  | "JOKER"
  | "LOOPIA"
  | "LUADNS"
  | "MYTHICBEASTS"
  | "RWTH"
  | "SOFTLAYER"
  | "VERCEL"
  // Tier 4: Basic/Registrar providers
  | "INTERNETBS"
  | "OPENSRS";

// =============================================================================
// BASE PROVIDER CAPABILITIES INTERFACE
// =============================================================================

/**
 * Base interface for provider capabilities.
 *
 * **All provider capability interfaces MUST extend this interface.**
 *
 * Each `canUseX` property indicates whether the provider supports that record
 * type. Provider implementations should use literal types `true` or `false`
 * to enable compile-time validation.
 *
 * @example
 * ```typescript
 * // In providers/myprovider.d.ts:
 * import { BaseProviderCapabilities } from '../base-capabilities';
 *
 * export interface MyProviderCapabilities extends BaseProviderCapabilities {
 *   canUseA: true;
 *   canUseAAAA: true;
 *   canUseCAA: false;  // Explicitly not supported
 *   // ... must define ALL fields from base
 * }
 * ```
 *
 * @remarks
 * When a new record type is added to this interface, TypeScript will error
 * on all provider capability interfaces until they explicitly define support.
 */
export interface BaseProviderCapabilities {
  // ---------------------------------------------------------------------------
  // Standard Record Types (RFC 1035 and common extensions)
  // ---------------------------------------------------------------------------

  /**
   * Supports A records (IPv4 addresses).
   * @see {@link https://datatracker.ietf.org/doc/html/rfc1035 | RFC 1035}
   */
  canUseA: boolean;

  /**
   * Supports AAAA records (IPv6 addresses).
   * @see {@link https://datatracker.ietf.org/doc/html/rfc3596 | RFC 3596}
   */
  canUseAAAA: boolean;

  /**
   * Supports CNAME records (canonical name/alias).
   * @see {@link https://datatracker.ietf.org/doc/html/rfc1035 | RFC 1035}
   */
  canUseCNAME: boolean;

  /**
   * Supports MX records (mail exchange).
   * @see {@link https://datatracker.ietf.org/doc/html/rfc1035 | RFC 1035}
   */
  canUseMX: boolean;

  /**
   * Supports NS records (nameserver delegation).
   * @see {@link https://datatracker.ietf.org/doc/html/rfc1035 | RFC 1035}
   */
  canUseNS: boolean;

  /**
   * Supports PTR records (reverse DNS lookups).
   * @see {@link https://datatracker.ietf.org/doc/html/rfc1035 | RFC 1035}
   */
  canUsePTR: boolean;

  /**
   * Supports SOA records (start of authority).
   * Note: Many providers manage SOA automatically.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc1035 | RFC 1035}
   */
  canUseSOA: boolean;

  /**
   * Supports SRV records (service locator).
   * @see {@link https://datatracker.ietf.org/doc/html/rfc2782 | RFC 2782}
   */
  canUseSRV: boolean;

  /**
   * Supports TXT records (text strings).
   * @see {@link https://datatracker.ietf.org/doc/html/rfc1035 | RFC 1035}
   */
  canUseTXT: boolean;

  // ---------------------------------------------------------------------------
  // Extended Record Types
  // ---------------------------------------------------------------------------

  /**
   * Supports CAA records (Certificate Authority Authorization).
   * Controls which CAs can issue certificates for the domain.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc6844 | RFC 6844}
   */
  canUseCAA: boolean;

  /**
   * Supports DNAME records (delegation name).
   * Redirects an entire subtree of the DNS name space.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc6672 | RFC 6672}
   */
  canUseDNAME: boolean;

  /**
   * Supports DNSKEY records (DNSSEC public keys).
   * Contains the public key used for DNSSEC validation.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc4034 | RFC 4034}
   */
  canUseDNSKEY: boolean;

  /**
   * Supports DS records (delegation signer).
   * Links parent and child zones in DNSSEC.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc4034 | RFC 4034}
   */
  canUseDS: boolean;

  /**
   * Supports HTTPS records (HTTPS service binding).
   * Provides connection parameters for HTTPS services.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc9460 | RFC 9460}
   */
  canUseHTTPS: boolean;

  /**
   * Supports LOC records (geographic location).
   * Specifies the physical location of a domain.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc1876 | RFC 1876}
   */
  canUseLOC: boolean;

  /**
   * Supports NAPTR records (naming authority pointer).
   * Used for ENUM and other advanced DNS applications.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc3403 | RFC 3403}
   */
  canUseNAPTR: boolean;

  /**
   * Supports OPENPGPKEY records (OpenPGP public keys).
   * Publishes OpenPGP public keys in DNS.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc7929 | RFC 7929}
   */
  canUseOPENPGPKEY: boolean;

  /**
   * Supports SMIMEA records (S/MIME certificate association).
   * Associates S/MIME certificates with domain names.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc8162 | RFC 8162}
   */
  canUseSMIMEA: boolean;

  /**
   * Supports SSHFP records (SSH fingerprints).
   * Publishes SSH host key fingerprints in DNS.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc4255 | RFC 4255}
   */
  canUseSSHFP: boolean;

  /**
   * Supports SVCB records (service binding).
   * General-purpose service binding for any scheme.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc9460 | RFC 9460}
   */
  canUseSVCB: boolean;

  /**
   * Supports TLSA records (TLS authentication/DANE).
   * Associates TLS certificates with domain names.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc6698 | RFC 6698}
   */
  canUseTLSA: boolean;

  // ---------------------------------------------------------------------------
  // Pseudo/Provider-Specific Record Types
  // ---------------------------------------------------------------------------

  /**
   * Supports ALIAS records (ANAME/flattened CNAME at apex).
   * Provider-specific implementation of CNAME-like behavior at zone apex.
   * @remarks Not a standard DNS record type; implementation varies by provider.
   */
  canUseALIAS: boolean;

  /**
   * Supports DHCID records (DHCP identifier).
   * Associates DHCP client identifiers with DNS names.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc4701 | RFC 4701}
   */
  canUseDHCID: boolean;

  /**
   * Supports FRAME records (frame/masking redirect).
   * Displays target URL in a frame while preserving the original URL.
   * @remarks Provider-specific; not a standard DNS record type.
   */
  canUseFRAME: boolean;

  /**
   * Supports RP records (responsible person).
   * Identifies the responsible person for a domain.
   * @see {@link https://datatracker.ietf.org/doc/html/rfc1183 | RFC 1183}
   */
  canUseRP: boolean;

  /**
   * Supports URL records (302 temporary redirect).
   * Redirects HTTP requests with a 302 status code.
   * @remarks Provider-specific; not a standard DNS record type.
   */
  canUseURL: boolean;

  /**
   * Supports URL301 records (301 permanent redirect).
   * Redirects HTTP requests with a 301 status code.
   * @remarks Provider-specific; not a standard DNS record type.
   */
  canUseURL301: boolean;

  // ---------------------------------------------------------------------------
  // Provider Features
  // ---------------------------------------------------------------------------

  /**
   * Supports automatic DNSSEC management.
   * Provider can automatically sign zones and manage DNSSEC keys.
   */
  canAutoDNSSEC: boolean;

  /**
   * Can create new domains/zones via API.
   * If false, zones must be created manually in the provider's console.
   */
  canCreateDomains: boolean;

  /**
   * Supports dual hosting (multiple DNS providers for same zone).
   * Allows the zone to be served by multiple providers simultaneously.
   */
  canDualHost: boolean;

  /**
   * Can retrieve list of zones via API.
   * Enables `get-zones` command functionality.
   */
  canGetZones: boolean;

  /**
   * Supports concurrent API operations.
   * Enables parallel processing for faster updates.
   */
  canConcur: boolean;

  /**
   * Officially supported by DNSControl maintainers.
   * Providers marked true receive priority bug fixes and testing.
   */
  docOfficiallySupported: boolean;
}
