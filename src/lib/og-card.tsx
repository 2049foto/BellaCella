import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { BRAND } from '@/data/products';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

// Đọc font một lần cho mỗi lần render OG (chạy phía server lúc build/SSG).
const fontDir = join(process.cwd(), 'src/fonts/og');
const archivo800 = readFileSync(join(fontDir, 'archivo-800.ttf'));
const bvp400 = readFileSync(join(fontDir, 'bvp-400.ttf'));

// Bảng màu OG bám token thương hiệu: giấy trắng, mực đen, xám lệch lạnh, không màu nhấn.
const PAPER = '#FFFFFF';
const INK = '#101112';
const INK3 = '#6B6F73';
const RULE = '#E3E6E8';

type CardProps = { eyebrow: string; title: string; subtitle?: string; foot?: string };

export function ogCard({ eyebrow, title, subtitle, foot }: CardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: PAPER,
          color: INK,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'BVP',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 2, background: INK, width: 96, marginBottom: 40 }} />
          <div style={{ fontSize: 26, letterSpacing: 8, fontWeight: 800, fontFamily: 'Archivo' }}>
            BELLA CELLA
          </div>
          <div style={{ fontSize: 15, letterSpacing: 8, color: INK3, marginTop: 8 }}>
            {BRAND.descriptor}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 24, letterSpacing: 5, color: INK3, textTransform: 'uppercase', marginBottom: 18 }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 800, fontFamily: 'Archivo', maxWidth: 1000 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ fontSize: 30, color: INK3, marginTop: 22, maxWidth: 940 }}>{subtitle}</div>
          ) : null}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${RULE}`, paddingTop: 24, fontSize: 22, color: INK3 }}>
          <span>{foot ?? BRAND.site}</span>
          <span>{BRAND.phone}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Archivo', data: archivo800, weight: 800, style: 'normal' },
        { name: 'BVP', data: bvp400, weight: 400, style: 'normal' },
      ],
    },
  );
}
