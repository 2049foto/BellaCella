# HANDOFF — Website BELLA CELLA

Cập nhật: 2026-09-23 (PC, Claude-Pro2).
Branch `main` (đã đẩy, Vercel đã build) · nhánh làm việc `claude/bellacella-design-quality-5q5c5a` = `main`.
Production: bellacella.vercel.app (vẫn noindex, COMMERCE_ENABLED=false).
Lịch sử các phiên trước: `git log`.

## Current goal
Chi (23/09 chiều): hãng đã cho phép mọi giấy tờ/ảnh. "Hoàn thiện website xong luôn" nhưng **KHÔNG mở công khai**:
giữ bellacella.vercel.app, giữ noindex, giữ nút "Nhận tư vấn" (Chi mua domain / lên Vercel Pro sau, hiện dùng cá nhân).

## Done (23/09 chiều, commit local, CHƯA push)
- Dung tích theo bảng thông tin chính hãng (상품정보제공고시 trên bellacella.store): Toner Pad **180ml / 70 miếng**
  (SKU BC-TONERPAD-180), Sun Cushion **25g**, Recella **2g × 30 gói**. 5 SKU còn lại khớp (BB Cushion store không có bảng, giữ 15g).
- Xoá hẳn cơ chế needsReview (type, dữ liệu vi/en, khối UI trên trang sản phẩm, chuỗi `pending`). `npx tsc --noEmit` đạt.

## In progress — thay hướng dẫn dùng chung bằng cách dùng CHÍNH HÃNG
File: `src/data/products.ts` (USAGE, bỏ field `usageSource` + sửa comment), `src/data/products.en.ts` (USAGE_EN),
`src/i18n/ui.ts` (`usageNote` vi/en; `note`/`noteStrong` trang hướng dẫn: bỏ câu "không phải hướng dẫn chính thức").
Bản dịch từ mục 사용방법 của hãng (đã đọc từ ảnh, dùng nguyên):
- Cleanser: làm ướt mặt bằng nước ấm · bơm 2–3 lần lấy bọt ra lòng bàn tay · massage nhẹ khắp mặt · rửa sạch bằng nước ấm.
- Toner Pad: lau nhẹ toàn mặt bằng mặt nhám · lật sang mặt mịn lau lại một lần · đậy kín nắp, để hũ đứng · da nhạy cảm: 2 lần/tuần, không dùng hằng ngày.
- Exo-Bio Ampoule: kéo nắp theo chữ UP để mở hẳn, lắp đầu nhỏ giọt (cẩn thận nắp nhôm) · thoa đều khắp mặt · massage nhẹ cho thấm.
- NMN Mask: sau rửa mặt dùng toner · trải mặt nạ, đặt khớp mắt và miệng, áp sát khắp mặt · 15–20 phút tháo ra · vỗ nhẹ phần tinh chất còn lại cho thấm.
- Sun Cushion: lấy lượng vừa đủ ra bông phấn · vỗ nhẹ dàn đều · dặm lại nhiều lần khi cần.
- BB Cushion: nhấn nút bên phải tấm đệm trong hộp để kem đẩy lên · lấy vừa đủ bằng bông phấn, vỗ dàn đều vùng cần tạo tông ·
  TIP của hãng: da thở được, có thể thoa sau thủ thuật cho da và để qua đêm.
- Mist: lắc lên xuống 3–5 lần · hơi ngửa mặt, nhắm mắt, xịt 4–5 lần cách 10–20cm · vỗ nhẹ cho thấm · nín thở khi xịt để sương không vào mũi/miệng.
- Recella: xé gói theo đường răng cưa · thoa lượng vừa đủ lên mặt và cổ cho thấm · làm mặt nạ ngủ: thoa đều ~1 gói (2g), không lau, sáng hôm sau rửa mặt nhẹ.
(`when` giữ theo quy trình; mặt nạ đổi "2–3 lần mỗi tuần" → "Sau bước làm sạch và toner" vì hãng không ghi tần suất.)

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
- Store ghi Toner Pad **180ml / 70 miếng** — khớp nhãn, lệch catalogue (200ml). Dữ liệu chưa đổi, vẫn `needsReview`.

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

## Số đo thật (production, bản cuối 979c3cc)
```
BASE=https://bellacella.vercel.app npm run accept
  404 ×3 đúng · song ngữ 18 trang · axe 72 lượt, 0 lỗi serious/critical · overflow 18 route × 3 bề rộng × 2 theme
  KẾT QUẢ: ĐẠT
BASE=https://bellacella.vercel.app npm run perf -- --runs 3        → KẾT QUẢ: ĐẠT mọi ngưỡng
  / 95 · /san-pham 99 · /san-pham/exo-bio-ampoule 99 · /lieu-trinh 100 · /huong-dan 100 · /kien-thuc 100
  /faq 99 · /en 99 · /en/products 99 · /en/products/exo-bio-ampoule 99 — a11y 100, bp 100, CLS ≤ 0,004
node .cls.local.mjs (Chrome như Lighthouse, 10 lượt, production)  → 0/10 lượt nhảy bố cục
node .gallery.local.mjs → bộ ảnh 8 ảnh, chuyển ảnh / xem lớn / phím / đóng giữ ảnh đúng, 0 lỗi console
node .dev.local.mjs     → 10/10 thiết bị OK (320 → 2560px)
```
Lỗi đã bắt được và sửa trong lượt này: bộ ảnh mới làm trang sản phẩm nhảy bố cục trên điện thoại (CLS 0,3,
perf 82) — khung ảnh căn giữa bằng margin auto mà thiếu `width: 100%` nên co còn 28px lúc ảnh chưa giải mã.
SEO 69 là do noindex có chủ đích (chưa mở công khai).

## In progress
Không có việc dở.

## Next 3 actions
1. Viết USAGE / USAGE_EN / usageNote / note theo bản dịch ở trên → `npx tsc --noEmit` → `npm run build` → `npm run accept`.
2. Commit, `git push origin main` + `git push origin main:claude/bellacella-design-quality-5q5c5a`, chờ Vercel,
   `BASE=https://bellacella.vercel.app npm run accept`.
3. Sửa CLAUDE.md mục "Việc chưa xong": hãng đã cho phép (Chi 23/09); site vẫn riêng tư theo lựa chọn của Chi.
   Gợi ý thêm: xin Chi danh sách thành phần đầy đủ (INCI) trong phiếu công bố để thêm mục "Thành phần đầy đủ".

## Blockers
- Chi chưa muốn mở công khai: giữ noindex, Vercel Hobby, bellacella.vercel.app.
- MCP RevenueCat, expo, supabase cần anh uỷ quyền (claude.ai → Settings → Connectors, hoặc `/mcp` trong terminal `claude`).
- Tài khoản Zalo cho 034 966 7962 phải tồn tại thì nút Zalo mới dùng được.

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
