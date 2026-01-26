import { siteConfig } from '@/lib/config/site';

/**
 * Generates JSON-LD for Organization.
 * This is the core of AEO (Answer Engine Optimization).
 * It feeds structured data directly to AI models about who you are.
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    // Maps your social entities for Knowledge Graph
    sameAs: siteConfig.links ? Object.values(siteConfig.links) : [],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-0199', // Replace with real data later
      contactType: 'customer service',
      areaServed: 'Worldwide',
      availableLanguage: ['en', 'fa'],
    },
  };
}

/**
 * Generates JSON-LD for the Web Application.
 * Helps search engines distinguish your app from a regular blog.
 */
export function generateSoftwareAppSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: siteConfig.name,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    };
}
