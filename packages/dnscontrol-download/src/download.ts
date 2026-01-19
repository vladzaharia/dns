#!/usr/bin/env tsx
/**
 * DNSControl Binary Downloader
 *
 * This script automatically downloads the appropriate DNSControl binary
 * for the current platform from GitHub releases. It handles:
 *
 * - Platform detection (macOS, Linux, Windows, FreeBSD)
 * - Architecture detection (amd64, arm64)
 * - Version management (downloads latest or specified version)
 * - Caching (skips download if already present)
 *
 * @example
 * ```bash
 * # Download latest version
 * pnpm --filter dnscontrol-download download
 *
 * # Force re-download
 * pnpm --filter dnscontrol-download download --force
 * ```
 *
 * @module dnscontrol-download
 * @packageDocumentation
 */

import { execSync } from "child_process";
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  rmSync,
  chmodSync,
  writeFileSync,
  readFileSync,
  renameSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";
import { extract } from "tar";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** GitHub repository for DNSControl */
const GITHUB_REPO = "StackExchange/dnscontrol";

/** Base URL for GitHub releases */
const GITHUB_RELEASES_URL = `https://github.com/${GITHUB_REPO}/releases`;

/**
 * GitHub release response structure.
 * @internal
 */
interface GitHubRelease {
  /** Release tag name (e.g., "v4.30.0") */
  tag_name: string;
}

/**
 * Information about a platform-specific artifact.
 * @internal
 */
interface ArtifactInfo {
  /** Filename of the release artifact */
  filename: string;
  /** Name to use for the downloaded binary */
  binaryName: string;
  /** Full download URL */
  url: string;
  /** Archive format */
  archiveType: "tar.gz" | "zip";
}

/**
 * Supported platforms for DNSControl binaries.
 * Maps to Node.js `process.platform` values.
 */
type Platform = "darwin" | "linux" | "win32" | "freebsd";

/**
 * Fetches the latest DNSControl version from GitHub releases.
 *
 * @returns The latest version string (without 'v' prefix)
 * @throws Error if the GitHub API request fails
 *
 * @example
 * ```typescript
 * const version = await getLatestVersion();
 * console.log(version); // "4.30.0"
 * ```
 */
