/* Dựng toàn bộ ảnh trong public/img/ từ lớp ảnh gốc của catalogue.
   Chạy sau scripts/extract-pdf-layers.py:   node scripts/build-images.mjs

   Ba luật rút ra từ lần ảnh bị vỡ chữ trên nhãn chai:
   1. KHÔNG làm nét (sharpen/unsharp) sau khi phóng. Làm nét trên ảnh đã phóng biến
      nhiễu nén JPEG thành răng cưa — chính là chữ "vỡ" trên nhãn.
   2. Ảnh sản phẩm gốc chỉ rộng 454px. Phóng tối đa ~2,2 lần bằng lanczos, hiển thị
      trên trang ở 460px (xem .pdp trong globals.css) để màn retina vẫn nét 1:1.
   3. Đưa 8 ảnh sản phẩm về cùng tỉ lệ 4:5 bằng cách NỚI NỀN (nhân bản mép),
      không cắt vào sản phẩm, không vẽ thêm chi tiết.
   Ảnh chụp thật (hero, chứng thực, kết cấu) chỉ cắt hoặc thu nhỏ, không phóng. */
import sharp from 'sharp';
import { existsSync, statSync } from 'node:fs';

const SRC = '.src-img';
for (const f of ['layer-17', 'layer-95', 'layer-126', 'layer-177']) {
  if (!existsSync(`${SRC}/${f}.jpeg`)) {
    console.error(`Thiếu ${SRC}/${f}.jpeg — chạy python scripts/extract-pdf-layers.py "<đường dẫn catalogue.pdf>" trước.`);
    process.exit(1);
  }
}
const OUT = 'public/img';
const report = async (name) => {
  const m = await sharp(`${OUT}/${name}.webp`).metadata();
  console.log(`${name.padEnd(24)} ${m.width}x${m.height}  ${(statSync(`${OUT}/${name}.webp`).size / 1024).toFixed(0)} KB`);
};

/* ---- 8 ảnh sản phẩm: lưới 2 cột x 4 hàng ở trang 2, toạ độ pixel gốc ---- */
const COLS = [[713, 1167], [1875, 2329]];
const ROWS = [[475, 1014], [1146, 1711], [1845, 2515], [2644, 3226]];
const GRID = [
  ['bubble-clear-cleanser', 'toner-pad'],
  ['exo-bio-ampoule', 'nmn-serum-mask'],
  ['sun-cushion', 'recovery-bb-cushion'],
  ['exo-bio-ampoule-mist', 'recella-cream'],
];
const RATIO = 0.8, W = 1000, H = Math.round(W / RATIO);

for (let r = 0; r < ROWS.length; r++) for (let c = 0; c < COLS.length; c++) {
  const slug = GRID[r][c];
  const [x0, x1] = COLS[c], [y0, y1] = ROWS[r];
  // lùi 2px khỏi mép ô để không dính đường viền của trang catalogue
  const tile = await sharp(`${SRC}/layer-17.jpeg`)
    .extract({ left: x0 + 2, top: y0 + 2, width: x1 - x0 - 4, height: y1 - y0 - 4 }).png().toBuffer();
  const { width: tw, height: th } = await sharp(tile).metadata();
  let padX = 0, padY = 0;
  if (tw / th > RATIO) padY = Math.round((tw / RATIO - th) / 2);
  else padX = Math.round((th * RATIO - tw) / 2);
  // sharp luôn chạy extend SAU resize trong cùng một chuỗi -> phải nới nền ở lượt riêng,
  // nếu không ảnh bị ép méo về 4:5.
  const padded = await sharp(tile)
    .extend({ top: padY, bottom: padY, left: padX, right: padX, extendWith: 'copy' }).png().toBuffer();
  await sharp(padded).resize(W, H, { kernel: 'lanczos3', fit: 'fill' })
    .webp({ quality: 90, effort: 6 }).toFile(`${OUT}/${slug}.webp`);
  await report(slug);
}

/* ---- hero: người mẫu ở nửa dưới trang 1, cắt rồi THU NHỎ ---- */
await sharp(`${SRC}/layer-177.jpeg`).extract({ left: 0, top: 1041, width: 2480, height: 2466 })
  .resize(2000, null, { kernel: 'lanczos3' }).webp({ quality: 86, effort: 6 }).toFile(`${OUT}/hero.webp`);
await report('hero');

/* ---- kết cấu tinh chất: cột phải trang 4, giữ nguyên pixel gốc ---- */
await sharp(`${SRC}/layer-126.jpeg`).extract({ left: 1472, top: 1400, width: 1008, height: 1700 })
  .webp({ quality: 88, effort: 6 }).toFile(`${OUT}/serum-texture.webp`);
await report('serum-texture');

/* ---- 5 ảnh chứng thực ở trang 3, giữ nguyên pixel gốc (không phóng) ---- */
const CRED = {
  'cred-treatment': [1527, 239, 802, 802],
  'cred-fukuoka-a': [475, 1259, 562, 562],
  'cred-fukuoka-b': [1139, 1259, 562, 562],
  'cred-seminar':   [1767, 1259, 558, 562],
  'cred-press':     [151, 2063, 818, 1202],
};
for (const [name, [left, top, width, height]] of Object.entries(CRED)) {
  await sharp(`${SRC}/layer-95.jpeg`).extract({ left, top, width, height })
    .webp({ quality: 86, effort: 6 }).toFile(`${OUT}/${name}.webp`);
  await report(name);
}
