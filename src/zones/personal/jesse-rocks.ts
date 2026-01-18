/**
 * jesse.rocks - Personal website and email
 *
 * Currently email-only domain with Cloudflare Email Routing.
 * Future: Personal website for Jesse.
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createCloudflareEmailRecords } from "../../mail/cloudflare.js";

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "jesse.rocks";

export function registerJesseRocks(): void {
  console.log(`Zone: ${DOMAIN} - Personal Email`);

  createDomain(
    {
      name: DOMAIN,
      category: "personal",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Mail (Cloudflare Email Routing)
    ...createCloudflareEmailRecords()

    // Future: Add website records here
    // createARecord("@", "...", { proxy: "on" }),
    // createCNAMERecord("www", "...", { proxy: "on" }),
  );
}
