import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  nav: {
    home: "Home",
    services: "Services",
    calculator: "Cost Calculator",
    request: "Shipping Request",
    updates: "Updates",
    brands: "Brands",
    blog: "Insights",
    contact: "Contact",
    dashboard: "Dashboard",
    admin: "Admin",
  },
  common: {
    ctaPrimary: "Start a shipment",
    ctaSecondary: "Talk to logistics",
    learnMore: "Learn more",
    viewAll: "View all",
    getStarted: "Get started",
  },
  home: {
    title: "Global logistics, built for speed and clarity.",
    subtitle:
      "China to worldwide cargo, CRM visibility, and operations that scale with your supply chain.",
    highlights: [
      {
        title: "End-to-end tracking",
        description: "Timeline status, documents, and proactive notifications.",
      },
      {
        title: "CRM visibility",
        description: "Behavior insights, leads, and conversion-ready analytics.",
      },
      {
        title: "Enterprise-ready",
        description: "Secure, compliant, and prepared for future services.",
      },
    ],
    statLabel: "Shipments managed monthly",
  },
  services: {
    title: "Logistics services",
    subtitle: "Flexible lanes, transparent pricing, and dependable support.",
    cards: [
      {
        title: "Air freight",
        description: "Priority shipping with predictable handling windows.",
      },
      {
        title: "Sea freight",
        description: "Full container and consolidated cargo options.",
      },
      {
        title: "Customs & compliance",
        description: "Documentation checks and regulatory readiness.",
      },
    ],
  },
  calculator: {
    title: "Shipping cost calculator",
    subtitle: "Estimate lanes by weight, volume, and optional insurance.",
    fields: {
      weight: "Weight (kg)",
      volume: "Volume (cbm)",
      origin: "Origin",
      destination: "Destination",
      insurance: "Insurance",
    },
    estimateLabel: "Estimated range",
  },
  request: {
    title: "Request a shipment",
    subtitle: "Share your cargo details and receive a tailored quote.",
    fields: {
      name: "Full name",
      email: "Work email",
      company: "Company",
      cargo: "Cargo type",
      message: "Shipment details",
    },
    submit: "Submit request",
  },
  updates: {
    title: "Daily logistics updates",
    subtitle: "Port performance, capacity signals, and route highlights.",
    items: [
      {
        title: "Shenzhen to Rotterdam",
        description: "Average transit stabilized to 21-24 days.",
        date: "Today",
      },
      {
        title: "Air cargo capacity",
        description: "Priority lanes reopened for electronics shipments.",
        date: "Yesterday",
      },
      {
        title: "Customs guidance",
        description: "Updated requirements for textile exports.",
        date: "2 days ago",
      },
    ],
  },
  brands: {
    title: "Trusted by global brands",
    subtitle: "Partnerships across retail, manufacturing, and tech.",
    items: ["Hanzo Trade", "Mira Home", "NovaTech", "Atlas Supply", "Brightline"],
  },
  blog: {
    title: "Insights & news",
    subtitle: "SEO-ready content engineered for logistics decision makers.",
    posts: [
      {
        title: "How to reduce dwell time at origin ports",
        excerpt: "Tactics for documentation and pre-clearance readiness.",
        tag: "Operations",
      },
      {
        title: "Understanding volumetric pricing",
        excerpt: "Choose the best shipping mode with confidence.",
        tag: "Pricing",
      },
      {
        title: "Scaling China sourcing",
        excerpt: "What mid-market teams need to know in 2026.",
        tag: "Strategy",
      },
    ],
  },
  contact: {
    title: "Contact the team",
    subtitle: "Multi-channel support for urgent and planned shipments.",
    channels: [
      { label: "Email", value: "ops@samlogistics.com" },
      { label: "Phone", value: "+86 20 0000 0000" },
      { label: "WeChat", value: "SAM-Logistics" },
    ],
  },
  dashboard: {
    title: "Customer dashboard",
    subtitle: "Track shipments, manage documents, and message support.",
    cards: [
      {
        title: "Active shipments",
        value: "08",
        description: "In transit or processing",
      },
      {
        title: "Pending documents",
        value: "03",
        description: "Awaiting client uploads",
      },
      {
        title: "Support replies",
        value: "02",
        description: "Unread responses",
      },
    ],
  },
  admin: {
    title: "Admin control center",
    subtitle: "Monitor CRM activity, shipments, and content performance.",
    cards: [
      {
        title: "New leads",
        value: "24",
        description: "Last 7 days",
      },
      {
        title: "Revenue pipeline",
        value: "$420K",
        description: "Open opportunities",
      },
      {
        title: "Active conversations",
        value: "18",
        description: "Awaiting agent response",
      },
    ],
  },
};
