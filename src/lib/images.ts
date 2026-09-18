/* Map ảnh tĩnh -> StaticImageData để next/image tự suy ra kích thước.
   Thay ảnh cùng tên trong public/img/ là dimension tự cập nhật lúc build,
   không cần sửa component. Ảnh lưới sản phẩm dùng `fill` nên không cần ở đây. */
import type { StaticImageData } from 'next/image';

import hero1400 from '../../public/img/hero-1400.webp';
import serumTexture from '../../public/img/serum-texture.webp';
import credTreatment from '../../public/img/cred-treatment.webp';
import credFukuokaA from '../../public/img/cred-fukuoka-a.webp';
import credFukuokaB from '../../public/img/cred-fukuoka-b.webp';
import credSeminar from '../../public/img/cred-seminar.webp';
import credPress from '../../public/img/cred-press.webp';

import bubbleClearCleanser from '../../public/img/bubble-clear-cleanser.webp';
import tonerPad from '../../public/img/toner-pad.webp';
import exoBioAmpoule from '../../public/img/exo-bio-ampoule.webp';
import nmnSerumMask from '../../public/img/nmn-serum-mask.webp';
import sunCushion from '../../public/img/sun-cushion.webp';
import recoveryBbCushion from '../../public/img/recovery-bb-cushion.webp';
import exoBioAmpouleMist from '../../public/img/exo-bio-ampoule-mist.webp';
import recellaCream from '../../public/img/recella-cream.webp';

export const IMG: Record<string, StaticImageData> = {
  'hero-1400': hero1400,
  'serum-texture': serumTexture,
  'cred-treatment': credTreatment,
  'cred-fukuoka-a': credFukuokaA,
  'cred-fukuoka-b': credFukuokaB,
  'cred-seminar': credSeminar,
  'cred-press': credPress,
  'bubble-clear-cleanser': bubbleClearCleanser,
  'toner-pad': tonerPad,
  'exo-bio-ampoule': exoBioAmpoule,
  'nmn-serum-mask': nmnSerumMask,
  'sun-cushion': sunCushion,
  'recovery-bb-cushion': recoveryBbCushion,
  'exo-bio-ampoule-mist': exoBioAmpouleMist,
  'recella-cream': recellaCream,
};
