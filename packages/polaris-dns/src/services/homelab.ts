/**
 * Homelab services
 *
 * Services for homelab infrastructure, storage, and development.
 */

import type { ServiceCategory } from "./types.js";

export const homelabServices: ServiceCategory = {
  name: "homelab",
  description: "Homelab infrastructure services",
  services: [
    // Development
    {
      subdomain: "code",
      description: "Coder Development Environment",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "*.code",
      description: "Coder Wildcard",
      server: "greenwood",
      routing: "direct",
    },

    // Storage
    {
      subdomain: "garage",
      description: "Garage S3 Storage",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "s3",
      description: "Garage S3 API",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "*.s3",
      description: "Garage S3 Web Buckets",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "k2v",
      description: "Garage K2V API",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "d",
      description: "Dropshare File Sharing",
      server: "greenwood",
      routing: "direct",
    },

    // Logging
    {
      subdomain: "log",
      description: "Seq Log Viewer",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "ingest.log",
      description: "Seq Log Ingest",
      server: "greenwood",
      routing: "direct",
    },

    // Containers & Registry
    {
      subdomain: "kasm",
      description: "Kasm Workspaces",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "registry.kasm",
      description: "Kasm Registry",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "registry",
      description: "Docker Registry",
      server: "greenwood",
      routing: "direct",
    },

    // Tunneling
    {
      subdomain: "z",
      description: "Zrok Tunnel",
      server: "reprise4",
      routing: "direct",
    },
    {
      subdomain: "*.z",
      description: "Zrok Wildcard",
      server: "reprise4",
      routing: "direct",
    },

    // AI
    {
      subdomain: "ai",
      description: "LibreChat AI Interface",
      server: "greenwood",
      routing: "tunnel",
    },
  ],
} as const;
