import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { SITE_URL } from '@/lib/site';

/* Sitemap sẵn cho ngày mở bán. Liệt kê 9 route tĩnh + 8 PDP.
   (/lien-he là route động theo query nên không đưa vào.) */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['', '/san-pham', '/lieu-trinh', '/huong-dan', '/kien-thuc', '/faq', '/chuyen-gia'];
  const pages = staticPaths.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : 0.7,
  }));
  const products = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/san-pham/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  return [...pages, ...products];
}
