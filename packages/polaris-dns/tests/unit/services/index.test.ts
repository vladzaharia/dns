/**
 * Tests for services/index.ts exports
 */

import { describe, it, expect } from "vitest";
import * as services from "@services/index.js";

describe("Services Index Exports", () => {
  describe("Core utility exports", () => {
    it("should export serviceToRecords function", () => {
      expect(services.serviceToRecords).toBeDefined();
      expect(typeof services.serviceToRecords).toBe("function");
    });

    it("should export categoryToRecords function", () => {
      expect(services.categoryToRecords).toBeDefined();
      expect(typeof services.categoryToRecords).toBe("function");
    });

    it("should export categoriesToRecords function", () => {
      expect(services.categoriesToRecords).toBeDefined();
      expect(typeof services.categoriesToRecords).toBe("function");
    });
  });

  describe("Service category exports", () => {
    it("should export infrastructureServices", () => {
      expect(services.infrastructureServices).toBeDefined();
      expect(services.infrastructureServices.name).toBe("infrastructure");
      expect(Array.isArray(services.infrastructureServices.services)).toBe(true);
    });

    it("should export productivityServices", () => {
      expect(services.productivityServices).toBeDefined();
      expect(services.productivityServices.name).toBe("productivity");
      expect(Array.isArray(services.productivityServices.services)).toBe(true);
    });

    it("should export mediaServices", () => {
      expect(services.mediaServices).toBeDefined();
      expect(services.mediaServices.name).toBe("media");
      expect(Array.isArray(services.mediaServices.services)).toBe(true);
    });

    it("should export gamingServices", () => {
      expect(services.gamingServices).toBeDefined();
      expect(services.gamingServices.name).toBe("gaming");
      expect(Array.isArray(services.gamingServices.services)).toBe(true);
    });

    it("should export homelabServices", () => {
      expect(services.homelabServices).toBeDefined();
      expect(services.homelabServices.name).toBe("homelab");
      expect(Array.isArray(services.homelabServices.services)).toBe(true);
    });

    it("should export internalServices", () => {
      expect(services.internalServices).toBeDefined();
      expect(services.internalServices.name).toBe("internal");
      expect(Array.isArray(services.internalServices.services)).toBe(true);
    });

    it("should export polarisVideoServices", () => {
      expect(services.polarisVideoServices).toBeDefined();
      expect(services.polarisVideoServices.name).toBeDefined();
      expect(Array.isArray(services.polarisVideoServices.services)).toBe(true);
    });
  });

  describe("allServices export", () => {
    it("should export allServices array", () => {
      expect(services.allServices).toBeDefined();
      expect(Array.isArray(services.allServices)).toBe(true);
    });

    it("should contain all service categories", () => {
      expect(services.allServices).toContain(services.infrastructureServices);
      expect(services.allServices).toContain(services.productivityServices);
      expect(services.allServices).toContain(services.mediaServices);
      expect(services.allServices).toContain(services.gamingServices);
      expect(services.allServices).toContain(services.homelabServices);
      expect(services.allServices).toContain(services.internalServices);
      expect(services.allServices).toContain(services.polarisVideoServices);
    });

    it("should have 7 service categories", () => {
      expect(services.allServices).toHaveLength(7);
    });
  });

  describe("Service category structure", () => {
    const categories = [
      services.infrastructureServices,
      services.productivityServices,
      services.mediaServices,
      services.gamingServices,
      services.homelabServices,
      services.internalServices,
      services.polarisVideoServices,
    ];

    it.each(categories)("$name should have name property", (category) => {
      expect(category.name).toBeDefined();
      expect(typeof category.name).toBe("string");
    });

    it.each(categories)("$name should have description property", (category) => {
      expect(category.description).toBeDefined();
      expect(typeof category.description).toBe("string");
    });

    it.each(categories)("$name should have services array", (category) => {
      expect(Array.isArray(category.services)).toBe(true);
      expect(category.services.length).toBeGreaterThan(0);
    });

    it.each(categories)("$name services should have subdomain property", (category) => {
      for (const service of category.services) {
        expect(service.subdomain).toBeDefined();
        expect(typeof service.subdomain).toBe("string");
      }
    });

    it.each(categories)("$name services should have description property", (category) => {
      for (const service of category.services) {
        expect(service.description).toBeDefined();
        expect(typeof service.description).toBe("string");
      }
    });
  });
});
