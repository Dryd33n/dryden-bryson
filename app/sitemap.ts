import type { MetadataRoute } from 'next';
import { PAGE_LAST_MODIFIED, SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(PAGE_LAST_MODIFIED).map(([path, lastModified]) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified,
  }));
}
