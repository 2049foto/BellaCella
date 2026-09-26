# HANDOFF — Website BELLA CELLA

Cập nhật: 2026-09-23 ~14:30 (PC, Claude-Pro2).
Branch `main` = `765024a` (đã đẩy, Vercel đã build) · nhánh `claude/bellacella-design-quality-5q5c5a` = `main`.
Production: bellacella.vercel.app (noindex, COMMERCE_ENABLED=false — cố ý).
Lịch sử các phiên trước: `git log`.

## Current goal
Chi (23/09 chiều): hãng đã cho phép mọi giấy tờ/ảnh. "Hoàn thiện website xong luôn" nhưng **KHÔNG mở công khai**:
giữ bellacella.vercel.app, giữ noindex, giữ nút "Nhận tư vấn" (Chi mua domain / lên Vercel Pro sau, hiện dùng cá nhân).
→ **Đã xong.** Site hoàn chỉnh ở trạng thái riêng tư.

## Done (23/09 chiều — đã đẩy, production đạt)
- `5dd010d` Dung tích theo bảng thông tin chính hãng (상품정보제공고시 trên bellacella.store): Toner Pad **180ml / 70 miếng**
  (SKU BC-TONERPAD-180), Sun Cushion **25g**, Recella **2g × 30 gói**. 5 SKU còn lại khớp. Xoá hẳn cơ chế needsReview.
- `765024a` Cách dùng của cả 8 sản phẩm dịch từ mục 사용방법 chính hãng (vi + en). Bỏ nhãn "hướng dẫn chung,
  không phải văn bản chính thức"; ghi chú mới: theo hướng dẫn chính hãng, sau thủ thuật thì theo chuyên gia điều trị.
- CLAUDE.md: thay mục "Việc chưa xong" bằng "Giấy tờ và trạng thái mở site"; nguyên tắc nội dung cho phép nguồn
  bellacella.store. Checklist `bella-acceptance` bỏ mục needsReview (cả bản trong `claude-setup/`).
- `.claude/launch.json` thêm `bella-prod` (`npm run start`) để chạy nghiệm thu trên bản production ở máy.

## Done — ảnh từ bellacella.store (23/09 trưa)
- 45 ảnh sản phẩm (8 ảnh chính + 37 ảnh phụ): ảnh chụp sản phẩm, người mẫu, cận cảnh, kết cấu.
  Rộng 570–1000px (ảnh catalogue cũ chỉ 454px). Không phóng, không làm nét, không vẽ thêm.
- Chi cho phép lấy hết ảnh dùng được, không cần theo luật nội dung. Tôi vẫn loại 3 nhóm vì làm web kém
  chuyên nghiệp: ảnh dính chữ Hàn, ảnh selfie review của khách Hàn, ảnh ghép trước/sau.
- Chữ "DR.BECELL" in chìm trên ảnh toner/mặt nạ: nền trắng tinh thì tô trắng (script kiểm nền),
  nền có hoa văn thì cắt dải trên.
- `scripts/build-store-images.mjs` dựng lại toàn bộ (ảnh gốc cache ở `.src-img/store/`), tự sinh `src/lib/gallery.ts`.
- Trang sản phẩm: `ProductGallery` thay `ProductImageZoom` — vuốt ảnh (scroll-snap), ảnh nhỏ bên dưới trên
  máy tính, vạch tiến độ trên điện thoại, xem lớn có vuốt / nút trước-sau / phím mũi tên, đóng thì giữ đúng ảnh.
- Khung ảnh sản phẩm toàn site chuyển vuông theo ảnh gốc của hãng. JSON-LD khai đủ ảnh.
- `build-images.mjs` bỏ phần ảnh sản phẩm từ catalogue (hero/chứng thực dựng lại vẫn trùng từng byte).

## Done (phiên 23/09)

### Ảnh — hết vỡ chữ trên nhãn
- Nguyên nhân gốc: ảnh cũ bị làm nét (sharpen) SAU khi phóng to → nhiễu JPEG thành răng cưa ở chữ nhãn.
- Dựng lại từ lớp ảnh gốc 2480×3507 trong catalogue PDF: `scripts/extract-pdf-layers.py` + `scripts/build-images.mjs`
  (lặp lại được, cho ra cùng từng byte). 8 ảnh sản phẩm 1000×1250 (4:5), nới nền bằng nhân bản mép —
  không cắt sản phẩm, không vẽ thêm chi tiết. Hero 2000px, 5 ảnh chứng thực + ảnh kết cấu giữ pixel gốc.
