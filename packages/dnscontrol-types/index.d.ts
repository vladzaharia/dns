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
 * @packageDocumentation
 */

// Core types
/// <reference path="base.d.ts" />

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

