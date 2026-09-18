# HANDOFF — Website BELLA CELLA

Cập nhật: 2026-09-18 ~13:40 (PC, còn tới 16:00)

## Current goal
Dựng lại prototype 9 trang bằng Next.js 15 (App Router + TS + Tailwind v4), nghiệm thu, rồi deploy Vercel private.

## Trạng thái theo phase
- **Phase 1 — config skill:** phần local XONG. `install.ps1` đã tạo `.claude/settings.json` + skill `bella-acceptance` trong repo (không đụng `~/.claude`). Phần cài plugin `example-skills@anthropic-skills` **CHƯA làm — đang gate** (chờ tắt phiên Claude Code của Gym Coach + Chi xác nhận). Ngoài ra phiên này không chạy được slash command `/plugin`.
- **Phase 2 — scaffold:** XONG. `npm install` exit 0. Next 15.5.4, React 19.1, Tailwind v4, TS strict. `src/data/`, `src/styles/`, `public/img/` giữ nguyên.
- **Phase 3 — data:** XONG. Đã thêm `USAGE`, `KNOWLEDGE` (4 khối, có evidence[]+sources[]), `FAQ` (9 câu) vào `src/data/products.ts`, type đầy đủ, nguyên văn.
- **Phase 4 — 9 route:** XONG. Đủ 9 route + `not-found`. Component tách riêng: `ProductAction` (đọc COMMERCE_ENABLED=false → "Nhận tư vấn"), `CartProvider` (inert), `ZaloFab`, `Header`, `Footer` (ghi rõ đại lý phân phối VN / thương hiệu thuộc nhà sản xuất), `ProductCard`, `ProductFilter`, `EnquiryForm`, `ProviderForm`. Ảnh qua `next/image` từ `public/img/` (đường dẫn đọc từ data, không hardcode JSX).
- **Phase 5 — nghiệm thu:** ĐANG DỞ.
  - `npm run build` XANH: 19 trang tĩnh (8 PDP SSG), `/lien-he` dynamic. Không lỗi TS.
  - Đã sửa 1 bug: `.hero figure` thiếu `position:relative` làm ảnh hero `fill` vỡ layout — đã fix.
  - Kiểm tràn ngang @390: `/`, `/san-pham`, `/san-pham/[slug]`, `/kien-thuc`, `/lien-he` → không tràn.
  - Đã xem mắt: home @1440 light (khớp prototype: nền trắng, mực đen, không màu nhấn), home @390, dark mode, danh sách sản phẩm (card + ảnh thật + chip lọc).
  - **CHƯA chạy Lighthouse + axe-core** (chưa cài tooling). Chưa chụp/nghiệm thu 768 và các trang còn lại (`/lieu-trinh`, `/huong-dan`, `/faq`, `/chuyen-gia`) đầy đủ.
- **Phase 6 — deploy:** CHƯA. Gate: `npx vercel login` cần Chi (đăng nhập/2FA). LOCAL-ONLY.
- **Phase 7 — báo cáo:** làm sau khi xong 5–6.

## Next 3 actions
1. Cài lighthouse + @axe-core/cli (hoặc playwright + axe) → chạy nghiệm thu đủ 9 trang @390/768/1440, vá chỗ lệch (tối đa 3 vòng/trang).
2. Chốt với Chi: (a) có cài plugin skill không (Gym Coach đã tắt chưa); (b) bỏ shadcn/ui — xem "Quyết định đang chờ".
3. `npm run build` lại rồi Chi chạy `npx vercel login` + `npx vercel --prod`, bật Vercel Authentication, giữ noindex.

## Blockers / Quyết định đang chờ (chỉ Chi quyết)
- **Plugin skill (Phase 1):** chờ Gym Coach tắt + Chi xác nhận. Chưa cài.
- **shadcn/ui:** CLAUDE.md liệt kê trong stack nhưng prototype không dùng component shadcn nào. Tôi **chưa thêm** để tránh code chết. Cần shadcn thật không, hay bỏ khỏi stack?
- **Vercel deploy:** cần Chi đăng nhập (không hoàn tác tài khoản, cần 2FA).
- Data chờ giấy tờ: số công bố mỹ phẩm, chứng nhận SPF, dung tích Toner Pad / Sun Cushion (2 mục đã hiện ghi chú `needsReview` ở trang chi tiết — không tự sửa số).

## Files touched
- Thêm: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `.gitignore`, `.claude/launch.json`
- `src/app/`: `layout.tsx`, `globals.css`, `page.tsx`, `not-found.tsx`, `san-pham/page.tsx`, `san-pham/[slug]/page.tsx`, `lieu-trinh/`, `huong-dan/`, `kien-thuc/`, `faq/`, `chuyen-gia/`, `lien-he/`
- `src/components/`: `Header`, `Footer`, `ZaloFab`, `CartProvider`, `ProductAction`, `ProductCard`, `ProductFilter`, `EnquiryForm`, `ProviderForm`
- `src/lib/`: `format.ts`, `brand.ts`, `images.ts`; `src/types/assets.d.ts`
- Sửa: `src/data/products.ts` (thêm USAGE/KNOWLEDGE/FAQ — không đụng nội dung cũ)
- `.claude/settings.json` + `.claude/skills/bella-acceptance/SKILL.md` (do install.ps1 tạo)

## Ghi chú kỹ thuật
- Dev server đang chạy nền ở `localhost:3000` (npm run dev).
- Chưa `git init` (repo này chưa phải git repo).
- Font Archivo + Be Vietnam Pro qua next/font/google, cầu nối biến trong `globals.css` để khớp token `design-tokens.css`.
