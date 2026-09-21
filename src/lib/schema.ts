import { BRAND, type Product, type Faq } from '@/data/products';
import { SITE_URL, SITE_NAME } from '@/lib/site';

/* JSON-LD dựng từ dữ liệu nội bộ.
   Product KHÔNG khai offers/availability vì chưa bán online — khai sai là rủi ro. */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    alternateName: SITE_NAME,
    url: SITE_URL,
    slogan: BRAND.tagline_en,
    telephone: BRAND.phone,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BRAND.phone,
      contactType: 'customer service',
      areaServed: 'VN',
      availableLanguage: ['vi'],
    },
  };
}

export function productSchema(p: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    sku: p.sku,
    category: p.group,
    description: p.vi,
    brand: { '@type': 'Brand', name: BRAND.name },
    image: `${SITE_URL}/img/${p.slug}.webp`,
    url: `${SITE_URL}/san-pham/${p.slug}`,
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

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
