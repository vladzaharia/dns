import { CloudflareDns } from "../providers/cloudflare";
import { NoRegistrar } from "../providers/noregistrar";
import { CreatePostalRecords } from "../services/mail/postal";
import { InfrastructureRecords } from "../services/infrastructure";
import { InternalRecords } from "../services/internal";
import { MediaServiceRecords } from "../services/media-services";
import { ProductivityServiceRecords } from "../services/productivity";
import { CreateRecord, CreateRecords } from "../utils/record";
import { GamingRecords } from "../services/gaming";
import { GetPrefix } from "../services/core";

const BASE_DOMAIN = "polaris.rest";
console.log(`Zone: ${BASE_DOMAIN}`);

D(
  BASE_DOMAIN,
  NoRegistrar,
  DnsProvider(CloudflareDns),
  DefaultTTL(1),

  // DDNS-managed
  IGNORE_NAME(GetPrefix("Greenwood")),
  IGNORE_NAME("assets"),

  // CF-managed
  IGNORE_NAME("@", "A,CNAME,AAAA"),
  IGNORE_NAME("webfinger", "CNAME"),
  IGNORE_NAME("homedb", "CNAME"),
  IGNORE_NAME("status", "A,CNAME,AAAA"),
  IGNORE_NAME("s3.chat", "A,CNAME,AAAA"),
  IGNORE_NAME("dndbeyond.chat", "A,CNAME,AAAA"),
  CreateRecord({
    name: "uptime",
    target: "polaris-uptime.fly.dev.",
    type: "CNAME",
  }),

  /* Townhouse records */
  ...CreateRecords("Infrastructure", InfrastructureRecords),
  ...CreateRecords("Media Services", MediaServiceRecords),
  ...CreateRecords("Productivity", ProductivityServiceRecords),
  ...CreateRecords("Gaming", GamingRecords),
  ...CreateRecords("Internal", InternalRecords, "LocalTraefik", ".int"),

  /* KMS */
  SRV("_vlmcs._tcp", 0, 0, 1688, "truenas.polaris.rest."),

  /* Mail records */
  ...CreatePostalRecords(["tydbrf"]),

  /* Domain verification records */
  TXT("@", "TAILSCALE-KobgpNhPbtAVhro8SUdO"),
  TXT("@", "MS=ms74686894"),
  TXT("@", "openai-domain-verification=dv-SMfh9R6xAxKUcf05bu9fzt50")
);
