import type { Locale } from "@/lib/i18n/config";

interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  keywords: string[];
  links?: Record<string, string>;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  seo: {
    baseUrl: string;
    title: string;
    description: string;
    keywords: string[];
    image: string;
  };
}

const baseUrl = "https://sam-logistics.example.com";
const defaultDescription =
  "Enterprise-grade logistics and CRM platform for global shipping operations.";

export const siteConfig = {
  name: "SAM Logistics",
  description: defaultDescription,
  url: baseUrl,
  ogImage: "/social-card.png",
  keywords: ["logistics", "freight", "crm", "supply chain", "sam logistics"],
  links: {
    github: "https://github.com/amirimmd/SAM-CRM-System",
  },
  colors: {
    primary: "#d4af37",
    secondary: "#0b0b0b",
    accent: "#f5c451",
  },
  seo: {
    baseUrl,
    title: "SAM Logistics CRM Platform",
    description: defaultDescription,
    keywords: ["logistics", "freight", "crm", "supply chain", "sam logistics"],
    image: "/social-card.png",
  },
} satisfies SiteConfig;

export const defaultLanguageCode: Locale = "fa";
