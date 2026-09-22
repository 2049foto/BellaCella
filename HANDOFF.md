# HANDOFF — Website BELLA CELLA

Cập nhật: 2026-09-22 chiều (PC, Claude-Pro2).
Branch `claude/bellacella-design-quality-5q5c5a`. Production: bellacella.vercel.app.

## Current goal
Bản song ngữ Việt – Anh đã xong và nghiệm thu sạch ở local. Còn: đẩy lên production để Chi duyệt,
rồi chờ giấy tờ nhà sản xuất mới mở công khai.

## Done (phiên này)
- **Song ngữ vi/en** — URL tiếng Việt giữ nguyên (`/san-pham`), tiếng Anh có đoạn dịch (`/en/products`):
  - `src/i18n/routes.ts` — bảng đoạn URL + `href()`, `parsePath()`, `counterpart()`, `alternates()` (hreflang).
  - `src/i18n/ui.ts` — toàn bộ chữ giao diện 2 ngôn ngữ, kiểu của bản `en` suy từ `vi` → thiếu khoá là build fail.
  - `src/data/products.en.ts` + `src/i18n/content.ts` — bản dịch catalogue (8 sản phẩm, 8 bước, 7 nhu cầu,
    hướng dẫn dùng, kiến thức, 9 FAQ, chứng thực); giữ nguyên id/sku/giá/ảnh từ bản gốc tiếng Việt.
  - `src/middleware.ts` — `/en/<đoạn tiếng Anh>` → route nội bộ; `/vi/...` → chuyển 308 về URL không tiền tố;
    đường dẫn lạ (kể cả slug sản phẩm sai) → trang 404 có khung site, mã HTTP 404 thật.
  - Route chuyển vào `src/app/[lang]/`, `<html lang>` theo ngôn ngữ, sitemap 2 ngôn ngữ + hreflang,
    JSON-LD `inLanguage`, ảnh OG riêng từng ngôn ngữ.
  - Nút **VI/EN** ở header: tải lại trang thật (để `<html lang>` đổi), trỏ đúng trang tương ứng.
- **Tương tác / hiệu ứng:**
  - Vạch tiến trình mảnh dưới header khi mạng chậm (chỉ hiện sau 120ms, tự tắt).
  - Chuyển cảnh giữa 2 ngôn ngữ dùng View Transition xuyên trang (`@view-transition`).
  - Màn cảm ứng: bỏ trạng thái hover "dính", thay bằng phản hồi lúc nhấn; nhãn "Bấm để xem lớn" hiện sẵn.
  - 3 nút header đủ 44px trên cảm ứng; header vẫn một hàng tới màn 320px.
- **Nghiệm thu mở rộng** (`scripts/accept.mjs`): thêm 9 route tiếng Anh, kiểm `<html lang>`, hreflang,
  nút đổi ngôn ngữ, 3 trường hợp 404, lỗi console (bắt lệch server/trình duyệt).
- **Đo hiệu năng lặp** (`scripts/perf.mjs`, `npm run perf -- --runs N`): chạy N lượt/route, in trung vị,
  dải min–max, biểu đồ cột, LCP/SI/CLS/TBT; ghi `.accept/perf.json` để so giữa các lần triển khai.
- **Xoá:** `src/lib/format.ts` (thay bằng `money(lang, n)` trong `src/i18n/ui.ts`).

## Kết quả trên PRODUCTION (bellacella.vercel.app, Lighthouse mobile, trung vị 3 lượt)

| Trang | Perf | A11y | BP | LCP | SI | CLS |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Trang chủ | 98 (92–98) | 100 | 100 | 2.2s | 1.7s | 0.000 |
| /san-pham | 98 (92–99) | 100 | 100 | 2.2s | 1.7s | 0.000 |
| /lieu-trinh | 95 (95–99) | 100 | 100 | 2.1s | 1.6s | 0.000 |
| PDP /san-pham/exo-bio-ampoule | 99 (97–99) | 100 | 100 | — | — | 0.000 |
| /en | 99 (99–100) | 100 | 100 | — | — | 0.000 |
| /en/products | 99 | 100 | 100 | — | — | 0.000 |

SEO 69 ở mọi trang là **cố ý** (noindex tới khi mở công khai).

