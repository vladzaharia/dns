# Development Workflow and Best Practices

## Typical Development Workflow

### 1. Adding a New Service
```bash
# 1. Edit the appropriate service file
vim src/services/infrastructure.ts  # or homelab.ts, media-services.ts, etc.

# 2. Add the record to the exported array
{ name: "myservice", description: "My Service", proxy: true }

# 3. Lint and format
npm run lint

# 4. Build and preview
npm run preview

# 5. Review the diff carefully
# Look for:
# - Correct subdomain
# - Correct target
# - Correct record type
# - No unintended changes to other records

# 6. Apply changes (only if preview looks correct)
npm run push
```

### 2. Adding a New Domain
```bash
# 1. Create zone file
vim src/zones/example-com.ts

# 2. Follow the standard zone file pattern
# - Import providers and services
# - Define BASE_DOMAIN
# - Call D() with configuration
# - Add IGNORE_NAME for external records
# - Add service records
# - Add mail records
# - Add verification TXT records

# 3. Build and preview
npm run preview

# 4. Verify the new domain appears in output
# 5. Apply changes
npm run push
```

### 3. Modifying Server Definitions
```bash
# 1. Edit server map
vim src/services/core.ts

# 2. Update ServerNames type
vim src/utils/server.ts

# 3. Update ServerPrefixes type
vim src/utils/server.ts

# 4. Build and preview
npm run preview

# 5. Check all affected records
# 6. Apply changes
npm run push
```

## Best Practices

### DNS Record Management

1. **Always preview before push**
   - `npm run preview` shows exactly what will change
   - Review every line of the diff
   - Look for unintended changes

2. **Use descriptive names**
   - Record descriptions help identify services
   - Group names in CreateRecords() provide context in logs

3. **Leverage record groups**
   - Don't duplicate records across zones
   - Create reusable service groups in `src/services/`
   - Import and spread with `...CreateRecords()`

4. **Use IGNORE_NAME for external management**
   - DDNS-managed home IPs
   - Cloudflare UI-managed redirects
   - External service records (BetterUptime, etc.)
   - DKIM records managed by email providers

5. **Prefer azgw flag over manual CNAME**
   ```typescript
   // Good
   { name: "service", description: "Service", azgw: true }
   
   // Less maintainable
   { name: "service", description: "Service", target: "tun.polaris.gdn.", type: "CNAME" }
   ```

6. **Use server map for consistency**
   ```typescript
   // Good
   { name: "service", description: "Service", target: GetHost("Greenwood") }
   
   // Less maintainable
   { name: "service", description: "Service", target: "gw.sea.polaris.gdn." }
   ```

### Code Organization

1. **Group related services**
   - Infrastructure services together
   - Media services together
   - Productivity services together
   - Keep groups focused and cohesive

2. **Use consistent naming**
   - Kebab-case for files
   - PascalCase for exported constants
   - camelCase for functions
   - Descriptive variable names

3. **Document special cases**
   - Add comments for unusual configurations
   - Explain why records are ignored
   - Note external dependencies

### Version Control

1. **Commit logical changes**
   - One service addition per commit
   - One domain addition per commit
   - Group related changes

2. **Write descriptive commit messages**
   ```
   Add Blinko notes service to vlad.gg
   
   - Added sticky subdomain pointing to Azure Gateway
   - Service runs behind Traefik on internal network
   ```

3. **Don't commit credentials**
   - `src/creds.json` is gitignored
   - Never commit API tokens
   - Document credential requirements in comments

### Testing and Validation

1. **Test in preview first**
   - Always run `npm run preview`
   - Verify changes match expectations
   - Check for typos in subdomains

2. **Verify DNS propagation**
   - Use `dig` or `nslookup` to verify changes
   - Check from multiple locations
   - Remember TTL is set to 1 (fast propagation)

3. **Monitor for issues**
   - Check service availability after DNS changes
   - Verify SSL certificates renew correctly
   - Monitor logs for DNS-related errors

### Maintenance

1. **Keep DNSControl updated**
   - Delete `lib/dnscontrol-*` binaries
   - Run `npm install` to download latest
   - Test with `npm run preview`

2. **Update dependencies regularly**
   - Run `npm audit` to check for vulnerabilities
   - Update TypeScript and webpack as needed
   - Test thoroughly after updates

3. **Review and clean up**
   - Remove unused records
   - Consolidate duplicate configurations
   - Update documentation

## Common Pitfalls

### 1. Forgetting the trailing dot
```typescript
// Wrong - will be treated as relative
target: "example.com"

// Correct - absolute FQDN
target: "example.com."
```

### 2. Not ignoring externally managed records
```typescript
// This will cause DNSControl to try to manage DDNS records
// and fail or create conflicts

// Correct
IGNORE_NAME(GetPrefix("Greenwood"))
```

### 3. Mixing proxy and non-proxy records
```typescript
// Be intentional about proxy settings
// Proxied records hide origin IP
// Non-proxied records expose origin IP

// For public services behind Cloudflare
{ name: "public", proxy: true }

// For services that need direct access
{ name: "direct", proxy: false }
```

### 4. Not testing after changes
```bash
# Always verify DNS changes
dig myservice.example.com

# Check SSL if proxied
curl -I https://myservice.example.com
```

### 5. Pushing without preview
```bash
# NEVER do this
npm run push

# ALWAYS do this
npm run preview  # Review carefully
npm run push     # Only if preview looks correct
```

## Troubleshooting

### Build fails with TypeScript errors
```bash
# Check for syntax errors
npm run lint:eslint

# Check TypeScript compilation
npx tsc --noEmit
```

### Preview shows unexpected changes
```bash
# Check for:
# 1. Typos in record names
# 2. Missing IGNORE_NAME directives
# 3. Incorrect server references
# 4. Duplicate records
```

### Push fails with authentication error
```bash
# Verify credentials file exists
ls -la src/creds.json

# Check credentials are valid
# Update Cloudflare API token if needed
```

### DNS changes not propagating
```bash
# Check TTL (should be 1)
dig myservice.example.com

# Clear local DNS cache
# macOS: sudo dscacheutil -flushcache
# Linux: sudo systemd-resolve --flush-caches

# Check Cloudflare dashboard for issues
```

## Emergency Procedures

### Rollback DNS changes
```bash
# 1. Revert code changes
git revert HEAD

# 2. Build and push
npm run build
npm run push

# 3. Verify rollback
npm run preview
```

### Disable a domain temporarily
```bash
# 1. Comment out the entire D() call in zone file
# 2. Build and preview
npm run preview

# 3. This will show all records being deleted
# 4. Only push if you're sure
npm run push
```

### Fix broken DNS immediately
```bash
# 1. Fix in Cloudflare UI first (immediate)
# 2. Update code to match
# 3. Add IGNORE_NAME if needed
# 4. Preview and push to sync
```
