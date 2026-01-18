/**
 * @vladzaharia/dnscontrol-types
 *
 * TypeScript types and runtime validation for DNSControl configurations.
 *
 * This package provides two usage patterns:
 *
 * ## 1. Type-only usage (for type-checking DNSControl JS files)
 *
 * Add a triple-slash reference at the top of your dnsconfig.js:
 *
 * ```javascript
 * /// <reference types="@vladzaharia/dnscontrol-types" />
 *
 * var REG_NONE = NewRegistrar("none");
 * var DNS_CLOUDFLARE = NewDnsProvider("cloudflare");
 *
 * D("example.com", REG_NONE, DnsProvider(DNS_CLOUDFLARE),
 *   A("@", "192.0.2.1"),
 *   CNAME("www", "@")
 * );
 * ```
 *
 * ## 2. Runtime validation (for validating configurations programmatically)
 *
 * Import schemas and validators for runtime validation:
 *
 * ```typescript
 * import { schemas, validators } from '@vladzaharia/dnscontrol-types';
 *
 * // Validate a record
 * const result = validators.validateARecord({
 *   name: '@',
 *   address: '192.0.2.1'
 * });
 *
 * // Or use schemas directly with Zod
 * const parsed = schemas.ARecordSchema.parse({
 *   name: '@',
 *   address: '192.0.2.1'
 * });
 * ```
 *
 * @packageDocumentation
 */

// Re-export all schemas as a namespace
import * as schemas from './schemas/index.js';
export { schemas };

// Re-export all validators as a namespace
import * as validators from './validators/index.js';
export { validators };

// Also export individual items for tree-shaking
export * from './schemas/index.js';
export * from './validators/index.js';

// Export Zod for convenience (users don't need to install it separately)
export { z } from 'zod';

