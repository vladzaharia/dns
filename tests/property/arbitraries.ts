/**
 * Custom fast-check arbitraries for DNS Infrastructure-as-Code
 * Generates valid test data for property-based testing
 */

import fc from "fast-check";
import type { ServerLocation, ServerName, RoutingStrategy, ProxyStatus } from "../../src/lib/types.js";

// =============================================================================
// Server Arbitraries
// =============================================================================

/** Valid server locations */
export const serverLocationArb: fc.Arbitrary<ServerLocation> = fc.constantFrom("sea", "az", "re", "local");

/** Valid server names */
export const serverNameArb: fc.Arbitrary<ServerName> = fc.constantFrom(
  "greenwood",
  "caphill",
  "azure-tunnel",
  "upvpn",
  "reprise1",
  "reprise2",
  "reprise3",
  "reprise4",
  "local-traefik"
);

/** Valid server prefix (1-10 alphanumeric chars) */
export const serverPrefixArb = fc.stringMatching(/^[a-z][a-z0-9]{0,9}$/);

// =============================================================================
// DNS Arbitraries
// =============================================================================

/** Valid IPv4 address */
export const ipv4Arb = fc
  .tuple(fc.integer({ min: 0, max: 255 }), fc.integer({ min: 0, max: 255 }), fc.integer({ min: 0, max: 255 }), fc.integer({ min: 0, max: 255 }))
  .map(([a, b, c, d]) => `${a}.${b}.${c}.${d}`);

/** Valid IPv6 address (simplified - full form) */
export const ipv6Arb = fc
  .array(
    fc.integer({ min: 0, max: 0xffff }).map((n) => n.toString(16)),
    { minLength: 8, maxLength: 8 }
  )
  .map((parts) => parts.join(":"));

/** Valid DNS label (subdomain) */
export const dnsLabelArb = fc.oneof(
  fc.constant("@"),
  fc.constant("*"),
  fc.stringMatching(/^[a-z][a-z0-9-]{0,61}[a-z0-9]$/).filter((s) => !s.includes("--") && s.length <= 63),
  fc.stringMatching(/^[a-z][a-z0-9]{0,62}$/)
);

/** Valid hostname */
export const hostnameArb = fc
  .array(fc.stringMatching(/^[a-z][a-z0-9-]{0,10}[a-z0-9]$/), { minLength: 2, maxLength: 4 })
  .map((parts) => parts.join("."));

/** Valid TTL (60 seconds to 1 day) */
export const ttlArb = fc.integer({ min: 60, max: 86400 });

/** Valid MX priority (0-65535) */
export const priorityArb = fc.integer({ min: 0, max: 65535 });

/** Valid port number (1-65535) */
export const portArb = fc.integer({ min: 1, max: 65535 });

/** Proxy status */
export const proxyStatusArb: fc.Arbitrary<ProxyStatus> = fc.constantFrom("on", "off", "full");

/** CAA tag */
export const caaTagArb = fc.constantFrom("issue", "issuewild", "iodef");

// =============================================================================
// Service Arbitraries
// =============================================================================

/** Routing strategy */
export const routingStrategyArb: fc.Arbitrary<RoutingStrategy> = fc.constantFrom("direct", "tunnel", "proxied");

/** Service subdomain (valid DNS label for services) */
export const serviceSubdomainArb = fc.stringMatching(/^[a-z][a-z0-9-]{0,20}[a-z0-9]$/).filter((s) => !s.includes("--"));

/** Service name */
export const serviceNameArb = fc.string({ minLength: 1, maxLength: 100 });

// =============================================================================
// Record Arbitraries
// =============================================================================

/** A Record arbitrary */
export const aRecordArb = fc.record({
  type: fc.constant("A" as const),
  name: dnsLabelArb,
  ip: ipv4Arb,
  ttl: fc.option(ttlArb, { nil: undefined }),
  proxy: fc.option(proxyStatusArb, { nil: undefined }),
});

/** AAAA Record arbitrary */
export const aaaaRecordArb = fc.record({
  type: fc.constant("AAAA" as const),
  name: dnsLabelArb,
  ip: ipv6Arb,
  ttl: fc.option(ttlArb, { nil: undefined }),
  proxy: fc.option(proxyStatusArb, { nil: undefined }),
});

/** CNAME Record arbitrary */
export const cnameRecordArb = fc.record({
  type: fc.constant("CNAME" as const),
  name: dnsLabelArb,
  target: hostnameArb,
  ttl: fc.option(ttlArb, { nil: undefined }),
  proxy: fc.option(proxyStatusArb, { nil: undefined }),
});

/** MX Record arbitrary */
export const mxRecordArb = fc.record({
  type: fc.constant("MX" as const),
  name: fc.constant("@"),
  priority: priorityArb,
  target: hostnameArb,
  ttl: fc.option(ttlArb, { nil: undefined }),
});

/** TXT Record arbitrary */
export const txtRecordArb = fc.record({
  type: fc.constant("TXT" as const),
  name: dnsLabelArb,
  content: fc.string({ minLength: 1, maxLength: 255 }),
  ttl: fc.option(ttlArb, { nil: undefined }),
});

/** CAA Record arbitrary */
export const caaRecordArb = fc.record({
  type: fc.constant("CAA" as const),
  name: fc.constant("@"),
  flags: fc.option(fc.integer({ min: 0, max: 255 }), { nil: undefined }),
  tag: caaTagArb,
  value: fc.string({ minLength: 1, maxLength: 100 }),
  ttl: fc.option(ttlArb, { nil: undefined }),
});

/** Server arbitrary */
export const serverArb = fc.record({
  name: serverNameArb,
  location: serverLocationArb,
  prefix: serverPrefixArb,
  hostname: hostnameArb,
  ip: ipv4Arb,
  ipv6: fc.option(ipv6Arb, { nil: undefined }),
  isDDNS: fc.option(fc.boolean(), { nil: undefined }),
});

/** Service arbitrary */
export const serviceArb = fc.record({
  name: serviceNameArb,
  subdomain: serviceSubdomainArb,
  server: serverNameArb,
  routing: routingStrategyArb,
  internal: fc.option(fc.boolean(), { nil: undefined }),
  internalSuffix: fc.option(fc.constantFrom(".local", ".int", ".internal"), { nil: undefined }),
});

