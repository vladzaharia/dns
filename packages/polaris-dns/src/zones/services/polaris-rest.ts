/**
 * polaris.rest - General services domain
 *
 * This domain hosts productivity, media, gaming, and internal services.
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import {
  createARecord,
  createCNAMERecord,
  createTXTRecord,
  createSRVRecord,
} from "../../lib/record.js";
import { servers } from "../../lib/server.js";
import { categoryToRecords } from "../../services/core.js";
import { infrastructureServices } from "../../services/infrastructure.js";
import { productivityServices } from "../../services/productivity.js";
import { mediaServices } from "../../services/media-services.js";
import { gamingServices } from "../../services/gaming.js";
import { internalServices } from "../../services/internal.js";
import { createCloudflareEmailRecords } from "../../mail/cloudflare.js";

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "polaris.rest";

export function registerPolarisRest(): void {
  console.log(`Zone: ${DOMAIN} - General Services`);

  createDomain(
    {
      name: DOMAIN,
      category: "services",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // Infrastructure services
    ...categoryToRecords(infrastructureServices),

    // Productivity services
    ...categoryToRecords(productivityServices),

    // Media services
    ...categoryToRecords(mediaServices),

    // Gaming services
    ...categoryToRecords(gamingServices),

    // Internal services (.int suffix)
    ...internalServices.services.map((service) =>
      createARecord(`${service.subdomain}.int`, servers["local-traefik"].ip, { proxy: "off" })
    ),

    // External services
    createCNAMERecord("uptime", "polaris-uptime.fly.dev."),

    // KMS Service
    createSRVRecord("_vlmcs._tcp", 0, 0, 1688, "truenas.polaris.rest."),

    // Mail (Cloudflare Email Routing)
    ...createCloudflareEmailRecords(),

    // Domain verification records
    createTXTRecord("@", "TAILSCALE-KobgpNhPbtAVhro8SUdO"),
    createTXTRecord("@", "MS=ms74686894"),
    createTXTRecord("@", "openai-domain-verification=dv-SMfh9R6xAxKUcf05bu9fzt50"),

    // Ignored records
    IGNORE_NAME("gw.sea"),
    IGNORE_NAME("assets"),
    IGNORE_NAME("@", "A,CNAME,AAAA"),
    IGNORE_NAME("webfinger", "CNAME"),
    IGNORE_NAME("homedb", "CNAME"),
    IGNORE_NAME("status", "A,CNAME,AAAA"),
    IGNORE_NAME("s3.chat", "A,CNAME,AAAA"),
    IGNORE_NAME("dndbeyond.chat", "A,CNAME,AAAA")
  );
}
