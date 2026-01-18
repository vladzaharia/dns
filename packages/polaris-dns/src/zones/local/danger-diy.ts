/**
 * danger.diy - Legacy local emergency router domain
 *
 * This domain mirrors danger.direct for legacy compatibility.
 * All records point to local network IPs and are NOT proxied through Cloudflare.
 *
 * IMPORTANT: These records are for LOCAL network access only.
 * They will not resolve to anything useful from the public internet.
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createARecord } from "../../lib/record.js";

// =============================================================================
// Local Network Configuration
// =============================================================================

// GL.iNet travel router default gateway (mirrors danger.direct)
const ROUTER_IP = "192.168.8.1";

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "danger.diy";

export function registerDangerDiy(): void {
  console.log(`Zone: ${DOMAIN} - Legacy Local Router (mirrors danger.direct)`);

  createDomain(
    {
      name: DOMAIN,
      category: "local",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Router admin interface
    createARecord("@", ROUTER_IP, { proxy: "off" }),
    createARecord("router", ROUTER_IP, { proxy: "off" }),
    createARecord("admin", ROUTER_IP, { proxy: "off" }),

    // DNS service (if running local DNS)
    createARecord("dns", ROUTER_IP, { proxy: "off" }),

    // VPN endpoint (if running local VPN)
    createARecord("vpn", ROUTER_IP, { proxy: "off" }),

    // Wildcard for any local services
    createARecord("*", ROUTER_IP, { proxy: "off" })
  );
}
