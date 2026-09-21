import { ogCard, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-card';
import { BRAND } from '@/data/products';

export const runtime = 'nodejs';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'BELLA CELLA — Beautiful From Every Cell';

export default function Image() {
  return ogCard({
    eyebrow: 'Cosmeceutical · Exosome thực vật',
    title: BRAND.tagline_en,
    subtitle: 'Chăm sóc da chuyên nghiệp, được chuyên gia Hàn Quốc và Nhật Bản tin dùng.',
  });
}
