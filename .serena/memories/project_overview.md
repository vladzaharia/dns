# DNS Management Project Overview

## Purpose

This is a TypeScript-based DNS management repository that uses DNSControl to manage DNS records across multiple domains declaratively. The project compiles TypeScript zone definitions into a JavaScript configuration that DNSControl executes.

## Tech Stack

- **Language**: TypeScript 3.9.10
- **Build Tool**: Webpack 5.72.0
- **DNS Tool**: DNSControl v4.30.0 (downloaded during npm install via lib/download.sh)
- **DNS Provider**: Cloudflare
- **Linting**: ESLint 8.13.0 with @typescript-eslint plugin
- **Formatting**: Prettier 2.6.2
- **Module System**: ES6 modules, compiled to ES5 target

## Managed Domains

Active domains:
- **polaris.gdn** - Primary infrastructure domain with core server records
- **polaris.rest** - Services domain with infrastructure, media, productivity, gaming, and internal services
- **polaris.video** - Media streaming and automation services (Plex, *arr stack)
- **zhr.one** - Infrastructure services domain
- **vlad.gg** - Personal website and services
- **vlad.lgbt** - Redirect domain to vlad.gg
- **zaharia.email** - Email-only domain

Inactive/commented out:
- **polaris.express** - Currently disabled (all code commented out)

## Key Features

- Declarative DNS record management with TypeScript type safety
- Automatic zone file discovery via webpack require.context
- Centralized server definitions with location-based naming
- Cloudflare proxy and SSL management
- Azure Gateway (azgw) proxy support for internal services
- Multi-provider mail support (Fastmail and Postal)
- External service integrations (Netlify, Cloudflare Pages)
- IGNORE_NAME directive for externally managed records (DDNS, Cloudflare UI)
