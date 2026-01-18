/**
 * Media services
 *
 * Services for managing and consuming media content (books, manga, etc.)
 */

import type { ServiceCategory } from "./types.js";

export const mediaServices: ServiceCategory = {
  name: "media",
  description: "Media management services",
  services: [
    {
      subdomain: "books",
      description: "Calibre Web Book Library",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "calibre",
      description: "Calibre Desktop",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "manga",
      description: "Komga Manga Reader",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "stash",
      description: "Stash Media Organizer",
      server: "greenwood",
      routing: "direct",
    },
  ],
} as const;
