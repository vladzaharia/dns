import { Record } from "../utils/record";
import { GetHost } from "./core";

export const PolarisVideoServices: Record[] = [
  /* Public */
  { name: "media", description: "Plex media server" },
  { name: "request", description: "Overseerr request service" },

  { name: "xteve", description: "xTeVe IPTV service" },
  { name: "ersatz", description: "Custom IPTV channel service" },
  { name: "logos", description: "IPTV channel logos" },
  { name: "guide", description: "Guide2go hosted guide and images" },

  /* Private */
  {
    name: "sonarr",
    description: "Sonarr - TV Indexer",
    target: GetHost("AzureGateway"),
  },
  {
    name: "radarr",
    description: "Radarr - Movie Indexer",
    target: GetHost("AzureGateway"),
  },
  {
    name: "lidarr",
    description: "Lidarr - Music Indexer",
    target: GetHost("AzureGateway"),
  },
  {
    name: "readarr",
    description: "Readerr - Book Indexer",
    target: GetHost("AzureGateway"),
  },
  {
    name: "prowlarr",
    description: "Prowlarr - Meta Indexer",
    target: GetHost("AzureGateway"),
  },
  {
    name: "sabnzbd",
    description: "SabNZBd - NZB Downloader",
    target: GetHost("AzureGateway"),
  },
  {
    name: "tautulli",
    description: "Tautulli Stats",
    target: GetHost("AzureGateway"),
  },
];
