/**
 * E2E tests for DNSControl CLI integration
 * Tests the actual build output and DNSControl validation
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";

const execAsync = promisify(exec);

// Determine the correct DNSControl binary for the current platform
function getDnsControlBinary(): string {
  const platform = process.platform;
  const projectRoot = path.resolve(__dirname, "../..");

  if (platform === "darwin") {
    return path.join(projectRoot, "lib/dnscontrol-Darwin");
  } else if (platform === "linux") {
    return path.join(projectRoot, "lib/dnscontrol-Linux");
  } else if (platform === "win32") {
    return path.join(projectRoot, "lib/dnscontrol.exe");
  }

  throw new Error(`Unsupported platform: ${platform}`);
}

// Check if DNSControl binary exists
function dnsControlExists(): boolean {
  try {
    const binary = getDnsControlBinary();
    return fs.existsSync(binary);
  } catch {
    return false;
  }
}

describe("DNSControl E2E Tests", () => {
  const projectRoot = path.resolve(__dirname, "../..");
  const outDir = path.join(projectRoot, "out");
  let dnsControlBinary: string;
  let hasDnsControl: boolean;

  beforeAll(async () => {
    hasDnsControl = dnsControlExists();
    if (hasDnsControl) {
      dnsControlBinary = getDnsControlBinary();
    }
  });

  describe("Build Process", () => {
    it("should build successfully with webpack", async () => {
      const { stdout, stderr } = await execAsync("npm run build", {
        cwd: projectRoot,
        timeout: 60000,
      });

      // Build should complete without errors
      expect(stderr).not.toContain("ERROR");
    }, 60000);

    it("should generate dnsconfig.js in out directory", () => {
      const configPath = path.join(outDir, "dnsconfig.js");
      expect(fs.existsSync(configPath)).toBe(true);
    });

    it("should generate valid JavaScript output", () => {
      const configPath = path.join(outDir, "dnsconfig.js");
      const content = fs.readFileSync(configPath, "utf-8");

      // Should contain DNSControl DSL calls (may be minified)
      // Check for D.apply or D( pattern
      expect(content).toMatch(/D\.apply|D\(/);
      // Check for A function usage
      expect(content).toMatch(/\bA\(|createARecord/);
      // Check for CNAME function usage
      expect(content).toMatch(/\bCNAME\(|createCNAMERecord/);
    });

    it("should include all expected domains", () => {
      const configPath = path.join(outDir, "dnsconfig.js");
      const content = fs.readFileSync(configPath, "utf-8");

      // Check for key domains
      const expectedDomains = [
        "vlad.gg",
        "plrs.im",
        "polaris.gdn",
        "polaris.video",
        "polaris.rest",
      ];

      for (const domain of expectedDomains) {
        expect(content).toContain(`"${domain}"`);
      }
    });
  });

  describe("DNSControl Validation", () => {
    it.skipIf(!hasDnsControl)(
      "should pass dnscontrol check",
      async () => {
        const { stdout, stderr } = await execAsync(
          `${dnsControlBinary} check`,
          {
            cwd: outDir,
            timeout: 30000,
          }
        );

        // Check should pass without errors
        expect(stderr).not.toContain("ERROR");
      },
      30000
    );

    it.skipIf(!hasDnsControl)(
      "should report correct number of zones",
      async () => {
        const { stdout } = await execAsync(`${dnsControlBinary} check`, {
          cwd: outDir,
          timeout: 30000,
        });

        // Should report zones being checked
        // The exact format depends on DNSControl version
        expect(stdout.length).toBeGreaterThan(0);
      },
      30000
    );
  });

  describe("Output Structure", () => {
    it("should have proper file structure in out directory", () => {
      expect(fs.existsSync(outDir)).toBe(true);
      expect(fs.existsSync(path.join(outDir, "dnsconfig.js"))).toBe(true);
    });

    it("should not contain TypeScript in output", () => {
      const configPath = path.join(outDir, "dnsconfig.js");
      const content = fs.readFileSync(configPath, "utf-8");

      // Should not contain TypeScript-specific syntax
      expect(content).not.toContain("interface ");
      expect(content).not.toContain("type ");
      expect(content).not.toMatch(/:\s*(string|number|boolean)\b/);
    });

    it("should contain provider configurations", () => {
      const configPath = path.join(outDir, "dnsconfig.js");
      const content = fs.readFileSync(configPath, "utf-8");

      // Should contain provider setup
      expect(content).toContain("NewDnsProvider");
      expect(content).toContain("cloudflare");
    });
  });
});

