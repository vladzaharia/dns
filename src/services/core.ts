import { Record } from "../utils/record";
import { ServerNames, ServerMap } from "../utils/server";

const RootDomain = "polaris.gdn";

const Servers: ServerMap = {
  Greenwood: {
    name: "Greenwood",
    description: "Greenwood Townhouse IP",
    prefix: "gw",
    location: "sea",
    ip: "67.185.194.56",
    excludeRecord: true,
  },
  CapHill: {
    name: "CapHill",
    description: "CapHill Townhouse IP",
    prefix: "ch",
    location: "sea",
    ip: "97.113.197.175",
    excludeRecord: true,
  },
  AzureGateway: {
    name: "AzureGateway",
    description: "Azure Tunnel Gateway",
    prefix: "tun",
    ip: "172.179.0.103",
  },
  UpVpn: {
    name: "UpVpn",
    description: "UpVPN Serverless",
    prefix: "vpn",
    ip: "20.3.240.145",
  },
  Reprise1: {
    name: "Reprise1",
    description: "Reprise IP1",
    prefix: "re",
    location: "sea",
    ip: "104.37.168.87",
  },
  Reprise2: {
    name: "Reprise2",
    description: "Reprise IP2",
    prefix: "re-2",
    location: "sea",
    ip: "104.37.168.88",
  },
  Reprise3: {
    name: "Reprise2",
    description: "Reprise IP3",
    prefix: "re-3",
    location: "sea",
    ip: "104.37.168.89",
  },
  Reprise4: {
    name: "Reprise2",
    description: "Reprise IP4",
    prefix: "re-4",
    location: "sea",
    ip: "104.37.168.90",
  },
  LocalTraefik: {
    name: "LocalTraefik",
    description: "Internal Traefik services",
    prefix: "local",
    ip: "10.10.1.20",
    excludeRecord: true,
  },
};

export function GetPrefix(name: string): string {
  const server = Servers[name];

  if (!server) {
    throw "Server not found!";
  }

  if (!server.location) {
    return `${server.prefix}`;
  }

  return `${server.prefix}.${server.location}`;
}

export function GetHost(name: ServerNames): string {
  const server = Servers[name];

  if (!server) {
    throw "Server not found!";
  }

  return `${GetPrefix(name)}.${RootDomain}.`;
}

export function GetIP(name: ServerNames): string {
  const server = Servers[name];

  if (!server) {
    throw "Server not found!";
  }

  return server.ip;
}

export function GetCoreRecords(): Record[] {
  return Object.keys(Servers)
    .filter((key: string): boolean => {
      return !Servers[key].excludeRecord;
    })
    .map((key: string): Record => {
      const server = Servers[key];

      return {
        name: GetPrefix(key),
        description: `${key} - ${server.description}`,
        type: "A",
        target: server.ip,
      };
    });
}
