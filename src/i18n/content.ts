/* Nội dung theo ngôn ngữ. 'vi' trả nguyên products.ts (bản gốc);
   'en' ghép bản dịch products.en.ts vào đúng cấu trúc, giữ id/sku/giá/ảnh từ bản gốc. */
import {
  PRODUCTS, STEPS, NEEDS, USAGE, KNOWLEDGE, FAQ, CREDENTIALS,
  type Product, type Step, type Need, type Usage, type Knowledge, type Faq,
} from '@/data/products';
import {
  PRODUCTS_EN, STEP_LABELS_EN, NEEDS_EN, USAGE_EN, KNOWLEDGE_EN, FAQ_EN, CREDENTIALS_EN,
} from '@/data/products.en';
import type { Lang } from '@/i18n/routes';

type Credentials = { heading: string; body: string; photos: { img: string; cap: string }[] };
export type Content = {
  products: Product[]; steps: Step[]; needs: Need[]; usage: Record<string, Usage>;
  knowledge: Knowledge[]; faq: Faq[]; credentials: Credentials;
  bySlug: (slug: string) => Product | undefined;
};

function build(lang: Lang): Content {
  if (lang === 'vi') {
    return { products: PRODUCTS, steps: STEPS, needs: NEEDS, usage: USAGE, knowledge: KNOWLEDGE, faq: FAQ,
      credentials: CREDENTIALS, bySlug: (s) => PRODUCTS.find((p) => p.slug === s) };
  }
  const products: Product[] = PRODUCTS.map((p) => {
    const e = PRODUCTS_EN[p.slug];
    if (!e) throw new Error(`Thiếu bản dịch EN cho sản phẩm ${p.slug}`);
    return { ...p, vi: e.desc, group: e.group, size: e.size, priceUnit: e.priceUnit,
      actives: e.actives, activeList: e.activeList, body: e.body, needsReview: e.needsReview };
  });
  const bySlug = (s: string) => products.find((p) => p.slug === s);
  const needs: Need[] = NEEDS.map((n) => {
    const e = NEEDS_EN[n.key];
    return { key: n.key, label: e.label, picks: n.picks.map(({ slug }) => ({ slug, quote: e.quotes[slug] })) };
  });
  const usage: Record<string, Usage> = Object.fromEntries(
    Object.entries(USAGE).map(([slug, u]) => [slug, { ...u, ...USAGE_EN[slug] }]),
  );
  return {
    products, bySlug, needs, usage,
    steps: STEPS.map((s) => ({ ...s, label: STEP_LABELS_EN[s.slug] })),
    knowledge: KNOWLEDGE.map((k) => ({ ...k, ...KNOWLEDGE_EN[k.key] })),
    faq: FAQ_EN,
    credentials: { heading: CREDENTIALS_EN.heading, body: CREDENTIALS_EN.body,
      photos: CREDENTIALS.photos.map((ph) => ({ ...ph, cap: CREDENTIALS_EN.caps[ph.img] })) },
  };
}

const CACHE: Partial<Record<Lang, Content>> = {};
export const content = (lang: Lang): Content => (CACHE[lang] ??= build(lang));

/** Chạy lúc build: câu trích "tìm theo nhu cầu" phải nằm nguyên văn trong mô tả sản phẩm, cả 2 ngôn ngữ. */
export function assertNeedQuotes() {
  for (const lang of ['vi', 'en'] as const) {
    const c = content(lang);
    for (const n of c.needs) for (const { slug, quote } of n.picks) {
      const p = c.bySlug(slug);
      if (!p) throw new Error(`NEEDS/${n.key} (${lang}): không có sản phẩm "${slug}"`);
      if (!quote || !p.body.join(' ').includes(quote)) throw new Error(`NEEDS/${n.key} (${lang}): câu trích không khớp mô tả ${slug}: "${quote}"`);
    }
  }
}
