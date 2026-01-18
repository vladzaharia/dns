/**
 * Tests for lib/types.ts type definitions
 *
 * Since types.ts only contains TypeScript types (which are erased at runtime),
 * we test that the types are correctly exported and can be used for type checking.
 */

import { describe, it, expect } from "vitest";
import type {
  ServerLocation,
  ServerName,
  Server,
  ServerRegistry,
  RecordType,
  ProxyStatus,
  RecordOptions,
  DNSRecord,
  ARecord,
  AAAARecord,
  CNAMERecord,
  MXRecord,
  TXTRecord,
  SRVRecord,
  CAARecord,
  RoutingStrategy,
  Service,
  ServiceCategory,
  DomainCategory,
  DomainConfig,
  MailProvider,
  FastmailConfig,
  PostalConfig,
} from "@lib/types.js";

describe("Type Definitions", () => {
  describe("Server Types", () => {
    it("should allow valid ServerLocation values", () => {
      const locations: ServerLocation[] = ["sea", "az", "re", "local"];
      expect(locations).toHaveLength(4);
    });

    it("should allow valid ServerName values", () => {
      const names: ServerName[] = [
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
      expect(names).toHaveLength(9);
    });

    it("should define Server interface correctly", () => {
      const server: Server = {
        name: "greenwood",
        location: "sea",
        prefix: "gw",
        hostname: "gw.sea.plrs.im",
        ip: "1.2.3.4",
        ipv6: "::1",
        isDDNS: true,
      };
      expect(server.name).toBe("greenwood");
      expect(server.location).toBe("sea");
    });

    it("should allow Server without optional fields", () => {
      const server: Server = {
        name: "greenwood",
        location: "sea",
        prefix: "gw",
        hostname: "gw.sea.plrs.im",
        ip: "1.2.3.4",
      };
      expect(server.ipv6).toBeUndefined();
      expect(server.isDDNS).toBeUndefined();
    });
  });

  describe("DNS Record Types", () => {
    it("should allow valid RecordType values", () => {
      const types: RecordType[] = ["A", "AAAA", "CNAME", "MX", "TXT", "SRV", "CAA", "NS"];
      expect(types).toHaveLength(8);
    });

    it("should allow valid ProxyStatus values", () => {
      const statuses: ProxyStatus[] = ["on", "off", "full"];
      expect(statuses).toHaveLength(3);
    });

    it("should define RecordOptions interface correctly", () => {
      const options: RecordOptions = {
        proxy: "on",
        ttl: 3600,
        priority: 10,
      };
      expect(options.proxy).toBe("on");
    });

    it("should define ARecord interface correctly", () => {
      const record: ARecord = {
        type: "A",
        name: "www",
        target: "1.2.3.4",
      };
      expect(record.type).toBe("A");
    });

    it("should define AAAARecord interface correctly", () => {
      const record: AAAARecord = {
        type: "AAAA",
        name: "www",
        target: "::1",
      };
      expect(record.type).toBe("AAAA");
    });

    it("should define CNAMERecord interface correctly", () => {
      const record: CNAMERecord = {
        type: "CNAME",
        name: "www",
        target: "example.com",
      };
      expect(record.type).toBe("CNAME");
    });

    it("should define MXRecord interface correctly", () => {
      const record: MXRecord = {
        type: "MX",
        name: "@",
        target: "mail.example.com",
        priority: 10,
      };
      expect(record.priority).toBe(10);
    });

    it("should define SRVRecord interface correctly", () => {
      const record: SRVRecord = {
        type: "SRV",
        name: "_sip._tcp",
        target: "sip.example.com",
        priority: 10,
        weight: 5,
        port: 5060,
      };
      expect(record.port).toBe(5060);
    });

    it("should define CAARecord interface correctly", () => {
      const record: CAARecord = {
        type: "CAA",
        name: "@",
        target: "letsencrypt.org",
        flags: 0,
        tag: "issue",
      };
      expect(record.tag).toBe("issue");
    });
  });

  describe("Service Types", () => {
    it("should allow valid RoutingStrategy values", () => {
      const strategies: RoutingStrategy[] = ["direct", "tunnel", "proxied"];
      expect(strategies).toHaveLength(3);
    });

    it("should define Service interface correctly", () => {
      const service: Service = {
        name: "auth",
        subdomain: "auth",
        server: "greenwood",
        routing: "direct",
        internal: false,
      };
      expect(service.routing).toBe("direct");
    });
  });

  describe("Domain Types", () => {
    it("should allow valid DomainCategory values", () => {
      const categories: DomainCategory[] = ["personal", "infrastructure", "services", "local"];
      expect(categories).toHaveLength(4);
    });

    it("should define DomainConfig interface correctly", () => {
      const config: DomainConfig = {
        name: "example.com",
        category: "personal",
        registrar: "none",
        dnsProvider: "cloudflare",
      };
      expect(config.category).toBe("personal");
    });
  });

  describe("Mail Provider Types", () => {
    it("should allow valid MailProvider values", () => {
      const providers: MailProvider[] = ["fastmail", "postal", "none"];
      expect(providers).toHaveLength(3);
    });

    it("should define FastmailConfig interface correctly", () => {
      const config: FastmailConfig = {
        provider: "fastmail",
        domain: "example.com",
        includeSubdomainMail: true,
      };
      expect(config.provider).toBe("fastmail");
    });

    it("should define PostalConfig interface correctly", () => {
      const config: PostalConfig = {
        provider: "postal",
        domain: "example.com",
        postalHostname: "postal.example.com",
        returnPath: "rp.example.com",
        dkimKey: "key123",
      };
      expect(config.provider).toBe("postal");
    });
  });
});
