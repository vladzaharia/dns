/**
 * DNSControl Builder Functions
 * Helper functions that generate multiple DNS records
 *
 * @packageDocumentation
 */

/// <reference path="base.d.ts" />

// =============================================================================
// CAA BUILDER
// =============================================================================

/** CAA Builder configuration */
interface CaaBuilderConfig {
  /** Record name (default: "@") */
  label?: string;
  /** CA domains authorized for standard certificates */
  issue?: string[];
  /** CA domains authorized for wildcard certificates */
  issuewild?: string[];
  /** URLs for violation reports */
  iodef?: string[];
  /** Contact email addresses */
  iodef_email?: string[];
  /** Set critical flag on all records */
  critical?: boolean;
  /** TTL for CAA records */
  ttl?: Ttl;
}

/**
 * CAA_BUILDER() generates CAA records from a configuration object.
 * @param config - CAA configuration
 * @returns Array of CAA domain modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/caa_builder
 */
declare function CAA_BUILDER(config: CaaBuilderConfig): DomainModifier[];

// =============================================================================
// DKIM BUILDER
// =============================================================================

/** DKIM Builder configuration */
interface DkimBuilderConfig {
  /** DKIM selector (e.g., "selector1", "google") */
  selector: string;
  /** Public key (base64 encoded, can span multiple lines) */
  key: string;
  /** Record name label (default: constructs from selector + "_domainkey") */
  label?: string;
  /** Hash algorithm (default: "sha256") */
  hash?: "sha1" | "sha256";
  /** Key type (default: "rsa") */
  keyType?: "rsa" | "ed25519";
  /** Flags (e.g., "y" for testing) */
  flags?: string;
  /** Service type (default: "*" for all) */
  serviceType?: string;
  /** Notes/comments */
  notes?: string;
  /** TTL for DKIM record */
  ttl?: Ttl;
}

/**
 * DKIM_BUILDER() generates DKIM TXT record(s).
 * @param config - DKIM configuration
 * @returns DKIM TXT record modifier
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/dkim_builder
 */
declare function DKIM_BUILDER(config: DkimBuilderConfig): DomainModifier;

// =============================================================================
// DMARC BUILDER
// =============================================================================

/** DMARC policy values */
type DmarcPolicy = "none" | "quarantine" | "reject";

/** DMARC alignment mode */
type DmarcAlignment = "r" | "s"; // relaxed or strict

/** DMARC Builder configuration */
interface DmarcBuilderConfig {
  /** Record name label (default: "_dmarc") */
  label?: string;
  /** DMARC version (default: "DMARC1") */
  version?: string;
  /** Policy for domain (required) */
  policy: DmarcPolicy;
  /** Policy for subdomains */
  subdomainPolicy?: DmarcPolicy;
  /** DKIM alignment mode */
  alignmentDKIM?: DmarcAlignment;
  /** SPF alignment mode */
  alignmentSPF?: DmarcAlignment;
  /** Percentage of messages to apply policy (0-100) */
  percent?: number;
  /** Aggregate report URIs */
  rua?: string[];
  /** Forensic report URIs */
  ruf?: string[];
  /** Forensic report options */
  failureOptions?: string;
  /** Report format (default: "afrf") */
  reportFormat?: string;
  /** Report interval in seconds */
  reportInterval?: number;
  /** TTL for DMARC record */
  ttl?: Ttl;
}

/**
 * DMARC_BUILDER() generates a DMARC TXT record.
 * @param config - DMARC configuration
 * @returns DMARC TXT record modifier
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/dmarc_builder
 */
declare function DMARC_BUILDER(config: DmarcBuilderConfig): DomainModifier;

// =============================================================================
// SPF BUILDER
// =============================================================================

/** SPF Builder configuration */
interface SpfBuilderConfig {
  /** Record name label (default: "@") */
  label?: string;
  /** Overflow handling label for split records */
  overflow?: string;
  /** Number of lookups to split record if exceeded */
  lookupLimit?: number;
  /** Parts of the SPF record */
  parts?: string[];
  /** TTL for SPF record */
  ttl?: Ttl;
  /** Flatten (resolve) includes */
  flatten?: string[];
  /** Include mechanisms */
  include?: string[];
  /** IPv4 addresses */
  ip4?: string[];
  /** IPv6 addresses */
  ip6?: string[];
  /** A record lookups */
  a?: string[];
  /** MX record lookups */
  mx?: string[];
  /** Policy qualifier for all mechanism */
  softfail?: boolean;
  /** Hard fail vs soft fail for default */
  hardfail?: boolean;
}

