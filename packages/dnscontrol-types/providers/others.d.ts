/**
 * DNSControl General Utility Functions
 * Cross-provider utility functions
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />

// =============================================================================
// IGNORE_EXTERNAL_DNS
// =============================================================================

/**
 * IGNORE_EXTERNAL_DNS() ignores records managed by external services.
 * Useful when integrating with services that create their own DNS records.
 * @param pattern - Record name pattern to ignore
 * @param recordTypes - Record types to ignore (optional)
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/ignore_external_dns
 */
declare function IGNORE_EXTERNAL_DNS(pattern?: string, recordTypes?: string): DomainModifier;

