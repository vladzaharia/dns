/**
 * Internal services
 *
 * Services that are only accessible on the internal network (int.zhr.one).
 */

import type { ServiceCategory } from "./types.js";

export const internalServices: ServiceCategory = {
  name: "internal",
  description: "Internal-only services",
  services: [
    {
      subdomain: "traefik",
      description: "Traefik Dashboard",
      server: "local-traefik",
      routing: "internal",
      proxy: false,
    },
    {
      subdomain: "netbootxyz",
      description: "NetbootXYZ PXE Boot",
      server: "local-traefik",
      routing: "internal",
      proxy: false,
    },
    {
      subdomain: "portainer",
      description: "Portainer Container Management",
      server: "local-traefik",
      routing: "internal",
      proxy: false,
    },
    {
      subdomain: "pgadmin",
      description: "PGAdmin Database Management",
      server: "local-traefik",
      routing: "internal",
      proxy: false,
    },
  ],
} as const;
