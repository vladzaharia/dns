# Key Abstractions and Design Patterns

## Record Interface

Central abstraction in `src/utils/record.ts`:

```typescript
interface Record {
  name: string; // Subdomain
  description?: string; // Human-readable description
  type?: RecordType; // "CNAME" | "A" | "AAAA" (default: CNAME)
  target?: string; // Override target (default: uses server map)
  proxy?: boolean; // Enable Cloudflare proxy (default: false)
  azgw?: boolean; // Enable AzGateway proxy (default: false)
  ssl?: boolean; // Enable Universal SSL when proxy=true (default: true)
}
```

Note: `azgw: true` automatically sets target to AzureGateway and type to CNAME

## Helper Functions

- **`CreateRecord(record, targetName?, suffix?)`**: Creates a single DNS record with server resolution
- **`CreateRecords(groupName, records[], target?, suffix?)`**: Bulk creates records with console logging
- **`GetHost(name)`**: Resolves server name to FQDN (e.g., "Helium" → "he.sea.core.zhr.one.")
- **`GetPrefix(name)`**: Resolves server name to subdomain prefix (e.g., "Helium" → "he.sea.core")
- **`GetIP(name)`**: Returns IP address for a server
- **`GetCoreRecords()`**: Generates A records for all servers in the map

## Server Map Pattern

Centralized in `src/services/core.ts`:

- Maps server names to server configuration
- Includes IP, location (sea/van/ts), description, and prefix
- `excludeRecord` flag prevents automatic A record creation
- Root domain: `polaris.gdn`
- Current servers:
  - **Greenwood**: gw.sea (67.185.194.56) - Greenwood Townhouse IP (excludeRecord: true)
  - **CapHill**: ch.sea (97.113.197.175) - CapHill Townhouse IP (excludeRecord: true)
  - **AzureGateway**: tun (172.179.0.103) - Azure Tunnel Gateway
  - **UpVpn**: vpn (20.3.240.145) - UpVPN Serverless
  - **Reprise1-4**: re, re-2, re-3, re-4 (104.37.168.87-90) - Reprise IPs
  - **LocalTraefik**: local (10.10.1.20) - Internal Traefik services (excludeRecord: true)
- Special case: `LocalTraefik` automatically converts to A record with IP 10.10.1.20
- Special case: `azgw: true` in Record converts to CNAME pointing to AzureGateway

## Auto-Discovery Pattern

`src/main.ts` uses webpack's `require.context()` to automatically discover and import all `.ts` files in `src/zones/`:

```typescript
const context = require.context("./zones/", true, /\.ts$/);
context.keys().forEach((zone: string) => {
  context(zone);
});
```

## Modular Record Groups

- Records organized by function in `src/services/`
- Each group exports an array of Record objects
- Groups imported and spread into zone files with `...CreateRecords()`
- Enables reuse across multiple domains
- Service groups:
  - `core.ts` - Server definitions and helper functions
  - `infrastructure.ts` - Core infrastructure services
  - `homelab.ts` - Homelab/development services
  - `media-services.ts` - Media consumption services
  - `productivity.ts` - Productivity and collaboration tools
  - `gaming.ts` - Gaming services
  - `internal.ts` - Internal management services
  - `polaris-video.ts` - Media automation and streaming
  - `mail/fastmail.ts` - Fastmail email provider
  - `mail/postal.ts` - Postal self-hosted email
  - `external/netlify-vladgg.ts` - Netlify integration
  - `external/cloudflare-pages.ts` - Cloudflare Pages integration

## Cloudflare-Specific Features

- Proxy toggle with `proxy: true` in Record interface
- SSL control with `ssl: true` (default when proxy enabled)
- Redirect management via `CF_REDIRECT()` and `CF_TEMP_REDIRECT()`
- Provider defined in `src/providers/cloudflare.ts`

## External Record Management

- `IGNORE_NAME()` directive for records managed elsewhere
- Used for: DDNS-managed records, Cloudflare-managed redirects, external service records
- Prevents DNSControl from trying to manage these records
