/**
 * Integration tests for zone registration functions
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  registerAllZones,
  registerVladGG,
  registerVladLGBT,
  registerZahariaEmail,
  registerJesseRocks,
  registerSpunkDog,
  registerFamjamIng,
  registerPlrsIm,
  registerPolarisGdn,
  registerZhrOne,
  registerPolarisVideo,
  registerPolarisRest,
  registerPolarisExpress,
  registerDangerDirect,
  registerDangerDiy,
} from "@zones/index.js";
import { mockDnsControl, getCapturedDomains, resetMocks } from "@tests/mocks/dnscontrol.js";

describe("Zone Registration", () => {
  beforeEach(() => {
    resetMocks();
  });

  describe("registerAllZones", () => {
    it("should register all 14 domains", () => {
      registerAllZones();

      const domains = getCapturedDomains();
      expect(domains).toHaveLength(14);
    });

    it("should call D() for each domain", () => {
      registerAllZones();

      expect(mockDnsControl.D).toHaveBeenCalledTimes(14);
    });
  });

  describe("Personal Domains", () => {
    it("should register vlad.gg", () => {
      registerVladGG();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "vlad.gg")).toBe(true);
    });

    it("should register vlad.lgbt", () => {
      registerVladLGBT();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "vlad.lgbt")).toBe(true);
    });

    it("should register zaharia.email", () => {
      registerZahariaEmail();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "zaharia.email")).toBe(true);
    });

    it("should register jesse.rocks", () => {
      registerJesseRocks();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "jesse.rocks")).toBe(true);
    });

    it("should register spunk.dog", () => {
      registerSpunkDog();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "spunk.dog")).toBe(true);
    });

    it("should register famjam.ing", () => {
      registerFamjamIng();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "famjam.ing")).toBe(true);
    });
  });

  describe("Infrastructure Domains", () => {
    it("should register plrs.im", () => {
      registerPlrsIm();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "plrs.im")).toBe(true);
    });

    it("should register polaris.gdn", () => {
      registerPolarisGdn();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "polaris.gdn")).toBe(true);
    });

    it("should register zhr.one", () => {
      registerZhrOne();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "zhr.one")).toBe(true);
    });
  });

  describe("Service Domains", () => {
    it("should register polaris.video", () => {
      registerPolarisVideo();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "polaris.video")).toBe(true);
    });

    it("should register polaris.rest", () => {
      registerPolarisRest();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "polaris.rest")).toBe(true);
    });

    it("should register polaris.express", () => {
      registerPolarisExpress();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "polaris.express")).toBe(true);
    });
  });

  describe("Local Domains", () => {
    it("should register danger.direct", () => {
      registerDangerDirect();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "danger.direct")).toBe(true);
    });

    it("should register danger.diy", () => {
      registerDangerDiy();

      expect(mockDnsControl.D).toHaveBeenCalled();
      const domains = getCapturedDomains();
      expect(domains.some((d) => d.name === "danger.diy")).toBe(true);
    });
  });
});
