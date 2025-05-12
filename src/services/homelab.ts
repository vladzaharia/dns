import { Record } from "../utils/record";
import { GetHost } from "./core";

/**
 * Infrastructure
 */
export const HomeLabRecords: Record[] = [
  { name: "code", description: "Coder" },
  { name: "*.code", description: "Coder Wildcard" },

  { name: "garage", description: "Garage S3" },
  { name: "s3", description: "Garage S3" },
  { name: "*.s3", description: "Garage S3 Web" },
  { name: "k2v", description: "Garage K2V" },
  { name: "d", description: "Dropshare" },

  { name: "log", description: "Seq Logs" },
  { name: "ingest.log", description: "Seq Log Ingest" },

  { name: "kasm", description: "Kasm" },
  { name: "registry.kasm", description: "Kasm Registry" },
  { name: "registry", description: "Docker Registry" },

  { name: "pass", description: "Bitwarden" },

  { name: "z", description: "Zrok", target: GetHost("Reprise4") },
  { name: "*.z", description: "Zrok", target: GetHost("Reprise4") },
];
