/**
 * SEO utilities for meta tags, Open Graph, and structured data
 */

import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
}

const SITE_NAME = "AA's Computer Remote Services";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aascomputer.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonicalUrl,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    twitterCard = 'summary_large_image',
    noindex = false,
  } = config;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = canonicalUrl || SITE_URL;

  return {
    title: fullTitle,
    description,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: ogType,
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@aascomputer',
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
  };
}

/**
 * Generate structured data (JSON-LD) for a video game
 */
export function generateGameStructuredData(game: {
  title: string;
  description: string;
  genre: string;
  publisher?: string;
  releaseDate: string;
  thumbnail: string;
  platform: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.description,
    genre: game.genre,
    publisher: game.publisher ? {
      '@type': 'Organization',
      name: game.publisher,
    } : undefined,
    datePublished: game.releaseDate,
    image: game.thumbnail,
    operatingSystem: game.platform,
    applicationCategory: 'Game',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * Generate structured data (JSON-LD) for software application
 */
export function generateSoftwareStructuredData(software: {
  name: string;
  description: string;
  category: string;
  platforms: string[];
  releaseYear?: number;
  requirements?: {
    windows?: string | null;
    mac?: string | null;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: software.name,
    description: software.description,
    applicationCategory: software.category,
    operatingSystem: software.platforms.join(', '),
    datePublished: software.releaseYear ? `${software.releaseYear}-01-01` : undefined,
    softwareRequirements: software.requirements?.windows || software.requirements?.mac || undefined,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * Generate structured data for organization
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Professional remote computer support, software installation, and troubleshooting services',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://facebook.com/aascomputer',
      'https://twitter.com/aascomputer',
    ],
  };
}

/**
 * Generate structured data for website
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Professional remote computer support, software installation, and troubleshooting services',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Create a slug from a title
 */
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text for meta descriptions
 */
export function truncateDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trim() + '...';
}
