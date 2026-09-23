/* Map ảnh tĩnh -> StaticImageData để next/image tự suy ra kích thước.
   Thay ảnh cùng tên trong public/img/ là dimension tự cập nhật lúc build,
   không cần sửa component. Ảnh lưới sản phẩm dùng `fill` nên không cần ở đây. */
import type { StaticImageData } from 'next/image';
import { GALLERY } from './gallery';

import hero from '../../public/img/hero.webp';
import serumTexture from '../../public/img/serum-texture.webp';
import credTreatment from '../../public/img/cred-treatment.webp';
import credFukuokaA from '../../public/img/cred-fukuoka-a.webp';
import credFukuokaB from '../../public/img/cred-fukuoka-b.webp';
import credSeminar from '../../public/img/cred-seminar.webp';
import credPress from '../../public/img/cred-press.webp';

export const IMG: Record<string, StaticImageData> = {
  hero,
  'serum-texture': serumTexture,
  'cred-treatment': credTreatment,
  'cred-fukuoka-a': credFukuokaA,
  'cred-fukuoka-b': credFukuokaB,
  'cred-seminar': credSeminar,
  'cred-press': credPress,
  // Ảnh chính của từng sản phẩm = ảnh đầu bộ ảnh (src/lib/gallery.ts, tự sinh).
  ...Object.fromEntries(Object.entries(GALLERY).map(([slug, items]) => [slug, items[0].src])),
};
