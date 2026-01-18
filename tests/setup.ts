/**
 * Global test setup file for Vitest
 * Sets up DNSControl DSL mocks and custom matchers
 */

import { vi, expect, beforeEach, afterEach } from "vitest";
import { mockDnsControl, resetMocks } from "./mocks/dnscontrol.js";
import "./matchers/dns.matchers.js";

// Make DNSControl DSL functions available globally
declare global {
  // DNSControl DSL functions
  var D: typeof mockDnsControl.D;
  var A: typeof mockDnsControl.A;
  var AAAA: typeof mockDnsControl.AAAA;
  var CNAME: typeof mockDnsControl.CNAME;
  var MX: typeof mockDnsControl.MX;
  var TXT: typeof mockDnsControl.TXT;
  var SRV: typeof mockDnsControl.SRV;
  var CAA: typeof mockDnsControl.CAA;
  var NS: typeof mockDnsControl.NS;
  var NewRegistrar: typeof mockDnsControl.NewRegistrar;
  var NewDnsProvider: typeof mockDnsControl.NewDnsProvider;
  var CF_PROXY_ON: typeof mockDnsControl.CF_PROXY_ON;
  var CF_PROXY_OFF: typeof mockDnsControl.CF_PROXY_OFF;
  var TTL: typeof mockDnsControl.TTL;
  var DnsProvider: typeof mockDnsControl.DnsProvider;
  var DefaultTTL: typeof mockDnsControl.DefaultTTL;
  var IGNORE: typeof mockDnsControl.IGNORE;
  var IGNORE_NAME: typeof mockDnsControl.IGNORE_NAME;
  var CF_REDIRECT: typeof mockDnsControl.CF_REDIRECT;
  var CF_TEMP_REDIRECT: typeof mockDnsControl.CF_TEMP_REDIRECT;
}

// Assign mocks to global scope
globalThis.D = mockDnsControl.D;
globalThis.A = mockDnsControl.A;
globalThis.AAAA = mockDnsControl.AAAA;
globalThis.CNAME = mockDnsControl.CNAME;
globalThis.MX = mockDnsControl.MX;
globalThis.TXT = mockDnsControl.TXT;
globalThis.SRV = mockDnsControl.SRV;
globalThis.CAA = mockDnsControl.CAA;
globalThis.NS = mockDnsControl.NS;
globalThis.NewRegistrar = mockDnsControl.NewRegistrar;
globalThis.NewDnsProvider = mockDnsControl.NewDnsProvider;
globalThis.CF_PROXY_ON = mockDnsControl.CF_PROXY_ON;
globalThis.CF_PROXY_OFF = mockDnsControl.CF_PROXY_OFF;
globalThis.TTL = mockDnsControl.TTL;
globalThis.DnsProvider = mockDnsControl.DnsProvider;
globalThis.DefaultTTL = mockDnsControl.DefaultTTL;
globalThis.IGNORE = mockDnsControl.IGNORE;
globalThis.IGNORE_NAME = mockDnsControl.IGNORE_NAME;
globalThis.CF_REDIRECT = mockDnsControl.CF_REDIRECT;
globalThis.CF_TEMP_REDIRECT = mockDnsControl.CF_TEMP_REDIRECT;

// Reset mocks before each test
beforeEach(() => {
  resetMocks();
});

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Export for use in tests
export { mockDnsControl, resetMocks };