async function getLatestVersion(): Promise<string> {
  const response = await fetch(`${GITHUB_RELEASES_URL}/latest`, {
    headers: { Accept: "application/json" },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch latest version: ${response.statusText}`);
  }

  const data = (await response.json()) as GitHubRelease;
  return data.tag_name.replace(/^v/, "");
}

/**
 * Get platform-specific artifact info
 *
 * DNSControl releases (v4.30.0):
 * - darwin: dnscontrol_VERSION_darwin_all.tar.gz (universal binary)
 * - linux: dnscontrol_VERSION_linux_amd64.tar.gz, dnscontrol_VERSION_linux_arm64.tar.gz
 * - windows: dnscontrol_VERSION_windows_amd64.zip, dnscontrol_VERSION_windows_arm64.zip
 * - freebsd: dnscontrol_VERSION_freebsd_amd64.tar.gz, dnscontrol_VERSION_freebsd_arm64.tar.gz
 */
function getArtifactInfo(version: string): ArtifactInfo {
  const platform = process.platform as Platform;
  const arch = process.arch === "arm64" ? "arm64" : "amd64";

  const artifacts: Record<
    Platform,
    { filename: string; binaryName: string; archiveType: "tar.gz" | "zip" }
  > = {
    darwin: {
      filename: `dnscontrol_${version}_darwin_all.tar.gz`,
      binaryName: "dnscontrol-Darwin",
      archiveType: "tar.gz",
    },
    linux: {
      filename: `dnscontrol_${version}_linux_${arch}.tar.gz`,
      binaryName: "dnscontrol-Linux",
      archiveType: "tar.gz",
    },
    win32: {
      filename: `dnscontrol_${version}_windows_${arch}.zip`,
      binaryName: "dnscontrol-Windows.exe",
      archiveType: "zip",
    },
    freebsd: {
      filename: `dnscontrol_${version}_freebsd_${arch}.tar.gz`,
      binaryName: "dnscontrol-FreeBSD",
      archiveType: "tar.gz",
    },
  };

  const artifact = artifacts[platform];
  if (!artifact) {
    throw new Error(`Unsupported platform: ${platform}. Supported: darwin, linux, win32, freebsd`);
  }

  return {
    ...artifact,
    url: `${GITHUB_RELEASES_URL}/download/v${version}/${artifact.filename}`,
  };
}

/**
 * Extract a zip file (for Windows)
 */
function extractZip(archivePath: string, outputDir: string): void {
  // Use unzip command on Unix-like systems, or PowerShell on Windows
  if (process.platform === "win32") {
    execSync(
      `powershell -command "Expand-Archive -Path '${archivePath}' -DestinationPath '${outputDir}' -Force"`,
      { stdio: "inherit" }
    );
  } else {
    execSync(`unzip -o "${archivePath}" -d "${outputDir}"`, { stdio: "inherit" });
  }
}

/**
 * Download and extract the DNSControl binary
 */
async function downloadBinary(version: string, outputDir: string, force = false): Promise<string> {
  const artifact = getArtifactInfo(version);
  const binaryPath = join(outputDir, artifact.binaryName);
  const versionFile = join(outputDir, "dnscontrol-VERSION");

  // Check if already downloaded (unless force)
  if (!force && existsSync(binaryPath)) {
    const existingVersion = existsSync(versionFile)
      ? readFileSync(versionFile, "utf-8").trim()
      : null;

    if (existingVersion === version) {
      console.log(`DNSControl v${version} already downloaded at ${binaryPath}`);
      return binaryPath;
    }
  }

  const arch = process.arch === "arm64" ? "arm64" : "amd64";
  console.log(`Downloading DNSControl v${version} for ${process.platform}/${arch}...`);

  // Create temp directory
  const tempDir = join(outputDir, ".dl");
  mkdirSync(tempDir, { recursive: true });

  try {
    const response = await fetch(artifact.url);
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`);
    }

    const archivePath = join(tempDir, artifact.filename);

    // Download archive
    if (!response.body) {
      throw new Error("Response body is null");
    }
    const fileStream = createWriteStream(archivePath);
    await pipeline(response.body, fileStream);

    // Extract based on archive type
    console.log("Extracting...");
    if (artifact.archiveType === "zip") {
      extractZip(archivePath, tempDir);
    } else {
      await extract({ file: archivePath, cwd: tempDir });
    }

    // Determine extracted binary name (dnscontrol or dnscontrol.exe)
    const extractedBinaryName = process.platform === "win32" ? "dnscontrol.exe" : "dnscontrol";
    const extractedBinary = join(tempDir, extractedBinaryName);

    // Move binary to output directory
    renameSync(extractedBinary, binaryPath);

    // Make executable (not needed on Windows)
    if (process.platform !== "win32") {
      chmodSync(binaryPath, 0o755);
    }

    // Write version file
    writeFileSync(versionFile, version);

    console.log(`DNSControl v${version} installed at ${binaryPath}`);
    return binaryPath;
  } finally {
    // Cleanup temp directory
    rmSync(tempDir, { recursive: true, force: true });
  }
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const force = args.includes("--force") || args.includes("-f");

  // Output to package's bin directory by default, or custom path
  const outputDir = process.env.DNSCONTROL_BIN_DIR ?? join(__dirname, "..", "bin");
  mkdirSync(outputDir, { recursive: true });

  try {
    const version = await getLatestVersion();
    await downloadBinary(version, outputDir, force);
  } catch (error) {
    console.error("Error:", (error as Error).message);
    process.exit(1);
  }
}

void main();