/**
 * SPF_BUILDER() generates SPF TXT record(s).
 * Handles automatic splitting for DNS lookup limits.
 * @param config - SPF configuration
 * @returns SPF TXT record modifier(s)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/spf_builder
 */
declare function SPF_BUILDER(config: SpfBuilderConfig): DomainModifier | DomainModifier[];

// =============================================================================
// MICROSOFT 365 BUILDER
// =============================================================================

/** M365 Builder configuration */
interface M365BuilderConfig {
  /** Initial domain (e.g., "contoso" for contoso.onmicrosoft.com) */
  initialDomain?: string;
  /** Tenant ID */
  tenantId?: string;
  /** Enable Exchange Online */
  mx?: boolean;
  /** Enable Autodiscover */
  autodiscover?: boolean;
  /** Enable DKIM signing (requires selector) */
  dkim?: boolean;
  /** DKIM selector 1 CNAME target */
  dkimSelector1?: string;
  /** DKIM selector 2 CNAME target */
  dkimSelector2?: string;
  /** Enable MDM (Mobile Device Management) */
  mdm?: boolean;
  /** Enable Skype for Business / Teams */
  skypeForBusiness?: boolean;
  /** Enable Intune */
  intune?: boolean;
  /** Enable SPF include for Exchange Online */
  spf?: boolean;
  /** TTL for all records */
  ttl?: Ttl;
}

/**
 * M365_BUILDER() generates Microsoft 365 DNS records.
 * @param config - M365 configuration
 * @returns Array of M365-related domain modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/m365_builder
 */
declare function M365_BUILDER(config: M365BuilderConfig): DomainModifier[];

// =============================================================================
// LOC BUILDERS
// =============================================================================

/** LOC coordinate in decimal degrees */
interface LocBuilderDDConfig {
  /** Record name */
  label: string;
  /** Latitude in decimal degrees (positive = N, negative = S) */
  lat: number;
  /** Longitude in decimal degrees (positive = E, negative = W) */
  lon: number;
  /** Altitude in meters */
  alt?: number;
  /** Size in meters */
  siz?: number;
  /** Horizontal precision in meters */
  hp?: number;
  /** Vertical precision in meters */
  vp?: number;
  /** TTL */
  ttl?: Ttl;
}

/**
 * LOC_BUILDER_DD() creates LOC record from decimal degrees.
 * @param config - Location configuration with decimal degrees
 * @returns LOC domain modifier
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/loc_builder_dd
 */
declare function LOC_BUILDER_DD(config: LocBuilderDDConfig): DomainModifier;

/**
 * LOC_BUILDER_DMM_STR() creates LOC record from degrees/decimal-minutes string.
 * @param label - Record name
 * @param str - Location string (e.g., "40 26.767 N 79 58.933 W")
 * @param alt - Altitude in meters (optional)
 * @param ttl - TTL (optional)
 * @returns LOC domain modifier
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/loc_builder_dmm_str
 */
declare function LOC_BUILDER_DMM_STR(
  label: string,
  str: string,
  alt?: number,
  ttl?: Ttl
): DomainModifier;

/**
 * LOC_BUILDER_DMS_STR() creates LOC record from degrees/minutes/seconds string.
 * @param label - Record name
 * @param str - Location string (e.g., "40 26 46 N 79 58 56 W")
 * @param alt - Altitude in meters (optional)
 * @param ttl - TTL (optional)
 * @returns LOC domain modifier
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/loc_builder_dms_str
 */
declare function LOC_BUILDER_DMS_STR(
  label: string,
  str: string,
  alt?: number,
  ttl?: Ttl
): DomainModifier;

/**
 * LOC_BUILDER_STR() creates LOC record from various string formats.
 * Automatically detects format (DD, DMM, or DMS).
 * @param label - Record name
 * @param str - Location string in any supported format
 * @param alt - Altitude in meters (optional)
 * @param ttl - TTL (optional)
 * @returns LOC domain modifier
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/loc_builder_str
 */
declare function LOC_BUILDER_STR(
  label: string,
  str: string,
  alt?: number,
  ttl?: Ttl
): DomainModifier;
