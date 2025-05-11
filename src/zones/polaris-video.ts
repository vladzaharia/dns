import { CloudflareDns } from "../providers/cloudflare";
import { NoRegistrar } from "../providers/noregistrar";
import { CreatePostalRecords } from "../services/mail/postal";
import { PolarisVideoServices } from "../services/polaris";
import { CreateRecords } from "../utils/record";

const BASE_DOMAIN = "polaris.video";
console.log(`Zone: ${BASE_DOMAIN}`);

D(
  BASE_DOMAIN,
  NoRegistrar,
  DnsProvider(CloudflareDns),
  DefaultTTL(1),

  /* Service records */
  ...CreateRecords("Polaris Video", PolarisVideoServices),

  // CF-managed
  IGNORE_NAME("status", "A,CNAME,AAAA"),

  /* Mail records */
  ...CreatePostalRecords(["wedj3o"]),

  /* Domain verification records */
  TXT("@", "b3c14s9b4ym8wnfrz74db3g0q0425sry")
);
