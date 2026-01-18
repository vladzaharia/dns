/**
 * Infrastructure services
 *
 * Core infrastructure services for authentication, secrets management,
 * monitoring, and network management.
 */

import type { ServiceCategory } from "./types.js";

export const infrastructureServices: ServiceCategory = {
  name: "infrastructure",
  description: "Core infrastructure services",
  services: [
    // Network Infrastructure
    {
      subdomain: "router",
      description: "Router",
      ip: "10.10.0.1",
      proxy: false,
    },
    {
      subdomain: "truenas",
      description: "TrueNAS Storage",
      ip: "10.10.0.10",
      proxy: false,
    },

    // Authentication & Security
    {
      subdomain: "auth",
      description: "Authentik/Zitadel Identity Provider",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "vault",
      description: "HashiCorp Vault Secrets Management",
      server: "greenwood",
      routing: "direct",
    },

    // Container Management
    {
      subdomain: "docker",
      description: "Arcane Docker Management",
      server: "greenwood",
      routing: "tunnel",
    },

    // Monitoring
    {
      subdomain: "up",
      description: "Uptime Kuma Monitoring",
      ip: "20.64.176.83",
    },

    // Network Services
    {
      subdomain: "net",
      description: "Polaris Tunnels",
      server: "azure-tunnel",
      routing: "direct",
    },
  ],
} as const;
