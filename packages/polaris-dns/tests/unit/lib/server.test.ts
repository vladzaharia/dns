/**
 * Unit tests for server registry and utilities
 */

import { describe, it, expect } from "vitest";
import {
  servers,
  getServer,
  getServerIP,
  getServerHostname,
  getServerPrefix,
  isServerDDNS,
  getServersByLocation,
  getAllServerNames,
} from "@lib/server.js";
import { serverSchema, serverNameSchema } from "@tests/schemas/server.schema.js";
import type { ServerName } from "@lib/types.js";

describe("Server Registry", () => {
  describe("servers object", () => {
    it("should contain all expected servers", () => {
      const expectedServers: ServerName[] = [
        "greenwood",
        "caphill",
        "pangolin",
        "upvpn",
        "reprise1",
        "reprise2",
        "reprise3",
        "reprise4",
        "local-traefik",
      ];

      expect(Object.keys(servers)).toHaveLength(expectedServers.length);
      expectedServers.forEach((name) => {
        expect(servers).toHaveProperty(name);
      });
    });

    it("should have valid server definitions for all servers", () => {
      Object.values(servers).forEach((server) => {
        const result = serverSchema.safeParse(server);
        expect(
          result.success,
          `Server ${server.name} failed validation: ${JSON.stringify(result)}`
        ).toBe(true);
      });
    });

    it("should have unique IP addresses for each server", () => {
      const ips = Object.values(servers).map((s) => s.ip);
      const uniqueIps = new Set(ips);
      expect(uniqueIps.size).toBe(ips.length);
    });

    it("should have unique hostnames for each server", () => {
      const hostnames = Object.values(servers).map((s) => s.hostname);
      const uniqueHostnames = new Set(hostnames);
      expect(uniqueHostnames.size).toBe(hostnames.length);
    });

    it("should have unique prefixes for each server", () => {
      const prefixes = Object.values(servers).map((s) => s.prefix);
      const uniquePrefixes = new Set(prefixes);
      expect(uniquePrefixes.size).toBe(prefixes.length);
    });

    it("should have valid IPv4 addresses for all servers", () => {
      Object.values(servers).forEach((server) => {
        expect(server.ip).toBeValidIPv4();
      });
    });

    it("should have valid hostnames for all servers", () => {
      Object.values(servers).forEach((server) => {
        expect(server.hostname).toBeValidHostname();
      });
    });
  });

  describe("getServer", () => {
    it("should return the correct server for greenwood", () => {
      const server = getServer("greenwood");
      expect(server.name).toBe("greenwood");
      expect(server.location).toBe("sea");
      expect(server.ip).toBe("67.185.194.56");
    });

    it("should return the correct server for pangolin", () => {
      const server = getServer("pangolin");
      expect(server.name).toBe("pangolin");
      expect(server.location).toBe("az");
      expect(server.prefix).toBe("tun");
    });

    it("should return the correct server for local-traefik", () => {
      const server = getServer("local-traefik");
      expect(server.name).toBe("local-traefik");
      expect(server.location).toBe("local");
      expect(server.ip).toBe("10.10.1.20");
    });

    it("should return all required properties", () => {
      const server = getServer("reprise1");
      expect(server).toHaveProperty("name");
      expect(server).toHaveProperty("location");
      expect(server).toHaveProperty("prefix");
      expect(server).toHaveProperty("hostname");
      expect(server).toHaveProperty("ip");
    });
  });

  describe("getServerIP", () => {
    it("should return correct IP for greenwood", () => {
      expect(getServerIP("greenwood")).toBe("67.185.194.56");
    });

    it("should return correct IP for pangolin", () => {
      expect(getServerIP("pangolin")).toBe("172.179.0.103");
    });

    it("should return correct IP for local-traefik", () => {
      expect(getServerIP("local-traefik")).toBe("10.10.1.20");
    });

    it("should return valid IPv4 for all servers", () => {
      getAllServerNames().forEach((name) => {
        expect(getServerIP(name)).toBeValidIPv4();
      });
    });
  });

  describe("getServerHostname", () => {
    it("should return correct hostname for greenwood", () => {
      expect(getServerHostname("greenwood")).toBe("gw.sea.plrs.im");
    });

    it("should return correct hostname for pangolin", () => {
      expect(getServerHostname("pangolin")).toBe("tun.az.plrs.im");
    });

    it("should return valid hostname for all servers", () => {
      getAllServerNames().forEach((name) => {
        expect(getServerHostname(name)).toBeValidHostname();
      });
    });
  });

  describe("getServerPrefix", () => {
    it("should return correct prefix for greenwood", () => {
      expect(getServerPrefix("greenwood")).toBe("gw");
    });

    it("should return correct prefix for pangolin", () => {
      expect(getServerPrefix("pangolin")).toBe("tun");
    });

    it("should return non-empty prefix for all servers", () => {
      getAllServerNames().forEach((name) => {
        const prefix = getServerPrefix(name);
        expect(prefix.length).toBeGreaterThan(0);
        expect(prefix.length).toBeLessThanOrEqual(10);
      });
    });
  });

  describe("isServerDDNS", () => {
    it("should return true for greenwood (DDNS server)", () => {
      expect(isServerDDNS("greenwood")).toBe(true);
    });

    it("should return true for caphill (DDNS server)", () => {
      expect(isServerDDNS("caphill")).toBe(true);
    });

    it("should return false for pangolin (static IP)", () => {
      expect(isServerDDNS("pangolin")).toBe(false);
    });

    it("should return false for reprise servers (static IP)", () => {
      expect(isServerDDNS("reprise1")).toBe(false);
      expect(isServerDDNS("reprise2")).toBe(false);
      expect(isServerDDNS("reprise3")).toBe(false);
      expect(isServerDDNS("reprise4")).toBe(false);
    });

    it("should return boolean for all servers", () => {
      getAllServerNames().forEach((name) => {
        expect(typeof isServerDDNS(name)).toBe("boolean");
      });
    });
  });

  describe("getServersByLocation", () => {
    it("should return Seattle servers", () => {
      const seaServers = getServersByLocation("sea");
      expect(seaServers.length).toBeGreaterThan(0);
      seaServers.forEach((server) => {
        expect(server.location).toBe("sea");
      });
    });

    it("should return Azure servers", () => {
      const azServers = getServersByLocation("az");
      expect(azServers.length).toBeGreaterThan(0);
      azServers.forEach((server) => {
        expect(server.location).toBe("az");
      });
    });

    it("should return Reprise servers", () => {
      const reServers = getServersByLocation("re");
      expect(reServers.length).toBe(4);
      reServers.forEach((server) => {
        expect(server.location).toBe("re");
      });
    });

    it("should return local servers", () => {
      const localServers = getServersByLocation("local");
      expect(localServers.length).toBeGreaterThan(0);
      localServers.forEach((server) => {
        expect(server.location).toBe("local");
      });
    });

    it("should include greenwood and caphill in Seattle", () => {
      const seaServers = getServersByLocation("sea");
      const names = seaServers.map((s) => s.name);
      expect(names).toContain("greenwood");
      expect(names).toContain("caphill");
    });
  });

  describe("getAllServerNames", () => {
    it("should return all server names", () => {
      const names = getAllServerNames();
      expect(names).toHaveLength(9);
    });

    it("should return valid server names", () => {
      const names = getAllServerNames();
      names.forEach((name) => {
        const result = serverNameSchema.safeParse(name);
        expect(result.success).toBe(true);
      });
    });

    it("should include all expected servers", () => {
      const names = getAllServerNames();
      expect(names).toContain("greenwood");
      expect(names).toContain("caphill");
      expect(names).toContain("pangolin");
      expect(names).toContain("upvpn");
      expect(names).toContain("reprise1");
      expect(names).toContain("local-traefik");
    });
  });

  describe("Server Data Integrity", () => {
    it("should have consistent name property matching registry key", () => {
      Object.entries(servers).forEach(([key, server]) => {
        expect(server.name).toBe(key);
      });
    });

    it("should have hostname containing prefix", () => {
      Object.values(servers).forEach((server) => {
        expect(server.hostname).toContain(server.prefix);
      });
    });

    it("should have hostname containing location for non-local servers", () => {
      Object.values(servers)
        .filter((s) => s.location !== "local")
        .forEach((server) => {
          expect(server.hostname).toContain(server.location);
        });
    });
  });
});
