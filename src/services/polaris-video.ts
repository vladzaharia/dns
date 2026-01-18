/**
 * Polaris Video services
 *
 * Media streaming and management services for polaris.video domain.
 */

import type { ServiceCategory } from "./types.js";

export const polarisVideoServices: ServiceCategory = {
  name: "polaris-video",
  description: "Media streaming and management services",
  services: [
    // Public Services
    {
      subdomain: "media",
      description: "Plex Media Server",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "request",
      description: "Overseerr Media Requests",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "invite",
      description: "Wizarr Plex Invites",
      server: "greenwood",
      routing: "tunnel",
    },

    // IPTV Services
    {
      subdomain: "xteve",
      description: "xTeVe IPTV Proxy",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "threadfin",
      description: "Threadfin IPTV Proxy",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "tunarr",
      description: "Tunarr TV",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "logos",
      description: "IPTV Channel Logos",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "guide",
      description: "Guide2go EPG",
      server: "greenwood",
      routing: "direct",
    },

    // Utilities
    {
      subdomain: "mirror",
      description: "MagicMirror Dashboard",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "flows",
      description: "n8n Workflow Automation",
      server: "greenwood",
      routing: "direct",
    },
    {
      subdomain: "metube",
      description: "MeTube Video Downloader",
      server: "greenwood",
      routing: "direct",
    },

    // Media Management (Private)
    {
      subdomain: "maintain",
      description: "Maintainerr Library Maintenance",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "rec",
      description: "Recomendarr Recommendations",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "sonarr",
      description: "Sonarr TV Shows",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "radarr",
      description: "Radarr Movies",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "lidarr",
      description: "Lidarr Music",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "readarr",
      description: "Readarr Books",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "prowlarr",
      description: "Prowlarr Indexer Manager",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "sabnzbd",
      description: "SABnzbd Usenet Downloader",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "decryptarr",
      description: "Decryptarr",
      server: "greenwood",
      routing: "tunnel",
    },
    {
      subdomain: "tautulli",
      description: "Tautulli Plex Statistics",
      server: "greenwood",
      routing: "tunnel",
    },
  ],
} as const;
