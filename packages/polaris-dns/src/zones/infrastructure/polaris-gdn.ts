/**
 * polaris.gdn - Core infrastructure services
 *
 * This domain hosts infrastructure services, homelab services, and internal services.
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createARecord, createCNAMERecord } from "../../lib/record.js";
import { servers } from "../../lib/server.js";
import { categoryToRecords } from "../../services/core.js";
import { infrastructureServices } from "../../services/infrastructure.js";
import { homelabServices } from "../../services/homelab.js";
import { internalServices } from "../../services/internal.js";
import { createCloudflareEmailRecords } from "../../mail/cloudflare.js";

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "polaris.gdn";

export function registerPolarisGdn(): void {
  console.log(`Zone: ${DOMAIN} - Core Infrastructure`);

  createDomain(
    {
      name: DOMAIN,
      category: "infrastructure",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Infrastructure services
    ...categoryToRecords(infrastructureServices),

    // Homelab services
    ...categoryToRecords(homelabServices),

    // Internal services (.local suffix)
    ...internalServices.services.map((service) =>
      createARecord(`${service.subdomain}.local`, servers["local-traefik"].ip, { proxy: "off" })
    ),

    // Cloudflare Pages
    createCNAMERecord("charge", "charging.pages.dev.", { proxy: "off" }),

    // Mail (Cloudflare Email Routing)
    ...createCloudflareEmailRecords(),

    // Ignored records
    IGNORE_NAME("@", "A,CNAME,AAAA"),
    IGNORE_NAME("gw.sea"),
    IGNORE_NAME("ch.sea"),
    IGNORE_NAME("baserow.r2")
  );
}
