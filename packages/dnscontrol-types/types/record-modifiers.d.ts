/**
 * DNSControl Record Modifiers
 * Functions that modify individual DNS records
 *
 * @packageDocumentation
 */

/// <reference path="base.d.ts" />

// =============================================================================
// COMMON RECORD MODIFIERS
// =============================================================================

/**
 * TTL() sets the TTL for a specific record.
 * @param ttl - TTL value in seconds or as a duration string
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/ttl
 */
declare function TTL(ttl: Ttl): RecordModifier;

// =============================================================================
// CAA RECORD MODIFIERS
// =============================================================================

/**
 * CAA_CRITICAL - Sets the critical flag on CAA records.
 * When set, CAs must not issue certificates if they don't understand the tag.
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/caa_critical
 */
declare const CAA_CRITICAL: RecordModifier;

// =============================================================================
// ADGUARD HOME MODIFIERS
// =============================================================================

/**
 * ADGUARDHOME_A_PASSTHROUGH() marks an A record for passthrough in AdGuard Home.
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/adguardhome_a_passthrough
 */
declare function ADGUARDHOME_A_PASSTHROUGH(): RecordModifier;

/**
 * ADGUARDHOME_AAAA_PASSTHROUGH() marks an AAAA record for passthrough in AdGuard Home.
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/adguardhome_aaaa_passthrough
 */
declare function ADGUARDHOME_AAAA_PASSTHROUGH(): RecordModifier;

// =============================================================================
// AKAMAI MODIFIERS
// =============================================================================

/**
 * AKAMAICDN() configures Akamai CDN settings for a record.
 * @param settings - Akamai CDN configuration object
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/akamaicdn
 */
declare function AKAMAICDN(settings: {
  edgeHostname?: string;
  [key: string]: unknown;
}): RecordModifier;

/**
 * AKAMAITLC() configures Akamai TLC (Traffic Management) settings.
 * @param settings - Akamai TLC configuration
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/akamaitlc
 */
declare function AKAMAITLC(settings: Record<string, unknown>): RecordModifier;

