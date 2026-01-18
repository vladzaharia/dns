/**
 * Unit tests for Fastmail email provider
 */

import { describe, it, expect } from "vitest";
import { createFastmailRecords, createFastmailSubdomainRecords } from "@mail/fastmail.js";
import { mockDnsControl } from "@tests/mocks/dnscontrol.js";

describe("Fastmail Email Provider", () => {
  describe("createFastmailRecords", () => {
    it("should create all required records for a domain", () => {
      const records = createFastmailRecords({ domain: "example.com" });

      // Should have: 1 mail CNAME + 2 MX + 2 wildcard MX + 1 SPF + 1 DMARC + 3 DKIM = 10 records
      expect(records).toHaveLength(10);
    });

    it("should create mail CNAME record", () => {
      createFastmailRecords({ domain: "example.com" });

      expect(mockDnsControl.CNAME).toHaveBeenCalledWith("mail", "mail.fastmail.com.");
    });

    it("should create primary and secondary MX records", () => {
      createFastmailRecords({ domain: "example.com" });

      expect(mockDnsControl.MX).toHaveBeenCalledWith("@", 10, "in1-smtp.messagingengine.com.");
      expect(mockDnsControl.MX).toHaveBeenCalledWith("@", 20, "in2-smtp.messagingengine.com.");
    });

    it("should create wildcard MX records by default", () => {
      createFastmailRecords({ domain: "example.com" });

      expect(mockDnsControl.MX).toHaveBeenCalledWith("*", 10, "in1-smtp.messagingengine.com.");
      expect(mockDnsControl.MX).toHaveBeenCalledWith("*", 20, "in2-smtp.messagingengine.com.");
    });

    it("should skip wildcard MX records when disabled", () => {
      const records = createFastmailRecords({
        domain: "example.com",
        includeWildcard: false,
      });

      // Should have: 1 mail CNAME + 2 MX + 1 SPF + 1 DMARC + 3 DKIM = 8 records
      expect(records).toHaveLength(8);
    });

    it("should create SPF record", () => {
      createFastmailRecords({ domain: "example.com" });

      expect(mockDnsControl.TXT).toHaveBeenCalledWith(
        "@",
        "v=spf1 include:spf.messagingengine.com ?all"
      );
    });

    it("should create DMARC record with default policy", () => {
      createFastmailRecords({ domain: "example.com" });

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc", "v=DMARC1; p=none");
    });

    it("should create DMARC record with quarantine policy", () => {
      createFastmailRecords({ domain: "example.com", dmarcPolicy: "quarantine" });

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc", "v=DMARC1; p=quarantine");
    });

    it("should create DMARC record with reject policy", () => {
      createFastmailRecords({ domain: "example.com", dmarcPolicy: "reject" });

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc", "v=DMARC1; p=reject");
    });

    it("should create DKIM CNAME records for fm1, fm2, fm3", () => {
      createFastmailRecords({ domain: "example.com" });

      expect(mockDnsControl.CNAME).toHaveBeenCalledWith(
        "fm1._domainkey",
        "fm1.example.com.dkim.fmhosted.com."
      );
      expect(mockDnsControl.CNAME).toHaveBeenCalledWith(
        "fm2._domainkey",
        "fm2.example.com.dkim.fmhosted.com."
      );
      expect(mockDnsControl.CNAME).toHaveBeenCalledWith(
        "fm3._domainkey",
        "fm3.example.com.dkim.fmhosted.com."
      );
    });

    it("should handle custom root record", () => {
      createFastmailRecords({ domain: "example.com", rootRecord: "mail-subdomain" });

      expect(mockDnsControl.MX).toHaveBeenCalledWith(
        "mail-subdomain",
        10,
        "in1-smtp.messagingengine.com."
      );
      expect(mockDnsControl.CNAME).toHaveBeenCalledWith(
        "mail.mail-subdomain",
        "mail.fastmail.com."
      );
    });
  });

  describe("createFastmailSubdomainRecords", () => {
    it("should create records for a subdomain", () => {
      const records = createFastmailSubdomainRecords("example.com", "sub");

      expect(records).toHaveLength(10);
    });

    it("should use subdomain as root record", () => {
      createFastmailSubdomainRecords("example.com", "mail-sub");

      expect(mockDnsControl.MX).toHaveBeenCalledWith(
        "mail-sub",
        10,
        "in1-smtp.messagingengine.com."
      );
    });

    it("should create DKIM records with subdomain suffix", () => {
      createFastmailSubdomainRecords("example.com", "sub");

      expect(mockDnsControl.CNAME).toHaveBeenCalledWith(
        "fm1._domainkey.sub",
        "fm1.example.com.dkim.fmhosted.com."
      );
    });
  });
});
