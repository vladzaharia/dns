/**
 * DNSControl AWS Route53 Provider Types
 * Route53-specific functions and modifiers
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />

// =============================================================================
// ROUTE53 ALIAS
// =============================================================================

/** Route53 alias target types */
type R53AliasType =
  | "A"
  | "AAAA"
  | "CNAME"
  | "MX"
  | "NAPTR"
  | "PTR"
  | "SPF"
  | "SRV"
  | "TXT";

/**
 * R53_ALIAS() creates a Route53 alias record.
 * Points to AWS resources like ELB, CloudFront, S3, etc.
 * @param name - Record name
 * @param type - Alias record type
 * @param target - Target (hosted zone ID or resource)
 * @param zoneId - Target hosted zone ID (optional, for cross-zone aliases)
 * @param modifiers - Record modifiers
 * @see https://docs.dnscontrol.org/language-reference/domain-modifiers/route53/r53_alias
 */
declare function R53_ALIAS(
  name: string,
  type: R53AliasType,
  target: string,
  zoneId?: string,
  ...modifiers: (RecordModifier | RecordMeta)[]
): DomainModifier;

// =============================================================================
// ROUTE53 RECORD MODIFIERS
// =============================================================================

/**
 * R53_ZONE() specifies the Route53 hosted zone ID for a record.
 * Useful when multiple hosted zones exist for the same domain.
 * @param zoneId - The hosted zone ID
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_zone
 */
declare function R53_ZONE(zoneId: string): RecordModifier;

/**
 * R53_EVALUATE_TARGET_HEALTH() enables health evaluation for alias targets.
 * @param evaluate - Whether to evaluate target health (default: true)
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_evaluate_target_health
 */
declare function R53_EVALUATE_TARGET_HEALTH(evaluate?: boolean): RecordModifier;

// =============================================================================
// ROUTE53 HEALTH CHECKS (Advanced)
// =============================================================================

/** Route53 health check types */
type R53HealthCheckType =
  | "HTTP"
  | "HTTPS"
  | "HTTP_STR_MATCH"
  | "HTTPS_STR_MATCH"
  | "TCP"
  | "CALCULATED"
  | "CLOUDWATCH_METRIC";

/** Route53 failover types */
type R53FailoverType = "PRIMARY" | "SECONDARY";

/**
 * R53_HEALTH_CHECK() associates a health check with a record.
 * @param healthCheckId - The health check ID
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_health_check
 */
declare function R53_HEALTH_CHECK(healthCheckId: string): RecordModifier;

/**
 * R53_FAILOVER() configures failover routing for a record.
 * @param failoverType - PRIMARY or SECONDARY
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_failover
 */
declare function R53_FAILOVER(failoverType: R53FailoverType): RecordModifier;

/**
 * R53_SET_IDENTIFIER() sets a unique identifier for routing policies.
 * Required for weighted, latency, geolocation, and failover routing.
 * @param identifier - Unique identifier string
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_set_identifier
 */
declare function R53_SET_IDENTIFIER(identifier: string): RecordModifier;

/**
 * R53_WEIGHT() sets the weight for weighted routing policy.
 * @param weight - Weight value (0-255)
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_weight
 */
declare function R53_WEIGHT(weight: number): RecordModifier;

/**
 * R53_REGION() sets the region for latency-based routing.
 * @param region - AWS region code (e.g., "us-east-1")
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_region
 */
declare function R53_REGION(region: string): RecordModifier;

/**
 * R53_GEO() sets geolocation routing parameters.
 * @param continentCode - Continent code (optional)
 * @param countryCode - Country code (optional)
 * @param subdivisionCode - Subdivision code (optional)
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_geo
 */
declare function R53_GEO(
  continentCode?: string,
  countryCode?: string,
  subdivisionCode?: string
): RecordModifier;

/**
 * R53_MULTIVALUE() enables multivalue answer routing.
 * @see https://docs.dnscontrol.org/language-reference/record-modifiers/r53_multivalue
 */
declare function R53_MULTIVALUE(): RecordModifier;

