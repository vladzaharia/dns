/**
 * Tests for mail/index.ts exports
 */

import { describe, it, expect } from "vitest";
import * as mail from "@mail/index.js";

describe("Mail Index Exports", () => {
  describe("Fastmail exports", () => {
    it("should export createFastmailRecords function", () => {
      expect(mail.createFastmailRecords).toBeDefined();
      expect(typeof mail.createFastmailRecords).toBe("function");
    });

    it("should export createFastmailSubdomainRecords function", () => {
      expect(mail.createFastmailSubdomainRecords).toBeDefined();
      expect(typeof mail.createFastmailSubdomainRecords).toBe("function");
    });
  });

  describe("Postal exports", () => {
    it("should export createPostalRecords function", () => {
      expect(mail.createPostalRecords).toBeDefined();
      expect(typeof mail.createPostalRecords).toBe("function");
    });

    it("should export createPostalServiceRecords function", () => {
      expect(mail.createPostalServiceRecords).toBeDefined();
      expect(typeof mail.createPostalServiceRecords).toBe("function");
    });
  });

  describe("Cloudflare exports", () => {
    it("should export createCloudflareEmailRecords function", () => {
      expect(mail.createCloudflareEmailRecords).toBeDefined();
      expect(typeof mail.createCloudflareEmailRecords).toBe("function");
    });
  });

  describe("Function signatures", () => {
    it("createFastmailRecords should accept options object", () => {
      const records = mail.createFastmailRecords({});
      expect(Array.isArray(records)).toBe(true);
    });

    it("createFastmailSubdomainRecords should accept subdomain string", () => {
      const records = mail.createFastmailSubdomainRecords("mail");
      expect(Array.isArray(records)).toBe(true);
    });

    it("createPostalRecords should accept options object", () => {
      const records = mail.createPostalRecords({});
      expect(Array.isArray(records)).toBe(true);
    });

    it("createPostalServiceRecords should return records array", () => {
      const records = mail.createPostalServiceRecords();
      expect(Array.isArray(records)).toBe(true);
    });

    it("createCloudflareEmailRecords should accept options object", () => {
      const records = mail.createCloudflareEmailRecords({});
      expect(Array.isArray(records)).toBe(true);
    });
  });
});
