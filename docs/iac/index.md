---
layout: home
title: Polaris DNS
titleTemplate: DNS Infrastructure-as-Code

hero:
  name: Polaris DNS
  text: DNS Infrastructure-as-Code
  tagline: Manage your DNS records declaratively with TypeScript and DNSControl
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/
    - theme: alt
      text: View on GitHub
      link: https://github.com/vladzaharia/dns

features:
  - title: Infrastructure as Code
    details: Define your DNS records in TypeScript with full type safety, version control, and code review workflows.
  - title: Type-Safe DNS
    details: Comprehensive TypeScript types for all DNSControl record types with compile-time validation.
  - title: Multi-Provider Support
    details: Support for 40+ DNS providers including Cloudflare, AWS Route53, Google Cloud DNS, and more.
  - title: Modular Architecture
    details: Organized as a monorepo with reusable packages for types, schemas, and DNS configuration.
  - title: Service Definitions
    details: Define services once and automatically generate DNS records across multiple domains.
  - title: Email Configuration
    details: Built-in support for email providers like Fastmail, Cloudflare Email Routing, and custom configurations.
---

## Quick Example

```typescript
import { createDomain, CLOUDFLARE, NO_REGISTRAR } from "./lib/domain";
import { createARecord, createCNAMERecord } from "./lib/record";

// Define a domain with DNS records
createDomain(
  {
    name: "example.com",
    category: "personal",
    registrar: NO_REGISTRAR,
    dnsProvider: CLOUDFLARE,
  },
  createARecord("@", "192.0.2.1"),
  createCNAMERecord("www", "@"),
  createCNAMERecord("api", "api.example.com.")
);
```

## Documentation Sections

- **[Getting Started](/getting-started/)** - Set up Polaris DNS
- **[Concepts](/concepts/)** - Core concepts and architecture
- **[Guides](/guides/)** - Step-by-step tutorials
- **[API Reference](/api/)** - Internal API documentation
- **[Contributing](/contributing/)** - How to contribute
