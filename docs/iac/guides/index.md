# Guides

This section contains step-by-step guides for common tasks in Polaris DNS.

## Zone Management

- [Managing Zones](./zones) - Create, configure, and organize DNS zones
- [Creating Records](./records) - Add and manage DNS records

## Services & Infrastructure

- [Service Definitions](./services) - Define reusable service configurations
- [Working with Providers](./providers) - Configure DNS providers

## Email Configuration

- [Email Configuration](./mail) - Set up email routing with various providers

## Operations

- [CI/CD Workflows](./ci-cd) - Automated deployment with GitHub Actions

## Quick Reference

### Common Commands

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `pnpm build`   | Build all packages and generate dnsconfig.js |
| `pnpm preview` | Preview DNS changes without applying         |
| `pnpm push`    | Apply DNS changes to providers               |
| `pnpm lint`    | Run ESLint on all packages                   |
| `pnpm test`    | Run tests with Vitest                        |

### Zone Categories

| Category         | Description             | Example Domains       |
| ---------------- | ----------------------- | --------------------- |
| `personal`       | Personal domains        | vlad.gg, personal.com |
| `infrastructure` | Infrastructure domains  | plrs.im, infra.io     |
| `external`       | Client/external domains | client.com            |

### Record Types

| Function              | Description                         |
| --------------------- | ----------------------------------- |
| `createARecord()`     | IPv4 address record                 |
| `createAAAARecord()`  | IPv6 address record                 |
| `createCNAMERecord()` | Canonical name (alias)              |
| `createMXRecord()`    | Mail exchange                       |
| `createTXTRecord()`   | Text record                         |
| `createCAARecord()`   | Certificate Authority Authorization |
| `createSRVRecord()`   | Service record                      |
