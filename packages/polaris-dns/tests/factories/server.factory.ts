/**
 * Test data factories for Server entities
 * Uses fishery and faker for generating realistic test data
 */

import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import type { Server, ServerLocation, ServerName } from "../../src/lib/types.js";

// Valid server locations
const SERVER_LOCATIONS: ServerLocation[] = ["sea", "az", "re", "local"];

// Valid server names
const SERVER_NAMES: ServerName[] = [
  "greenwood",
  "caphill",
  "pangolin",
  "upvpn",
  "reprise1",
  "reprise2",
  "reprise3",
  "reprise4",
  "local-traefik",
];

// Location prefixes for realistic hostnames
const LOCATION_PREFIXES: Record<ServerLocation, string> = {
  sea: "seattle",
  az: "azure",
  re: "reprise",
  local: "local",
};

/**
 * Generate a valid IPv4 address
 */
function generateIPv4(): string {
  return faker.internet.ipv4();
}

/**
 * Generate a valid IPv6 address
 */
function generateIPv6(): string {
  return faker.internet.ipv6();
}

/**
 * Generate a valid hostname based on location and prefix
 */
function generateHostname(prefix: string, location: ServerLocation): string {
  const locationPrefix = LOCATION_PREFIXES[location];
  return `${prefix}.${locationPrefix}.example.com`;
}

/**
 * Server factory for generating test server data
 */
export const serverFactory = Factory.define<Server>(({ sequence }) => {
  const location = faker.helpers.arrayElement(SERVER_LOCATIONS);
  const prefix = faker.string.alpha({ length: { min: 2, max: 8 }, casing: "lower" });

  return {
    name: SERVER_NAMES[sequence % SERVER_NAMES.length],
    location,
    prefix,
    hostname: generateHostname(prefix, location),
    ip: generateIPv4(),
    ipv6: faker.datatype.boolean() ? generateIPv6() : undefined,
    isDDNS: faker.datatype.boolean(),
  };
});

/**
 * Factory for Seattle-based servers
 */
export const seattleServerFactory = serverFactory.params({
  location: "sea",
});

/**
 * Factory for Azure-based servers
 */
export const azureServerFactory = serverFactory.params({
  location: "az",
});

/**
 * Factory for Reprise-based servers
 */
export const repriseServerFactory = serverFactory.params({
  location: "re",
});

/**
 * Factory for local servers
 */
export const localServerFactory = serverFactory.params({
  location: "local",
});

/**
 * Factory for DDNS-enabled servers
 */
export const ddnsServerFactory = serverFactory.params({
  isDDNS: true,
});

/**
 * Factory for static IP servers (no DDNS)
 */
export const staticServerFactory = serverFactory.params({
  isDDNS: false,
});

// Export helper functions
export { generateIPv4, generateIPv6, generateHostname, SERVER_LOCATIONS, SERVER_NAMES };

