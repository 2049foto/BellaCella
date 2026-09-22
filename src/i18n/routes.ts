/* Định tuyến 2 ngôn ngữ.
   - Tiếng Việt: URL gốc không tiền tố (/san-pham). Bên trong rewrite sang /vi/san-pham.
   - Tiếng Anh: /en + đoạn tiếng Anh (/en/products). Bên trong rewrite sang /en/san-pham.
   Thư mục route trong app/[lang]/ giữ tên tiếng Việt; bảng dưới là nguồn duy nhất
   cho việc dịch đoạn URL, dùng chung cho middleware, Link, hreflang, sitemap. */

export const LANGS = ['vi', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (x: string): x is Lang => (LANGS as readonly string[]).includes(x);

export type RouteKey = 'home' | 'products' | 'routine' | 'usage' | 'knowledge' | 'faq' | 'pro' | 'contact';

// Đoạn URL của từng trang theo ngôn ngữ. 'vi' đồng thời là tên thư mục route.
export const SEG: Record<RouteKey, Record<Lang, string>> = {
  home: { vi: '', en: '' },
  products: { vi: 'san-pham', en: 'products' },
  routine: { vi: 'lieu-trinh', en: 'routine' },
  usage: { vi: 'huong-dan', en: 'how-to-use' },
  knowledge: { vi: 'kien-thuc', en: 'ingredients' },
  faq: { vi: 'faq', en: 'faq' },
  pro: { vi: 'chuyen-gia', en: 'professionals' },
  contact: { vi: 'lien-he', en: 'contact' },
};

export const EN_TO_VI_SEG: Record<string, string> = Object.fromEntries(
  Object.values(SEG).filter((s) => s.en).map((s) => [s.en, s.vi]),
);
const VI_TO_KEY: Record<string, RouteKey> = Object.fromEntries(
  (Object.keys(SEG) as RouteKey[]).map((k) => [SEG[k].vi, k]),
);

/** Đường dẫn công khai (URL trên trình duyệt) của một trang. `slug` chỉ cho trang sản phẩm. */
export function href(lang: Lang, key: RouteKey, slug?: string): string {
  const seg = SEG[key][lang];
  const base = lang === 'en' ? '/en' : '';
  const path = `${base}${seg ? '/' + seg : ''}${slug ? '/' + slug : ''}`;
  return path || '/';
}

/** Chuẩn hoá mọi dạng URL (/x, /vi/x, /en/y) về { key, slug } để tìm trang tương ứng.
    strict=false còn nhận đường dẫn nội bộ sau rewrite (/en/san-pham) — lúc render sẵn,
    usePathname trả dạng này chứ không phải URL công khai. Middleware dùng strict. */
export function parsePath(pathname: string, strict = true): { key: RouteKey; slug?: string } | null {
  let parts = pathname.split('/').filter(Boolean);
  let lang: Lang = 'vi';
  if (parts[0] === 'en' || parts[0] === 'vi') { lang = parts[0]; parts = parts.slice(1); }
  if (!parts.length) return { key: 'home' };
  const viSeg = lang === 'en' ? EN_TO_VI_SEG[parts[0]] ?? (strict ? undefined : parts[0]) : parts[0];
  const key = viSeg !== undefined ? VI_TO_KEY[viSeg] : undefined;
  if (!key) return null;
  return { key, slug: parts[1] };
}

/** URL của cùng trang ở ngôn ngữ kia — dùng cho nút chuyển ngôn ngữ. */
export function counterpart(pathname: string, to: Lang): string {
  const p = parsePath(pathname, false);
  return p ? href(to, p.key, p.slug) : href(to, 'home');
}

/** URL công khai của trang đang xem (bỏ dạng nội bộ /vi/…, /en/san-pham…). */
export function publicPath(pathname: string, lang: Lang): string {
  const p = parsePath(pathname, false);
  return p ? href(lang, p.key, p.slug) : pathname;
}

/** hreflang + canonical cho metadata của một trang. */
export function alternates(lang: Lang, key: RouteKey, slug?: string) {
  return {
    canonical: href(lang, key, slug),
    languages: { vi: href('vi', key, slug), en: href('en', key, slug), 'x-default': href('vi', key, slug) },
  };
}
