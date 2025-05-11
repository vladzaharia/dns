import { CloudflareDnsWithRedirect } from "../providers/cloudflare";
import { NoRegistrar } from "../providers/noregistrar";
import { CreateFastmailRecords } from "../services/mail/fastmail";

const BASE_DOMAIN = "vlad.lgbt";
console.log(`Zone: ${BASE_DOMAIN} - vlad.gg Redirect`);

D(
  BASE_DOMAIN,
  NoRegistrar,
  DnsProvider(CloudflareDnsWithRedirect),
  DefaultTTL(1),

  /* Basic records */
  // CF-managed
  IGNORE_NAME("@", "A,CNAME,AAAA"),
  IGNORE_NAME("www", "A,CNAME,AAAA"),

  /* Redirect all to .gg */
  CF_REDIRECT("*vlad.lgbt/*", "https://vlad.gg/$2"),

  /* Mail records */
  ...CreateFastmailRecords(BASE_DOMAIN),

  /* Domain verification records */
  TXT("_atproto", "did=did:plc:eykvgeqaqtyspquyx5wozboq")
);
