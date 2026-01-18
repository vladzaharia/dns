# Code Style and Conventions

## TypeScript Style

- **ESLint**: Uses `@typescript-eslint` with recommended rules
- **Prettier**: Auto-formatting enabled
- **Type Safety**: TypeScript 3.9.10 with type checking
- **Module System**: ES6 modules
- **Target**: ES5 for compatibility with DNSControl

## Naming Conventions

### Files

- Kebab-case for zone files: `polaris-rest.ts`, `vlad-gg.ts`
- Kebab-case for record groups: `media-services.ts`, `smart-home.ts`
- Lowercase for utilities and providers: `record.ts`, `cloudflare.ts`

### Variables and Constants

- PascalCase for exported constants: `CloudflareDns`, `NoRegistrar`
- camelCase for functions: `CreateRecord()`, `GetHost()`, `GetPrefix()`
- SCREAMING_SNAKE_CASE for domain constants: `BASE_DOMAIN`

### Servers

- **Naming**: Location-based names (e.g., "Greenwood", "CapHill", "AzureGateway")
- **Prefix Format**: prefix + location: `gw.sea.polaris.gdn`
- **Locations**: `sea` (Seattle), `van` (Vancouver), `ts` (Tailscale)
- **Root Domain**: `polaris.gdn`
- **Special**: `LocalTraefik` with prefix `local` for internal services (IP: 10.10.1.20)
- **Special**: `azgw: true` flag routes through AzureGateway tunnel

## Record Organization

- Group related records into arrays exported from `src/records/`
- Use descriptive names in Record interface
- Default to CNAME records unless specific type needed
- Enable Cloudflare proxy with `proxy: true` for public-facing services

## Zone File Pattern

All zone files follow this structure:

1. Import providers and record groups
2. Define `BASE_DOMAIN` constant
3. Call `D()` with domain, registrar, provider, DefaultTTL
4. Add `IGNORE_NAME()` for externally managed records (DDNS, Cloudflare UI)
5. Add core server records (only for polaris.gdn): `...CreateRecords("Core", GetCoreRecords())`
6. Add service records grouped by category with `...CreateRecords()`
7. Add mail records:
   - Fastmail: `...CreateFastmailRecords(BASE_DOMAIN)`
   - Postal: `...CreatePostalRecords([dkim_keys])`
8. Add domain verification TXT records
9. Add special records (SRV, CAA, etc.)

Note: polaris.express is currently disabled (all code commented out)

## DNSControl Integration

- Global functions (`D()`, `A()`, `CNAME()`, `MX()`, `TXT()`, `SRV()`, etc.) provided by DNSControl at runtime
- Type definitions in `src/definitions/dnscontrol.d.ts`
- No need to import these functions
