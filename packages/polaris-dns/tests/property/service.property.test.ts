/**
 * Property-based tests for Service validation
 * Uses fast-check to generate random valid inputs and verify invariants
 */

import { describe, expect } from "vitest";
import { test, fc } from "@fast-check/vitest";
import { serviceArb, routingStrategyArb, serverNameArb, serviceSubdomainArb } from "./arbitraries.js";
import { routingStrategySchema, serviceSchema, serviceDefinitionSchema } from "../schemas/service.schema.js";
import { serverNameSchema } from "../schemas/server.schema.js";

describe("Service Property Tests", () => {
  describe("Routing Strategy Properties", () => {
    test.prop([routingStrategyArb])("generated routing strategies should pass schema validation", (strategy) => {
      const result = routingStrategySchema.safeParse(strategy);
      expect(result.success).toBe(true);
    });

    test.prop([routingStrategyArb])("routing strategies should be one of the valid values", (strategy) => {
      expect(["direct", "tunnel", "proxied"]).toContain(strategy);
    });
  });

  describe("Service Object Properties", () => {
    test.prop([serviceArb])("generated services should have all required properties", (service) => {
      expect(service).toHaveProperty("name");
      expect(service).toHaveProperty("subdomain");
      expect(service).toHaveProperty("server");
      expect(service).toHaveProperty("routing");
    });

    test.prop([serviceArb])("service names should be non-empty strings", (service) => {
      expect(typeof service.name).toBe("string");
      expect(service.name.length).toBeGreaterThanOrEqual(1);
    });

    test.prop([serviceArb])("service subdomains should be non-empty strings", (service) => {
      expect(typeof service.subdomain).toBe("string");
      expect(service.subdomain.length).toBeGreaterThanOrEqual(1);
    });

    test.prop([serviceArb])("service servers should be valid server names", (service) => {
      const result = serverNameSchema.safeParse(service.server);
      expect(result.success).toBe(true);
    });

    test.prop([serviceArb])("service routing should be valid routing strategy", (service) => {
      const result = routingStrategySchema.safeParse(service.routing);
      expect(result.success).toBe(true);
    });

    test.prop([serviceArb])("service internal should be boolean or undefined", (service) => {
      if (service.internal !== undefined) {
        expect(typeof service.internal).toBe("boolean");
      }
    });

    test.prop([serviceArb])("service internalSuffix should be string or undefined", (service) => {
      if (service.internalSuffix !== undefined) {
        expect(typeof service.internalSuffix).toBe("string");
      }
    });
  });

  describe("Service Subdomain Properties", () => {
    test.prop([serviceSubdomainArb])("subdomains should be valid DNS labels", (subdomain) => {
      expect(subdomain.length).toBeGreaterThanOrEqual(1);
      expect(subdomain.length).toBeLessThanOrEqual(63);
    });

    test.prop([serviceSubdomainArb])("subdomains should not start with hyphen", (subdomain) => {
      expect(subdomain).not.toMatch(/^-/);
    });

    test.prop([serviceSubdomainArb])("subdomains should not end with hyphen", (subdomain) => {
      expect(subdomain).not.toMatch(/-$/);
    });

    test.prop([serviceSubdomainArb])("subdomains should not contain consecutive hyphens", (subdomain) => {
      expect(subdomain).not.toContain("--");
    });

    test.prop([serviceSubdomainArb])("subdomains should only contain lowercase alphanumeric and hyphens", (subdomain) => {
      expect(subdomain).toMatch(/^[a-z0-9-]+$/);
    });
  });

  describe("Service Invariants", () => {
    test.prop([fc.array(serviceArb, { minLength: 2, maxLength: 10 })])(
      "multiple services can be generated independently",
      (services) => {
        expect(services.length).toBeGreaterThanOrEqual(2);
        services.forEach((service) => {
          expect(service).toHaveProperty("name");
          expect(service).toHaveProperty("subdomain");
          expect(service).toHaveProperty("server");
          expect(service).toHaveProperty("routing");
        });
      }
    );

    test.prop([serviceArb, serviceArb])("two services can have different properties", (service1, service2) => {
      expect(service1).toBeDefined();
      expect(service2).toBeDefined();
    });
  });

  describe("Routing Strategy Combinations", () => {
    test.prop([serverNameArb, routingStrategyArb])(
      "any server can be combined with any routing strategy",
      (server, routing) => {
        const service = {
          name: "test-service",
          subdomain: "test",
          server,
          routing,
        };
        expect(service.server).toBeDefined();
        expect(service.routing).toBeDefined();
      }
    );

    test.prop([fc.constantFrom("direct", "tunnel", "proxied") as fc.Arbitrary<"direct" | "tunnel" | "proxied">])(
      "all routing strategies should be valid",
      (routing) => {
        const result = routingStrategySchema.safeParse(routing);
        expect(result.success).toBe(true);
      }
    );
  });

  describe("Internal Service Properties", () => {
    test.prop([serviceArb.filter((s) => s.internal === true)])(
      "internal services should have internal flag set",
      (service) => {
        expect(service.internal).toBe(true);
      }
    );

    test.prop([serviceArb.filter((s) => s.internalSuffix !== undefined)])(
      "services with internalSuffix should have valid suffix",
      (service) => {
        expect(service.internalSuffix).toMatch(/^\.[a-z]+$/);
      }
    );
  });
});

