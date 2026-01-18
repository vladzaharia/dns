/**
 * Tests for services/types.ts type definitions
 */

import { describe, it, expect } from "vitest";
import type { RoutingStrategy, ServiceDefinition, ServiceCategory } from "@services/types.js";

describe("Service Type Definitions", () => {
  describe("RoutingStrategy", () => {
    it("should allow valid routing strategies", () => {
      const strategies: RoutingStrategy[] = ["direct", "tunnel", "proxied", "internal"];
      expect(strategies).toHaveLength(4);
    });

    it("should include all expected strategies", () => {
      const direct: RoutingStrategy = "direct";
      const tunnel: RoutingStrategy = "tunnel";
      const proxied: RoutingStrategy = "proxied";
      const internal: RoutingStrategy = "internal";

      expect(direct).toBe("direct");
      expect(tunnel).toBe("tunnel");
      expect(proxied).toBe("proxied");
      expect(internal).toBe("internal");
    });
  });

  describe("ServiceDefinition", () => {
    it("should define required properties", () => {
      const service: ServiceDefinition = {
        subdomain: "auth",
        description: "Authentication service",
      };
      expect(service.subdomain).toBe("auth");
      expect(service.description).toBe("Authentication service");
    });

    it("should allow optional server property", () => {
      const service: ServiceDefinition = {
        subdomain: "auth",
        description: "Authentication service",
        server: "greenwood",
      };
      expect(service.server).toBe("greenwood");
    });

    it("should allow optional routing property", () => {
      const service: ServiceDefinition = {
        subdomain: "auth",
        description: "Authentication service",
        routing: "tunnel",
      };
      expect(service.routing).toBe("tunnel");
    });

    it("should allow optional ip property", () => {
      const service: ServiceDefinition = {
        subdomain: "router",
        description: "Router",
        ip: "10.10.0.1",
      };
      expect(service.ip).toBe("10.10.0.1");
    });

    it("should allow optional cname property", () => {
      const service: ServiceDefinition = {
        subdomain: "cdn",
        description: "CDN",
        cname: "cdn.example.com",
      };
      expect(service.cname).toBe("cdn.example.com");
    });

    it("should allow optional proxy property", () => {
      const service: ServiceDefinition = {
        subdomain: "internal",
        description: "Internal service",
        proxy: false,
      };
      expect(service.proxy).toBe(false);
    });

    it("should allow all optional properties together", () => {
      const service: ServiceDefinition = {
        subdomain: "auth",
        description: "Authentication service",
        server: "greenwood",
        routing: "direct",
        ip: "10.10.0.1",
        cname: "auth.example.com",
        proxy: true,
      };
      expect(service).toBeDefined();
    });
  });

  describe("ServiceCategory", () => {
    it("should define required properties", () => {
      const category: ServiceCategory = {
        name: "infrastructure",
        description: "Core infrastructure services",
        services: [],
      };
      expect(category.name).toBe("infrastructure");
      expect(category.description).toBe("Core infrastructure services");
      expect(category.services).toEqual([]);
    });

    it("should accept readonly services array", () => {
      const category: ServiceCategory = {
        name: "infrastructure",
        description: "Core infrastructure services",
        services: [
          { subdomain: "auth", description: "Auth" },
          { subdomain: "vault", description: "Vault" },
        ] as const,
      };
      expect(category.services).toHaveLength(2);
    });

    it("should work with complete service definitions", () => {
      const category: ServiceCategory = {
        name: "homelab",
        description: "Homelab services",
        services: [
          {
            subdomain: "traefik",
            description: "Traefik Dashboard",
            server: "local-traefik",
            routing: "internal",
            proxy: false,
          },
        ],
      };
      expect(category.services[0].server).toBe("local-traefik");
      expect(category.services[0].routing).toBe("internal");
    });
  });
});
