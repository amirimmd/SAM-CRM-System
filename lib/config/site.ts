import type { Locale } from '../i18n/config';

type LocalizedField = Record<Locale, string>;

interface SiteSeoDefaults {
  title: LocalizedField;
  description: LocalizedField;
  keywords: LocalizedField;
  baseUrl: string;
  image: string;
}

interface SiteBranding {
  name: LocalizedField;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const siteConfig: { branding: SiteBranding; seo: SiteSeoDefaults } = {
  branding: {
    name: {
      fa: 'سام لجستیک',
      en: 'SAM Logistics',
    },
    colors: {
      primary: '#2563eb',
      secondary: '#0ea5e9',
      accent: '#f59e0b',
    },
  },
  seo: {
    title: {
      fa: 'پلتفرم لجستیک و CRM سام',
      en: 'SAM Logistics CRM Platform',
    },
    description: {
      fa: 'سام پلتفرم مدیریت حمل و لجستیک با پشتیبانی چندزبانه است.',
      en: 'SAM is a multilingual platform for logistics and CRM operations.',
    },
    keywords: {
      fa: 'لجستیک, مدیریت حمل, CRM, سام',
      en: 'logistics, freight, crm, sam logistics',
    },
    baseUrl: 'https://sam-logistics.example.com',
    image: '/social-card.png',
  },
};

export const defaultLanguageCode: Locale = 'fa';