- Ảnh sản phẩm gốc chỉ 454px → mọi chỗ hiển thị ảnh sản phẩm khoá ≤460px để không bị kéo giãn nhoè.
  Đã đo toàn site ở 5 bề rộng: không còn chỗ nào vượt 460px.

### Phóng to ảnh — hết lỗi "bấm vào lại bé đi"
- Nguyên nhân: next/image khai `sizes` lớn hơn ảnh gốc → trình duyệt tự chia mật độ điểm ảnh, co ảnh xuống 458px.
- Sửa: bề rộng khung phóng do CSS quyết định. Đo thật: máy tính 460 → 584px, điện thoại 336 → 374px,
  điện thoại xoay ngang 460 → 460px (cuộn trong khung).

### UI/UX mượn từ các hãng lớn (Aesop, La Mer, Sephora…)
- Thanh tóm tắt sản phẩm dính đáy khi cuộn qua khối giá (tên · giá · Nhận tư vấn · Zalo · Gọi);
  màn hẹp gọn lại, nút Zalo nổi tự ẩn/đẩy lên để không trùng, không chồng.
- Link "Tìm hiểu Exosome, NMN và các nhóm thành phần" trên trang sản phẩm → trang Kiến thức.
- Khối "Bước tiếp theo": khung 4:5, hiện nguyên chai (trước bị cắt nắp và đáy).
- Hướng dẫn dùng trên điện thoại: ảnh thu nhỏ cạnh chữ (trước bung 525px nhoè).
- Thanh cuộn chừa chỗ sẵn (`scrollbar-gutter`) → mở ảnh lớn không giật ngang.

### Final review (code-review high) — 6 lỗi, đã sửa cả 6
1. Thanh tóm tắt trên máy tính bị header che hoàn toàn → chuyển dính đáy ở mọi cỡ màn hình.
2. Thanh tự dựng lại nút tư vấn → dùng `ProductAction` (bật giỏ hàng là đúng hành vi).
3. Mốc hiện thanh đoán header 70px → đo chiều cao header thật.
4. Phóng to trên điện thoại xoay ngang nhỏ hơn ảnh trên trang → tối thiểu 460px.
5. Khối bước tiếp theo cắt chai → khung 4:5.
6. Style inline thừa trên link → bỏ.

### Skill (kho chung cho cả hai app Claude)
- Danh sách đầy đủ: **`D:\APP FACTORY\skill-updates\SKILLS.md`** (3 tầng: skill cá nhân dùng chung qua junction ·
  plugin Claude Code · skill tài khoản claude.ai).
- Báo cáo cập nhật: `D:\APP FACTORY\skill-updates\2026-09-23-skill-update.md`. Ledger: `INSTALLED.md`.
- Đã cập nhật: Claude Code 2.1.252 → 2.1.280, superpowers 6.4.1, context7, posthog, expo, marketing-skills,
  revenuecat 2.3.0, 8 skill `asc-*`… Cài mới `modern-web-guidance` (Google Chrome, chính thức).
- Repo website tắt 4 plugin không dùng (posthog, expo, revenuecat, supabase) ở phạm vi local → nhẹ ~29k token/phiên.
- Gói `.skill` sẵn để tải lên tài khoản kia: `D:\APP FACTORY\_skillpkg\` (skill-updater, llm-council, find-skills, frontend-design).

## Số đo thật (production, bản cuối 765024a)
```
BASE=https://bellacella.vercel.app npm run accept
  404 ×3 đúng · song ngữ 18 trang · axe 72 lượt, 0 lỗi serious/critical · overflow 18 route × 3 bề rộng × 2 theme
  / 92 · /san-pham/exo-bio-ampoule 99 · /en 99 — a11y 100, bp 100, CLS 0
  KẾT QUẢ: ĐẠT
