/**
 * DNSControl Domain Modifiers
 * Functions that configure domain-level settings
 *
 * @packageDocumentation
 */

/// <reference path="base.d.ts" />

// =============================================================================
// PROVIDER CONFIGURATION
// =============================================================================

/**
 * DnsProvider() specifies the DNS provider for a domain.
 * @param name - Provider identifier from NewDnsProvider()
 * @param nsCount - Number of nameservers to use (optional, 0 = use all)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/dnsprovider
 */
declare function DnsProvider(name: string, nsCount?: number): DomainModifier;

// =============================================================================
// TTL CONFIGURATION
// =============================================================================

/**
 * DefaultTTL() sets the default TTL for all records in the domain.
 * @param ttl - TTL value in seconds or as a duration string
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/defaultttl
 */
declare function DefaultTTL(ttl: Ttl): DomainModifier;

// =============================================================================
// NAMESERVER CONFIGURATION
// =============================================================================

/**
 * NAMESERVER() adds a nameserver record to the domain.
 * @param name - Nameserver hostname (should end with "." for FQDN)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/nameserver
 */
declare function NAMESERVER(name: string, ...modifiers: (RecordModifier | RecordMeta)[]): DomainModifier;

/**
 * NAMESERVER_TTL() sets the TTL for NS records.
 * @param ttl - TTL value in seconds or as a duration string
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/nameserver_ttl
 */
declare function NAMESERVER_TTL(ttl: Ttl): DomainModifier;

// =============================================================================
// RECORD MANAGEMENT
// =============================================================================

/**
 * NO_PURGE() prevents DNSControl from deleting unmanaged records.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/no_purge
 */
declare function NO_PURGE(): DomainModifier;

/**
 * PURGE() explicitly enables record purging (default behavior).
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/purge
 */
declare function PURGE(): DomainModifier;

/**
 * IGNORE() ignores records matching the specified criteria.
 * @param pattern - Record name pattern to ignore
 * @param recordTypes - Record types to ignore (optional)
 * @param targets - Target patterns to ignore (optional)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/ignore
 */
declare function IGNORE(pattern: string, recordTypes?: string, targets?: string): DomainModifier;

/**
 * IGNORE_NAME() ignores records by name pattern.
 * @param pattern - Name pattern (supports * and ? wildcards)
 * @param recordTypes - Comma-separated record types (optional)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/ignore_name
 */
declare function IGNORE_NAME(pattern: string, recordTypes?: string): DomainModifier;

/**
 * IGNORE_TARGET() ignores records by target pattern.
 * @param pattern - Target pattern (supports * and ? wildcards)
 * @param recordTypes - Comma-separated record types (optional)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/ignore_target
 */
declare function IGNORE_TARGET(pattern: string, recordTypes?: string): DomainModifier;

/**
 * DISABLE_IGNORE_SAFETY_CHECK() disables safety checks for IGNORE functions.
 * Use with caution!
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/disable_ignore_safety_check
 */
declare function DISABLE_IGNORE_SAFETY_CHECK(): DomainModifier;

// =============================================================================
// RECORD IMPORT
// =============================================================================

/**
 * INCLUDE() includes records from another domain configuration.
 * @param domain - Domain name to include records from
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/include
 */
declare function INCLUDE(domain: string): DomainModifier;

/**
 * IMPORT_TRANSFORM() imports records with address transformation.
 * @param table - Provider name to import from
 * @param domain - Domain to import records from
 * @param ttl - TTL for imported records (optional)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/import_transform
 */
declare function IMPORT_TRANSFORM(
  table: string,
  domain: string,
  ttl?: Ttl
): DomainModifier;

/**
 * IMPORT_TRANSFORM_STRIP() imports and transforms records, stripping subdomain.
 * @param table - Provider name to import from
 * @param domain - Domain to import records from
 * @param ttl - TTL for imported records (optional)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/import_transform_strip
 */
declare function IMPORT_TRANSFORM_STRIP(
  table: string,
  domain: string,
  ttl?: Ttl
): DomainModifier;

// =============================================================================
// DNSSEC CONFIGURATION
// =============================================================================

/**
 * AUTODNSSEC_ON() enables automatic DNSSEC signing.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/autodnssec_on
 */
declare function AUTODNSSEC_ON(): DomainModifier;

/**
 * AUTODNSSEC_OFF() disables automatic DNSSEC signing.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/autodnssec_off
 */
declare function AUTODNSSEC_OFF(): DomainModifier;

