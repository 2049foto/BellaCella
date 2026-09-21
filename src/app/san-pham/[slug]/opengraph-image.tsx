import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-card';
import { PRODUCTS, bySlug } from '@/data/products';
import { vnd } from '@/lib/format';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  return [{ id: 'og', alt: p ? `${p.name} — ${p.vi}` : 'BELLA CELLA', size: OG_SIZE, contentType: OG_CONTENT_TYPE }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return ogCard({ eyebrow: 'BELLA CELLA', title: 'Sản phẩm' });
  return ogCard({
    eyebrow: p.group,
    title: p.name,
    subtitle: p.vi,
    foot: `${vnd(p.price)} VND${p.priceUnit ? ' ' + p.priceUnit : ''} · ${p.size}`,
  });
}
