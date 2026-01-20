/**
 * Tests for lib/index.ts exports
 */

import { describe, it, expect } from "vitest";
import * as lib from "@lib/index.js";

describe("Library Index Exports", () => {
  describe("Server exports", () => {
    it("should export servers object", () => {
      expect(lib.servers).toBeDefined();
      expect(typeof lib.servers).toBe("object");
    });

    it("should export getServer function", () => {
      expect(lib.getServer).toBeDefined();
      expect(typeof lib.getServer).toBe("function");
    });

    it("should export getServerIP function", () => {
      expect(lib.getServerIP).toBeDefined();
      expect(typeof lib.getServerIP).toBe("function");
    });

    it("should export getServerHostname function", () => {
      expect(lib.getServerHostname).toBeDefined();
      expect(typeof lib.getServerHostname).toBe("function");
    });

    it("should export getServerPrefix function", () => {
      expect(lib.getServerPrefix).toBeDefined();
      expect(typeof lib.getServerPrefix).toBe("function");
    });

    it("should export isServerDDNS function", () => {
      expect(lib.isServerDDNS).toBeDefined();
      expect(typeof lib.isServerDDNS).toBe("function");
    });

    it("should export getServersByLocation function", () => {
      expect(lib.getServersByLocation).toBeDefined();
      expect(typeof lib.getServersByLocation).toBe("function");
    });

    it("should export getAllServerNames function", () => {
      expect(lib.getAllServerNames).toBeDefined();
      expect(typeof lib.getAllServerNames).toBe("function");
    });
  });

  describe("Record builder exports", () => {
    it("should export createARecord function", () => {
      expect(lib.createARecord).toBeDefined();
      expect(typeof lib.createARecord).toBe("function");
    });

    it("should export createAAAARecord function", () => {
      expect(lib.createAAAARecord).toBeDefined();
      expect(typeof lib.createAAAARecord).toBe("function");
    });

    it("should export createCNAMERecord function", () => {
      expect(lib.createCNAMERecord).toBeDefined();
      expect(typeof lib.createCNAMERecord).toBe("function");
    });

    it("should export createMXRecord function", () => {
      expect(lib.createMXRecord).toBeDefined();
      expect(typeof lib.createMXRecord).toBe("function");
    });

    it("should export createTXTRecord function", () => {
      expect(lib.createTXTRecord).toBeDefined();
      expect(typeof lib.createTXTRecord).toBe("function");
    });

    it("should export createSRVRecord function", () => {
      expect(lib.createSRVRecord).toBeDefined();
      expect(typeof lib.createSRVRecord).toBe("function");
    });

    it("should export createCAARecord function", () => {
      expect(lib.createCAARecord).toBeDefined();
      expect(typeof lib.createCAARecord).toBe("function");
    });

    it("should export createServiceRecord function", () => {
      expect(lib.createServiceRecord).toBeDefined();
      expect(typeof lib.createServiceRecord).toBe("function");
    });

    it("should export createServerCNAME function", () => {
      expect(lib.createServerCNAME).toBeDefined();
      expect(typeof lib.createServerCNAME).toBe("function");
    });

    it("should export createServerARecord function", () => {
      expect(lib.createServerARecord).toBeDefined();
      expect(typeof lib.createServerARecord).toBe("function");
    });

    it("should export SRV alias for createSRVRecord", () => {
      expect(lib.SRV).toBeDefined();
      expect(lib.SRV).toBe(lib.createSRVRecord);
    });
  });

  describe("Domain exports", () => {
    it("should export NO_REGISTRAR constant", () => {
      expect(lib.NO_REGISTRAR).toBeDefined();
      expect(lib.NO_REGISTRAR).toBe("none");
    });

    it("should export CLOUDFLARE constant", () => {
      expect(lib.CLOUDFLARE).toBeDefined();
      expect(lib.CLOUDFLARE).toBe("cloudflare");
    });

    it("should export createDomain function", () => {
      expect(lib.createDomain).toBeDefined();
      expect(typeof lib.createDomain).toBe("function");
    });

    it("should export defineDomain function", () => {
      expect(lib.defineDomain).toBeDefined();
      expect(typeof lib.defineDomain).toBe("function");
    });

    it("should export domain category arrays", () => {
      expect(lib.PERSONAL_DOMAINS).toBeDefined();
      expect(lib.INFRASTRUCTURE_DOMAINS).toBeDefined();
      expect(lib.SERVICE_DOMAINS).toBeDefined();
      expect(lib.LOCAL_DOMAINS).toBeDefined();
      expect(lib.ALL_DOMAINS).toBeDefined();
    });
  });
});
