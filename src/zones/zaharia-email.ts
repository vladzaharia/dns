import { CloudflareDns } from "../providers/cloudflare";
import { NoRegistrar } from "../providers/noregistrar";
import { CreateFastmailRecords } from "../services/mail/fastmail";

const BASE_DOMAIN = "zaharia.email";
console.log(`Zone: ${BASE_DOMAIN}`);

D(
  BASE_DOMAIN,
  NoRegistrar,
  DnsProvider(CloudflareDns),
  DefaultTTL(1),

  /* Service records */

  /* Mail records */
  ...CreateFastmailRecords(BASE_DOMAIN),

  /* Domain verification records */
  TXT("@", "MS=ms66850642")
);
