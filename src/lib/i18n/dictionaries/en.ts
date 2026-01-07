import type { Dictionary } from "../types";

export const dictionary: Dictionary = {
  nav: {
    home: "Home",
    services: "Services",
    calculator: "Cost Calculator",
    pricing: "Pricing",
    tracking: "Tracking",
    about: "About",
    request: "Shipping Request",
    updates: "Updates",
    brands: "Brands",
    blog: "Insights",
    contact: "Contact",
    landing: "Landing",
    login: "Login",
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
  pricing: {
    title: "Pricing built for clarity",
    subtitle: "Predictable tiers with conversion-ready quotes and SLA-backed response times.",
    tiers: [
      {
        name: "Growth",
        price: "From $1,200 / lane",
        features: [
          "Priority air & sea lanes",
          "Shipment tracking timeline",
          "Lead capture & CRM basics",
          "Email support 12/5",
        ],
        cta: "Start quote",
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: [
          "Dedicated operations desk",
          "Customs & compliance reviews",
          "BI exports & analytics workspace",
          "24/7 multilingual support",
        ],
        cta: "Talk to sales",
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
    successMessage: "Request received. We'll respond within 12 hours.",
    errorMessage: "Unable to submit right now. Please try again.",
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
  tracking: {
    title: "Shipment tracking",
    subtitle: "Timeline-based transparency across every move.",
    shipments: [
      { id: "SAM-2043", route: "Shenzhen → Dubai", status: "In transit", eta: "Aug 19", progress: 72 },
      { id: "SAM-1982", route: "Ningbo → Hamburg", status: "Customs review", eta: "Aug 22", progress: 58 },
      { id: "SAM-1901", route: "Guangzhou → Lagos", status: "Booked", eta: "Aug 27", progress: 32 },
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
  about: {
    title: "Built in Guangzhou. Operating globally.",
    subtitle: "A logistics command platform engineered for speed, compliance, and service.",
    pillars: [
      { title: "Operational excellence", description: "SLA-backed desks, proactive tracking, and resilient handoffs." },
      { title: "Data rigor", description: "CRM telemetry, geo insights, and exportable analytics." },
      { title: "Security first", description: "RLS policies, hardened storage, and audit-friendly processes." },
    ],
  },
  landing: {
    title: "China-to-world freight with CRM-grade visibility.",
    subtitle: "Air, sea, and multimodal logistics with behavior analytics, messaging, and content built-in.",
    bullets: [
      "2h SLA on enterprise tickets",
      "Customs guidance included",
      "Real-time milestones",
      "Secure document flows",
    ],
    ctaPrimary: "Launch a shipment",
    ctaSecondary: "View analytics",
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
  auth: {
    loginTitle: "Welcome back",
    loginSubtitle: "Secure access to shipment tracking and support channels.",
    loginAsideTitle: "New to SAM Logistics?",
    loginAsideBody:
      "Create an account to unlock shipment tracking, CRM updates, and a dedicated support channel.",
    registerTitle: "Create your account",
    registerSubtitle: "Start managing shipments with a unified CRM workspace.",
    registerAsideTitle: "Already have an account?",
    registerAsideBody:
      "Sign in to review active shipments, documents, and support messages.",
    emailLabel: "Email address",
    passwordLabel: "Password",
    submitLogin: "Sign in",
    submitRegister: "Create account",
    statusMissingConfig: "Supabase credentials are missing.",
    statusCheckEmail: "Check your email to confirm the new account.",
    statusLoginSuccess: "Signed in. Redirecting to your dashboard.",
  },
};
