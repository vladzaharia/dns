/**
 * Tests for Postal mail server record generation
 */

import { describe, it, expect, beforeEach } from "vitest";
import { createPostalRecords, createPostalServiceRecords } from "@mail/postal.js";
import { mockDnsControl, resetMocks } from "@tests/mocks/dnscontrol.js";

describe("Postal Mail Server Provider", () => {
  beforeEach(() => {
    resetMocks();
  });

  describe("createPostalRecords", () => {
    it("should create all required records with defaults", () => {
      const records = createPostalRecords();

      // Should have MX, return path CNAME, SPF, and DMARC
      expect(records.length).toBeGreaterThanOrEqual(5);
    });

    it("should create MX records for root and wildcard", () => {
      createPostalRecords();

      // Check MX was called for root
      expect(mockDnsControl.MX).toHaveBeenCalledWith("@", 10, "mx.post.polaris.gdn.");

      // Check MX was called for wildcard
      expect(mockDnsControl.MX).toHaveBeenCalledWith("*", 10, "mx.post.polaris.gdn.");
    });

    it("should create return path CNAME record", () => {
      createPostalRecords();

      expect(mockDnsControl.CNAME).toHaveBeenCalledWith("psrp", "rp.post.polaris.gdn.");
    });

    it("should create SPF record", () => {
      createPostalRecords();

      expect(mockDnsControl.TXT).toHaveBeenCalledWith(
        "@",
        "v=spf1 a mx include:spf.post.polaris.gdn ~all"
      );
    });

    it("should create DMARC record with default policy", () => {
      createPostalRecords();

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc", "v=DMARC1; p=none");
    });

    it("should create DMARC record with quarantine policy", () => {
      createPostalRecords({ dmarcPolicy: "quarantine" });

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc", "v=DMARC1; p=quarantine");
    });

    it("should create DMARC record with reject policy", () => {
      createPostalRecords({ dmarcPolicy: "reject" });

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc", "v=DMARC1; p=reject");
    });

    it("should create DKIM CNAME records for each key", () => {
      createPostalRecords({ dkimKeys: ["key1", "key2"] });

      expect(mockDnsControl.CNAME).toHaveBeenCalledWith(
        "postal-key1._domainkey",
        "_dk1.post.polaris.gdn."
      );
      expect(mockDnsControl.CNAME).toHaveBeenCalledWith(
        "postal-key2._domainkey",
        "_dk1.post.polaris.gdn."
      );
    });

    it("should handle custom root record", () => {
      createPostalRecords({ rootRecord: "mail" });

      // MX should use custom root
      expect(mockDnsControl.MX).toHaveBeenCalledWith("mail", 10, "mx.post.polaris.gdn.");

      // Wildcard should include subdomain suffix
      expect(mockDnsControl.MX).toHaveBeenCalledWith("*.mail", 10, "mx.post.polaris.gdn.");

      // Return path should include suffix
      expect(mockDnsControl.CNAME).toHaveBeenCalledWith("psrp.mail", "rp.post.polaris.gdn.");

      // DMARC should include suffix
      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc.mail", "v=DMARC1; p=none");
    });
  });

  describe("createPostalServiceRecords", () => {
    it("should create all required infrastructure records", () => {
      const records = createPostalServiceRecords();

      // Should have A records (3), MX records (2), SPF (1), DKIM CNAME (1), and DKIM key (1)
      expect(records.length).toBe(8);
    });

    it("should create A records for Postal services", () => {
      createPostalServiceRecords();

      expect(mockDnsControl.A).toHaveBeenCalledWith("mx.post", "172.179.244.26");
      expect(mockDnsControl.A).toHaveBeenCalledWith("post", "172.179.244.26");
      expect(mockDnsControl.A).toHaveBeenCalledWith("track", "172.179.244.26");
    });

    it("should create MX records for Postal routing", () => {
      createPostalServiceRecords();

      expect(mockDnsControl.MX).toHaveBeenCalledWith("routes.post", 10, "post.polaris.gdn.");
      expect(mockDnsControl.MX).toHaveBeenCalledWith("rp.post", 10, "post.polaris.gdn.");
    });

    it("should create SPF record for return path domain", () => {
      createPostalServiceRecords();

      expect(mockDnsControl.TXT).toHaveBeenCalledWith(
        "rp.post",
        "v=spf1 a mx include:spf.post.polaris.gdn ~all"
      );
    });

    it("should create DKIM CNAME for return path", () => {
      createPostalServiceRecords();

      expect(mockDnsControl.CNAME).toHaveBeenCalledWith(
        "postal._domainkey.rp.post",
        "dk1._domainkey.post.polaris.gdn."
      );
    });

    it("should create DKIM public key TXT record", () => {
      createPostalServiceRecords();

      // Check that the DKIM key TXT record was created
      const dkimCalls = mockDnsControl.TXT.mock.calls.filter(
        (call: unknown[]) => call[0] === "_dk1.post"
      );
      expect(dkimCalls.length).toBe(1);
      expect(dkimCalls[0][1]).toContain("v=DKIM1");
      expect(dkimCalls[0][1]).toContain("p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQ");
    });
  });
});
