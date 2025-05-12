import { Record } from "../utils/record";

export const PolarisVideoServices: Record[] = [
  /* Public */
  { name: "media", description: "Plex" },
  { name: "request", description: "Overseerr", azgw: true },

  { name: "xteve", description: "xTeVe IPTV", azgw: true },
  { name: "ersatz", description: "Ersatz TV", azgw: true },
  { name: "tunarr", description: "Tunarr TV", azgw: true },
  { name: "logos", description: "IPTV Logos" },
  { name: "guide", description: "Guide2go" },

  /* Private */
  {
    name: "sonarr",
    description: "Sonarr - TV Indexer",
    azgw: true,
  },
  {
    name: "radarr",
    description: "Radarr - Movie Indexer",
    azgw: true,
  },
  {
    name: "lidarr",
    description: "Lidarr - Music Indexer",
    azgw: true,
  },
  {
    name: "readarr",
    description: "Readerr - Book Indexer",
    azgw: true,
  },
  {
    name: "prowlarr",
    description: "Prowlarr - Meta Indexer",
    azgw: true,
  },
  {
    name: "sabnzbd",
    description: "SabNZBd - NZB Downloader",
    azgw: true,
  },
  {
    name: "tautulli",
    description: "Tautulli Stats",
    azgw: true,
  },
];
