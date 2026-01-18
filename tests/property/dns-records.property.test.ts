/**
 * Property-based tests for DNS record validation
 * Uses fast-check to generate random valid inputs and verify invariants
 */

import { describe, it, expect } from "vitest";
import { test, fc } from "@fast-check/vitest";
import {
  ipv4Arb,
  ipv6Arb,
  dnsLabelArb,
  hostnameArb,
  ttlArb,
  priorityArb,
  portArb,
  aRecordArb,
  cnameRecordArb,
  mxRecordArb,
  txtRecordArb,
  caaRecordArb,
} from "./arbitraries.js";
import {
  ipv4Schema,
  ipv6Schema,
  dnsLabelSchema,
  hostnameSchema,
  ttlSchema,
  prioritySchema,
  portSchema,
  aRecordSchema,
  cnameRecordSchema,
  mxRecordSchema,
  txtRecordSchema,
  caaRecordSchema,
} from "../schemas/dns.schema.js";

describe("DNS Record Property Tests", () => {
  describe("IPv4 Address Properties", () => {
    test.prop([ipv4Arb])("generated IPv4 addresses should pass schema validation", (ip) => {
      const result = ipv4Schema.safeParse(ip);
      expect(result.success).toBe(true);
    });

    test.prop([ipv4Arb])("IPv4 addresses should have 4 octets", (ip) => {
      const octets = ip.split(".");
      expect(octets).toHaveLength(4);
    });

    test.prop([ipv4Arb])("IPv4 octets should be in valid range (0-255)", (ip) => {
      const octets = ip.split(".").map(Number);
      octets.forEach((octet) => {
        expect(octet).toBeGreaterThanOrEqual(0);
        expect(octet).toBeLessThanOrEqual(255);
      });
    });
  });

  describe("IPv6 Address Properties", () => {
    test.prop([ipv6Arb])("generated IPv6 addresses should pass schema validation", (ip) => {
      const result = ipv6Schema.safeParse(ip);
      expect(result.success).toBe(true);
    });

    test.prop([ipv6Arb])("IPv6 addresses should have 8 groups", (ip) => {
      const groups = ip.split(":");
      expect(groups).toHaveLength(8);
    });
  });

  describe("DNS Label Properties", () => {
    test.prop([dnsLabelArb])("generated DNS labels should pass schema validation", (label) => {
      const result = dnsLabelSchema.safeParse(label);
      expect(result.success).toBe(true);
    });

    test.prop([dnsLabelArb])("DNS labels should not exceed 63 characters", (label) => {
      expect(label.length).toBeLessThanOrEqual(63);
    });

    test.prop([dnsLabelArb])("DNS labels should be non-empty", (label) => {
      expect(label.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Hostname Properties", () => {
    test.prop([hostnameArb])("generated hostnames should pass schema validation", (hostname) => {
      const result = hostnameSchema.safeParse(hostname);
      expect(result.success).toBe(true);
    });

    test.prop([hostnameArb])("hostnames should not exceed 253 characters", (hostname) => {
      expect(hostname.length).toBeLessThanOrEqual(253);
    });
  });

  describe("TTL Properties", () => {
    test.prop([ttlArb])("generated TTLs should pass schema validation", (ttl) => {
      const result = ttlSchema.safeParse(ttl);
      expect(result.success).toBe(true);
    });

    test.prop([ttlArb])("TTLs should be between 60 and 86400 seconds", (ttl) => {
      expect(ttl).toBeGreaterThanOrEqual(60);
      expect(ttl).toBeLessThanOrEqual(86400);
    });

    test.prop([ttlArb])("TTLs should be integers", (ttl) => {
      expect(Number.isInteger(ttl)).toBe(true);
    });
  });

  describe("Priority Properties", () => {
    test.prop([priorityArb])("generated priorities should pass schema validation", (priority) => {
      const result = prioritySchema.safeParse(priority);
      expect(result.success).toBe(true);
    });

    test.prop([priorityArb])("priorities should be between 0 and 65535", (priority) => {
      expect(priority).toBeGreaterThanOrEqual(0);
      expect(priority).toBeLessThanOrEqual(65535);
    });
  });

  describe("Port Properties", () => {
    test.prop([portArb])("generated ports should pass schema validation", (port) => {
      const result = portSchema.safeParse(port);
      expect(result.success).toBe(true);
    });

    test.prop([portArb])("ports should be between 1 and 65535", (port) => {
      expect(port).toBeGreaterThanOrEqual(1);
      expect(port).toBeLessThanOrEqual(65535);
    });
  });

  describe("A Record Properties", () => {
    test.prop([aRecordArb])("generated A records should pass schema validation", (record) => {
      const result = aRecordSchema.safeParse(record);
      expect(result.success).toBe(true);
    });

    test.prop([aRecordArb])("A records should have type 'A'", (record) => {
      expect(record.type).toBe("A");
    });

    test.prop([aRecordArb])("A records should have valid IPv4 addresses", (record) => {
      const ipResult = ipv4Schema.safeParse(record.ip);
      expect(ipResult.success).toBe(true);
    });
  });

  describe("CNAME Record Properties", () => {
    test.prop([cnameRecordArb])("generated CNAME records should pass schema validation", (record) => {
      const result = cnameRecordSchema.safeParse(record);
      expect(result.success).toBe(true);
    });

    test.prop([cnameRecordArb])("CNAME records should have type 'CNAME'", (record) => {
      expect(record.type).toBe("CNAME");
    });
  });

  describe("MX Record Properties", () => {
    test.prop([mxRecordArb])("generated MX records should pass schema validation", (record) => {
      const result = mxRecordSchema.safeParse(record);
      expect(result.success).toBe(true);
    });

    test.prop([mxRecordArb])("MX records should have valid priority", (record) => {
      expect(record.priority).toBeGreaterThanOrEqual(0);
      expect(record.priority).toBeLessThanOrEqual(65535);
    });
  });

  describe("TXT Record Properties", () => {
    test.prop([txtRecordArb])("generated TXT records should pass schema validation", (record) => {
      const result = txtRecordSchema.safeParse(record);
      expect(result.success).toBe(true);
    });

    test.prop([txtRecordArb])("TXT records should have non-empty content", (record) => {
      expect(record.content.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("CAA Record Properties", () => {
    test.prop([caaRecordArb])("generated CAA records should pass schema validation", (record) => {
      const result = caaRecordSchema.safeParse(record);
      expect(result.success).toBe(true);
    });

    test.prop([caaRecordArb])("CAA records should have valid tag", (record) => {
      expect(["issue", "issuewild", "iodef"]).toContain(record.tag);
    });
  });
});

