import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/* Giữ chặn toàn bộ tới khi mở bán công khai (đồng bộ với robots noindex ở layout).
   Khi mở: đổi disallow thành '' và bỏ index:false trong layout. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
