/**
 * Validation tests for DNS record formats using Zod schemas
 */

import { describe, it, expect } from "vitest";
import {
  ipv4Schema,
  ipv6Schema,
  hostnameSchema,
  dnsLabelSchema,
  ttlSchema,
  prioritySchema,
  portSchema,
  aRecordSchema,
  aaaaRecordSchema,
  cnameRecordSchema,
  mxRecordSchema,
  txtRecordSchema,
  srvRecordSchema,
  caaRecordSchema,
} from "@tests/schemas/dns.schema.js";

describe("DNS Record Validation", () => {
  describe("IPv4 Address Validation", () => {
    it("should accept valid IPv4 addresses", () => {
      const validIPs = [
        "192.168.1.1",
        "10.0.0.1",
        "172.16.0.1",
        "255.255.255.255",
        "0.0.0.0",
        "1.2.3.4",
        "8.8.8.8",
        "127.0.0.1",
      ];

      validIPs.forEach((ip) => {
        expect(ipv4Schema.safeParse(ip).success, `${ip} should be valid`).toBe(true);
      });
    });

    it("should reject invalid IPv4 addresses", () => {
      const invalidIPs = [
        "256.1.1.1",
        "1.256.1.1",
        "1.1.256.1",
        "1.1.1.256",
        "1.1.1",
        "1.1.1.1.1",
        "abc.def.ghi.jkl",
        "192.168.1",
        "192.168.1.1.1",
        "",
        "not-an-ip",
        "192.168.1.1/24",
      ];

      invalidIPs.forEach((ip) => {
        expect(ipv4Schema.safeParse(ip).success, `${ip} should be invalid`).toBe(false);
      });
    });
  });

  describe("IPv6 Address Validation", () => {
    it("should accept valid IPv6 addresses", () => {
      const validIPs = [
        "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        "2001:db8:85a3::8a2e:370:7334",
        "::1",
        "::",
        "fe80::1",
        "2001:db8::1",
      ];

      validIPs.forEach((ip) => {
        expect(ipv6Schema.safeParse(ip).success, `${ip} should be valid`).toBe(true);
      });
    });

    it("should reject invalid IPv6 addresses", () => {
      const invalidIPs = ["192.168.1.1", "not-an-ipv6", "2001:db8:85a3::8a2e:370g:7334", ""];

      invalidIPs.forEach((ip) => {
        expect(ipv6Schema.safeParse(ip).success, `${ip} should be invalid`).toBe(false);
      });
    });
  });

  describe("Hostname Validation", () => {
    it("should accept valid hostnames", () => {
      const validHostnames = [
        "example.com",
        "sub.example.com",
        "a.b.c.example.com",
        "example-site.com",
        "123.example.com",
        "a.co",
        "xn--n3h.com",
      ];

      validHostnames.forEach((hostname) => {
        expect(hostnameSchema.safeParse(hostname).success, `${hostname} should be valid`).toBe(
          true
        );
      });
    });

    it("should reject invalid hostnames", () => {
      const invalidHostnames = [
        "-example.com",
        "example-.com",
        "example..com",
        ".example.com",
        "example.com.",
        "",
        "a".repeat(64) + ".com",
      ];

      invalidHostnames.forEach((hostname) => {
        expect(hostnameSchema.safeParse(hostname).success, `${hostname} should be invalid`).toBe(
          false
        );
      });
    });
  });

  describe("DNS Label Validation", () => {
    it("should accept valid DNS labels", () => {
      const validLabels = ["www", "mail", "api", "test-server", "server1", "@", "*", "a", "a1"];

      validLabels.forEach((label) => {
        expect(dnsLabelSchema.safeParse(label).success, `${label} should be valid`).toBe(true);
      });
    });

    it("should reject invalid DNS labels", () => {
      const invalidLabels = ["-invalid", "invalid-", "", "a".repeat(64), "invalid..label"];

      invalidLabels.forEach((label) => {
        expect(dnsLabelSchema.safeParse(label).success, `${label} should be invalid`).toBe(false);
      });
    });
  });

  describe("TTL Validation", () => {
    it("should accept valid TTL values", () => {
      const validTTLs = [60, 300, 3600, 86400, 1800];

      validTTLs.forEach((ttl) => {
        expect(ttlSchema.safeParse(ttl).success, `${ttl} should be valid`).toBe(true);
      });
    });

    it("should reject invalid TTL values", () => {
      const invalidTTLs = [0, 59, 86401, -1, 1.5];

      invalidTTLs.forEach((ttl) => {
        expect(ttlSchema.safeParse(ttl).success, `${ttl} should be invalid`).toBe(false);
      });
    });
  });

  describe("Priority Validation", () => {
    it("should accept valid MX priorities", () => {
      const validPriorities = [0, 10, 20, 50, 100, 65535];

      validPriorities.forEach((priority) => {
        expect(prioritySchema.safeParse(priority).success, `${priority} should be valid`).toBe(
          true
        );
      });
    });

    it("should reject invalid MX priorities", () => {
      const invalidPriorities = [-1, 65536, 1.5];

      invalidPriorities.forEach((priority) => {
        expect(prioritySchema.safeParse(priority).success, `${priority} should be invalid`).toBe(
          false
        );
      });
    });
  });

  describe("Port Validation", () => {
    it("should accept valid port numbers", () => {
      const validPorts = [1, 80, 443, 8080, 65535];

      validPorts.forEach((port) => {
        expect(portSchema.safeParse(port).success, `${port} should be valid`).toBe(true);
      });
    });

    it("should reject invalid port numbers", () => {
      const invalidPorts = [0, -1, 65536, 1.5];

      invalidPorts.forEach((port) => {
        expect(portSchema.safeParse(port).success, `${port} should be invalid`).toBe(false);
      });
    });
  });

  describe("A Record Schema", () => {
    it("should accept valid A records", () => {
      const validRecords = [
        { name: "www", ip: "192.168.1.1" },
        { name: "@", ip: "10.0.0.1" },
        { name: "mail", ip: "8.8.8.8", ttl: 300 },
      ];

      validRecords.forEach((record) => {
        expect(aRecordSchema.safeParse(record).success).toBe(true);
      });
    });

    it("should reject invalid A records", () => {
      const invalidRecords = [
        { name: "", ip: "192.168.1.1" },
        { name: "www", ip: "invalid" },
        { name: "www", ip: "2001:db8::1" },
      ];

      invalidRecords.forEach((record) => {
        expect(aRecordSchema.safeParse(record).success).toBe(false);
      });
    });
  });

  describe("AAAA Record Schema", () => {
    it("should accept valid AAAA records", () => {
      const validRecords = [
        { name: "www", ip: "2001:db8::1" },
        { name: "@", ip: "::1" },
        { name: "mail", ip: "fe80::1", ttl: 300 },
      ];

      validRecords.forEach((record) => {
        expect(aaaaRecordSchema.safeParse(record).success).toBe(true);
      });
    });

    it("should reject invalid AAAA records", () => {
      const invalidRecords = [
        { name: "", ip: "2001:db8::1" },
        { name: "www", ip: "192.168.1.1" },
        { name: "www", ip: "invalid" },
      ];

      invalidRecords.forEach((record) => {
        expect(aaaaRecordSchema.safeParse(record).success).toBe(false);
      });
    });
  });

  describe("CNAME Record Schema", () => {
    it("should accept valid CNAME records", () => {
      const validRecords = [
        { name: "www", target: "example.com." },
        { name: "mail", target: "mail.example.com." },
        { name: "api", target: "api.example.com.", ttl: 300 },
      ];

      validRecords.forEach((record) => {
        expect(cnameRecordSchema.safeParse(record).success).toBe(true);
      });
    });
  });

  describe("MX Record Schema", () => {
    it("should accept valid MX records", () => {
      const validRecords = [
        { name: "@", priority: 10, target: "mail.example.com." },
        { name: "@", priority: 20, target: "mail2.example.com." },
        { name: "sub", priority: 10, target: "mail.example.com.", ttl: 3600 },
      ];

      validRecords.forEach((record) => {
        expect(mxRecordSchema.safeParse(record).success).toBe(true);
      });
    });

    it("should reject invalid MX records", () => {
      const invalidRecords = [
        { name: "@", priority: -1, target: "mail.example.com." },
        { name: "@", priority: 65536, target: "mail.example.com." },
      ];

      invalidRecords.forEach((record) => {
        expect(mxRecordSchema.safeParse(record).success).toBe(false);
      });
    });
  });

  describe("TXT Record Schema", () => {
    it("should accept valid TXT records", () => {
      const validRecords = [
        { name: "@", content: "v=spf1 include:_spf.google.com ~all" },
        { name: "_dmarc", content: "v=DMARC1; p=none" },
        { name: "selector._domainkey", content: "v=DKIM1; k=rsa; p=..." },
      ];

      validRecords.forEach((record) => {
        expect(txtRecordSchema.safeParse(record).success).toBe(true);
      });
    });
  });

  describe("SRV Record Schema", () => {
    it("should accept valid SRV records", () => {
      const validRecords = [
        { name: "_sip._tcp", priority: 10, weight: 5, port: 5060, target: "sip.example.com." },
        { name: "_xmpp._tcp", priority: 0, weight: 0, port: 5222, target: "xmpp.example.com." },
      ];

      validRecords.forEach((record) => {
        expect(srvRecordSchema.safeParse(record).success).toBe(true);
      });
    });

    it("should reject invalid SRV records", () => {
      const invalidRecords = [
        { name: "_sip._tcp", priority: 10, weight: 5, port: 0, target: "sip.example.com." },
        { name: "_sip._tcp", priority: 10, weight: 5, port: 65536, target: "sip.example.com." },
      ];

      invalidRecords.forEach((record) => {
        expect(srvRecordSchema.safeParse(record).success).toBe(false);
      });
    });
  });

  describe("CAA Record Schema", () => {
    it("should accept valid CAA records", () => {
      const validRecords = [
        { name: "@", tag: "issue", value: "letsencrypt.org" },
        { name: "@", tag: "issuewild", value: ";" },
        { name: "@", tag: "iodef", value: "mailto:security@example.com" },
      ];

      validRecords.forEach((record) => {
        expect(caaRecordSchema.safeParse(record).success).toBe(true);
      });
    });

    it("should reject invalid CAA records", () => {
      const invalidRecords = [
        { name: "@", tag: "invalid", value: "letsencrypt.org" },
        { name: "@", tag: "", value: "letsencrypt.org" },
      ];

      invalidRecords.forEach((record) => {
        expect(caaRecordSchema.safeParse(record).success).toBe(false);
      });
    });
  });
});
