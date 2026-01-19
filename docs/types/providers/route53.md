# Route53 Provider

AWS Route53 DNS provider configuration and features.

## Overview

Amazon Route53 is a highly available and scalable DNS service with advanced routing features.

## Configuration

### Provider Setup

```typescript
import { NewDnsProvider } from "@vladzaharia/dnscontrol-types";

const route53 = NewDnsProvider("route53", "ROUTE53");
```

### creds.json

```json
{
  "route53": {
    "TYPE": "ROUTE53",
    "KeyId": "AKIAIOSFODNN7EXAMPLE",
    "SecretKey": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
  }
}
```

### Environment Variables

```bash
export AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
export AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
export AWS_REGION="us-east-1"
```

### IAM Profile

For EC2 instances, use IAM roles:

```json
{
  "route53": {
    "TYPE": "ROUTE53"
  }
}
```

## Features

### Alias Records

Route53 supports alias records to AWS resources:

```typescript
// Alias to CloudFront
ALIAS("@", "d111111abcdef8.cloudfront.net.", ROUTE53_ALIAS("Z2FDTNDATAQYW2"))

// Alias to ELB
ALIAS("api", "my-loadbalancer-1234567890.us-east-1.elb.amazonaws.com.", 
  ROUTE53_ALIAS("Z35SXDOTRQ7X7K"))

// Alias to S3 website
ALIAS("www", "s3-website-us-east-1.amazonaws.com.", 
  ROUTE53_ALIAS("Z3AQBSTGFYJSTF"))
```

### Health Checks

Route53 can perform health checks:

```typescript
A("@", "192.0.2.1", ROUTE53_HEALTH_CHECK_ID("abcd1234-5678-90ab-cdef-example"))
```

### Geolocation Routing

Route traffic based on user location:

```typescript
// US traffic
A("@", "192.0.2.1", ROUTE53_GEOLOCATION_COUNTRY("US"))

// European traffic
A("@", "192.0.2.2", ROUTE53_GEOLOCATION_CONTINENT("EU"))

// Default
A("@", "192.0.2.3", ROUTE53_GEOLOCATION_DEFAULT())
```

### Supported Record Types

| Type | Notes |
|------|-------|
| A | IPv4 address |
| AAAA | IPv6 address |
| CNAME | Aliases |
| MX | Mail exchange |
| TXT | Text records |
| CAA | CA authorization |
| SRV | Service discovery |
| NS | Nameservers |
| ALIAS | AWS-specific |

## IAM Permissions

Required IAM policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "route53:GetHostedZone",
        "route53:ListHostedZones",
        "route53:ListResourceRecordSets",
        "route53:ChangeResourceRecordSets"
      ],
      "Resource": "*"
    }
  ]
}
```

## Example

```typescript
// creds.json
{
  "route53": {
    "TYPE": "ROUTE53",
    "KeyId": "$AWS_ACCESS_KEY_ID",
    "SecretKey": "$AWS_SECRET_ACCESS_KEY"
  }
}

// dnsconfig.js
var R53 = NewDnsProvider("route53", "ROUTE53");
var REG_NONE = NewRegistrar("none");

D("example.com", REG_NONE, DnsProvider(R53),
  A("@", "192.0.2.1"),
  CNAME("www", "@"),
  MX("@", 10, "mail.example.com."),
  TXT("@", "v=spf1 -all"),
);
```

## Limitations

- 10,000 records per hosted zone
- Alias records only for AWS resources
- No proxy/CDN features (use CloudFront)

## See Also

- [Provider Support](./index) - All providers
- [Cloudflare](./cloudflare) - Cloudflare provider
- [AWS Route53 Docs](https://docs.aws.amazon.com/route53/)

