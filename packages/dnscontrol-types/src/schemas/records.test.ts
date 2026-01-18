/**
 * Tests for record schemas
 */

import { describe, it, expect } from 'vitest';
import {
  ARecordSchema,
  AAAARecordSchema,
  CnameRecordSchema,
  MxRecordSchema,
  TxtRecordSchema,
  SrvRecordSchema,
  CaaRecordSchema,
  TlsaRecordSchema,
  DnsRecordSchema,
} from './records.js';

describe('ARecordSchema', () => {
  it('should accept valid A record', () => {
    const result = ARecordSchema.parse({
      name: '@',
      address: '192.0.2.1',
    });
    expect(result.name).toBe('@');
    expect(result.address).toBe('192.0.2.1');
  });

  it('should accept A record with TTL', () => {
    const result = ARecordSchema.parse({
      name: 'www',
      address: '192.0.2.1',
      ttl: 300,
    });
    expect(result.ttl).toBe(300);
  });

  it('should reject invalid IP address', () => {
    expect(() =>
      ARecordSchema.parse({
        name: '@',
        address: 'not-an-ip',
      })
    ).toThrow();
  });
});

describe('AAAARecordSchema', () => {
  it('should accept valid AAAA record', () => {
    const result = AAAARecordSchema.parse({
      name: '@',
      address: '2001:db8::1',
    });
    expect(result.address).toBe('2001:db8::1');
  });

  it('should reject IPv4 address', () => {
    expect(() =>
      AAAARecordSchema.parse({
        name: '@',
        address: '192.0.2.1',
      })
    ).toThrow();
  });
});

describe('CnameRecordSchema', () => {
  it('should accept valid CNAME record', () => {
    const result = CnameRecordSchema.parse({
      name: 'www',
      target: 'example.com.',
    });
    expect(result.target).toBe('example.com.');
  });

  it('should accept @ as target', () => {
    const result = CnameRecordSchema.parse({
      name: 'www',
      target: 'example.com',
    });
    expect(result.target).toBe('example.com');
  });
});

describe('MxRecordSchema', () => {
  it('should accept valid MX record', () => {
    const result = MxRecordSchema.parse({
      name: '@',
      priority: 10,
      target: 'mail.example.com.',
    });
    expect(result.priority).toBe(10);
    expect(result.target).toBe('mail.example.com.');
  });

  it('should reject invalid priority', () => {
    expect(() =>
      MxRecordSchema.parse({
        name: '@',
        priority: -1,
        target: 'mail.example.com.',
      })
    ).toThrow();
  });
});

describe('TxtRecordSchema', () => {
  it('should accept string content', () => {
    const result = TxtRecordSchema.parse({
      name: '@',
      content: 'v=spf1 include:_spf.google.com ~all',
    });
    expect(result.content).toBe('v=spf1 include:_spf.google.com ~all');
  });

  it('should accept array content', () => {
    const result = TxtRecordSchema.parse({
      name: '@',
      content: ['part1', 'part2'],
    });
    expect(result.content).toEqual(['part1', 'part2']);
  });
});

describe('SrvRecordSchema', () => {
  it('should accept valid SRV record', () => {
    const result = SrvRecordSchema.parse({
      name: '_sip._tcp',
      priority: 10,
      weight: 5,
      port: 5060,
      target: 'sip.example.com.',
    });
    expect(result.priority).toBe(10);
    expect(result.weight).toBe(5);
    expect(result.port).toBe(5060);
  });

  it('should reject invalid port', () => {
    expect(() =>
      SrvRecordSchema.parse({
        name: '_sip._tcp',
        priority: 10,
        weight: 5,
        port: 70000,
        target: 'sip.example.com.',
      })
    ).toThrow();
  });
});

describe('CaaRecordSchema', () => {
  it('should accept valid CAA record', () => {
    const result = CaaRecordSchema.parse({
      name: '@',
      tag: 'issue',
      value: 'letsencrypt.org',
    });
    expect(result.tag).toBe('issue');
  });

  it('should accept critical flag', () => {
    const result = CaaRecordSchema.parse({
      name: '@',
      tag: 'issue',
      value: 'letsencrypt.org',
      critical: true,
    });
    expect(result.critical).toBe(true);
  });
});

