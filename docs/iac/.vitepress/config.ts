import { defineConfig } from "vitepress";

/**
 * VitePress Configuration for Polaris DNS Documentation
 *
 * This site documents Polaris DNS - the internal DNS Infrastructure-as-Code platform.
 *
 * @see https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  title: "Polaris DNS",
  description: "DNS Infrastructure-as-Code for managing DNS records declaratively",

  // Base URL for GitHub Pages deployment at /dns/iac/
  base: "/dns/iac/",

  // Clean URLs without .html extension
  cleanUrls: true,

  // Ignore dead links during build
  ignoreDeadLinks: true,

  // Last updated timestamp
  lastUpdated: true,

  // Markdown configuration
  markdown: {
    lineNumbers: true,
    theme: {
      light: "github-light",
      dark: "github-dark",
    },
  },

  // Head tags
  head: [
    ["meta", { name: "theme-color", content: "#3178c6" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: "Polaris DNS" }],
  ],

  // Theme configuration
  themeConfig: {
    // Site title
    siteTitle: "Polaris DNS",

    // Navigation bar
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started/" },
      { text: "Concepts", link: "/concepts/" },
      { text: "Guides", link: "/guides/" },
      { text: "API Reference", link: "/api/" },
      { text: "Contributing", link: "/contributing/" },
    ],

    // Sidebar configuration
    sidebar: {
      "/": [
        {
          text: "Getting Started",
          collapsed: false,
          items: [
            { text: "Introduction", link: "/getting-started/" },
            { text: "Installation", link: "/getting-started/installation" },
            { text: "Quick Start", link: "/getting-started/quick-start" },
            { text: "Project Structure", link: "/getting-started/structure" },
          ],
        },
        {
          text: "Concepts",
          collapsed: false,
          items: [
            { text: "Overview", link: "/concepts/" },
            { text: "DNS Fundamentals", link: "/concepts/dns-basics" },
            { text: "DNSControl", link: "/concepts/dnscontrol" },
            { text: "Architecture", link: "/concepts/architecture" },
          ],
        },
        {
          text: "Guides",
          collapsed: false,
          items: [
            { text: "Overview", link: "/guides/" },
            { text: "Managing Zones", link: "/guides/zones" },
            { text: "Creating Records", link: "/guides/records" },
            { text: "Service Definitions", link: "/guides/services" },
            { text: "Email Configuration", link: "/guides/mail" },
            { text: "Working with Providers", link: "/guides/providers" },
            { text: "CI/CD Workflows", link: "/guides/ci-cd" },
          ],
        },
        {
          text: "API Reference",
          collapsed: true,
          items: [
            { text: "Overview", link: "/api/" },
            { text: "Domain Builders", link: "/api/domains" },
            { text: "Record Builders", link: "/api/records" },
            { text: "Server Registry", link: "/api/servers" },
            { text: "Service Types", link: "/api/services" },
            { text: "Mail Providers", link: "/api/mail" },
            {
              text: "Generated Reference",
              collapsed: true,
              items: [
                { text: "Index", link: "/api/generated/" },
                { text: "Domain Module", link: "/api/generated/lib/domain/" },
                { text: "Record Module", link: "/api/generated/lib/record/" },
                { text: "Server Module", link: "/api/generated/lib/server/" },
                { text: "Types Module", link: "/api/generated/lib/types/" },
                { text: "Service Types", link: "/api/generated/services/types/" },
                { text: "Fastmail", link: "/api/generated/mail/fastmail/" },
                { text: "Cloudflare Email", link: "/api/generated/mail/cloudflare/" },
              ],
            },
          ],
        },
        {
          text: "Contributing",
          collapsed: true,
          items: [
            { text: "Overview", link: "/contributing/" },
            { text: "Development Setup", link: "/contributing/development" },
            { text: "Code Style", link: "/contributing/code-style" },
            { text: "Testing", link: "/contributing/testing" },
            { text: "Pull Requests", link: "/contributing/pull-requests" },
          ],
        },
      ],
    },

    // Social links
    socialLinks: [{ icon: "github", link: "https://github.com/vladzaharia/dns" }],

    // Search configuration
    search: {
      provider: "local",
      options: {
        detailedView: true,
      },
    },

    // Edit link
    editLink: {
      pattern: "https://github.com/vladzaharia/dns/edit/main/docs/iac/:path",
      text: "Edit this page on GitHub",
    },

    // Footer
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present Vlad Zaharia",
    },

    // Outline configuration
    outline: {
      level: [2, 3],
      label: "On this page",
    },
  },
});
