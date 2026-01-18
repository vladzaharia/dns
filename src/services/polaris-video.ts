import { Record } from "../utils/record";

export const PolarisVideoServices: Record[] = [
  /* Public */
  { name: "media", description: "Plex" },
  { name: "request", description: "Overseerr", azgw: true },
  { name: "invite", description: "Wizarr", azgw: true },

  { name: "xteve", description: "xTeVe IPTV", azgw: true },
  { name: "threadfin", description: "Threadfin IPTV", azgw: true },
  // { name: "ersatz", description: "Ersatz TV", azgw: true },
  { name: "tunarr", description: "Tunarr TV", azgw: true },
  { name: "logos", description: "IPTV Logos" },
  { name: "guide", description: "Guide2go" },
  { name: "mirror", description: "MagicMirror" },
  { name: "flows", description: "n8n Workflows" },
  { name: "metube", description: "MeTube Downloader" },

  /* Private */
  {
    name: "maintain",
    description: "Maintainerr",
    azgw: true,
  },
  {
    name: "rec",
    description: "Recomendarr",
    azgw: true,
  },
  {
    name: "sonarr",
    description: "Sonarr",
    azgw: true,
  },
  {
    name: "radarr",
    description: "Radarr",
    azgw: true,
  },
  {
    name: "lidarr",
    description: "Lidarr",
    azgw: true,
  },
  {
    name: "readarr",
    description: "Readerr",
    azgw: true,
  },
  {
    name: "prowlarr",
    description: "Prowlarr",
    azgw: true,
  },
  {
    name: "sabnzbd",
    description: "SabNZBd",
    azgw: true,
  },
  {
    name: "decryptarr",
    description: "Decryptarr",
    azgw: true,
  },
  {
    name: "tautulli",
    description: "Tautulli Stats",
    azgw: true,
  },
];
