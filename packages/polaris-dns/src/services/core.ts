/**
 * Core service utilities
 *
 * Provides functions to convert service definitions to DNS records.
 */

import type { ServiceDefinition, ServiceCategory } from "./types.js";
import { getServer, getServerHostname } from "../lib/server.js";
import { createARecord, createCNAMERecord } from "../lib/record.js";

// =============================================================================
// Service Record Generation
// =============================================================================

/**
 * Convert a service definition to DNS records
 */
export function serviceToRecords(service: ServiceDefinition): DomainModifier[] {
  const { subdomain, server = "greenwood", routing = "direct", ip, cname, proxy = true } = service;

  // Custom IP address
  if (ip) {
    return [createARecord(subdomain, ip, { proxy: proxy ? "on" : "off" })];
  }

  // Custom CNAME target
  if (cname) {
    return [createCNAMERecord(subdomain, cname, { proxy: proxy ? "on" : "off" })];
  }

  // Routing-based record generation
  switch (routing) {
    case "tunnel":
      // Use Azure tunnel CNAME
      return [
        createCNAMERecord(subdomain, getServerHostname("pangolin") + ".", {
          proxy: proxy ? "on" : "off",
        }),
      ];

    case "internal":
      // Internal services use local Traefik IP (no CNAME available)
      return [createARecord(subdomain, getServer("local-traefik").ip, { proxy: "off" })];

    case "proxied":
    case "direct":
    default:
      // CNAME to server hostname on plrs.im
      return [
        createCNAMERecord(subdomain, getServerHostname(server) + ".", {
          proxy: proxy ? "on" : "off",
        }),
      ];
  }
}

/**
 * Convert a service category to DNS records
 */
export function categoryToRecords(category: ServiceCategory): DomainModifier[] {
  // Use reduce instead of flatMap for ES5 compatibility
  return category.services.reduce<DomainModifier[]>((acc, service) => {
    return acc.concat(serviceToRecords(service));
  }, []);
}

/**
 * Convert multiple service categories to DNS records
 */
export function categoriesToRecords(categories: ServiceCategory[]): DomainModifier[] {
  // Use reduce instead of flatMap for ES5 compatibility
  return categories.reduce<DomainModifier[]>((acc, category) => {
    return acc.concat(categoryToRecords(category));
  }, []);
}
