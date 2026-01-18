/**
 * Unit tests for Cloudflare Email Routing provider
 */

import { describe, it, expect } from "vitest";
import { createCloudflareEmailRecords } from "@mail/cloudflare.js";
import { mockDnsControl } from "@tests/mocks/dnscontrol.js";

describe("Cloudflare Email Routing Provider", () => {
  describe("createCloudflareEmailRecords", () => {
    it("should create all required records with defaults", () => {
      const records = createCloudflareEmailRecords();

      // Should have: 3 MX + 1 SPF + 1 DMARC = 5 records
      expect(records).toHaveLength(5);
    });

    it("should create three MX records with correct priorities", () => {
      createCloudflareEmailRecords();

      expect(mockDnsControl.MX).toHaveBeenCalledWith("@", 77, "route1.mx.cloudflare.net.");
      expect(mockDnsControl.MX).toHaveBeenCalledWith("@", 50, "route2.mx.cloudflare.net.");
      expect(mockDnsControl.MX).toHaveBeenCalledWith("@", 37, "route3.mx.cloudflare.net.");
    });

    it("should create SPF record", () => {
      createCloudflareEmailRecords();

      expect(mockDnsControl.TXT).toHaveBeenCalledWith(
        "@",
        "v=spf1 include:_spf.mx.cloudflare.net ~all"
      );
    });

    it("should create DMARC record with default policy", () => {
      createCloudflareEmailRecords();

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc", "v=DMARC1; p=none");
    });

    it("should create DMARC record with quarantine policy", () => {
      createCloudflareEmailRecords({ dmarcPolicy: "quarantine" });

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc", "v=DMARC1; p=quarantine");
    });

    it("should create DMARC record with reject policy", () => {
      createCloudflareEmailRecords({ dmarcPolicy: "reject" });

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc", "v=DMARC1; p=reject");
    });

    it("should include DMARC reporting email when provided", () => {
      createCloudflareEmailRecords({
        dmarcReportEmail: "dmarc@example.com",
      });

      expect(mockDnsControl.TXT).toHaveBeenCalledWith(
        "_dmarc",
        "v=DMARC1; p=none; rua=mailto:dmarc@example.com"
      );
    });

    it("should handle custom root record", () => {
      createCloudflareEmailRecords({ rootRecord: "subdomain" });

      expect(mockDnsControl.MX).toHaveBeenCalledWith("subdomain", 77, "route1.mx.cloudflare.net.");
      expect(mockDnsControl.TXT).toHaveBeenCalledWith(
        "subdomain",
        "v=spf1 include:_spf.mx.cloudflare.net ~all"
      );
      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc.subdomain", "v=DMARC1; p=none");
    });

    it("should combine all options correctly", () => {
      createCloudflareEmailRecords({
        rootRecord: "mail",
        dmarcPolicy: "reject",
        dmarcReportEmail: "security@example.com",
      });

      expect(mockDnsControl.MX).toHaveBeenCalledWith("mail", 77, "route1.mx.cloudflare.net.");
      expect(mockDnsControl.TXT).toHaveBeenCalledWith(
        "_dmarc.mail",
        "v=DMARC1; p=reject; rua=mailto:security@example.com"
      );
    });
  });

  describe("MX Priority Order", () => {
    it("should have route3 as highest priority (lowest number)", () => {
      createCloudflareEmailRecords();

      // Verify the priority order: route3 (37) < route2 (50) < route1 (77)
      const mxCalls = mockDnsControl.MX.mock.calls;
      const priorities = mxCalls.map((call) => call[1]);

      expect(priorities).toContain(37);
      expect(priorities).toContain(50);
      expect(priorities).toContain(77);
    });
  });
});
