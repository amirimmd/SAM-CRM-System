export type Dictionary = {
  nav: {
    home: string;
    services: string;
    calculator: string;
    request: string;
    updates: string;
    brands: string;
    blog: string;
    contact: string;
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
  };
  updates: {
    title: string;
    subtitle: string;
    items: { title: string; description: string; date: string }[];
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
};
