import { defineConfig } from "vitepress";

/**
 * VitePress Configuration for @vladzaharia/dnscontrol-types Documentation
 *
 * This site documents the dnscontrol-types NPM package.
 *
 * @see https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  title: "dnscontrol-types",
  description: "TypeScript types and Zod validation schemas for DNSControl",

  // Base URL for GitHub Pages deployment at /dns/types/
  base: "/dns/types/",

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
    ["meta", { property: "og:site_name", content: "dnscontrol-types" }],
  ],

  // Theme configuration
  themeConfig: {
    // Site title
    siteTitle: "dnscontrol-types",

    // Navigation bar
    nav: [
      { text: "Home", link: "/" },
      { text: "Installation", link: "/installation" },
      { text: "Quick Start", link: "/quick-start" },
      { text: "Types", link: "/types/" },
      { text: "Schemas", link: "/schemas/" },
      { text: "Validators", link: "/validators/" },
    ],

    // Sidebar configuration
    sidebar: {
      "/": [
        {
          text: "Getting Started",
          collapsed: false,
          items: [
            { text: "Introduction", link: "/" },
            { text: "Installation", link: "/installation" },
            { text: "Quick Start", link: "/quick-start" },
          ],
        },
        {
          text: "Types Reference",
          collapsed: false,
          items: [
            { text: "Overview", link: "/types/" },
            { text: "DNS Records", link: "/types/records" },
            { text: "Domains", link: "/types/domains" },
            { text: "Providers", link: "/types/providers" },
            { text: "DSL Functions", link: "/types/dsl" },
          ],
        },
        {
          text: "Schemas Reference",
          collapsed: false,
          items: [
            { text: "Overview", link: "/schemas/" },
            { text: "Base Schemas", link: "/schemas/base" },
            { text: "Record Schemas", link: "/schemas/records" },
            { text: "Domain Schemas", link: "/schemas/domain" },
            { text: "Builder Schemas", link: "/schemas/builders" },
          ],
        },
        {
          text: "Validators",
          collapsed: false,
          items: [
            { text: "Overview", link: "/validators/" },
            { text: "Record Validators", link: "/validators/records" },
            { text: "Error Handling", link: "/validators/errors" },
          ],
        },
        {
          text: "Providers",
          collapsed: true,
          items: [
            { text: "Overview", link: "/providers/" },
            { text: "Cloudflare", link: "/providers/cloudflare" },
            { text: "AWS Route53", link: "/providers/route53" },
            { text: "Provider Matrix", link: "/providers/matrix" },
          ],
        },
        {
          text: "API Reference",
          collapsed: true,
          items: [
            { text: "Overview", link: "/api/" },
            {
              text: "Generated Reference",
              collapsed: true,
              items: [
                { text: "Index", link: "/api/generated/" },
                { text: "Functions", link: "/api/generated/functions/validateARecord" },
                { text: "Schemas", link: "/api/generated/variables/ARecordSchema" },
                { text: "Types", link: "/api/generated/type-aliases/ARecord" },
                { text: "Interfaces", link: "/api/generated/interfaces/ValidationResult" },
              ],
            },
          ],
        },
      ],
    },

    // Social links
    socialLinks: [
      { icon: "github", link: "https://github.com/vladzaharia/dns" },
      { icon: "npm", link: "https://www.npmjs.com/package/@vladzaharia/dnscontrol-types" },
    ],

    // Search configuration
    search: {
      provider: "local",
      options: {
        detailedView: true,
      },
    },

    // Edit link
    editLink: {
      pattern: "https://github.com/vladzaharia/dns/edit/main/docs/types/:path",
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
