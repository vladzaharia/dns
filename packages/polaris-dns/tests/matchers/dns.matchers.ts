/**
 * Custom Vitest matchers for DNS-related assertions
 */

import { expect } from "vitest";
import {
  IPV4_REGEX,
  IPV6_REGEX,
  HOSTNAME_REGEX,
  DNS_LABEL_REGEX,
} from "../constants/dns-patterns.js";

// Extend Vitest's expect with custom matchers
expect.extend({
  /**
   * Check if a string is a valid IPv4 address
   */
  toBeValidIPv4(received: string) {
    const pass = typeof received === "string" && IPV4_REGEX.test(received);
    return {
      pass,
      message: () =>
        pass
          ? `Expected "${received}" not to be a valid IPv4 address`
          : `Expected "${received}" to be a valid IPv4 address`,
    };
  },

  /**
   * Check if a string is a valid IPv6 address
   */
  toBeValidIPv6(received: string) {
    const pass = typeof received === "string" && IPV6_REGEX.test(received);
    return {
      pass,
      message: () =>
        pass
          ? `Expected "${received}" not to be a valid IPv6 address`
          : `Expected "${received}" to be a valid IPv6 address`,
    };
  },

  /**
   * Check if a string is a valid hostname
   */
  toBeValidHostname(received: string) {
    const pass = typeof received === "string" && HOSTNAME_REGEX.test(received);
    return {
      pass,
      message: () =>
        pass
          ? `Expected "${received}" not to be a valid hostname`
          : `Expected "${received}" to be a valid hostname`,
    };
  },

  /**
   * Check if a string is a valid DNS label (subdomain)
   */
  toBeValidDnsLabel(received: string) {
    const pass = typeof received === "string" && DNS_LABEL_REGEX.test(received);
    return {
      pass,
      message: () =>
        pass
          ? `Expected "${received}" not to be a valid DNS label`
          : `Expected "${received}" to be a valid DNS label`,
    };
  },

  /**
   * Check if a number is a valid TTL (60-86400 seconds)
   */
  toBeValidTTL(received: number) {
    const pass = typeof received === "number" && received >= 60 && received <= 86400;
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid TTL (60-86400)`
          : `Expected ${received} to be a valid TTL (60-86400)`,
    };
  },

  /**
   * Check if a number is a valid MX priority (0-65535)
   */
  toBeValidMxPriority(received: number) {
    const pass =
      typeof received === "number" &&
      Number.isInteger(received) &&
      received >= 0 &&
      received <= 65535;
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid MX priority (0-65535)`
          : `Expected ${received} to be a valid MX priority (0-65535)`,
    };
  },

  /**
   * Check if a number is a valid port number (0-65535)
   */
  toBeValidPort(received: number) {
    const pass =
      typeof received === "number" &&
      Number.isInteger(received) &&
      received >= 0 &&
      received <= 65535;
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid port (0-65535)`
          : `Expected ${received} to be a valid port (0-65535)`,
    };
  },
});

// TypeScript declaration for custom matchers
declare module "vitest" {
  interface Assertion<T = unknown> {
    toBeValidIPv4(): T;
    toBeValidIPv6(): T;
    toBeValidHostname(): T;
    toBeValidDnsLabel(): T;
    toBeValidTTL(): T;
    toBeValidMxPriority(): T;
    toBeValidPort(): T;
  }
  interface AsymmetricMatchersContaining {
    toBeValidIPv4(): unknown;
    toBeValidIPv6(): unknown;
    toBeValidHostname(): unknown;
    toBeValidDnsLabel(): unknown;
    toBeValidTTL(): unknown;
    toBeValidMxPriority(): unknown;
    toBeValidPort(): unknown;
  }
}
