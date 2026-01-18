/**
 * danger.direct - Local emergency/travel router domain
 *
 * This domain is used for local network services on emergency/travel routers.
 * All records point to local network IPs and are NOT proxied through Cloudflare.
 *
 * Typical use cases:
 * - GL.iNet travel routers (default: 192.168.8.1)
 * - Emergency network setups
 * - Isolated local networks
 *
 * IMPORTANT: These records are for LOCAL network access only.
 * They will not resolve to anything useful from the public internet.
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createARecord } from "../../lib/record.js";

// =============================================================================
// Local Network Configuration
// =============================================================================

// GL.iNet travel router default gateway
const ROUTER_IP = "192.168.8.1";

// Alternative local network configuration (uncomment if needed)
// const ROUTER_IP = "10.0.0.1";

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "danger.direct";

export function registerDangerDirect(): void {
  console.log(`Zone: ${DOMAIN} - Local Emergency Router`);

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
