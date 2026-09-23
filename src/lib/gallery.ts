/* TỰ SINH bởi scripts/build-store-images.mjs — không sửa tay, sửa script rồi chạy lại.
   Bộ ảnh từng sản phẩm; ảnh đầu tiên là ảnh chính (trùng IMG[slug] trong images.ts). */
import type { StaticImageData } from 'next/image';

import g0 from '../../public/img/bubble-clear-cleanser.webp';
import g1 from '../../public/img/bubble-clear-cleanser-2.webp';
import g2 from '../../public/img/bubble-clear-cleanser-3.webp';
import g3 from '../../public/img/bubble-clear-cleanser-4.webp';
import g4 from '../../public/img/bubble-clear-cleanser-5.webp';
import g5 from '../../public/img/bubble-clear-cleanser-6.webp';
import g6 from '../../public/img/toner-pad.webp';
import g7 from '../../public/img/toner-pad-2.webp';
import g8 from '../../public/img/toner-pad-3.webp';
import g9 from '../../public/img/toner-pad-4.webp';
import g10 from '../../public/img/toner-pad-5.webp';
import g11 from '../../public/img/toner-pad-6.webp';
import g12 from '../../public/img/exo-bio-ampoule.webp';
import g13 from '../../public/img/exo-bio-ampoule-2.webp';
import g14 from '../../public/img/exo-bio-ampoule-3.webp';
import g15 from '../../public/img/exo-bio-ampoule-4.webp';
import g16 from '../../public/img/exo-bio-ampoule-5.webp';
import g17 from '../../public/img/exo-bio-ampoule-6.webp';
import g18 from '../../public/img/exo-bio-ampoule-7.webp';
import g19 from '../../public/img/exo-bio-ampoule-8.webp';
import g20 from '../../public/img/nmn-serum-mask.webp';
import g21 from '../../public/img/nmn-serum-mask-2.webp';
import g22 from '../../public/img/nmn-serum-mask-3.webp';
import g23 from '../../public/img/nmn-serum-mask-4.webp';
import g24 from '../../public/img/nmn-serum-mask-5.webp';
import g25 from '../../public/img/nmn-serum-mask-6.webp';
import g26 from '../../public/img/nmn-serum-mask-7.webp';
import g27 from '../../public/img/nmn-serum-mask-8.webp';
import g28 from '../../public/img/sun-cushion.webp';
import g29 from '../../public/img/sun-cushion-2.webp';
import g30 from '../../public/img/sun-cushion-3.webp';
import g31 from '../../public/img/sun-cushion-4.webp';
import g32 from '../../public/img/sun-cushion-5.webp';
import g33 from '../../public/img/sun-cushion-6.webp';
import g34 from '../../public/img/recovery-bb-cushion.webp';
import g35 from '../../public/img/recovery-bb-cushion-2.webp';
import g36 from '../../public/img/recovery-bb-cushion-3.webp';
import g37 from '../../public/img/recovery-bb-cushion-4.webp';
import g38 from '../../public/img/exo-bio-ampoule-mist.webp';
import g39 from '../../public/img/exo-bio-ampoule-mist-2.webp';
import g40 from '../../public/img/exo-bio-ampoule-mist-3.webp';
import g41 from '../../public/img/exo-bio-ampoule-mist-4.webp';
import g42 from '../../public/img/exo-bio-ampoule-mist-5.webp';
import g43 from '../../public/img/recella-cream.webp';
import g44 from '../../public/img/recella-cream-2.webp';

export type GalleryKind = 'pack' | 'box' | 'detail' | 'texture' | 'model' | 'use' | 'scene';
export type GalleryItem = { src: StaticImageData; kind: GalleryKind; file: string };

