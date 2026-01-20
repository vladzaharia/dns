# Installation

This guide covers setting up Polaris DNS for local development.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **pnpm** - Package manager
- **Git** - Version control
- **Cloudflare Account** - For DNS management

### Installing pnpm

```bash
# Using npm
npm install -g pnpm

# Using Homebrew (macOS)
brew install pnpm

# Using Corepack (Node.js 16.13+)
corepack enable
corepack prepare pnpm@latest --activate
```

## Clone the Repository

```bash
git clone https://github.com/vladzaharia/dns.git
cd dns
```

## Install Dependencies

```bash
pnpm install
```

This installs dependencies for all packages in the monorepo.

## Configure Credentials

### Cloudflare API Token

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Create a token with:
   - **Zone:DNS:Edit** permission
   - **Zone:Zone:Read** permission
3. Copy the token

### Create Credentials File

Create `packages/polaris-dns/src/creds.json`:

```json
{
  "cloudflare": {
    "TYPE": "CLOUDFLAREAPI",
    "apitoken": "YOUR_CLOUDFLARE_API_TOKEN"
  },
  "none": {
    "TYPE": "NONE"
  }
}
```

::: warning
Never commit `creds.json` to version control. It's already in `.gitignore`.
:::

## Build the Project

```bash
# Build all packages
pnpm build

# Or build specific package
cd packages/polaris-dns
pnpm build
```

## Verify Installation

### Preview DNS Changes

```bash
cd packages/polaris-dns
pnpm preview
```

This shows what changes would be made without applying them.

### Check Output

You should see output like:

```
╔════════════════════════════════════════════════════════════════╗
║                    DNS Infrastructure-as-Code                   ║
║                         Version 2.0.0                           ║
╚════════════════════════════════════════════════════════════════╝

Building DNS zones...

Zone: vlad.gg
Zone: plrs.im
...

All zones registered. Running DNSControl...
```

## Project Structure

After installation, your project structure should look like:

```
dns/
├── packages/
│   ├── dnscontrol-types/     # TypeScript types
│   ├── polaris-dns/          # Main DNS configuration
│   │   ├── src/
│   │   │   ├── creds.json    # Your credentials (not in git)
│   │   │   ├── index.ts      # Entry point
│   │   │   ├── lib/          # Core utilities
│   │   │   ├── mail/         # Email providers
│   │   │   ├── services/     # Service definitions
│   │   │   └── zones/        # Zone definitions
│   │   └── dist/             # Built output
│   └── dnscontrol-download/  # DNSControl downloader
├── docs/                     # Documentation
├── pnpm-workspace.yaml       # Workspace config
└── package.json              # Root package
```

## Common Issues

### DNSControl Not Found

If DNSControl isn't found, it will be downloaded automatically on first build.

### API Token Errors

If you see authentication errors:

1. Verify your API token has correct permissions
2. Check the token hasn't expired
3. Ensure `creds.json` is properly formatted

### Build Errors

If the build fails:

1. Ensure Node.js 18+ is installed
2. Run `pnpm install` again
3. Check for TypeScript errors with `pnpm lint`

## Next Steps

- [Quick Start](./quick-start) - Create your first zone
- [Project Structure](./structure) - Understand the codebase
- [Concepts](../concepts/) - Learn DNS fundamentals
