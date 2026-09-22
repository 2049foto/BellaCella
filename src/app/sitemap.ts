import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { SITE_URL } from '@/lib/site';
import { LANGS, href, type RouteKey } from '@/i18n/routes';

/* Sitemap sẵn cho ngày mở bán: mọi trang tĩnh + 8 PDP, cả tiếng Việt và tiếng Anh,
   mỗi URL kèm bản ngôn ngữ còn lại (hreflang). Trang liên hệ động theo query nên không đưa vào. */
const KEYS: RouteKey[] = ['home', 'products', 'routine', 'usage', 'knowledge', 'faq', 'pro'];
const abs = (p: string) => SITE_URL + (p === '/' ? '' : p);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: { key: RouteKey; slug?: string; priority: number }[] = [
    ...KEYS.map((key) => ({ key, priority: key === 'home' ? 1 : 0.7 })),
    ...PRODUCTS.map((p) => ({ key: 'products' as RouteKey, slug: p.slug, priority: 0.6 })),
  ];
  return entries.flatMap(({ key, slug, priority }) =>
    LANGS.map((lang) => ({
      url: abs(href(lang, key, slug)),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: { languages: { vi: abs(href('vi', key, slug)), en: abs(href('en', key, slug)) } },
    })),
  );
}
