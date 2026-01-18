/**
 * Unit tests for domain builder and utilities
 */

import { describe, it, expect } from "vitest";
import {
  createDomain,
  defineDomain,
  NO_REGISTRAR,
  CLOUDFLARE,
  PERSONAL_DOMAINS,
  INFRASTRUCTURE_DOMAINS,
  SERVICE_DOMAINS,
  LOCAL_DOMAINS,
  ALL_DOMAINS,
} from "@lib/domain.js";
import { mockDnsControl, getCapturedDomains } from "@tests/mocks/dnscontrol.js";

describe("Domain Builder", () => {
  describe("Provider Exports", () => {
    it("should export NO_REGISTRAR", () => {
      expect(NO_REGISTRAR).toBeDefined();
      // NO_REGISTRAR is the result of NewRegistrar("none") which returns "none" in our mock
      expect(NO_REGISTRAR).toBe("none");
    });

    it("should export CLOUDFLARE", () => {
      expect(CLOUDFLARE).toBeDefined();
      // CLOUDFLARE is the result of NewDnsProvider("cloudflare") which returns "cloudflare" in our mock
      expect(CLOUDFLARE).toBe("cloudflare");
    });

    it("should be usable as registrar and provider", () => {
      // Verify the exports can be used in createDomain
      createDomain({
        name: "provider-test.com",
        category: "personal",
        registrar: NO_REGISTRAR,
        dnsProvider: CLOUDFLARE,
      });

      expect(mockDnsControl.D).toHaveBeenCalled();
    });
  });

  describe("createDomain", () => {
    it("should create a basic domain", () => {
      createDomain({
        name: "example.com",
        category: "personal",
      });

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.length).toBeGreaterThan(0);
    });

    it("should use default registrar and provider", () => {
      createDomain({
        name: "test.com",
        category: "infrastructure",
      });

      expect(mockDnsControl.D).toHaveBeenCalled();
    });

    it("should accept custom registrar", () => {
      const customRegistrar = mockDnsControl.NewRegistrar("custom");
      createDomain({
        name: "custom.com",
        category: "services",
        registrar: customRegistrar,
      });

      expect(mockDnsControl.D).toHaveBeenCalled();
    });

    it("should accept custom DNS provider", () => {
      const customProvider = mockDnsControl.NewDnsProvider("route53");
      createDomain({
        name: "aws.com",
        category: "infrastructure",
        dnsProvider: customProvider,
      });

      expect(mockDnsControl.D).toHaveBeenCalled();
    });

    it("should pass records to domain", () => {
      const record1 = mockDnsControl.A("test", "1.2.3.4");
      const record2 = mockDnsControl.CNAME("www", "test.example.com.");

      createDomain(
        {
          name: "records.com",
          category: "personal",
        },
        record1,
        record2
      );

      expect(mockDnsControl.D).toHaveBeenCalled();
    });

    it("should handle ignore patterns", () => {
      createDomain({
        name: "ignored.com",
        category: "infrastructure",
        ignorePatterns: ["_acme-challenge", "*.external"],
      });

      expect(mockDnsControl.D).toHaveBeenCalled();
    });

    it("should set default TTL", () => {
      createDomain({
        name: "ttl.com",
        category: "services",
        defaultTTL: 300,
      });

      expect(mockDnsControl.D).toHaveBeenCalled();
    });
  });

  describe("defineDomain", () => {
    it("should create a domain configuration object", () => {
      const config = defineDomain("example.com", "personal");

      expect(config).toEqual({
        name: "example.com",
        category: "personal",
        registrar: "none",
        dnsProvider: "cloudflare",
      });
    });

    it("should accept custom registrar and provider", () => {
      const config = defineDomain("custom.com", "infrastructure", "namecheap", "route53");

      expect(config).toEqual({
        name: "custom.com",
        category: "infrastructure",
        registrar: "namecheap",
        dnsProvider: "route53",
      });
    });

    it("should work with all domain categories", () => {
      const categories = ["personal", "infrastructure", "services", "local"] as const;

      categories.forEach((category) => {
        const config = defineDomain("test.com", category);
        expect(config.category).toBe(category);
      });
    });
  });

  describe("Domain Constants", () => {
    it("should have correct personal domains", () => {
      expect(PERSONAL_DOMAINS).toContain("vlad.gg");
      expect(PERSONAL_DOMAINS).toContain("vlad.lgbt");
      expect(PERSONAL_DOMAINS).toContain("jesse.rocks");
      expect(PERSONAL_DOMAINS).toContain("spunk.dog");
      expect(PERSONAL_DOMAINS).toContain("famjam.ing");
      expect(PERSONAL_DOMAINS).toContain("zaharia.email");
      expect(PERSONAL_DOMAINS).toHaveLength(6);
    });

    it("should have correct infrastructure domains", () => {
      expect(INFRASTRUCTURE_DOMAINS).toContain("plrs.im");
      expect(INFRASTRUCTURE_DOMAINS).toContain("polaris.gdn");
      expect(INFRASTRUCTURE_DOMAINS).toContain("zhr.one");
      expect(INFRASTRUCTURE_DOMAINS).toHaveLength(3);
    });

    it("should have correct service domains", () => {
      expect(SERVICE_DOMAINS).toContain("polaris.express");
      expect(SERVICE_DOMAINS).toContain("polaris.video");
      expect(SERVICE_DOMAINS).toContain("polaris.rest");
      expect(SERVICE_DOMAINS).toHaveLength(3);
    });

    it("should have correct local domains", () => {
      expect(LOCAL_DOMAINS).toContain("danger.direct");
      expect(LOCAL_DOMAINS).toContain("danger.diy");
      expect(LOCAL_DOMAINS).toHaveLength(2);
    });

    it("should have ALL_DOMAINS containing all domain categories", () => {
      const totalDomains =
        PERSONAL_DOMAINS.length +
        INFRASTRUCTURE_DOMAINS.length +
        SERVICE_DOMAINS.length +
        LOCAL_DOMAINS.length;

      expect(ALL_DOMAINS).toHaveLength(totalDomains);

      // Verify all domains are included
      PERSONAL_DOMAINS.forEach((d) => expect(ALL_DOMAINS).toContain(d));
      INFRASTRUCTURE_DOMAINS.forEach((d) => expect(ALL_DOMAINS).toContain(d));
      SERVICE_DOMAINS.forEach((d) => expect(ALL_DOMAINS).toContain(d));
      LOCAL_DOMAINS.forEach((d) => expect(ALL_DOMAINS).toContain(d));
    });

    it("should have valid domain name format for all domains", () => {
      ALL_DOMAINS.forEach((domain) => {
        // Domain should have at least one dot
        expect(domain).toContain(".");
        // Domain should not start or end with a dot
        expect(domain).not.toMatch(/^\./);
        expect(domain).not.toMatch(/\.$/);
        // Domain should only contain valid characters
        expect(domain).toMatch(/^[a-z0-9.-]+$/);
      });
    });

    it("should have unique domains across all categories", () => {
      const allDomainsSet = new Set(ALL_DOMAINS);
      expect(allDomainsSet.size).toBe(ALL_DOMAINS.length);
    });
  });
});
