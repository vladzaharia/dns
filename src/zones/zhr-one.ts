import { CloudflareDns } from "../providers/cloudflare";
import { NoRegistrar } from "../providers/noregistrar";
import { CreateRecords } from "../utils/record";
import { CreateFastmailRecords } from "../services/mail/fastmail";
import { InfrastructureRecords } from "../services/infrastructure";

const BASE_DOMAIN = "zhr.one";
console.log(`Zone: ${BASE_DOMAIN} - Services`);

D(
  BASE_DOMAIN,
  NoRegistrar,
  DnsProvider(CloudflareDns),
  DefaultTTL(1),

  IGNORE_NAME("@", "A,CNAME,AAAA"),
  IGNORE_NAME("cf2024-1._domainkey"),

  /* Townhouse records */
  ...CreateRecords("Infrastructure", InfrastructureRecords),

  /* Mail records */
  ...CreateFastmailRecords(BASE_DOMAIN),

  /* KMS */
  SRV("_vlmcs._tcp", 0, 0, 1688, "truenas.zhr.one."),

  /* Domain verification records */
  TXT(
    "@",
    "atlassian-domain-verification=aWQoyeXxK5bbFI7GUl4ALmaSziAqbOMMXdNQeMtbaGzE3ALZgXNGtF885NpV6IxA"
  ),
  TXT(
    "@",
    "keybase-site-verification=z79M8GrtyF-25fIHHrUfBlJmPbmcj5sNdIUOjsoIb00"
  ),
  TXT("@", "MS=ms62227587"),
  TXT("@", "MS=ms10317245"),
  TXT("@", "b3c14s9b4ym8wnfrz74db3g0q0425sry"),
  TXT("_doppler_guRuoPJHEswl0", "B1aF7MgOlLnYKwXH4eGgV4vV7eaAL8Q8")
);