export const GALLERY: Record<string, GalleryItem[]> = {
  'bubble-clear-cleanser': [
    { src: g0, kind: 'pack', file: '/img/bubble-clear-cleanser.webp' },
    { src: g1, kind: 'scene', file: '/img/bubble-clear-cleanser-2.webp' },
    { src: g2, kind: 'use', file: '/img/bubble-clear-cleanser-3.webp' },
    { src: g3, kind: 'detail', file: '/img/bubble-clear-cleanser-4.webp' },
    { src: g4, kind: 'texture', file: '/img/bubble-clear-cleanser-5.webp' },
    { src: g5, kind: 'model', file: '/img/bubble-clear-cleanser-6.webp' },
  ],
  'toner-pad': [
    { src: g6, kind: 'pack', file: '/img/toner-pad.webp' },
    { src: g7, kind: 'model', file: '/img/toner-pad-2.webp' },
    { src: g8, kind: 'detail', file: '/img/toner-pad-3.webp' },
    { src: g9, kind: 'use', file: '/img/toner-pad-4.webp' },
    { src: g10, kind: 'texture', file: '/img/toner-pad-5.webp' },
    { src: g11, kind: 'texture', file: '/img/toner-pad-6.webp' },
  ],
  'exo-bio-ampoule': [
    { src: g12, kind: 'pack', file: '/img/exo-bio-ampoule.webp' },
    { src: g13, kind: 'detail', file: '/img/exo-bio-ampoule-2.webp' },
    { src: g14, kind: 'model', file: '/img/exo-bio-ampoule-3.webp' },
    { src: g15, kind: 'box', file: '/img/exo-bio-ampoule-4.webp' },
    { src: g16, kind: 'detail', file: '/img/exo-bio-ampoule-5.webp' },
    { src: g17, kind: 'detail', file: '/img/exo-bio-ampoule-6.webp' },
    { src: g18, kind: 'model', file: '/img/exo-bio-ampoule-7.webp' },
    { src: g19, kind: 'detail', file: '/img/exo-bio-ampoule-8.webp' },
  ],
  'nmn-serum-mask': [
    { src: g20, kind: 'pack', file: '/img/nmn-serum-mask.webp' },
    { src: g21, kind: 'detail', file: '/img/nmn-serum-mask-2.webp' },
    { src: g22, kind: 'model', file: '/img/nmn-serum-mask-3.webp' },
    { src: g23, kind: 'box', file: '/img/nmn-serum-mask-4.webp' },
    { src: g24, kind: 'texture', file: '/img/nmn-serum-mask-5.webp' },
    { src: g25, kind: 'use', file: '/img/nmn-serum-mask-6.webp' },
    { src: g26, kind: 'box', file: '/img/nmn-serum-mask-7.webp' },
    { src: g27, kind: 'detail', file: '/img/nmn-serum-mask-8.webp' },
  ],
  'sun-cushion': [
    { src: g28, kind: 'pack', file: '/img/sun-cushion.webp' },
    { src: g29, kind: 'detail', file: '/img/sun-cushion-2.webp' },
    { src: g30, kind: 'model', file: '/img/sun-cushion-3.webp' },
    { src: g31, kind: 'use', file: '/img/sun-cushion-4.webp' },
    { src: g32, kind: 'texture', file: '/img/sun-cushion-5.webp' },
    { src: g33, kind: 'model', file: '/img/sun-cushion-6.webp' },
  ],
  'recovery-bb-cushion': [
    { src: g34, kind: 'pack', file: '/img/recovery-bb-cushion.webp' },
    { src: g35, kind: 'detail', file: '/img/recovery-bb-cushion-2.webp' },
    { src: g36, kind: 'model', file: '/img/recovery-bb-cushion-3.webp' },
    { src: g37, kind: 'detail', file: '/img/recovery-bb-cushion-4.webp' },
  ],
  'exo-bio-ampoule-mist': [
    { src: g38, kind: 'pack', file: '/img/exo-bio-ampoule-mist.webp' },
    { src: g39, kind: 'use', file: '/img/exo-bio-ampoule-mist-2.webp' },
    { src: g40, kind: 'detail', file: '/img/exo-bio-ampoule-mist-3.webp' },
    { src: g41, kind: 'scene', file: '/img/exo-bio-ampoule-mist-4.webp' },
    { src: g42, kind: 'detail', file: '/img/exo-bio-ampoule-mist-5.webp' },
  ],
  'recella-cream': [
    { src: g43, kind: 'pack', file: '/img/recella-cream.webp' },
    { src: g44, kind: 'texture', file: '/img/recella-cream-2.webp' },
  ],
};
