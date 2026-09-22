/* Định tuyến 2 ngôn ngữ (xem src/i18n/routes.ts).
   - /en/products/x  → rewrite nội bộ /en/san-pham/x
   - /vi/...          → redirect 308 về URL không tiền tố (tiếng Việt là mặc định)
   - /san-pham/x      → rewrite nội bộ /vi/san-pham/x
   - đường dẫn lạ     → rewrite /vi|en/khong-ton-tai (app/[lang]/khong-ton-tai, mã 404)
   Ảnh OG sinh tự động (…/opengraph-image…) đã mang đường dẫn nội bộ → cho đi thẳng. */
import { NextResponse, type NextRequest } from 'next/server';
import { EN_TO_VI_SEG, parsePath } from '@/i18n/routes';
import { PRODUCTS } from '@/data/products';

const SLUGS = new Set(PRODUCTS.map((p) => p.slug));

// Đường dẫn công khai có trỏ tới trang thật không (sai slug, thừa đoạn → không).
function known(pathname: string): boolean {
  const p = parsePath(pathname);
  if (!p) return false;
  const parts = pathname.split('/').filter(Boolean);
  const depth = parts.length - (parts[0] === 'en' ? 1 : 0);
  if (p.key === 'products') return depth === 1 || (depth === 2 && SLUGS.has(p.slug!));
  return depth === (p.key === 'home' ? 0 : 1);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const parts = pathname.split('/').filter(Boolean);
  const url = req.nextUrl.clone();

  if (pathname.includes('opengraph-image')) return NextResponse.next();

  if (parts[0] === 'vi') {
    url.pathname = '/' + parts.slice(1).join('/');
    return NextResponse.redirect(url, 308);
  }

  // Trang không tồn tại → trang 404 trong khung site (đúng ngôn ngữ, mã 404 thật).
  if (!known(pathname)) {
    url.pathname = parts[0] === 'en' ? '/en/khong-ton-tai' : '/vi/khong-ton-tai';
    return NextResponse.rewrite(url, { status: 404 });
  }

  if (parts[0] === 'en') {
    if (parts[1] && EN_TO_VI_SEG[parts[1]] !== undefined) parts[1] = EN_TO_VI_SEG[parts[1]];
    url.pathname = '/' + parts.join('/');
    return NextResponse.rewrite(url);
  }

  url.pathname = '/vi' + (pathname === '/' ? '' : pathname);
  return NextResponse.rewrite(url);
}

export const config = {
  // Bỏ qua tài nguyên tĩnh, file có đuôi (ảnh, icon, robots.txt, sitemap.xml, manifest).
  matcher: ['/((?!_next/|api/|.*\\..*).*)'],
};
