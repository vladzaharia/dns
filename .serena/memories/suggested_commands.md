# Suggested Commands for DNS Project

## Setup

```bash
npm install
```

This also downloads the appropriate DNSControl binary (v4.30.0) for your platform via `lib/download.sh`.

## Build

```bash
npm run build
```

Runs linting and webpack to compile TypeScript into `out/dnsconfig.js`.

## Linting & Formatting

```bash
npm run lint              # Run all linters
npm run lint:eslint       # ESLint only
npm run lint:prettier     # Prettier only
```

## DNS Operations

```bash
npm run preview           # Build and preview DNS changes (dry run)
npm run preview-ci        # Preview only (no build)
npm run push              # Build and push DNS changes to providers
npm run push-ci           # Push only (no build)
```

**IMPORTANT**: `push` commands apply DNS changes to LIVE infrastructure. Always run `preview` first.

## System Commands (macOS/Darwin)

- `ls -la` - List files with details
- `git --no-pager <command>` - Git commands without pager
- Standard Unix tools available: grep, find, cat, etc.
