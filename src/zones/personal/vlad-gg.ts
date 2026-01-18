/**
 * vlad.gg - Personal website and services
 */

import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "../../lib/domain.js";
import {
  createARecord,
  createCNAMERecord,
  createTXTRecord,
  createCAARecord,
} from "../../lib/record.js";
import { createFastmailRecords } from "../../mail/fastmail.js";

// =============================================================================
// DNSControl DSL Declarations
// =============================================================================

declare function IGNORE_NAME(name: string, types?: string): unknown;

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "vlad.gg";

export function registerVladGG(): void {
  console.log(`Zone: ${DOMAIN} - Personal Website`);

  createDomain(
    {
      name: DOMAIN,
      category: "personal",
      registrar: NO_REGISTRAR,
      dnsProvider: CLOUDFLARE,
      ignorePatterns: [],
    },

    // Website (Netlify)
    createARecord("@", "75.2.60.5", { proxy: "on" }),
    createCNAMERecord("www", "vladgg.netlify.app."),
    createCNAMERecord("bb", "bb-vlad-gg.netlify.app."),

    // API (Fly.io)
    createCNAMERecord("api", "vladgg-api.fly.dev."),

    // Services
    createCNAMERecord("sticky", "tun.azure.plrs.im.", { proxy: "on" }), // Blinko notes
    createCNAMERecord("pass", "gw.sea.plrs.im."), // Vaultwarden
    createCNAMERecord("plan", "gw.sea.plrs.im."), // Plane Project Management

    // Dropshare (AWS CloudFront)
    createCNAMERecord("drop-alt", "du8l8g206yjol.cloudfront.net."),
    createCNAMERecord(
      "_44e75dbdd76f1e03953cbf0fa3905c46.drop-alt",
      "_9c248e5cbb6d5514c37a895f0efdc7e8.fgsdscwdjl.acm-validations.aws."
    ),
    createCNAMERecord(
      "_b2939c0fadc2984e462e24c1f5ba199f.drop",
      "_41d2694c3cef6997de96302706a73a96.cvxnfrzvtq.acm-validations.aws."
    ),
    createCAARecord("@", "issue", "amazon.com"),

    // Mail (Fastmail)
    ...createFastmailRecords({ domain: DOMAIN }),
    ...createFastmailRecords({ domain: `ds.${DOMAIN}`, rootRecord: "ds" }),

    // Domain verification records
    createTXTRecord("@", "b3c14s9b4ym8wnfrz74db3g0q0425sry"),
    createTXTRecord("@", "verification:RZjHjtRtEzMtsNp12KuUs5GY"),
    createTXTRecord("@", "keybase-site-verification=n3qSwDzktIKPqHCuwaKzYV8kp7LK6GBH8JlVRaso8j0"),
    createTXTRecord("@", "google-site-verification=KcgCGo0bX44Bv2_u1ylo0QBQJ9yF9SimfZxp7t-RNlk"),
    createTXTRecord("@", "openai-domain-verification=dv-yx38yZ1KFGSTvjqQ52TSN9EA"),
    createTXTRecord("_doppler_JU1pcFaV58gCB", "PdrzTCEi4G1eMwAB9XnzUp0X6uaMK6zT"),

    // Cloudflare-managed records (ignored)
    IGNORE_NAME("status", "A,CNAME,AAAA"),
    IGNORE_NAME("cf2024-1._domainkey"),
    IGNORE_NAME("drop", "CNAME"),
    IGNORE_NAME("pkmn", "CNAME"),
    IGNORE_NAME("assassin"),
    IGNORE_NAME("*.assassin"),
    IGNORE_NAME("track"),
    IGNORE_NAME("*.track")
  );
}
