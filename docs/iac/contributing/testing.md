# Testing Guide

How to write and run tests for the project.

## Test Framework

We use **Vitest** for testing with the following features:

- Fast execution with native ESM support
- TypeScript support out of the box
- Jest-compatible API
- Built-in coverage reporting

## Running Tests

```bash
# Run all tests
pnpm test

# Run in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage

# Run specific test types
pnpm test:unit
pnpm test:integration
pnpm test:validation
```

## Test Types

### Unit Tests

Test individual functions in isolation.

```typescript
// record.test.ts
import { describe, it, expect } from "vitest";
import { createARecord } from "./record.js";

describe("createARecord", () => {
  it("creates an A record with name and IP", () => {
    const record = createARecord("@", "192.0.2.1");

    expect(record).toBeDefined();
    expect(record.type).toBe("A");
    expect(record.name).toBe("@");
  });

  it("applies TTL option", () => {
    const record = createARecord("@", "192.0.2.1", { ttl: 300 });

    expect(record.ttl).toBe(300);
  });
});
```

### Validation Tests

Test Zod schemas and validators.

```typescript
// schemas.test.ts
import { describe, it, expect } from "vitest";
import { ipv4Schema } from "./schemas/base.js";

describe("ipv4Schema", () => {
  it("accepts valid IPv4 addresses", () => {
    expect(ipv4Schema.safeParse("192.0.2.1").success).toBe(true);
    expect(ipv4Schema.safeParse("10.0.0.1").success).toBe(true);
  });

  it("rejects invalid IPv4 addresses", () => {
    expect(ipv4Schema.safeParse("256.0.0.1").success).toBe(false);
    expect(ipv4Schema.safeParse("192.0.2").success).toBe(false);
    expect(ipv4Schema.safeParse("not-an-ip").success).toBe(false);
  });
});
```

### Integration Tests

Test multiple components together.

```typescript
// domain.integration.test.ts
import { describe, it, expect } from "vitest";
import { createDomain } from "./domain.js";
import { createARecord, createCNAMERecord } from "./record.js";

describe("Domain creation", () => {
  it("creates domain with multiple records", () => {
    const domain = createDomain(
      { name: "example.com", category: "personal" },
      createARecord("@", "192.0.2.1"),
      createCNAMERecord("www", "@")
    );

    expect(domain.records).toHaveLength(2);
  });
});
```

### Snapshot Tests

Test output stability.

```typescript
// output.snapshot.test.ts
import { describe, it, expect } from "vitest";
import { generateConfig } from "./config.js";

describe("Config generation", () => {
  it("generates expected output", () => {
    const config = generateConfig(testDomain);

    expect(config).toMatchSnapshot();
  });
});
```

## Test Organization

```
src/
├── lib/
│   ├── record.ts
│   ├── record.test.ts        # Co-located unit tests
│   └── __tests__/
│       └── record.int.test.ts # Integration tests
├── schemas/
│   ├── base.ts
│   └── base.test.ts
└── __snapshots__/            # Snapshot files
```

## Mocking

```typescript
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock a module
vi.mock("./server.js", () => ({
  getServerIP: vi.fn(() => "192.0.2.1"),
}));

describe("with mocked server", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uses mocked IP", () => {
    // Test implementation
  });
});
```

## Coverage Requirements

Aim for these coverage thresholds:

| Metric     | Threshold |
| ---------- | --------- |
| Statements | 80%       |
| Branches   | 75%       |
| Functions  | 80%       |
| Lines      | 80%       |

## Writing Good Tests

### Do

- ✅ Test one thing per test
- ✅ Use descriptive test names
- ✅ Test edge cases
- ✅ Test error conditions
- ✅ Keep tests independent

### Don't

- ❌ Test implementation details
- ❌ Share state between tests
- ❌ Write flaky tests
- ❌ Test third-party code

## See Also

- [Development Setup](./development) - Environment setup
- [Code Style](./code-style) - Coding standards
- [Pull Requests](./pull-requests) - PR process
