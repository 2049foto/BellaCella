/* Dựng ảnh sản phẩm từ cửa hàng chính thức của hãng: https://bellacella.store (베라셀라 공식 스토어).
   Chạy:  node scripts/build-store-images.mjs
   Ảnh gốc tải về .src-img/store/ (đã gitignore, có rồi thì không tải lại).

   Ra hai thứ:
   - public/img/<slug>.webp      ảnh chính (thẻ sản phẩm, đầu bộ ảnh trang sản phẩm)
   - public/img/<slug>-<n>.webp  ảnh phụ, n = 2, 3, ...
   - src/lib/gallery.ts          TỰ SINH — danh sách ảnh từng sản phẩm, không sửa tay.

   Luật dựng ảnh (rút từ lần ảnh catalogue bị vỡ chữ):
   1. Không phóng to, không làm nét. Ảnh chỉ được cắt; ảnh lớn hơn 1000px mới thu nhỏ.
   2. Mọi ảnh ra khung vuông — ảnh gốc của hãng chụp vuông, cắt vuông giữ được nhiều điểm ảnh nhất.
   3. Không vẽ thêm gì vào ảnh. Chữ "DR.BECELL" in chìm ở góc ảnh nền trắng tinh thì tô trắng
      (script kiểm nền quanh chữ phải trắng tinh, không thì dừng); ảnh nền có hoa văn thì cắt bỏ dải trên.
   4. Không lấy: ảnh dính chữ Hàn, ảnh review của khách, ảnh ghép trước/sau. */
import sharp from 'sharp';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const HOST = 'https://bellacella.store';
const CACHE = '.src-img/store';
const OUT = 'public/img';
mkdirSync(CACHE, { recursive: true });

// Ảnh trong trang chi tiết (dải dài 1000px). Toạ độ [trái, trên, rộng, cao] đo trên dải gốc.
const D = {
  cleanser0: '/web/upload/NNEditor/20241025/805d40c43424e7c84c77c2a9345674ee.jpg',
  cleanser1: '/web/upload/NNEditor/20241025/2fedcb9c0444f172db12d894f30b09b6.jpg',
  cleanser2: '/web/upload/NNEditor/20241025/a9adab50bea68f6c294159a849e2df10.jpg',
  toner1: '/web/upload/NNEditor/20250220/2dc6cfaac507dc65562f1ac72d2a4aa8.jpg',
  toner3: '/web/upload/NNEditor/20250220/fda104580a2e82485a2974991321517d.jpg',
  ampoule4: '/web/upload/NNEditor/20260511/22620a3d07461aa205a941abfd8afef2.jpg',
  ampoule5: '/web/upload/NNEditor/20260511/d4e3c92d4392d041a20e5f056a44a34d.jpg',
  ampoule6: '/web/upload/NNEditor/20260511/5bbc337d1f54839b5560c66ad3529d4a.jpg',
  mask0: '/web/upload/NNEditor/20250220/25206b6ec96c5c58837fd4295e56cbcd.jpg',
  mask1: '/web/upload/NNEditor/20250220/7ad2b990b9ec5f2c868bccf78a433e55.jpg',
  mask3: '/web/upload/NNEditor/20250220/91a9fafc7d590b4ba7ffb192a1ad835a.jpg',
  bb4: '/web/upload/NNEditor/20260619/327bcc1fab378f3c63ba53988e2035ca.jpg',
  bb13: '/web/upload/NNEditor/20260619/45ee12948dba309909ddb014f68f4188.jpg',
  sun10: '/web/upload/NNEditor/20250423/f7b2f220c4fac8ac9555993b24a530f3.jpg',
  sun16: '/web/upload/NNEditor/20250423/9eb290dd1dde4b4bf709f4fcbed03ece.jpg',
  mist2: '/web/upload/NNEditor/20260617/ccc3300c27097553c5047c733a18ee2a.jpg',
};

