/**
 * DNSControl Standard DNS Providers
 * Providers that support standard DNS records without provider-specific functions
 *
 * @packageDocumentation
 */

/// <reference path="../base.d.ts" />

/**
 * Standard DNS provider names supported by DNSControl.
 * These providers support standard DNS record types (A, AAAA, CNAME, MX, TXT, etc.)
 * but do not have provider-specific functions or modifiers.
 */
type StandardDNSProvider =
  | "ACMEDNS"           // ACME DNS for DNS-01 challenges
  | "ALIDNS"            // Alibaba Cloud DNS
  | "AUTODNS"           // AutoDNS
  | "AXFRDDNS"          // AXFR+DDNS
  | "BIND"              // BIND DNS Server
  | "BUNNYDNS"          // Bunny DNS
  | "CNR"               // CentralNic Reseller (formerly RRPProxy)
  | "CSCGLOBAL"         // CSC Global
  | "DIGITALOCEAN"      // DigitalOcean DNS
  | "DIRECTADMIN"       // DirectAdmin
  | "DNSMADEEASY"       // DNS Made Easy
  | "DNSOVERHTTPS"      // DNS-over-HTTPS
  | "DOMAINNAMESHOP"    // DomainNameShop
  | "DYN"               // Dyn (Oracle)
  | "DYNADOT"           // Dynadot
  | "EASYNAME"          // easyname
  | "EXOSCALE"          // Exoscale
  | "FORTIGATE"         // Fortigate
  | "GCLOUD"            // Google Cloud DNS
  | "GCORE"             // Gcore
  | "HETZNER"           // Hetzner DNS Console (legacy)
  | "HETZNERV2"         // Hetzner DNS API
  | "HEXONET"           // HEXONET
  | "HOSTINGDE"         // hosting.de
  | "HUAWEICLOUD"       // Huawei Cloud DNS
  | "INTERNETBS"        // Internet.bs
  | "INWX"              // INWX
  | "JOKER"             // Joker
  | "LINODE"            // Linode
  | "LOOPIA"            // Loopia
  | "LUADNS"            // LuaDNS
  | "MSDNS"             // Microsoft DNS Server
  | "MYTHICBEASTS"      // Mythic Beasts
  | "NAMEDOTCOM"        // Name.com
  | "NAMECHEAP"         // Namecheap
  | "NETCUP"            // Netcup
  | "NETLIFY"           // Netlify DNS
  | "OCTODNS"           // OctoDNS
  | "OPENSRS"           // OpenSRS
  | "ORACLE"            // Oracle Cloud Infrastructure DNS
  | "OVH"               // OVH
  | "PACKETFRAME"       // Packetframe
  | "PORKBUN"           // Porkbun
  | "REALTIMEREGISTER"  // Realtime Register
  | "RWTH"              // RWTH DNS-Admin
  | "SAKURACLOUD"       // Sakura Cloud
  | "SOFTLAYER"         // SoftLayer DNS (IBM Cloud)
  | "TRANSIP"           // TransIP
  | "VERCEL"            // Vercel DNS
  | "VULTR";            // Vultr

/**
 * All supported DNS provider names, including both standard and special-function providers.
 */
type DNSProviderName =
  | StandardDNSProvider
  | "ADGUARDHOME"       // AdGuard Home (has special functions)
  | "AKAMAIEDGEDNS"     // Akamai Edge DNS (has special functions)
  | "AZUREDNS"          // Azure DNS (has AZURE_ALIAS)
  | "AZUREPRIVATEDNS"   // Azure Private DNS
  | "CLOUDFLAREAPI"     // Cloudflare (has CF_* functions)
  | "CLOUDNS"           // ClouDNS (has CLOUDNS_WR)
  | "DESEC"             // deSEC (has DESEC_URL)
  | "DNSIMPLE"          // DNSimple (has DNSIMPLE_URL)
  | "GANDIV5"           // Gandi v5 (has GANDI_V5_ALIAS)
  | "HEDNS"             // Hurricane Electric DNS (has HEDNS_NULL_MX)
  | "NS1"               // NS1 (has NS1_URLFWD)
  | "POWERDNS"          // PowerDNS (has LUA)
  | "ROUTE53";          // Amazon Route 53 (has R53_* functions)

