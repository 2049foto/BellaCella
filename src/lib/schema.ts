import { BRAND, type Product, type Faq } from '@/data/products';
import { SITE_URL, SITE_NAME } from '@/lib/site';
import { href, type Lang } from '@/i18n/routes';
import { GALLERY } from '@/lib/gallery';

const abs = (path: string) => SITE_URL + (path === '/' ? '' : path);

/* JSON-LD dựng từ dữ liệu nội bộ.
   Product KHÔNG khai offers/availability vì chưa bán online — khai sai là rủi ro. */

export function organizationSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    alternateName: SITE_NAME,
    url: abs(href(lang, 'home')),
    slogan: BRAND.tagline_en,
    telephone: BRAND.phone,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BRAND.phone,
      contactType: 'customer service',
      areaServed: 'VN',
      availableLanguage: ['vi', 'en'],
    },
  };
}

export function productSchema(p: Product, lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    sku: p.sku,
    category: p.group,
    description: p.vi,
    brand: { '@type': 'Brand', name: BRAND.name },
    image: GALLERY[p.slug].map((g) => `${SITE_URL}${g.file}`),
    url: abs(href(lang, 'products', p.slug)),
    inLanguage: lang,
    // Cố ý bỏ "offers": chưa bán online, không khai giá/tồn kho dạng thương mại.
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function faqSchema(faqs: Faq[], lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