### Lỗi thật đã tìm ra và sửa trong lượt rà soát này
1. **CLS 0.174 ở /san-pham** — font dự phòng của next/font rộng hơn font thật 2,5%;
   đoạn mô tả thừa một dòng rồi co lại khi font tải xong, đẩy lưới sản phẩm lên 26px.
   Sửa: tự khai `@font-face` dự phòng theo từng độ đậm với `size-adjust` lấy từ số đo
   thật → bề rộng khớp 1.000, CLS về 0 trên toàn bộ 10 route.
2. **Hàng nút lọc xuống dòng** → đổi thành một dòng cuộn ngang.
3. **CSS chặn render 2 lượt tải** → `experimental.inlineCss` (FCP 2,3s → 2,0s).
4. **Ảnh LCP trang danh sách không được ưu tiên** → 2 thẻ đầu `priority`.
5. **Header rớt dòng ở 320–375px** sau khi thêm nút ngôn ngữ → chỉnh khoảng cách + cỡ wordmark.
6. **Tiêu đề hero tràn 1px ở 320px** (dòng không ngắt) → thu cỡ chữ ở ≤360px.
7. **Nhãn "Bấm để xem lớn" 9,5px** và ẩn trên cảm ứng → 11px, hiện sẵn khi không có hover.

## Kết quả nghiệm thu local (build production, `npm start`)
- `npm run accept --no-lh`: **ĐẠT** — 18 route × 3 bề rộng × 2 theme không tràn ngang; axe 72 lượt quét,
  0 lỗi serious/critical; 18 trang đúng `lang`/hreflang/nút đổi ngôn ngữ; 404 trả đúng mã 404 có khung trang;
  0 lỗi console.
- Ma trận 10 thiết bị (`.dev.local.mjs`, 320px → 4K, 8 route mỗi máy): **OK** toàn bộ.
- `npm run perf -- --runs 5` (10 route): CLS 0.000 toàn bộ, A11y/BP 100. Perf local 86–95 (máy này
  luôn thấp hơn production 8–12 điểm; số chuẩn lấy trên production ở bảng trên).

## Chưa đạt / chưa làm — và vì sao
- **SEO 69 là cố ý** (noindex tới khi Chi cho mở công khai). Không "sửa".
- **Zalo** zalo.me/84934454426 báo không tồn tại → cài đặt tài khoản, không phải code:
  Zalo → Cá nhân → Cài đặt → Quyền riêng tư → cho phép tìm qua số điện thoại. Hoặc gửi link Zalo OA
  để đổi `zaloUrl` trong `src/lib/brand.ts`.
- **Giấy tờ nhà sản xuất**: số tiếp nhận phiếu công bố 8 SKU, chứng nhận SPF Sun Cushion, ảnh gốc, logo vector.
- **needsReview** (Toner Pad 200/180ml, Sun Cushion 200ml): chờ nhà sản xuất, không tự sửa.
- **Vercel Hobby cấm dùng thương mại** — khi mua domain làm web chính thức phải chuyển Cloudflare Pages
  (miễn phí, cho phép thương mại) hoặc lên Vercel Pro, rồi đổi `SITE_URL` trong `src/lib/site.ts`.
- **app-factory-rules 1.2.0 → 2.0.x**: chỉ làm khi còn đúng 1 cửa sổ Claude.

## Next 3 actions
1. Chi duyệt bản song ngữ trên production, cho ý kiến nội dung tiếng Anh (bản dịch từ catalogue tiếng Việt).
2. Xin nhà sản xuất giấy tờ (mục trên) → mới mở `robots`/`noindex`.
3. Quyết định hạ tầng cho domain chính thức (Cloudflare Pages hay Vercel Pro).

## Blockers (chỉ Chi)
- Giấy tờ nhà sản xuất; cài đặt tài khoản Zalo; chọn hạ tầng + mua domain.

## Files touched (phiên này)
`src/i18n/*` (mới), `src/data/products.en.ts` (mới), `src/middleware.ts` (mới),
`src/app/[lang]/**` (chuyển từ `src/app/**`), `src/app/{sitemap.ts,manifest.ts,global-error.tsx,globals.css}`,
`src/components/*` (Header, Footer, ZaloFab, ProductCard/Action/Filter/ImageZoom, EnquiryForm, ProviderForm,
NotFoundView mới, LoadingLabel mới, Skeletons, ViewTransitions), `src/lib/schema.ts`,
`scripts/accept.mjs`, `scripts/perf.mjs` (mới), `.dev.local.mjs`, `package.json`, `HANDOFF.md`.
Đã xoá: `src/lib/format.ts`.
