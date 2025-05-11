import { CloudflareDns } from "../providers/cloudflare";
import { NoRegistrar } from "../providers/noregistrar";
import { GetCoreRecords, GetPrefix } from "../services/core";
import { CreateRecords } from "../utils/record";
import { InfrastructureRecords } from "../services/infrastructure";
import { InternalRecords } from "../services/internal";
import {
  CreatePostalRecords,
  CreatePostalServiceRecords,
} from "../services/mail/postal";
import { CreatePolarisChargeRecord } from "../services/external/cloudflare-pages";
import { HomeLabRecords } from "../services/homelab";

const BASE_DOMAIN = "polaris.gdn";
console.log(`Zone: ${BASE_DOMAIN} - Services`);

D(
  BASE_DOMAIN,
  NoRegistrar,
  DnsProvider(CloudflareDns),
  DefaultTTL(1),

  IGNORE_NAME("@", "A,CNAME,AAAA"),

  // DDNS-managed
  IGNORE_NAME(GetPrefix("Greenwood")),
  IGNORE_NAME(GetPrefix("CapHill")),

  /* Core records */
  ...CreateRecords("Core", GetCoreRecords()),

  /* Service records */
  ...CreateRecords("Infrastructure", InfrastructureRecords),
  ...CreateRecords("Homelab", HomeLabRecords),
  ...CreateRecords("Internal", InternalRecords, "LocalTraefik", ".local"),
  ...CreatePolarisChargeRecord("charge"),

  /* Mail records */
  ...CreatePostalRecords(["heqoqb", "zljdej"]),
  ...CreatePostalServiceRecords()
);
