# Development Setup

Guide for setting up a local development environment.

## Prerequisites

- **Node.js** 18.18.0 or later
- **pnpm** 9.x (automatically installed via corepack)
- **Git** for version control
- **VS Code** (recommended)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/vladzaharia/dns.git
cd dns
```

### 2. Enable Corepack

```bash
corepack enable
corepack prepare pnpm@9.15.4 --activate
```

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Build Packages

```bash
pnpm build
```

## Project Structure

```
dns/
├── packages/
│   ├── dnscontrol-types/     # TypeScript types (NPM package)
│   ├── dnscontrol-download/  # Binary downloader
│   └── polaris-dns/          # DNS IaC platform
├── docs/                      # Documentation (VitePress)
└── .github/                   # CI/CD workflows
```

## Development Workflow

### Working on dnscontrol-types

```bash
# Build the types package
pnpm --filter @vladzaharia/dnscontrol-types build

# Run type checking
pnpm --filter @vladzaharia/dnscontrol-types typecheck

# Run tests
pnpm --filter @vladzaharia/dnscontrol-types test
```

### Working on polaris-dns

```bash
# Build the DNS configuration
pnpm build:dns

# Preview changes
pnpm preview

# Push changes (requires credentials)
pnpm push
```

### Working on Documentation

```bash
# Start development server
pnpm docs:dev

# Build documentation
pnpm docs:build

# Preview built docs
pnpm docs:preview
```

## VS Code Setup

### Recommended Extensions

- **ESLint** - Linting
- **Prettier** - Formatting
- **TypeScript Vue Plugin (Volar)** - Vue support
- **MDX** - MDX support

### Workspace Settings

`.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage

# Run specific test types
pnpm test:unit
pnpm test:integration
pnpm test:validation
```

## Linting and Formatting

```bash
# Run linter
pnpm lint

# Fix lint errors
pnpm lint:fix

# Check formatting
pnpm format:check

# Fix formatting
pnpm format
```

## Type Checking

```bash
pnpm typecheck
```

## Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @vladzaharia/dnscontrol-types build
```

## Environment Variables

Create a `.env` file for local development:

```bash
# Cloudflare API token
CF_API_TOKEN=your-token-here

# Optional: Enable debug logging
DEBUG=dnscontrol:*
```

## See Also

- [Code Style](./code-style) - Coding standards
- [Testing](./testing) - Testing guide
- [Pull Requests](./pull-requests) - PR process