/* Mỗi sản phẩm: ảnh đầu tiên là ảnh chính. kind đặt nhãn cho alt (xem gallery trong src/i18n/ui.ts).
   rect: vùng cắt · square: 'center' | 'top' | tâm theo tỉ lệ 0..1 trên cạnh dài
   erase: tô trắng chữ in chìm trên nền trắng · padWhite: nới nền trắng thành vuông
   cutTop: bỏ dải trên chứa chữ in chìm khi nền không trắng tinh */
const SETS = {
  'bubble-clear-cleanser': [
    { kind: 'pack', src: D.cleanser1, rect: [72, 3075, 856, 651] },
    { kind: 'scene', src: D.cleanser0, rect: [100, 700, 800, 800] },
    { kind: 'use', src: D.cleanser0, rect: [72, 4054, 856, 854] },
    { kind: 'detail', src: D.cleanser2, rect: [73, 1244, 855, 854] },
    { kind: 'texture', src: '/web/product/extra/big/202410/45de1fda36a8a72d639debba99e46357.jpg' },
    { kind: 'model', src: '/web/product/big/202412/656cae7eba769e19f042a01e4df54a8e.jpg' },
  ],
  'toner-pad': [
    { kind: 'pack', src: '/web/product/extra/big/202412/1de9886707dcb6266b84faf5fb31e393.jpg', erase: true, padWhite: true },
    { kind: 'model', src: D.toner3, rect: [132, 34, 729, 934], square: 'top' },
    { kind: 'detail', src: '/web/product/extra/big/202412/5427a820cc702ff8581b36bbb4e2e66a.jpg', cutTop: 80 },
    { kind: 'use', src: D.toner1, rect: [72, 1655, 570, 797], square: 'top' },
    { kind: 'texture', src: '/web/product/extra/big/202412/1a458f1509473ff82b9455f2badbce59.jpg', cutTop: 80 },
    { kind: 'texture', src: '/web/product/extra/big/202412/6fb524d275b8200829c8e155072baa6a.jpg', cutTop: 80 },
  ],
  'exo-bio-ampoule': [
    { kind: 'pack', src: '/web/product/big/202506/b18452701671b3d3e931a0dc7f8d7f15.jpg' },
    { kind: 'detail', src: '/web/product/extra/big/202506/73b8b938776418b9b2224a3171da4cbc.jpg' },
    { kind: 'model', src: D.ampoule4, rect: [70, 427, 860, 860] },
    { kind: 'box', src: '/web/product/extra/big/202506/c347665ad8b0b4cb041ae94a6d87b993.jpg' },
    { kind: 'detail', src: D.ampoule6, rect: [70, 1440, 860, 860] },
    { kind: 'detail', src: '/web/product/extra/big/202506/a81a360f71a81c56eb0786fb0ca1ef39.jpg' },
    { kind: 'model', src: D.ampoule5, rect: [70, 427, 860, 860] },
    { kind: 'detail', src: D.ampoule5, rect: [193, 3892, 634, 634] },
  ],
  'nmn-serum-mask': [
    { kind: 'pack', src: '/web/product/extra/big/202412/2442c2f6bb61e070bfd92675367f3846.jpg', erase: true, padWhite: true },
    { kind: 'detail', src: D.mask0, rect: [131, 3055, 731, 848] },
    { kind: 'model', src: D.mask1, rect: [215, 1638, 570, 797], square: 'top' },
    { kind: 'box', src: '/web/product/extra/big/202412/7a530a3ed0ff995c87990881f57cba8f.jpg', cutTop: 80 },
    { kind: 'texture', src: D.mask3, rect: [215, 2498, 570, 797] },
    { kind: 'use', src: D.mask3, rect: [72, 1569, 856, 654] },
    { kind: 'box', src: '/web/product/extra/big/202412/50dece58c05000e8a3ef446fa220ce5f.jpg', cutTop: 80 },
    { kind: 'detail', src: D.mask3, rect: [215, 443, 570, 797] },
  ],
  'sun-cushion': [
    { kind: 'pack', src: '/web/product/extra/big/202504/1b2ec9d8ffa9d653e84969db89712e95.jpg' },
    { kind: 'detail', src: D.sun10, rect: [72, 382, 856, 852] },
    { kind: 'model', src: D.sun16, rect: [74, 1612, 854, 799] },
    { kind: 'use', src: D.sun16, rect: [72, 2664, 856, 836] },
    { kind: 'texture', src: D.sun16, rect: [200, 574, 605, 597] },
    { kind: 'model', src: '/web/product/big/202504/c1aff17d9a4b2f69e96af27e716f59ee.jpg' },
  ],
  'recovery-bb-cushion': [
    { kind: 'pack', src: '/web/product/extra/big/202410/849a783c5c784c95c11569d6cb60ce6a.jpg' },
    { kind: 'detail', src: D.bb13, rect: [304, 482, 618, 862], square: 'top' },
    { kind: 'model', src: D.bb4, rect: [145, 474, 716, 909], square: 'top' },
    { kind: 'detail', src: D.bb13, rect: [78, 2129, 646, 584] },
  ],
  'exo-bio-ampoule-mist': [
    { kind: 'pack', src: '/web/product/big/202606/3a9dd612ddd43107868a605194dcc21b.jpg' },
    { kind: 'use', src: '/web/product/extra/big/202606/1b45be0737191be84d6d389d7d446808.jpg' },
    { kind: 'detail', src: '/web/product/extra/big/202606/da2a4d2b3705a78e40f0e7434533a0e3.jpg' },
    { kind: 'scene', src: D.mist2, rect: [72, 1698, 856, 686], square: 0.6 },
    { kind: 'detail', src: '/web/product/extra/big/202606/0302b3a9725d201578aebded1d881974.jpg' },
  ],
  'recella-cream': [
    { kind: 'pack', src: '/web/product/big/202606/70f849ac49271649a8cf4eeb5c608aee.jpg' },
    { kind: 'texture', src: '/web/product/extra/big/202606/9f747e5bf0eb5baa9830a8f26de062eb.jpg' },
  ],
};

