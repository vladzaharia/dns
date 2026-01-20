/**
 * Unit tests for DNS record builders
 */

import { describe, it, expect } from "vitest";
import {
  createARecord,
  createAAAARecord,
  createCNAMERecord,
  createMXRecord,
  createTXTRecord,
  createSRVRecord,
  createCAARecord,
  createServiceRecord,
  createServerCNAME,
  createServerARecord,
} from "@lib/record.js";
import { mockDnsControl } from "@tests/mocks/dnscontrol.js";

describe("Record Builders", () => {
  describe("createARecord", () => {
    it("should create a basic A record", () => {
      const result = createARecord("test", "192.168.1.1");

      expect(mockDnsControl.A).toHaveBeenCalledWith("test", "192.168.1.1");
      expect(result).toHaveProperty("type", "A");
      expect(result).toHaveProperty("name", "test");
      expect(result).toHaveProperty("ip", "192.168.1.1");
    });

    it("should create an A record with proxy on", () => {
      createARecord("proxied", "10.0.0.1", { proxy: "on" });

      expect(mockDnsControl.A).toHaveBeenCalled();
      const call = mockDnsControl.A.mock.calls[0];
      expect(call[0]).toBe("proxied");
      expect(call[1]).toBe("10.0.0.1");
    });

    it("should create an A record with proxy off", () => {
      createARecord("direct", "10.0.0.2", { proxy: "off" });

      expect(mockDnsControl.A).toHaveBeenCalled();
      const call = mockDnsControl.A.mock.calls[0];
      expect(call[0]).toBe("direct");
    });

    it("should create an A record with TTL", () => {
      createARecord("ttl-test", "10.0.0.3", { ttl: 300 });

      expect(mockDnsControl.A).toHaveBeenCalled();
      expect(mockDnsControl.TTL).toHaveBeenCalledWith(300);
    });

    it("should create an A record for root domain", () => {
      const result = createARecord("@", "1.2.3.4");

      expect(result).toHaveProperty("name", "@");
    });

    it("should create an A record for wildcard", () => {
      const result = createARecord("*", "1.2.3.4");

      expect(result).toHaveProperty("name", "*");
    });
  });

  describe("createAAAARecord", () => {
    it("should create a basic AAAA record", () => {
      const result = createAAAARecord("ipv6", "2001:db8::1");

      expect(mockDnsControl.AAAA).toHaveBeenCalledWith("ipv6", "2001:db8::1");
      expect(result).toHaveProperty("type", "AAAA");
      expect(result).toHaveProperty("name", "ipv6");
    });

    it("should create an AAAA record with options", () => {
      createAAAARecord("ipv6-proxied", "2001:db8::2", { proxy: "on" });

      expect(mockDnsControl.AAAA).toHaveBeenCalled();
    });
  });

  describe("createCNAMERecord", () => {
    it("should create a basic CNAME record", () => {
      const result = createCNAMERecord("www", "example.com.");

      expect(mockDnsControl.CNAME).toHaveBeenCalledWith("www", "example.com.");
      expect(result).toHaveProperty("type", "CNAME");
      expect(result).toHaveProperty("name", "www");
      expect(result).toHaveProperty("target", "example.com.");
    });

    it("should create a CNAME record with proxy", () => {
      createCNAMERecord("cdn", "cdn.example.com.", { proxy: "on" });

      expect(mockDnsControl.CNAME).toHaveBeenCalled();
    });

    it("should create a CNAME record with TTL", () => {
      createCNAMERecord("alias", "target.example.com.", { ttl: 3600 });

      expect(mockDnsControl.TTL).toHaveBeenCalledWith(3600);
    });
  });

  describe("createMXRecord", () => {
    it("should create a basic MX record", () => {
      const result = createMXRecord("@", 10, "mail.example.com.");

      expect(mockDnsControl.MX).toHaveBeenCalledWith("@", 10, "mail.example.com.");
      expect(result).toHaveProperty("type", "MX");
      expect(result).toHaveProperty("priority", 10);
      expect(result).toHaveProperty("target", "mail.example.com.");
    });

    it("should create MX records with different priorities", () => {
      createMXRecord("@", 10, "primary.mail.com.");
      createMXRecord("@", 20, "secondary.mail.com.");

      expect(mockDnsControl.MX).toHaveBeenCalledTimes(2);
    });

    it("should create MX record with TTL", () => {
      createMXRecord("@", 10, "mail.example.com.", { ttl: 3600 });

      expect(mockDnsControl.TTL).toHaveBeenCalledWith(3600);
    });
  });

  describe("createTXTRecord", () => {
    it("should create a basic TXT record", () => {
      const result = createTXTRecord("@", "v=spf1 include:_spf.example.com ~all");

      expect(mockDnsControl.TXT).toHaveBeenCalled();
      expect(result).toHaveProperty("type", "TXT");
      expect(result).toHaveProperty("content", "v=spf1 include:_spf.example.com ~all");
    });

    it("should create a DKIM TXT record", () => {
      const dkimValue = "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQ==";
      createTXTRecord("selector._domainkey", dkimValue);

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("selector._domainkey", dkimValue);
    });

    it("should create a DMARC TXT record", () => {
      const dmarcValue = "v=DMARC1; p=reject; rua=mailto:dmarc@example.com";
      createTXTRecord("_dmarc", dmarcValue);

      expect(mockDnsControl.TXT).toHaveBeenCalledWith("_dmarc", dmarcValue);
    });
  });

  describe("createSRVRecord", () => {
    it("should create a basic SRV record", () => {
      const result = createSRVRecord("_sip._tcp", 10, 5, 5060, "sip.example.com.");

      expect(mockDnsControl.SRV).toHaveBeenCalledWith("_sip._tcp", 10, 5, 5060, "sip.example.com.");
      expect(result).toHaveProperty("type", "SRV");
      expect(result).toHaveProperty("priority", 10);
      expect(result).toHaveProperty("weight", 5);
      expect(result).toHaveProperty("port", 5060);
      expect(result).toHaveProperty("target", "sip.example.com.");
    });

    it("should create an XMPP SRV record", () => {
      createSRVRecord("_xmpp-client._tcp", 5, 0, 5222, "xmpp.example.com.");

      expect(mockDnsControl.SRV).toHaveBeenCalled();
    });

    it("should create SRV record with TTL", () => {
      createSRVRecord("_ldap._tcp", 0, 0, 389, "ldap.example.com.", { ttl: 3600 });

      expect(mockDnsControl.TTL).toHaveBeenCalledWith(3600);
    });
  });

  describe("createCAARecord", () => {
    it("should create a basic CAA issue record", () => {
      const result = createCAARecord("@", "issue", "letsencrypt.org");

      expect(mockDnsControl.CAA).toHaveBeenCalledWith("@", "issue", "letsencrypt.org");
      expect(result).toHaveProperty("type", "CAA");
      expect(result).toHaveProperty("tag", "issue");
      expect(result).toHaveProperty("value", "letsencrypt.org");
    });

    it("should create a CAA issuewild record", () => {
      createCAARecord("@", "issuewild", "letsencrypt.org");

      expect(mockDnsControl.CAA).toHaveBeenCalledWith("@", "issuewild", "letsencrypt.org");
    });

    it("should create a CAA iodef record", () => {
      createCAARecord("@", "iodef", "mailto:security@example.com");

      expect(mockDnsControl.CAA).toHaveBeenCalledWith("@", "iodef", "mailto:security@example.com");
    });

    it("should create CAA record with TTL", () => {
      createCAARecord("@", "issue", "digicert.com", { ttl: 3600 });

      expect(mockDnsControl.TTL).toHaveBeenCalledWith(3600);
    });
  });

  describe("createServiceRecord", () => {
    it("should create a direct A record for a service", () => {
      const result = createServiceRecord("app", "greenwood");

      expect(mockDnsControl.A).toHaveBeenCalled();
      expect(result).toHaveProperty("type", "A");
    });

    it("should create a tunnel CNAME record when useTunnel is true", () => {
      const result = createServiceRecord("tunneled", "greenwood", { useTunnel: true });

      expect(mockDnsControl.CNAME).toHaveBeenCalled();
      expect(result).toHaveProperty("type", "CNAME");
    });

    it("should use proxy on by default", () => {
      createServiceRecord("default-proxy", "greenwood");

      expect(mockDnsControl.A).toHaveBeenCalled();
    });

    it("should respect proxy off option", () => {
      createServiceRecord("no-proxy", "greenwood", { proxy: "off" });

      expect(mockDnsControl.A).toHaveBeenCalled();
    });

    it("should work with different servers", () => {
      createServiceRecord("azure", "pangolin");
      createServiceRecord("reprise", "reprise1");
      createServiceRecord("local", "local-traefik");

      expect(mockDnsControl.A).toHaveBeenCalledTimes(3);
    });

    it("should use proxy on for tunnel when proxy is on", () => {
      createServiceRecord("tunneled-proxied", "greenwood", { useTunnel: true, proxy: "on" });

      expect(mockDnsControl.CNAME).toHaveBeenCalled();
    });

    it("should use proxy off for tunnel when proxy is off", () => {
      createServiceRecord("tunneled-no-proxy", "greenwood", { useTunnel: true, proxy: "off" });

      expect(mockDnsControl.CNAME).toHaveBeenCalled();
    });

    it("should use proxy off for tunnel when proxy is full", () => {
      createServiceRecord("tunneled-full", "greenwood", { useTunnel: true, proxy: "full" });

      expect(mockDnsControl.CNAME).toHaveBeenCalled();
    });

    it("should pass TTL to tunnel CNAME", () => {
      createServiceRecord("tunneled-ttl", "greenwood", { useTunnel: true, ttl: 300 });

      expect(mockDnsControl.TTL).toHaveBeenCalledWith(300);
    });

    it("should pass TTL to direct A record", () => {
      createServiceRecord("direct-ttl", "greenwood", { ttl: 600 });

      expect(mockDnsControl.TTL).toHaveBeenCalledWith(600);
    });

    it("should use proxy off for direct when proxy is full", () => {
      createServiceRecord("direct-full", "greenwood", { proxy: "full" });

      expect(mockDnsControl.A).toHaveBeenCalled();
    });
  });

  describe("createServerCNAME", () => {
    it("should create a CNAME pointing to server hostname", () => {
      const result = createServerCNAME("alias", "greenwood");

      expect(mockDnsControl.CNAME).toHaveBeenCalled();
      expect(result).toHaveProperty("type", "CNAME");
      // Should include trailing dot
      const call = mockDnsControl.CNAME.mock.calls[0];
      expect(call[1]).toContain(".");
    });

    it("should work with different servers", () => {
      createServerCNAME("az-alias", "pangolin");

      expect(mockDnsControl.CNAME).toHaveBeenCalled();
    });
  });

  describe("createServerARecord", () => {
    it("should create an A record pointing to server IP", () => {
      const result = createServerARecord("direct", "greenwood");

      expect(mockDnsControl.A).toHaveBeenCalled();
      expect(result).toHaveProperty("type", "A");
    });

    it("should use correct IP for each server", () => {
      createServerARecord("gw", "greenwood");
      createServerARecord("ch", "caphill");

      expect(mockDnsControl.A).toHaveBeenCalledTimes(2);
    });

    it("should pass through options", () => {
      createServerARecord("proxied", "greenwood", { proxy: "on" });

      expect(mockDnsControl.A).toHaveBeenCalled();
    });
  });
});
