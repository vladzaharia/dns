/**
 * zhr.one - Legacy/Deprecated infrastructure domain
 *
 * DEPRECATED: This domain is no longer actively managed.
 * All records are preserved as-is and ignored by DNSControl.
 * Use polaris.gdn for new infrastructure services.
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "zhr.one";

export function registerZhrOne(): void {
  console.log(`Zone: ${DOMAIN} - Legacy Infrastructure (DEPRECATED)`);

  createDomain(
    {
      name: DOMAIN,
      category: "infrastructure",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
    },

    // DEPRECATED: All records are preserved as-is
    // This domain is no longer actively managed by DNSControl
    IGNORE_NAME("*")
  );
}
