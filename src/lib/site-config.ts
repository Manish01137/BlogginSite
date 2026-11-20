/**
 * Single source of truth for brand details.
 * Update values here — never hard-code brand info inside components.
 */

export const siteConfig = {
  companyName: "Monarch Visa Advisors",
  blogName: "Monarch Insights",
  tagline: "Clear, trusted guidance for studying and working abroad.",
  description:
    "Monarch Insights is the visa and study-abroad journal of Monarch Visa Advisors — practical guides on student visas, work permits, scholarships and immigration updates for Canada, the UK, USA, Australia, Germany and Dubai.",

  /** Public URL of this blog (used for canonical URLs, Open Graph and JSON-LD). */
  blogUrl: "https://blog.monarchvisa.com",
  mainSiteUrl: "https://monarchvisa.com",
  consultationUrl: "https://monarchvisa.com/contact",

  email: "info@monarchvisa.com",
  // TODO: replace placeholders with real contact details
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  whatsappNumber: "910000000000", // international format, digits only
  whatsappMessage: "Hi Monarch Visa Advisors, I'd like help with my visa / study abroad plans.",
  address: {
    line1: "Office address line",
    city: "City, State",
    country: "India",
  },

  /** TODO: replace with the final logo file (keep the same path or update it here). */
  logo: "/logo.svg",
  ogImageAlt: "Monarch Insights — visa and study abroad guides",

  // TODO: replace with real profile URLs
  social: [
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/" },
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/" },
    { label: "X (Twitter)", icon: "x", href: "https://x.com/" },
  ],

  nav: [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/#articles" },
    { label: "Countries", href: "/#countries" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/#contact" },
  ],

  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],

  disclaimer:
    "Information is for general guidance only. Visa rules change frequently — consult our advisors for your case.",
} as const;

export type SocialIconName = (typeof siteConfig.social)[number]["icon"];

export const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
  siteConfig.whatsappMessage,
)}`;

export const postHref = (slug: string) => `/blog/${slug}`;
