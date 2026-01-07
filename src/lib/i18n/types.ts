export type Dictionary = {
  nav: {
    home: string;
    services: string;
    calculator: string;
    pricing: string;
    tracking: string;
    about: string;
    request: string;
    updates: string;
    brands: string;
    blog: string;
    contact: string;
    landing: string;
    login: string;
    dashboard: string;
    admin: string;
  };
  common: {
    ctaPrimary: string;
    ctaSecondary: string;
    learnMore: string;
    viewAll: string;
    getStarted: string;
  };
  home: {
    title: string;
    subtitle: string;
    highlights: { title: string; description: string }[];
    statLabel: string;
  };
  services: {
    title: string;
    subtitle: string;
    cards: { title: string; description: string }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    tiers: { name: string; price: string; features: string[]; cta: string }[];
  };
  calculator: {
    title: string;
    subtitle: string;
    fields: {
      weight: string;
      volume: string;
      origin: string;
      destination: string;
      insurance: string;
    };
    estimateLabel: string;
  };
  request: {
    title: string;
    subtitle: string;
    fields: {
      name: string;
      email: string;
      company: string;
      cargo: string;
      message: string;
    };
    submit: string;
    successMessage: string;
    errorMessage: string;
  };
  updates: {
    title: string;
    subtitle: string;
    items: { title: string; description: string; date: string }[];
  };
  tracking: {
    title: string;
    subtitle: string;
    shipments: { id: string; route: string; status: string; eta: string; progress: number }[];
  };
  brands: {
    title: string;
    subtitle: string;
    items: string[];
  };
  blog: {
    title: string;
    subtitle: string;
    posts: { title: string; excerpt: string; tag: string }[];
  };
  contact: {
    title: string;
    subtitle: string;
    channels: { label: string; value: string }[];
  };
  about: {
    title: string;
    subtitle: string;
    pillars: { title: string; description: string }[];
  };
  landing: {
    title: string;
    subtitle: string;
    bullets: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    cards: { title: string; value: string; description: string }[];
  };
  admin: {
    title: string;
    subtitle: string;
    cards: { title: string; value: string; description: string }[];
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    loginAsideTitle: string;
    loginAsideBody: string;
    registerTitle: string;
    registerSubtitle: string;
    registerAsideTitle: string;
    registerAsideBody: string;
    emailLabel: string;
    passwordLabel: string;
    submitLogin: string;
    submitRegister: string;
    statusMissingConfig: string;
    statusCheckEmail: string;
    statusLoginSuccess: string;
  };
};