```
SEO 69 là do noindex có chủ đích (chưa mở công khai).
Lưu ý đo: khi máy bận (CapCut chạy, CPU 84%) Lighthouse tụt mạnh — cùng bản production cũ, trang chủ ra 68 (TBT 1.310ms).
Điểm thấp kèm TBT cao bất thường → đo lại lúc máy rảnh trước khi kết luận có lỗi.

Bản trước (979c3cc): `npm run perf -- --runs 3` đạt mọi ngưỡng (10 route 95–100, CLS ≤ 0,004); CLS 0/10 lượt;
bộ ảnh 8 ảnh 0 lỗi console; 10/10 thiết bị OK (320 → 2560px).

## In progress
Không có việc dở.

## Next 3 actions
1. **LOCAL-ONLY: cần thực hiện trước 16:00** — nâng plugin `app-factory-rules` (Chi làm, đóng hết cửa sổ Claude trừ một):
   `pwsh -File "D:\APP FACTORY\Claude 2\PUBLISH-PLUGIN.ps1"` rồi trong Claude Code: `/plugin update app-factory-rules@app-factory-toolkit`.
2. Chờ Chi gửi bảng thành phần đầy đủ (INCI) trong phiếu công bố → thêm mục "Thành phần đầy đủ" trên trang sản phẩm.
   Làm được từ mobile (chỉ sửa `src/data/products.ts` + `products.en.ts`).
3. Khi Chi quyết mở công khai: mua domain → Vercel Pro hoặc Cloudflare Pages (Hobby cấm thương mại) → bỏ noindex
   (`src/app/robots.ts` + `robots` trong `src/app/[lang]/layout.tsx`) → thêm số tiếp nhận phiếu công bố nếu Chi có.

## Blockers
- Chi chưa muốn mở công khai: giữ noindex, Vercel Hobby, bellacella.vercel.app.
- Tài khoản Zalo cho 034 966 7962 phải tồn tại thì nút Zalo mới dùng được.
- Không phải blocker của website — ghi để khỏi nhầm: đăng nhập MCP (Expo/RevenueCat/Supabase) lưu chung ở
  `C:\Users\2049f\.claude\.credentials.json`, không phụ thuộc tài khoản Claude (2048foto hay 2049foto). 23/09 14:36: Expo
  và RevenueCat đã có token (phiên mở trước lúc uỷ quyền thì vẫn báo chưa — mở phiên mới là nhận); Supabase chưa có token.

## Files touched (23/09 chiều)
`src/data/products.ts` · `src/data/products.en.ts` · `src/i18n/content.ts` · `src/i18n/ui.ts` ·
`src/app/[lang]/san-pham/[slug]/page.tsx` · `CLAUDE.md` · `.claude/skills/bella-acceptance/SKILL.md` ·
`claude-setup/bella-acceptance.SKILL.md` · `.claude/launch.json` · `HANDOFF.md`

## Files touched (23/09 trưa — ảnh bellacella.store)
`public/img/<slug>.webp` + `<slug>-<n>.webp` (45 ảnh) · `scripts/build-store-images.mjs` (mới) · `src/lib/gallery.ts` (tự sinh) ·
`src/components/ProductGallery.tsx` (mới, thay `ProductImageZoom.tsx` đã xoá) · `src/lib/images.ts` · `src/lib/schema.ts` ·
`src/app/globals.css` · `src/i18n/ui.ts` · `src/app/[lang]/san-pham/[slug]/page.tsx` · `scripts/build-images.mjs` ·
`scripts/extract-pdf-layers.py` · `HANDOFF.md`

## Files touched (23/09 sáng)
`public/img/*.webp` · `scripts/extract-pdf-layers.py` (mới) · `scripts/build-images.mjs` (mới) · `.gitignore` ·
`src/app/globals.css` · `src/components/ProductImageZoom.tsx` · `src/components/ProductStickyBar.tsx` (mới) ·
`src/components/ProductAction.tsx` · `src/app/[lang]/san-pham/[slug]/page.tsx` · `src/app/[lang]/huong-dan/page.tsx` ·
`src/i18n/ui.ts` · `HANDOFF.md` · ngoài repo: `D:\APP FACTORY\skill-updates\{SKILLS.md, 2026-09-23-skill-update.md, INSTALLED.md}`,
`D:\APP FACTORY\_skillpkg\*.skill`
