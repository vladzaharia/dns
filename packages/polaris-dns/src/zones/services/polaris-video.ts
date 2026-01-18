/**
 * polaris.video - Media streaming services
 *
 * This domain hosts all media streaming and management services.
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import { createTXTRecord } from "../../lib/record.js";
import { categoryToRecords } from "../../services/core.js";
import { polarisVideoServices } from "../../services/polaris-video.js";
import { createCloudflareEmailRecords } from "../../mail/cloudflare.js";

// =============================================================================
// DNSControl DSL Declarations
// =============================================================================

declare function IGNORE_NAME(name: string, types?: string): unknown;

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "polaris.video";

export function registerPolarisVideo(): void {
  console.log(`Zone: ${DOMAIN} - Media Streaming`);

  createDomain(
    {
      name: DOMAIN,
      category: "services",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Media services
    ...categoryToRecords(polarisVideoServices),

    // Mail (Cloudflare Email Routing)
    ...createCloudflareEmailRecords(),

    // Domain verification records
    createTXTRecord("@", "b3c14s9b4ym8wnfrz74db3g0q0425sry"),

    // Ignored records
    IGNORE_NAME("status", "A,CNAME,AAAA"),
    IGNORE_NAME("cf2024-1._domainkey")
  );
}