async function fetchSrc(path) {
  const file = `${CACHE}/${basename(path)}`;
  // Máy chủ ở Hàn hay ngắt kết nối giữa chừng với file lớn -> thử lại vài lần.
  for (let attempt = 1; !existsSync(file); attempt++) {
    try {
      const res = await fetch(HOST + path, { headers: { 'user-agent': 'Mozilla/5.0' } });
      if (!res.ok) throw new Error(`${res.status} ${HOST + path}`);
      writeFileSync(file, Buffer.from(await res.arrayBuffer()));
    } catch (e) {
      if (attempt >= 4) throw e;
      console.warn(`thử lại ${attempt}: ${path}`);
    }
  }
  return readFileSync(file);
}

// Tô trắng chữ in chìm góc trên trái — CHỈ khi nền quanh chữ trắng tinh, không thì dừng hẳn.
async function eraseMark(buf) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, channels: C } = info;
  const px = (x, y) => Math.min(data[(y * W + x) * C], data[(y * W + x) * C + 1], data[(y * W + x) * C + 2]);
  let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
  for (let y = 0; y < 110; y++) for (let x = 0; x < 320; x++) if (px(x, y) < 235) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  if (x1 < 0) throw new Error('không thấy chữ in chìm để tô');
  const m = 4, bx0 = Math.max(0, x0 - m), by0 = Math.max(0, y0 - m), bx1 = x1 + m, by1 = y1 + m;
  for (let y = Math.max(0, by0 - 6); y <= by1 + 6; y++) for (let x = Math.max(0, bx0 - 6); x <= bx1 + 6; x++) {
    const inside = x >= bx0 && x <= bx1 && y >= by0 && y <= by1;
    if (!inside && px(x, y) < 248) throw new Error(`nền quanh chữ in chìm không trắng tinh tại ${x},${y}`);
  }
  for (let y = by0; y <= by1; y++) for (let x = bx0; x <= bx1; x++) for (let c = 0; c < 3; c++) data[(y * W + x) * C + c] = 255;
  return sharp(data, { raw: info }).png().toBuffer();
}

