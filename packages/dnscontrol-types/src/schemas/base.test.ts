/**
 * Tests for base schemas
 */

import { describe, it, expect } from "vitest";
import {
  TtlSchema,
  Ipv4AddressSchema,
  Ipv6AddressSchema,
  IpAddressSchema,
  DnssecAlgorithmSchema,
  CaaTagSchema,
  TlsaCertUsageSchema,
  SshfpAlgorithmSchema,
  StandardRecordTypeSchema,
  AllRecordTypesSchema,
} from "./base.js";

describe("TtlSchema", () => {
  it("should accept valid numeric TTL", () => {
    expect(TtlSchema.parse(300)).toBe(300);
    expect(TtlSchema.parse(0)).toBe(0);
    expect(TtlSchema.parse(86400)).toBe(86400);
  });

  it("should accept valid string TTL", () => {
    expect(TtlSchema.parse("300")).toBe("300");
    expect(TtlSchema.parse("5m")).toBe("5m");
    expect(TtlSchema.parse("1h")).toBe("1h");
    expect(TtlSchema.parse("1d")).toBe("1d");
  });

  it("should reject invalid TTL", () => {
    expect(() => TtlSchema.parse(-1)).toThrow();
    expect(() => TtlSchema.parse("invalid")).toThrow();
    expect(() => TtlSchema.parse("5x")).toThrow();
  });
});

describe("Ipv4AddressSchema", () => {
  it("should accept valid IPv4 addresses", () => {
    expect(Ipv4AddressSchema.parse("192.0.2.1")).toBe("192.0.2.1");
    expect(Ipv4AddressSchema.parse("10.0.0.1")).toBe("10.0.0.1");
    expect(Ipv4AddressSchema.parse("255.255.255.255")).toBe("255.255.255.255");
  });

  it("should reject invalid IPv4 addresses", () => {
    expect(() => Ipv4AddressSchema.parse("256.0.0.1")).toThrow();
    expect(() => Ipv4AddressSchema.parse("192.0.2")).toThrow();
    expect(() => Ipv4AddressSchema.parse("not-an-ip")).toThrow();
    expect(() => Ipv4AddressSchema.parse("::1")).toThrow();
  });
});

describe("Ipv6AddressSchema", () => {
  it("should accept valid IPv6 addresses", () => {
    expect(Ipv6AddressSchema.parse("::1")).toBe("::1");
    expect(Ipv6AddressSchema.parse("2001:db8::1")).toBe("2001:db8::1");
    expect(Ipv6AddressSchema.parse("fe80::1")).toBe("fe80::1");
  });

  it("should reject invalid IPv6 addresses", () => {
    expect(() => Ipv6AddressSchema.parse("192.0.2.1")).toThrow();
    expect(() => Ipv6AddressSchema.parse("not-an-ip")).toThrow();
  });
});

describe("IpAddressSchema", () => {
  it("should accept both IPv4 and IPv6", () => {
    expect(IpAddressSchema.parse("192.0.2.1")).toBe("192.0.2.1");
    expect(IpAddressSchema.parse("::1")).toBe("::1");
  });

  it("should accept numeric IP (from IP() function)", () => {
    expect(IpAddressSchema.parse(3232235777)).toBe(3232235777);
  });
});

describe("DnssecAlgorithmSchema", () => {
  it("should accept valid DNSSEC algorithms", () => {
    expect(DnssecAlgorithmSchema.parse(8)).toBe(8);
    expect(DnssecAlgorithmSchema.parse(13)).toBe(13);
    expect(DnssecAlgorithmSchema.parse(15)).toBe(15);
  });

  it("should reject invalid algorithms", () => {
    expect(() => DnssecAlgorithmSchema.parse(0)).toThrow();
    expect(() => DnssecAlgorithmSchema.parse(99)).toThrow();
  });
});

describe("CaaTagSchema", () => {
  it("should accept valid CAA tags", () => {
    expect(CaaTagSchema.parse("issue")).toBe("issue");
    expect(CaaTagSchema.parse("issuewild")).toBe("issuewild");
    expect(CaaTagSchema.parse("iodef")).toBe("iodef");
  });

  it("should reject invalid CAA tags", () => {
    expect(() => CaaTagSchema.parse("invalid")).toThrow();
  });
});

describe("TlsaCertUsageSchema", () => {
  it("should accept valid TLSA usage values", () => {
    expect(TlsaCertUsageSchema.parse(0)).toBe(0);
    expect(TlsaCertUsageSchema.parse(3)).toBe(3);
  });

  it("should reject invalid usage values", () => {
    expect(() => TlsaCertUsageSchema.parse(4)).toThrow();
    expect(() => TlsaCertUsageSchema.parse(-1)).toThrow();
  });
});

describe("SshfpAlgorithmSchema", () => {
  it("should accept valid SSHFP algorithms", () => {
    expect(SshfpAlgorithmSchema.parse(1)).toBe(1);
    expect(SshfpAlgorithmSchema.parse(4)).toBe(4);
  });

  it("should reject invalid algorithms", () => {
    expect(() => SshfpAlgorithmSchema.parse(5)).toThrow();
    expect(() => SshfpAlgorithmSchema.parse(0)).toThrow();
  });
});

describe("StandardRecordTypeSchema", () => {
  it("should accept standard record types", () => {
    expect(StandardRecordTypeSchema.parse("A")).toBe("A");
    expect(StandardRecordTypeSchema.parse("AAAA")).toBe("AAAA");
    expect(StandardRecordTypeSchema.parse("CNAME")).toBe("CNAME");
    expect(StandardRecordTypeSchema.parse("MX")).toBe("MX");
    expect(StandardRecordTypeSchema.parse("TXT")).toBe("TXT");
  });

  it("should reject non-standard types", () => {
    expect(() => StandardRecordTypeSchema.parse("CAA")).toThrow();
    expect(() => StandardRecordTypeSchema.parse("INVALID")).toThrow();
  });
});

describe("AllRecordTypesSchema", () => {
  it("should accept all record types", () => {
    expect(AllRecordTypesSchema.parse("A")).toBe("A");
    expect(AllRecordTypesSchema.parse("CAA")).toBe("CAA");
    expect(AllRecordTypesSchema.parse("ALIAS")).toBe("ALIAS");
  });
});
