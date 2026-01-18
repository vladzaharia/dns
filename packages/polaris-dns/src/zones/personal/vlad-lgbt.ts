/**
 * vlad.lgbt - Redirect to vlad.gg
 */

import { createTXTRecord } from "../../lib/record.js";
import { createFastmailRecords } from "../../mail/fastmail.js";

// =============================================================================
// DNSControl DSL Declarations
// =============================================================================

declare function D(
  domain: string,
  registrar: unknown,
  dnsProvider: unknown,
  ...records: unknown[]
): void;
declare function NewRegistrar(name: string): unknown;
declare function NewDnsProvider(
  name: string,
  type?: string,
  options?: Record<string, unknown>
): unknown;
declare function DnsProvider(provider: unknown): unknown;
declare function DefaultTTL(ttl: number): unknown;
declare function IGNORE_NAME(name: string, types?: string): unknown;
declare function CF_REDIRECT(from: string, to: string): unknown;

// =============================================================================
// Zone Definition
// =============================================================================

const DOMAIN = "vlad.lgbt";
const NO_REGISTRAR = NewRegistrar("none");
const CLOUDFLARE_WITH_REDIRECT = NewDnsProvider("cloudflare", undefined, {
  manage_redirects: true,
});

export function registerVladLGBT(): void {
  console.log(`Zone: ${DOMAIN} - vlad.gg Redirect`);

  D(
    DOMAIN,
    NO_REGISTRAR,
    DnsProvider(CLOUDFLARE_WITH_REDIRECT),
    DefaultTTL(1),

    // Redirect all to vlad.gg
    CF_REDIRECT("*vlad.lgbt/*", "https://vlad.gg/$2"),

    // Mail (Fastmail)
    ...createFastmailRecords({ domain: DOMAIN }),

    // Domain verification records
    createTXTRecord("_atproto", "did=did:plc:eykvgeqaqtyspquyx5wozboq"),

    // Cloudflare-managed records (ignored)
    IGNORE_NAME("@", "A,CNAME,AAAA"),
    IGNORE_NAME("www", "A,CNAME,AAAA"),
    IGNORE_NAME("cf2024-1._domainkey")
  );
}
