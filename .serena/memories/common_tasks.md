# Common Development Tasks

## Adding a New DNS Record

### For a Single Service

1. Find the appropriate record group in `src/services/`
2. Add a new Record object to the array:
   ```typescript
   { name: "service", description: "Service Name", proxy: true }
   ```
   Or use `azgw: true` for services behind Azure Gateway tunnel
3. Run `npm run preview` to verify
4. Run `npm run push` to apply

### For Multiple Related Services

1. Create or update a record group file in `src/services/`
2. Export an array of Record objects
3. Import and spread into zone file(s) with `CreateRecords()`

## Adding a New Domain

1. Create a new zone file in `src/zones/` (e.g., `example-com.ts`)
2. Follow the standard zone file pattern:
   - Import providers and record groups
   - Define `BASE_DOMAIN`
   - Call `D()` with configuration
   - Add core records, service records, mail records
3. The build system auto-discovers the new file
4. Run `npm run preview` to verify

## Adding a New Server

1. Open `src/services/core.ts`
2. Add entry to the `Servers` map:
   ```typescript
   ServerName: {
     name: "ServerName",
     description: "Server Description",
     prefix: "prefix",  // Short prefix for subdomain
     location: "sea",    // or "van", "ts" (optional)
     ip: "1.2.3.4",
     excludeRecord: false,  // true to skip A record creation
   }
   ```
3. Add the server name to `ServerNames` type in `src/utils/server.ts`
4. Add the prefix to `ServerPrefixes` type
5. Use the server name in Record objects or as second parameter to `CreateRecords()`

## Modifying Existing Records

1. Locate the record in `src/services/` or directly in zone file
2. Modify the Record object properties
3. Run `npm run preview` to see the diff
4. Run `npm run push` to apply changes

## Working with Cloudflare Features

### Enable Proxy

```typescript
{ name: "service", description: "Service", proxy: true }
```

### Enable Azure Gateway Tunnel

```typescript
{ name: "service", description: "Service", azgw: true }
```

This automatically sets target to AzureGateway (tun.polaris.gdn) and type to CNAME.

### Disable SSL (when proxy enabled)

```typescript
{ name: "service", description: "Service", proxy: true, ssl: false }
```

### Override Target

```typescript
{ name: "service", description: "Service", target: "custom.example.com.", type: "CNAME" }
```

### Direct IP (A record)

```typescript
{ name: "service", description: "Service", target: "1.2.3.4", type: "A" }
```

### Cloudflare Redirects

Use `CloudflareDnsWithRedirect` provider and `CF_REDIRECT()` or `CF_TEMP_REDIRECT()`:

```typescript
import { CloudflareDnsWithRedirect } from "../providers/cloudflare";
// In D() call:
DnsProvider(CloudflareDnsWithRedirect),
CF_REDIRECT("*vlad.lgbt/*", "https://vlad.gg/$2")
```

## Ignoring External Records

For records managed by DDNS, Cloudflare UI, or other systems:

```typescript
IGNORE_NAME("subdomain"),                    // Ignore all record types
IGNORE_NAME("subdomain", "A,CNAME,AAAA"),    // Ignore specific types
IGNORE_NAME(GetPrefix("Greenwood")),         // Ignore server prefix
IGNORE_NAME("@", "A,CNAME,AAAA"),            // Ignore root domain records
IGNORE_NAME("cf2024-1._domainkey"),          // Ignore DKIM records
```

Common use cases:
- DDNS-managed home IPs: `IGNORE_NAME(GetPrefix("Greenwood"))`
- Cloudflare-managed root: `IGNORE_NAME("@", "A,CNAME,AAAA")`
- External service records: `IGNORE_NAME("status", "A,CNAME,AAAA")`
