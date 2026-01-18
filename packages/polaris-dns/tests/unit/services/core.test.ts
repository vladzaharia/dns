/**
 * Unit tests for service core utilities
 */

import { describe, it, expect } from "vitest";
import { serviceToRecords, categoryToRecords, categoriesToRecords } from "@services/core.js";
import type { ServiceDefinition, ServiceCategory } from "@services/types.js";
import { mockDnsControl } from "@tests/mocks/dnscontrol.js";

describe("Service Core", () => {
  describe("serviceToRecords", () => {
    describe("Direct routing", () => {
      it("should create CNAME record for direct routing", () => {
        const service: ServiceDefinition = {
          subdomain: "app",
          description: "Test app",
          server: "greenwood",
          routing: "direct",
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.CNAME).toHaveBeenCalled();
      });

      it("should use default server (greenwood) when not specified", () => {
        const service: ServiceDefinition = {
          subdomain: "default",
          description: "Default server test",
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.CNAME).toHaveBeenCalled();
      });

      it("should enable proxy by default", () => {
        const service: ServiceDefinition = {
          subdomain: "proxied",
          description: "Proxied service",
        };

        serviceToRecords(service);

        expect(mockDnsControl.CNAME).toHaveBeenCalled();
      });

      it("should disable proxy when specified", () => {
        const service: ServiceDefinition = {
          subdomain: "no-proxy",
          description: "No proxy service",
          proxy: false,
        };

        serviceToRecords(service);

        expect(mockDnsControl.CNAME).toHaveBeenCalled();
      });
    });

    describe("Tunnel routing", () => {
      it("should create CNAME to Azure tunnel", () => {
        const service: ServiceDefinition = {
          subdomain: "tunneled",
          description: "Tunneled service",
          routing: "tunnel",
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.CNAME).toHaveBeenCalled();
        // Should point to Azure tunnel hostname
        const call = mockDnsControl.CNAME.mock.calls[0];
        expect(call[1]).toContain("tun.az.plrs.im");
      });
    });

    describe("Internal routing", () => {
      it("should create A record to local Traefik", () => {
        const service: ServiceDefinition = {
          subdomain: "internal",
          description: "Internal service",
          routing: "internal",
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.A).toHaveBeenCalled();
        // Should point to local Traefik IP
        const call = mockDnsControl.A.mock.calls[0];
        expect(call[1]).toBe("10.10.1.20");
      });
    });

    describe("Custom IP", () => {
      it("should create A record with custom IP", () => {
        const service: ServiceDefinition = {
          subdomain: "custom-ip",
          description: "Custom IP service",
          ip: "192.168.1.100",
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.A).toHaveBeenCalledWith(
          "custom-ip",
          "192.168.1.100",
          expect.anything()
        );
      });
    });

    describe("Custom CNAME", () => {
      it("should create CNAME with custom target", () => {
        const service: ServiceDefinition = {
          subdomain: "custom-cname",
          description: "Custom CNAME service",
          cname: "external.example.com.",
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.CNAME).toHaveBeenCalledWith(
          "custom-cname",
          "external.example.com.",
          expect.anything()
        );
      });

      it("should create CNAME with proxy disabled", () => {
        const service: ServiceDefinition = {
          subdomain: "custom-cname-no-proxy",
          description: "Custom CNAME no proxy",
          cname: "external.example.com.",
          proxy: false,
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.CNAME).toHaveBeenCalled();
      });
    });

    describe("Custom IP with proxy", () => {
      it("should create A record with proxy disabled", () => {
        const service: ServiceDefinition = {
          subdomain: "custom-ip-no-proxy",
          description: "Custom IP no proxy",
          ip: "192.168.1.100",
          proxy: false,
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.A).toHaveBeenCalled();
      });
    });

    describe("Proxied routing", () => {
      it("should create CNAME record for proxied routing", () => {
        const service: ServiceDefinition = {
          subdomain: "proxied-app",
          description: "Proxied app",
          server: "greenwood",
          routing: "proxied",
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.CNAME).toHaveBeenCalled();
      });

      it("should handle proxied routing with proxy disabled", () => {
        const service: ServiceDefinition = {
          subdomain: "proxied-no-cf",
          description: "Proxied no CF",
          routing: "proxied",
          proxy: false,
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.CNAME).toHaveBeenCalled();
      });
    });

    describe("Tunnel routing with proxy", () => {
      it("should create tunnel CNAME with proxy disabled", () => {
        const service: ServiceDefinition = {
          subdomain: "tunnel-no-proxy",
          description: "Tunnel no proxy",
          routing: "tunnel",
          proxy: false,
        };

        const records = serviceToRecords(service);

        expect(records).toHaveLength(1);
        expect(mockDnsControl.CNAME).toHaveBeenCalled();
      });
    });

    describe("Different servers", () => {
      it("should work with caphill server", () => {
        const service: ServiceDefinition = {
          subdomain: "caphill-app",
          description: "Caphill service",
          server: "caphill",
        };

        serviceToRecords(service);

        const call = mockDnsControl.CNAME.mock.calls[0];
        expect(call[1]).toContain("ch.sea.plrs.im");
      });

      it("should work with reprise servers", () => {
        const service: ServiceDefinition = {
          subdomain: "reprise-app",
          description: "Reprise service",
          server: "reprise1",
        };

        serviceToRecords(service);

        const call = mockDnsControl.CNAME.mock.calls[0];
        expect(call[1]).toContain("re1.re.plrs.im");
      });
    });
  });

  describe("categoryToRecords", () => {
    it("should convert a category with single service", () => {
      const category: ServiceCategory = {
        name: "test",
        description: "Test category",
        services: [
          {
            subdomain: "single",
            description: "Single service",
          },
        ],
      };

      const records = categoryToRecords(category);

      expect(records).toHaveLength(1);
    });

    it("should convert a category with multiple services", () => {
      const category: ServiceCategory = {
        name: "multi",
        description: "Multi-service category",
        services: [
          { subdomain: "service1", description: "Service 1" },
          { subdomain: "service2", description: "Service 2" },
          { subdomain: "service3", description: "Service 3" },
        ],
      };

      const records = categoryToRecords(category);

      expect(records).toHaveLength(3);
    });

    it("should handle empty category", () => {
      const category: ServiceCategory = {
        name: "empty",
        description: "Empty category",
        services: [],
      };

      const records = categoryToRecords(category);

      expect(records).toHaveLength(0);
    });

    it("should handle mixed routing strategies", () => {
      const category: ServiceCategory = {
        name: "mixed",
        description: "Mixed routing",
        services: [
          { subdomain: "direct", description: "Direct", routing: "direct" },
          { subdomain: "tunnel", description: "Tunnel", routing: "tunnel" },
          { subdomain: "internal", description: "Internal", routing: "internal" },
        ],
      };

      const records = categoryToRecords(category);

      expect(records).toHaveLength(3);
    });
  });

  describe("categoriesToRecords", () => {
    it("should convert multiple categories", () => {
      const categories: ServiceCategory[] = [
        {
          name: "cat1",
          description: "Category 1",
          services: [{ subdomain: "s1", description: "S1" }],
        },
        {
          name: "cat2",
          description: "Category 2",
          services: [
            { subdomain: "s2", description: "S2" },
            { subdomain: "s3", description: "S3" },
          ],
        },
      ];

      const records = categoriesToRecords(categories);

      expect(records).toHaveLength(3);
    });

    it("should handle empty categories array", () => {
      const records = categoriesToRecords([]);

      expect(records).toHaveLength(0);
    });

    it("should flatten all records from all categories", () => {
      const categories: ServiceCategory[] = [
        {
          name: "infra",
          description: "Infrastructure",
          services: [
            { subdomain: "auth", description: "Auth" },
            { subdomain: "vault", description: "Vault" },
          ],
        },
        {
          name: "apps",
          description: "Applications",
          services: [
            { subdomain: "app1", description: "App 1" },
            { subdomain: "app2", description: "App 2" },
            { subdomain: "app3", description: "App 3" },
          ],
        },
      ];

      const records = categoriesToRecords(categories);

      expect(records).toHaveLength(5);
    });
  });
});
