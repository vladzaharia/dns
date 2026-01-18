/**
 * Core library exports
 */

// Types
export * from "./types.js";

// Server utilities
export {
  servers,
  getServer,
  getServerIP,
  getServerHostname,
  getServerPrefix,
  isServerDDNS,
  getServersByLocation,
  getAllServerNames,
} from "./server.js";

// Record builders
export {
  createARecord,
  createAAAARecord,
  createCNAMERecord,
  createMXRecord,
  createTXTRecord,
  createSRVRecord,
  createCAARecord,
  createServiceRecord,
  createServerCNAME,
  createServerARecord,
} from "./record.js";
export type { ServiceRecordOptions } from "./record.js";

// Re-export for convenience
export { createSRVRecord as SRV } from "./record.js";

// Domain utilities
export {
  NO_REGISTRAR,
  CLOUDFLARE,
  createDomain,
  defineDomain,
  PERSONAL_DOMAINS,
  INFRASTRUCTURE_DOMAINS,
  SERVICE_DOMAINS,
  LOCAL_DOMAINS,
  ALL_DOMAINS,
} from "./domain.js";
export type { DomainBuilderOptions } from "./domain.js";

// Validation module
export * from "./validation/index.js";
