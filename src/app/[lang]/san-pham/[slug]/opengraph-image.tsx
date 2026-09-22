import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-card';
import { PRODUCTS } from '@/data/products';
import { content } from '@/i18n/content';
import { isLang, type Lang } from '@/i18n/routes';
import { money } from '@/i18n/ui';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

type Params = { params: Promise<{ lang: string; slug: string }> };
const read = async (params: Params['params']) => {
  const { lang, slug } = await params;
  const l: Lang = isLang(lang) ? lang : 'vi';
  return { lang: l, p: content(l).bySlug(slug) };
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateImageMetadata({ params }: Params) {
  const { p } = await read(params);
  return [{ id: 'og', alt: p ? `${p.name} — ${p.vi}` : 'BELLA CELLA', size: OG_SIZE, contentType: OG_CONTENT_TYPE }];
}

export default async function Image({ params }: Params) {
  const { lang, p } = await read(params);
  if (!p) return ogCard({ eyebrow: 'BELLA CELLA', title: 'BELLA CELLA' });
  return ogCard({
    eyebrow: p.group,
    title: p.name,
    subtitle: p.vi,
    foot: `${money(lang, p.price)} VND${p.priceUnit ? ' ' + p.priceUnit : ''} · ${p.size}`,
  });
}
