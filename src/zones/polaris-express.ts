// import { CloudflareDns } from "../providers/cloudflare";
// import { NoRegistrar } from "../providers/noregistrar";
// import { GetCoreRecords, GetPrefix } from "../services/core";
// import { CreateRecords } from "../utils/record";
// import { CreateFastmailRecords } from "../services/mail/fastmail";
// import { InfrastructureRecords } from "../services/infrastructure";
// import { ProductivityServiceRecords } from "../services/productivity";
// import { MediaServiceRecords } from "../services/media-services";
// import { SmartHomeRecords } from "../services/smart-home";
// import { InternalRecords } from "../services/internal";
// import { CreatePostalRecords } from "../services/mail/postal";
// import { CreatePolarisChargeRecord } from "../services/external/cloudflare-pages";

// const BASE_DOMAIN = "polaris.express";
// console.log(`Zone: ${BASE_DOMAIN} - Services`);

// D(
//   BASE_DOMAIN,
//   NoRegistrar,
//   DnsProvider(CloudflareDns),
//   DefaultTTL(1),

//   ...CreatePolarisChargeRecord("@"),

//   /* Mail records */
//   ...CreatePostalRecords([])
// );
