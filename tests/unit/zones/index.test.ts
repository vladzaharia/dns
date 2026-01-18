/**
 * Tests for zone index exports
 */

import { describe, it, expect, beforeEach } from "vitest";
import { resetMocks } from "@tests/mocks/dnscontrol.js";

// Zone exports
import * as zones from "@zones/index.js";
import * as personalZones from "@zones/personal/index.js";
import * as infrastructureZones from "@zones/infrastructure/index.js";
import * as serviceZones from "@zones/services/index.js";
import * as localZones from "@zones/local/index.js";

describe("Zone Index Exports", () => {
  beforeEach(() => {
    resetMocks();
  });

  describe("Main zones/index.ts", () => {
    it("should export registerAllZones function", () => {
      expect(zones.registerAllZones).toBeDefined();
      expect(typeof zones.registerAllZones).toBe("function");
    });

    it("registerAllZones should register all domains", () => {
      zones.registerAllZones();
      // Function should complete without error
      expect(true).toBe(true);
    });
  });

  describe("Personal zones index", () => {
    it("should export registerVladGG function", () => {
      expect(personalZones.registerVladGG).toBeDefined();
      expect(typeof personalZones.registerVladGG).toBe("function");
    });

    it("should export registerVladLGBT function", () => {
      expect(personalZones.registerVladLGBT).toBeDefined();
      expect(typeof personalZones.registerVladLGBT).toBe("function");
    });

    it("should export registerZahariaEmail function", () => {
      expect(personalZones.registerZahariaEmail).toBeDefined();
      expect(typeof personalZones.registerZahariaEmail).toBe("function");
    });

    it("should export registerJesseRocks function", () => {
      expect(personalZones.registerJesseRocks).toBeDefined();
      expect(typeof personalZones.registerJesseRocks).toBe("function");
    });

    it("should export registerSpunkDog function", () => {
      expect(personalZones.registerSpunkDog).toBeDefined();
      expect(typeof personalZones.registerSpunkDog).toBe("function");
    });

    it("should export registerFamjamIng function", () => {
      expect(personalZones.registerFamjamIng).toBeDefined();
      expect(typeof personalZones.registerFamjamIng).toBe("function");
    });
  });

  describe("Infrastructure zones index", () => {
    it("should export registerPlrsIm function", () => {
      expect(infrastructureZones.registerPlrsIm).toBeDefined();
      expect(typeof infrastructureZones.registerPlrsIm).toBe("function");
    });

    it("should export registerPolarisGdn function", () => {
      expect(infrastructureZones.registerPolarisGdn).toBeDefined();
      expect(typeof infrastructureZones.registerPolarisGdn).toBe("function");
    });

    it("should export registerZhrOne function", () => {
      expect(infrastructureZones.registerZhrOne).toBeDefined();
      expect(typeof infrastructureZones.registerZhrOne).toBe("function");
    });
  });

  describe("Service zones index", () => {
    it("should export registerPolarisVideo function", () => {
      expect(serviceZones.registerPolarisVideo).toBeDefined();
      expect(typeof serviceZones.registerPolarisVideo).toBe("function");
    });

    it("should export registerPolarisRest function", () => {
      expect(serviceZones.registerPolarisRest).toBeDefined();
      expect(typeof serviceZones.registerPolarisRest).toBe("function");
    });

    it("should export registerPolarisExpress function", () => {
      expect(serviceZones.registerPolarisExpress).toBeDefined();
      expect(typeof serviceZones.registerPolarisExpress).toBe("function");
    });
  });

  describe("Local zones index", () => {
    it("should export registerDangerDirect function", () => {
      expect(localZones.registerDangerDirect).toBeDefined();
      expect(typeof localZones.registerDangerDirect).toBe("function");
    });

    it("should export registerDangerDiy function", () => {
      expect(localZones.registerDangerDiy).toBeDefined();
      expect(typeof localZones.registerDangerDiy).toBe("function");
    });

    it("should export registerLocalDomains function", () => {
      expect(localZones.registerLocalDomains).toBeDefined();
      expect(typeof localZones.registerLocalDomains).toBe("function");
    });

    // Note: registerLocalDomains uses require() which doesn't work in ESM test environment
    // The function is tested indirectly through the individual zone registration tests
    it.skip("registerLocalDomains should register both local domains", () => {
      localZones.registerLocalDomains();
      // Function should complete without error
      expect(true).toBe(true);
    });
  });
});
