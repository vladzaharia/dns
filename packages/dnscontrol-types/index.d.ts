/**
 * DNSControl TypeScript Type Definitions
 * Version 2.0.0
 *
 * Comprehensive type definitions for DNSControl DSL
 * https://docs.dnscontrol.org/
 *
 * This file serves as the main entry point for all DNSControl type definitions.
 * It references all the modular definition files.
 *
 * ## Architecture
 *
 * The type system is organized in a clean dependency hierarchy:
 *
 * ```
 * base.d.ts (core types: DomainModifier, RecordModifier, etc.)
 *     ↓
 * base-capabilities.d.ts (BaseProviderCapabilities, record type unions)
 *     ↓
 * providers/*.d.ts (extend BaseProviderCapabilities, export namespaces)
 *     ↓
 * provider-capabilities.d.ts (registry, re-exports, utility types)
 * ```
 *
 * ## Adding a New Provider
 *
 * 1. Create `providers/myprovider.d.ts`
 * 2. Define `MyProviderCapabilities extends BaseProviderCapabilities`
 * 3. Set all capability flags to `true` or `false` literal types
 * 4. Create `MyProvider` namespace with only supported record functions
 * 5. Add to `provider-capabilities.d.ts` registry and exports
 *
 * @packageDocumentation
 */

// Core types
/// <reference path="base.d.ts" />

// Base capabilities (BaseProviderCapabilities, record type unions)
/// <reference path="base-capabilities.d.ts" />

// Top-level functions (D, D_EXTEND, NewDnsProvider, etc.)
/// <reference path="top-level.d.ts" />

// DNS record types (A, AAAA, CNAME, MX, etc.)
/// <reference path="records.d.ts" />

// Domain modifiers (DnsProvider, DefaultTTL, NO_PURGE, etc.)
/// <reference path="domain-modifiers.d.ts" />

// Record modifiers (TTL, CAA_CRITICAL, etc.)
/// <reference path="record-modifiers.d.ts" />

// Builder functions (CAA_BUILDER, SPF_BUILDER, DMARC_BUILDER, etc.)
/// <reference path="builders.d.ts" />

// Provider-specific types (Cloudflare, Azure, Route53, etc.)
/// <reference path="providers/index.d.ts" />

// Provider capabilities registry and utility types
/// <reference path="provider-capabilities.d.ts" />

