/**
 * Productivity services
 *
 * Services for development, collaboration, and personal productivity.
 */

import type { ServiceCategory } from "./types.js";

export const productivityServices: ServiceCategory = {
  name: "productivity",
  description: "Development and productivity services",
  services: [
    {
      subdomain: "atuin",
      description: "Atuin Shell History Sync",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "cloud",
      description: "OwnCloud File Storage",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "docs",
      description: "OnlyOffice Document Editor",
      server: "greenwood",
      routing: "direct",
    },
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
    {
      subdomain: "mqtt",
      description: "Mosquitto MQTT Broker",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "chat",
      description: "OpenWebUI AI Chat",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "kiwix",
      description: "Kiwix Offline Wikipedia",
      ip: "10.11.2.123",
      proxy: false,
    },
  ],
} as const;
