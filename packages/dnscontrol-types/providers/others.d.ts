/**
 * DNSControl Other Provider Types
 * Provider-specific functions for PowerDNS, ClouDNS, NS1, etc.
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />

// =============================================================================
// POWERDNS
// =============================================================================

/**
 * LUA() creates a PowerDNS LUA record.
 * Allows dynamic DNS responses using Lua scripting.
 * @param name - Record name
 * @param type - Record type that LUA will return
 * @param code - Lua code to execute
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/powerdns/lua
 */
declare function LUA(
  name: string,
  type: string,
  code: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// CLOUDNS
// =============================================================================

/**
 * CLOUDNS_WR() creates a ClouDNS Web Redirect record.
 * @param name - Record name
 * @param target - Target URL
 * @param options - Redirect options
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/cloudns/cloudns_wr
 */
declare function CLOUDNS_WR(
  name: string,
  target: string,
  options?: {
    /** Redirect type: 301 or 302 */
    redirectType?: 301 | 302;
    /** Frame redirect */
    frame?: boolean;
    /** Save path */
    savePath?: boolean;
  }
): DomainModifier;

// =============================================================================
// NS1
// =============================================================================

/**
 * NS1_URLFWD() creates an NS1 URL forward record.
 * @param name - Record name
 * @param target - Target URL
 * @param options - Forward options
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/ns1/ns1_urlfwd
 */
declare function NS1_URLFWD(
  name: string,
  target: string,
  options?: {
    /** Redirect code (301, 302, or masking) */
    code?: 301 | 302 | "masking";
    /** Forward path */
    forwardPath?: boolean;
    /** Forward query */
    forwardQuery?: boolean;
  }
): DomainModifier;

// =============================================================================
// GANDI
// =============================================================================

/**
 * GANDI_V5_ALIAS() creates a Gandi LiveDNS ALIAS record.
 * @param name - Record name
 * @param target - Target hostname
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/gandi/gandi_v5_alias
 */
declare function GANDI_V5_ALIAS(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// DNSIMPLE
// =============================================================================

/**
 * DNSIMPLE_URL() creates a DNSimple URL record.
 * @param name - Record name
 * @param target - Target URL
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/dnsimple/dnsimple_url
 */
declare function DNSIMPLE_URL(
  name: string,
  target: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// HEDNS (Hurricane Electric)
// =============================================================================

/**
 * HEDNS_NULL_MX() creates a Hurricane Electric null MX record.
 * Indicates the domain does not accept email.
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/hedns/hedns_null_mx
 */
declare function HEDNS_NULL_MX(): DomainModifier;

// =============================================================================
// DESEC
// =============================================================================

/**
 * DESEC_URL() creates a deSEC URL redirect record.
 * @param name - Record name
 * @param target - Target URL
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/desec/desec_url
 */
declare function DESEC_URL(name: string, target: string): DomainModifier;

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

