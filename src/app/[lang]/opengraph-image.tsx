import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-card';
import { BRAND } from '@/data/products';
import { ui } from '@/i18n/ui';
import { langOf, type LangParams } from '@/i18n/page';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'BELLA CELLA — Beautiful From Every Cell';

export default async function Image({ params }: LangParams) {
  const t = ui(await langOf(params)).og;
  return ogCard({ eyebrow: t.eyebrow, title: BRAND.tagline_en, subtitle: t.subtitle });
}
