# CI/CD Workflows

Polaris DNS uses GitHub Actions for automated testing and deployment.

## Workflow Overview

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **Preview** | Pull Request | Show DNS changes |
| **Deploy** | Push to main | Apply DNS changes |
| **Validate** | All pushes | Type checking & linting |

## GitHub Actions Setup

### Required Secrets

Configure these secrets in your repository:

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token |
| `AWS_ACCESS_KEY_ID` | AWS access key (if using Route53) |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key (if using Route53) |

### Preview Workflow

`.github/workflows/preview.yml`:

```yaml
name: DNS Preview

on:
  pull_request:
    paths:
      - 'packages/polaris-dns/**'

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install

      - name: Create credentials
        run: |
          cat > packages/polaris-dns/src/creds.json << EOF
          {
            "cloudflare": {
              "TYPE": "CLOUDFLAREAPI",
              "apitoken": "${{ secrets.CLOUDFLARE_API_TOKEN }}"
            },
            "none": { "TYPE": "NONE" }
          }
          EOF

      - name: Build
        run: pnpm --filter polaris-dns build

      - name: Preview DNS changes
        run: pnpm --filter polaris-dns preview
```

### Deploy Workflow

`.github/workflows/deploy.yml`:

```yaml
name: DNS Deploy

on:
  push:
    branches: [main]
    paths:
      - 'packages/polaris-dns/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install

      - name: Create credentials
        run: |
          cat > packages/polaris-dns/src/creds.json << EOF
          {
            "cloudflare": {
              "TYPE": "CLOUDFLAREAPI",
              "apitoken": "${{ secrets.CLOUDFLARE_API_TOKEN }}"
            },
            "none": { "TYPE": "NONE" }
          }
          EOF

      - name: Build
        run: pnpm --filter polaris-dns build

      - name: Deploy DNS changes
        run: pnpm --filter polaris-dns push
```

## Local Development

### Preview Changes

```bash
cd packages/polaris-dns
pnpm build
pnpm preview
```

### Apply Changes

```bash
pnpm push
```

## Best Practices

### 1. Always Preview First

Never push without previewing:

```bash
pnpm preview  # Review changes
pnpm push     # Apply if correct
```

### 2. Use Pull Requests

All DNS changes should go through PR review:

1. Create feature branch
2. Make changes
3. Open PR - preview runs automatically
4. Review changes in PR comments
5. Merge to main - deploy runs automatically

### 3. Environment Protection

Configure GitHub environment protection:

1. Go to Settings → Environments
2. Create "production" environment
3. Add required reviewers
4. Enable "Required reviewers" for deploy workflow

### 4. Rollback Strategy

If a deployment causes issues:

```bash
# Revert the commit
git revert HEAD
git push

# Or manually fix and push
# Edit zone files
pnpm build
pnpm push
```

## Monitoring

### Deployment Notifications

Add Slack/Discord notifications:

```yaml
- name: Notify on success
  if: success()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {"text": "DNS deployment successful ✅"}
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Change Logs

DNSControl outputs detailed change logs:

```
******************** Domain: example.com
1 correction
#1: MODIFY A www.example.com: (192.0.2.1 ttl=300) -> (192.0.2.2 ttl=300)
Done. 1 correction.
```

## Next Steps

- [Managing Zones](./zones) - Zone configuration
- [Contributing](../../contributing/) - Development workflow

