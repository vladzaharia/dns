/**
 * Property-based tests for Server validation
 * Uses fast-check to generate random valid inputs and verify invariants
 */

import { describe, expect } from "vitest";
import { test, fc } from "@fast-check/vitest";
import {
  serverArb,
  serverLocationArb,
  serverNameArb,
  ipv4Arb,
  hostnameArb,
} from "./arbitraries.js";
import { serverLocationSchema, serverNameSchema } from "../schemas/server.schema.js";
import { ipv4Schema, hostnameSchema } from "../schemas/dns.schema.js";

describe("Server Property Tests", () => {
  describe("Server Location Properties", () => {
    test.prop([serverLocationArb])(
      "generated server locations should pass schema validation",
      (location) => {
        const result = serverLocationSchema.safeParse(location);
        expect(result.success).toBe(true);
      }
    );

    test.prop([serverLocationArb])(
      "server locations should be one of the valid values",
      (location) => {
        expect(["sea", "qnc", "re", "local"]).toContain(location);
      }
    );
  });

  describe("Server Name Properties", () => {
    test.prop([serverNameArb])("generated server names should pass schema validation", (name) => {
      const result = serverNameSchema.safeParse(name);
      expect(result.success).toBe(true);
    });

    test.prop([serverNameArb])("server names should be one of the valid values", (name) => {
      const validNames = [
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
      expect(validNames).toContain(name);
    });
  });

  describe("Server Object Properties", () => {
    test.prop([serverArb])("generated servers should have all required properties", (server) => {
      expect(server).toHaveProperty("name");
      expect(server).toHaveProperty("location");
      expect(server).toHaveProperty("prefix");
      expect(server).toHaveProperty("hostname");
      expect(server).toHaveProperty("ip");
    });

    test.prop([serverArb])("server names should be valid", (server) => {
      const result = serverNameSchema.safeParse(server.name);
      expect(result.success).toBe(true);
    });

    test.prop([serverArb])("server locations should be valid", (server) => {
      const result = serverLocationSchema.safeParse(server.location);
      expect(result.success).toBe(true);
    });

    test.prop([serverArb])("server IPs should be valid IPv4 addresses", (server) => {
      const result = ipv4Schema.safeParse(server.ip);
      expect(result.success).toBe(true);
    });

    test.prop([serverArb])("server hostnames should be valid", (server) => {
      const result = hostnameSchema.safeParse(server.hostname);
      expect(result.success).toBe(true);
    });

    test.prop([serverArb])("server prefixes should be non-empty strings", (server) => {
      expect(typeof server.prefix).toBe("string");
      expect(server.prefix.length).toBeGreaterThanOrEqual(1);
    });

    test.prop([serverArb])("server isDDNS should be boolean or undefined", (server) => {
      if (server.isDDNS !== undefined) {
        expect(typeof server.isDDNS).toBe("boolean");
      }
    });

    test.prop([serverArb])("server ipv6 should be string or undefined", (server) => {
      if (server.ipv6 !== undefined) {
        expect(typeof server.ipv6).toBe("string");
      }
    });
  });

  describe("Server Invariants", () => {
    test.prop([fc.array(serverArb, { minLength: 2, maxLength: 10 })])(
      "multiple servers can be generated independently",
      (servers) => {
        expect(servers.length).toBeGreaterThanOrEqual(2);
        servers.forEach((server) => {
          expect(server).toHaveProperty("name");
          expect(server).toHaveProperty("ip");
        });
      }
    );

    test.prop([serverArb, serverArb])(
      "two servers can have different properties",
      (server1, server2) => {
        // This is a weak property - just verifying we can generate two servers
        expect(server1).toBeDefined();
        expect(server2).toBeDefined();
      }
    );
  });

  describe("IP Address Invariants", () => {
    test.prop([ipv4Arb])("IPv4 addresses should be parseable", (ip) => {
      const parts = ip.split(".");
      expect(parts).toHaveLength(4);
      parts.forEach((part) => {
        const num = parseInt(part, 10);
        expect(num).toBeGreaterThanOrEqual(0);
        expect(num).toBeLessThanOrEqual(255);
      });
    });
  });

  describe("Hostname Invariants", () => {
    test.prop([hostnameArb])("hostnames should contain at least one dot", (hostname) => {
      expect(hostname).toContain(".");
    });

    test.prop([hostnameArb])("hostname labels should not start or end with hyphen", (hostname) => {
      const labels = hostname.split(".");
      labels.forEach((label) => {
        expect(label).not.toMatch(/^-/);
        expect(label).not.toMatch(/-$/);
      });
    });
  });
});
