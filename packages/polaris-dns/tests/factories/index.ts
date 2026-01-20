/**
 * Test Data Factories Index
 *
 * Exports all test data factories for use in tests.
 * Uses fishery for factory definitions and faker for realistic data generation.
 *
 * @example
 * ```typescript
 * import { serverFactory, serviceFactory, aRecordFactory } from '../factories';
 *
 * // Create a single server
 * const server = serverFactory.build();
 *
 * // Create a server with specific attributes
 * const seattleServer = serverFactory.build({ location: 'sea' });
 *
 * // Create multiple services
 * const services = serviceFactory.buildList(5);
 *
 * // Use specialized factories
 * const tunnelService = tunnelServiceFactory.build();
 * const ddnsServer = ddnsServerFactory.build();
 * ```
 */

// Server factories
export {
  serverFactory,
  seattleServerFactory,
  azureServerFactory,
  repriseServerFactory,
  localServerFactory,
  ddnsServerFactory,
  staticServerFactory,
  generateIPv4,
  generateIPv6,
  generateHostname,
  SERVER_LOCATIONS,
  SERVER_NAMES,
} from "./server.factory.js";

// Service factories
export {
  serviceFactory,
  directServiceFactory,
  tunnelServiceFactory,
  proxiedServiceFactory,
  internalServiceFactory,
  greenwoodServiceFactory,
  azureTunnelServiceFactory,
  localTraefikServiceFactory,
  serviceCategoryFactory,
  generateSubdomain,
  ROUTING_STRATEGIES,
  SERVICE_CATEGORIES,
  SERVICE_PREFIXES,
} from "./service.factory.js";

// DNS record factories
export {
  recordOptionsFactory,
  aRecordFactory,
  aaaaRecordFactory,
  cnameRecordFactory,
  mxRecordFactory,
  txtRecordFactory,
  caaRecordFactory,
  generateDnsLabel,
  generateHostname as generateDnsHostname,
  generateTTL,
  generateMXPriority,
  PROXY_STATUSES,
  CAA_TAGS,
  CERTIFICATE_AUTHORITIES,
} from "./dns.factory.js";
