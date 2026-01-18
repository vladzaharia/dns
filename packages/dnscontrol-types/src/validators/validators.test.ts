/**
 * Tests for validation utilities
 */

import { describe, it, expect } from 'vitest';
import {
  validateRecord,
  formatErrors,
  getErrorSummary,
  validateARecord,
  validateCnameRecord,
  validateMxRecord,
  validateDomainConfig,
  validateTtl,
  validateIpAddress,
} from './index.js';
import { ARecordSchema } from '../schemas/records.js';

describe('validateRecord', () => {
  it('should return success for valid data', () => {
    const result = validateRecord(ARecordSchema, {
      name: '@',
      address: '192.0.2.1',
    });
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.name).toBe('@');
  });

  it('should return errors for invalid data', () => {
    const result = validateRecord(ARecordSchema, {
      name: '@',
      address: 'not-an-ip',
    });
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });
});

describe('formatErrors', () => {
  it('should format errors correctly', () => {
    const result = validateRecord(ARecordSchema, {
      name: '@',
      address: 'not-an-ip',
    });
    expect(result.success).toBe(false);
    if (!result.success && result.errors) {
      const formatted = formatErrors(result.errors);
      expect(formatted.length).toBeGreaterThan(0);
      expect(formatted[0]).toHaveProperty('path');
      expect(formatted[0]).toHaveProperty('message');
      expect(formatted[0]).toHaveProperty('code');
    }
  });
});

describe('getErrorSummary', () => {
  it('should return a summary string', () => {
    const result = validateRecord(ARecordSchema, {
      name: '@',
      address: 'not-an-ip',
    });
    expect(result.success).toBe(false);
    if (!result.success && result.errors) {
      const summary = getErrorSummary(result.errors);
      expect(typeof summary).toBe('string');
      expect(summary.length).toBeGreaterThan(0);
    }
  });
});

describe('validateARecord', () => {
  it('should validate A records', () => {
    const result = validateARecord({
      name: 'www',
      address: '192.0.2.1',
      ttl: 300,
    });
    expect(result.success).toBe(true);
  });
});

describe('validateCnameRecord', () => {
  it('should validate CNAME records', () => {
    const result = validateCnameRecord({
      name: 'www',
      target: 'example.com.',
    });
    expect(result.success).toBe(true);
  });
});

describe('validateMxRecord', () => {
  it('should validate MX records', () => {
    const result = validateMxRecord({
      name: '@',
      priority: 10,
      target: 'mail.example.com.',
    });
    expect(result.success).toBe(true);
  });
});

describe('validateDomainConfig', () => {
  it('should validate domain configuration', () => {
    const result = validateDomainConfig({
      name: 'example.com',
      registrar: 'none',
    });
    expect(result.success).toBe(true);
  });

  it('should validate domain with providers', () => {
    const result = validateDomainConfig({
      name: 'example.com',
      registrar: 'none',
      dnsProviders: ['cloudflare'],
      defaultTTL: 300,
    });
    expect(result.success).toBe(true);
  });
});

describe('validateTtl', () => {
  it('should validate numeric TTL', () => {
    expect(validateTtl(300).success).toBe(true);
    expect(validateTtl(0).success).toBe(true);
  });

  it('should validate string TTL', () => {
    expect(validateTtl('5m').success).toBe(true);
    expect(validateTtl('1h').success).toBe(true);
  });

  it('should reject invalid TTL', () => {
    expect(validateTtl(-1).success).toBe(false);
    expect(validateTtl('invalid').success).toBe(false);
  });
});

describe('validateIpAddress', () => {
  it('should validate IPv4', () => {
    expect(validateIpAddress('192.0.2.1').success).toBe(true);
  });

  it('should validate IPv6', () => {
    expect(validateIpAddress('2001:db8::1').success).toBe(true);
  });

  it('should reject invalid IP', () => {
    expect(validateIpAddress('not-an-ip').success).toBe(false);
  });
});

