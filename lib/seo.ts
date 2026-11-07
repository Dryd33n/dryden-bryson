import type { Metadata } from 'next';

export const SITE_URL = 'https://dryd3n.ca';
export const SITE_NAME = 'Dryden Bryson';

export const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Dryden Bryson, Student & Developer',
};

// Feeds the sitemap and JSON-LD. Search engines only trust these dates if they're accurate,
// so change a page's date when its content meaningfully changes, and not otherwise.
export const PAGE_LAST_MODIFIED = {
  '/': '2026-11-07',
  '/portfolio': '2026-11-07',
  '/about': '2026-11-07',
  '/contact': '2026-11-07',
  '/privacy': '2026-11-07',
} as const;

export function pageMetadata({ title, description, path }: {
  title: string;
  description: string;
  path: keyof typeof PAGE_LAST_MODIFIED;
}): Metadata {
  // Next replaces a parent's openGraph and twitter objects rather than merging them, so each page sets them in full.
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
