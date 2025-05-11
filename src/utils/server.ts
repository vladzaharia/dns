export interface Server {
  /**
   * Display name of server.
   */
  name: ServerNames;

  /**
   * Description of the server.
   */
  description: string;

  /**
   * Prefix, first part of the final domain name.
   *
   * Current convention is periodic table.
   */
  prefix: ServerPrefixes;

  /**
   * Location, secont part of the final domain name.
   *
   * Current locations:
   *     sea - Seattle
   *     van - Vancouver
   *     ts  - Tailscale
   */
  location?: "sea" | "van" | "ts";

  /**
   * IP Address of the server.
   */
  ip: string;

  /**
   * Exclude from record creation?
   */
  excludeRecord?: boolean;
}

export type ServerMap = {
  [key: string]: Server;
};

export type ServerNames =
  | "LocalTraefik"
  | "Greenwood"
  | "CapHill"
  | "AzureGateway"
  | "Reprise1"
  | "Reprise2"
  | "Reprise3"
  | "Reprise4"
  | "UpVpn";
export type ServerPrefixes =
  | "gw"
  | "ch"
  | "local"
  | "tun"
  | "re"
  | "re-2"
  | "re-3"
  | "re-4"
  | "vpn";
