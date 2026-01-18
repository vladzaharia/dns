/**
 * Test data factories for Service entities
 * Uses fishery and faker for generating realistic test data
 */

import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import type { Service, RoutingStrategy, ServerName, ServiceCategory } from "../../src/lib/types.js";
import { SERVER_NAMES } from "./server.factory.js";

// Valid routing strategies
const ROUTING_STRATEGIES: RoutingStrategy[] = ["direct", "tunnel", "proxied"];

// Valid service categories
const SERVICE_CATEGORIES: ServiceCategory[] = [
  "infrastructure",
  "productivity",
  "media",
  "gaming",
  "homelab",
  "internal",
];

// Common service name prefixes for realistic data
const SERVICE_PREFIXES = [
  "api",
  "auth",
  "dashboard",
  "monitor",
  "backup",
  "storage",
  "media",
  "sync",
  "proxy",
  "gateway",
];

/**
 * Generate a valid DNS subdomain label
 */
function generateSubdomain(): string {
  const prefix = faker.helpers.arrayElement(SERVICE_PREFIXES);
  const suffix = faker.string.alpha({ length: { min: 0, max: 4 }, casing: "lower" });
  return suffix ? `${prefix}-${suffix}` : prefix;
}

/**
 * Service factory for generating test service data
 */
export const serviceFactory = Factory.define<Service>(({ sequence }) => {
  const isInternal = faker.datatype.boolean({ probability: 0.2 });

  return {
    name: faker.company.buzzNoun(),
    subdomain: generateSubdomain(),
    server: faker.helpers.arrayElement(SERVER_NAMES) as ServerName,
    routing: faker.helpers.arrayElement(ROUTING_STRATEGIES),
    internal: isInternal ? true : undefined,
    internalSuffix: isInternal ? faker.helpers.arrayElement([".local", ".int", ".internal"]) : undefined,
  };
});

/**
 * Factory for direct-routed services
 */
export const directServiceFactory = serviceFactory.params({
  routing: "direct",
});

/**
 * Factory for tunnel-routed services
 */
export const tunnelServiceFactory = serviceFactory.params({
  routing: "tunnel",
});

/**
 * Factory for proxied services
 */
export const proxiedServiceFactory = serviceFactory.params({
  routing: "proxied",
});

/**
 * Factory for internal services
 */
export const internalServiceFactory = serviceFactory.params({
  internal: true,
  internalSuffix: ".local",
});

/**
 * Factory for services on greenwood server
 */
export const greenwoodServiceFactory = serviceFactory.params({
  server: "greenwood",
});

/**
 * Factory for services on azure-tunnel
 */
export const azureTunnelServiceFactory = serviceFactory.params({
  server: "azure-tunnel",
  routing: "tunnel",
});

/**
 * Factory for services on local-traefik
 */
export const localTraefikServiceFactory = serviceFactory.params({
  server: "local-traefik",
  internal: true,
});

/**
 * Service category definition type
 */
export interface ServiceCategoryDefinition {
  name: ServiceCategory;
  description: string;
  services: readonly Service[];
}

/**
 * Factory for service category definitions
 */
export const serviceCategoryFactory = Factory.define<ServiceCategoryDefinition>(({ sequence }) => {
  const category = SERVICE_CATEGORIES[sequence % SERVICE_CATEGORIES.length];
  const serviceCount = faker.number.int({ min: 1, max: 5 });

  return {
    name: category,
    description: faker.lorem.sentence(),
    services: serviceFactory.buildList(serviceCount),
  };
});

// Export helper functions and constants
export {
  generateSubdomain,
  ROUTING_STRATEGIES,
  SERVICE_CATEGORIES,
  SERVICE_PREFIXES,
};

