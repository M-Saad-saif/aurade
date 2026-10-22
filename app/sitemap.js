import {collections } from '@/lib/catalog';
import { articles, supportPages } from '@/lib/content';
export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return [
    '',
    '/shop',
    '/collections',
    '/about',
    '/journal',
    '/trade',
    '/contact',
    '/gallery',
    ...collections.map((c) => `/collections/${c.slug}`),
    ...articles.map((a) => `/journal/${a.slug}`),
    ...Object.keys(supportPages).map((slug) => `/support/${slug}`),
  ].map((path) => ({ url: `${base}${path}` }));
}