async function padWhiteSquare(buf) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const minAt = (x, y) => Math.min(data[(y * W + x) * C], data[(y * W + x) * C + 1], data[(y * W + x) * C + 2]);
  // mép sẽ nới phải trắng tinh, nếu không vùng nới lộ đường nối
  const edges = W > H ? [0, H - 1].flatMap((y) => [...Array(W).keys()].map((x) => [x, y])) : [0, W - 1].flatMap((x) => [...Array(H).keys()].map((y) => [x, y]));
  for (const [x, y] of edges) if (minAt(x, y) < 248) throw new Error(`mép ảnh không trắng tinh tại ${x},${y}, không nới nền được`);
  const d = Math.abs(W - H), a = Math.floor(d / 2), b = d - a;
  const ext = W > H ? { top: a, bottom: b, left: 0, right: 0 } : { top: 0, bottom: 0, left: a, right: b };
  return sharp(buf).extend({ ...ext, background: '#ffffff' }).png().toBuffer();
}

async function squareCrop(buf, mode = 'center') {
  const { width: W, height: H } = await sharp(buf).metadata();
  const side = Math.min(W, H), long = Math.max(W, H);
  let off = mode === 'top' ? 0 : typeof mode === 'number' ? Math.round(mode * long - side / 2) : Math.round((long - side) / 2);
  off = Math.max(0, Math.min(long - side, off));
  const r = W > H ? { left: off, top: 0, width: side, height: side } : { left: 0, top: off, width: side, height: side };
  return sharp(buf).extract(r).png().toBuffer();
}

async function build(spec, out) {
  let buf = await fetchSrc(spec.src);
  if (spec.rect) { const [left, top, width, height] = spec.rect; buf = await sharp(buf).extract({ left, top, width, height }).png().toBuffer(); }
  if (spec.cutTop) { const m = await sharp(buf).metadata(); buf = await sharp(buf).extract({ left: 0, top: spec.cutTop, width: m.width, height: m.height - spec.cutTop }).png().toBuffer(); }
  if (spec.erase) buf = await eraseMark(buf);
  buf = spec.padWhite ? await padWhiteSquare(buf) : await squareCrop(buf, spec.square);
  let img = sharp(buf);
  const { width } = await img.metadata();
  if (width > 1000) img = img.resize(1000, 1000, { kernel: 'lanczos3' });
  await img.webp({ quality: 90, effort: 6 }).toFile(out);
  const m = await sharp(out).metadata();
  return m.width;
}

// Xoá ảnh phụ cũ trước khi dựng: bỏ bớt ảnh trong SETS thì file thừa không được nằm lại.
for (const f of readdirSync(OUT)) if (Object.keys(SETS).some((slug) => new RegExp(`^${slug}-\\d+\\.webp$`).test(f))) rmSync(`${OUT}/${f}`);

const lines = [];
const imports = [];
const entries = [];
let k = 0;
for (const [slug, list] of Object.entries(SETS)) {
  const items = [];
  for (const [i, spec] of list.entries()) {
    const file = i === 0 ? `${slug}.webp` : `${slug}-${i + 1}.webp`;
    const w = await build(spec, `${OUT}/${file}`);
    const id = `g${k++}`;
    imports.push(`import ${id} from '../../public/img/${file}';`);
    items.push(`{ src: ${id}, kind: '${spec.kind}', file: '/img/${file}' }`);
    lines.push(`${file.padEnd(32)} ${w}x${w}  ${spec.kind}`);
  }
  entries.push(`  '${slug}': [\n    ${items.join(',\n    ')},\n  ],`);
}

writeFileSync('src/lib/gallery.ts', `/* TỰ SINH bởi scripts/build-store-images.mjs — không sửa tay, sửa script rồi chạy lại.
   Bộ ảnh từng sản phẩm; ảnh đầu tiên là ảnh chính (trùng IMG[slug] trong images.ts). */
import type { StaticImageData } from 'next/image';

${imports.join('\n')}

export type GalleryKind = 'pack' | 'box' | 'detail' | 'texture' | 'model' | 'use' | 'scene';
export type GalleryItem = { src: StaticImageData; kind: GalleryKind; file: string };

export const GALLERY: Record<string, GalleryItem[]> = {
${entries.join('\n')}
};
`);
console.log(lines.join('\n'));
