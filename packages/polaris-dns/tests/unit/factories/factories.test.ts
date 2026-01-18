/**
 * Tests for test data factories
 * Verifies that factories generate valid test data
 */

import { describe, it, expect } from "vitest";
import {
  serverFactory,
  seattleServerFactory,
  ddnsServerFactory,
  serviceFactory,
  tunnelServiceFactory,
  internalServiceFactory,
  aRecordFactory,
  cnameRecordFactory,
  mxRecordFactory,
  txtRecordFactory,
  caaRecordFactory,
  SERVER_NAMES,
  SERVER_LOCATIONS,
  ROUTING_STRATEGIES,
} from "../../factories/index.js";
import { aRecordSchema, cnameRecordSchema, mxRecordSchema } from "../../schemas/dns.schema.js";

describe("Test Data Factories", () => {
  describe("Server Factory", () => {
    it("should generate valid server data", () => {
      const server = serverFactory.build();

      expect(server).toHaveProperty("name");
      expect(server).toHaveProperty("location");
      expect(server).toHaveProperty("prefix");
      expect(server).toHaveProperty("hostname");
      expect(server).toHaveProperty("ip");
    });

    it("should generate servers with valid locations", () => {
      const servers = serverFactory.buildList(10);

      servers.forEach((server) => {
        expect(SERVER_LOCATIONS).toContain(server.location);
      });
    });

    it("should generate Seattle servers with seattleServerFactory", () => {
      const server = seattleServerFactory.build();
      expect(server.location).toBe("sea");
    });

    it("should generate DDNS servers with ddnsServerFactory", () => {
      const server = ddnsServerFactory.build();
      expect(server.isDDNS).toBe(true);
    });

    it("should allow overriding properties", () => {
      const server = serverFactory.build({
        name: "greenwood",
        ip: "192.168.1.1",
      });

      expect(server.name).toBe("greenwood");
      expect(server.ip).toBe("192.168.1.1");
    });

    it("should generate multiple servers with buildList", () => {
      const servers = serverFactory.buildList(5);
      expect(servers).toHaveLength(5);
    });
  });

  describe("Service Factory", () => {
    it("should generate valid service data", () => {
      const service = serviceFactory.build();

      expect(service).toHaveProperty("name");
      expect(service).toHaveProperty("subdomain");
      expect(service).toHaveProperty("server");
      expect(service).toHaveProperty("routing");
    });

    it("should generate services with valid routing strategies", () => {
      const services = serviceFactory.buildList(10);

      services.forEach((service) => {
        expect(ROUTING_STRATEGIES).toContain(service.routing);
      });
    });

    it("should generate tunnel services with tunnelServiceFactory", () => {
      const service = tunnelServiceFactory.build();
      expect(service.routing).toBe("tunnel");
    });

    it("should generate internal services with internalServiceFactory", () => {
      const service = internalServiceFactory.build();
      expect(service.internal).toBe(true);
      expect(service.internalSuffix).toBe(".local");
    });

    it("should generate services with valid server names", () => {
      const services = serviceFactory.buildList(10);

      services.forEach((service) => {
        expect(SERVER_NAMES).toContain(service.server);
      });
    });
  });

  describe("DNS Record Factories", () => {
    it("should generate valid A records", () => {
      const record = aRecordFactory.build();

      expect(record.type).toBe("A");
      expect(record).toHaveProperty("name");
      expect(record).toHaveProperty("ip");
      expect(record.ip).toBeValidIPv4();
    });

    it("should generate valid CNAME records", () => {
      const record = cnameRecordFactory.build();

      expect(record.type).toBe("CNAME");
      expect(record).toHaveProperty("name");
      expect(record).toHaveProperty("target");
    });

    it("should generate valid MX records", () => {
      const record = mxRecordFactory.build();

      expect(record.type).toBe("MX");
      expect(record).toHaveProperty("priority");
      expect(record).toHaveProperty("target");
      expect(record.priority).toBeGreaterThanOrEqual(0);
      expect(record.priority).toBeLessThanOrEqual(65535);
    });

    it("should generate valid TXT records", () => {
      const record = txtRecordFactory.build();

      expect(record.type).toBe("TXT");
      expect(record).toHaveProperty("content");
    });

    it("should generate valid CAA records", () => {
      const record = caaRecordFactory.build();

      expect(record.type).toBe("CAA");
      expect(record).toHaveProperty("tag");
      expect(record).toHaveProperty("value");
      expect(["issue", "issuewild", "iodef"]).toContain(record.tag);
    });

    it("should allow overriding DNS record properties", () => {
      const record = aRecordFactory.build({
        name: "custom",
        ip: "10.0.0.1",
      });

      expect(record.name).toBe("custom");
      expect(record.ip).toBe("10.0.0.1");
    });
  });

  describe("Schema Validation Integration", () => {
    it("should generate A records that pass schema validation", () => {
      const records = aRecordFactory.buildList(5);

      records.forEach((record) => {
        const result = aRecordSchema.safeParse(record);
        expect(result.success).toBe(true);
      });
    });

    it("should generate CNAME records that pass schema validation", () => {
      const records = cnameRecordFactory.buildList(5);

      records.forEach((record) => {
        const result = cnameRecordSchema.safeParse(record);
        expect(result.success).toBe(true);
      });
    });

    it("should generate MX records that pass schema validation", () => {
      const records = mxRecordFactory.buildList(5);

      records.forEach((record) => {
        const result = mxRecordSchema.safeParse(record);
        expect(result.success).toBe(true);
      });
    });
  });
});
