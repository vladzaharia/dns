# Technical Details and Build Process

## Build Pipeline

### 1. Entry Point (src/main.ts)
- Uses webpack's `require.context()` to auto-discover zone files
- Searches `./zones/` directory for all `.ts` files
- Imports each zone file in sequence
- Each zone file executes its `D()` call, building up the DNS configuration

### 2. Webpack Compilation (webpack.config.js)
- **Mode**: Production
- **Target**: `["node", "es5"]` - Node environment with ES5 output
- **Entry**: `./src/main.ts`
- **Output**: `./out/dnsconfig.js`
- **Module Resolution**: Resolves from `src/` and `node_modules/`
- **TypeScript Loader**: `ts-loader` compiles `.ts` files
- **Copy Plugin**: Copies `src/creds.json` to `out/creds.json`
- **Optimization**: Minimize disabled for readable output

### 3. DNSControl Execution
Platform-specific binary executes the compiled JavaScript:
- **macOS**: `lib/dnscontrol-Darwin`
- **Linux**: `lib/dnscontrol-Linux`
- **Windows**: `lib/dnscontrol.exe` (referenced in package.json but not in lib/)

Commands:
- `preview`: `dnscontrol --diff2 preview` (dry run)
- `push`: `dnscontrol --diff2 push` (apply changes)

## TypeScript Configuration (tsconfig.json)

```json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true,
    "moduleResolution": "node"
  }
}
```

**Key Settings**:
- ES6 modules for import/export
- ES5 target for compatibility with DNSControl
- Strict type checking with `noImplicitAny`
- Node module resolution

## ESLint Configuration (.eslintrc.js)

```javascript
{
  env: { browser: true, es2021: true },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {}
}
```

**Key Features**:
- TypeScript-aware linting
- Prettier integration (runs first to avoid conflicts)
- Recommended rules from ESLint and TypeScript-ESLint
- No custom rules defined

## DNSControl Binary Management

### Download Script (lib/download.sh)
- Runs automatically during `npm install` (postinstall hook)
- Fetches latest release from GitHub API
- Downloads platform-specific binaries:
  - macOS: `dnscontrol_VERSION_darwin_all.tar.gz`
  - Linux: `dnscontrol_VERSION_linux_amd64.tar.gz`
- Extracts and renames to `dnscontrol-Darwin` and `dnscontrol-Linux`
- Makes binaries executable with `chmod +x`
- Writes version to `lib/dnscontrol-VERSION`
- Skips download if binary already exists

### Current Version
DNSControl v4.30.0 (as of last download)

## Git Ignore Patterns

```
node_modules/      # NPM dependencies
out/               # Webpack build output
dist/              # TypeScript compilation output
*.log              # Log files
.env               # Environment variables
.DS_Store          # macOS metadata

lib/*              # Ignore all lib contents
!lib/README.md     # Except README
!lib/download*     # Except download script
```

**Important**: DNSControl binaries are gitignored but automatically downloaded.

## Type Definitions (src/definitions/dnscontrol.d.ts)

Provides TypeScript types for DNSControl global functions:

**Top-Level Functions**:
- `REV()` - Reverse DNS
- `NewRegistrar()` - Define registrar
- `NewDnsProvider()` - Define DNS provider
- `DEFAULTS()` - Set defaults
- `D()` - Define domain

**Record Types**:
- `A()`, `AAAA()`, `CNAME()`, `MX()`, `TXT()`, `SRV()`, `CAA()`, `NS()`, `PTR()`, `TLSA()`

**Domain Modifiers**:
- `DefaultTTL()` - Set default TTL
- `DnsProvider()` - Attach DNS provider
- `IGNORE_NAME()` - Ignore external records
- `NO_PURGE()` - Don't delete unmanaged records

**Cloudflare-Specific**:
- `CF_REDIRECT()` - Permanent redirect
- `CF_TEMP_REDIRECT()` - Temporary redirect

## Helper Functions (src/services/core.ts)

### GetPrefix(name: ServerNames): string
Returns the subdomain prefix for a server.
- If server has location: `prefix.location` (e.g., "gw.sea")
- If no location: `prefix` (e.g., "tun")

### GetHost(name: ServerNames): string
Returns the full FQDN for a server.
- Format: `prefix.location.polaris.gdn.` or `prefix.polaris.gdn.`
- Trailing dot is important for DNS

### GetIP(name: ServerNames): string
Returns the IP address for a server.

### GetCoreRecords(): Record[]
Generates A records for all servers where `excludeRecord` is false.
- Filters out Greenwood, CapHill, LocalTraefik (DDNS-managed or internal)
- Returns array of Record objects with type "A"

## Helper Functions (src/utils/record.ts)

### CreateRecord(record: Record, targetName?: ServerNames, suffix?: string): DNSControlRecord
Creates a single DNS record with intelligent defaults:
1. Appends suffix to name if provided
2. Resolves target from server map if not specified
3. Determines record type (CNAME, A, or AAAA)
4. Special handling for LocalTraefik (converts to A record with 10.10.1.20)
5. Special handling for azgw flag (converts to CNAME to AzureGateway)
6. Logs the record creation to console
7. Applies Cloudflare proxy and SSL modifiers if specified

### CreateRecords(groupName: string, records: Record[], target?: ServerNames, suffix?: string): DNSControlRecord[]
Bulk creates records with console logging:
1. Logs group name
2. Maps over records array
3. Calls CreateRecord for each
4. Returns array of DNSControlRecord objects

## Platform-Specific Commands (package.json)

Uses `run-script-os` package to run platform-specific commands:

```json
"preview-ci": "run-script-os",
"preview-ci:darwin": "cd out && ../lib/dnscontrol-Darwin --diff2 preview",
"preview-ci:linux": "cd out && ../lib/dnscontrol-Linux --diff2 preview",
"preview-ci:win32": "cd out && ..\\lib\\dnscontrol --diff2 preview"
```

Same pattern for `push-ci` commands.

## Console Output

During build, the system logs:
1. "Building zones..."
2. For each zone: "Loading ./zones/filename.ts..."
3. Zone name: "Zone: domain.tld - Description"
4. For each record group: "Group: GroupName"
5. For each record: "  Description: name -> target"
6. Separator: "--"
7. "Running dnscontrol..."

This provides visibility into what's being configured.

## Error Handling

- Server not found: Throws "Server not found!" error
- Missing credentials: DNSControl will fail with authentication error
- Invalid DNS records: DNSControl validates during preview/push
- TypeScript errors: Caught during webpack build
- ESLint errors: Caught during lint step (blocks build)
