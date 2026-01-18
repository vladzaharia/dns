/**
 * Gaming services
 *
 * Services for gaming, game management, and retro gaming.
 */

import type { ServiceCategory } from "./types.js";

export const gamingServices: ServiceCategory = {
  name: "gaming",
  description: "Gaming services",
  services: [
    {
      subdomain: "games",
      description: "Drop Game Library",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "retro",
      description: "Romm Retro Game Manager",
      server: "greenwood",
      routing: "direct",
    },
  ],
} as const;
