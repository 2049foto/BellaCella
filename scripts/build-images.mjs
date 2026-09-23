/* Dựng ảnh KHÔNG phải ảnh sản phẩm trong public/img/ từ lớp ảnh gốc của catalogue:
   hero, ảnh kết cấu tinh chất, 5 ảnh chứng thực.
   Chạy sau scripts/extract-pdf-layers.py:   node scripts/build-images.mjs
   Ảnh sản phẩm lấy từ cửa hàng chính thức của hãng: scripts/build-store-images.mjs.

   Không phóng to, không làm nét (làm nét trên ảnh đã phóng biến nhiễu JPEG thành răng cưa).
   Ảnh chỉ được cắt hoặc thu nhỏ. */
import sharp from 'sharp';
import { existsSync, statSync } from 'node:fs';

const SRC = '.src-img';
for (const f of ['layer-95', 'layer-126', 'layer-177']) {
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
