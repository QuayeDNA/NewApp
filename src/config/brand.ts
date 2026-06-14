// =============================================================
// Central Brand Configuration
// Change brand identity here — propagates to every page that
// imports from this module.
// =============================================================

export const brand = {
  name: "BRAND_NAME",
  shortName: "BRAND",
  tagline: "Telecom Platform",
  description:
    "Modern telecom solutions for agents and dealers. Manage your telecom business with our comprehensive platform.",

  url: "https://example.com",
  supportEmail: "support@example.com",

  socials: {
    twitter: "@brand",
    twitterUrl: "https://twitter.com/brand",
    linkedinUrl: "https://linkedin.com/company/brand",
  },

  author: "Your Name",
  locale: "en_US",
  ogImage: "/og-image.png",

  /** Page title suffix used in <title> tags */
  titleSuffix: "— Telecom Platform",
} as const;
