# HANDOFF — Website BELLA CELLA

Cập nhật: 2026-09-22 chiều (PC, Claude-Pro2).
Branch `claude/bellacella-design-quality-5q5c5a`. Production: bellacella.vercel.app.

## Current goal
Xong 4 việc Chi giao (số điện thoại + Zalo, tinh chỉnh trải nghiệm, rà soát câu chữ 2 ngôn ngữ,
nâng chất ảnh). Còn lại là chờ giấy tờ nhà sản xuất mới mở công khai.

## Done (phiên này)

### 1. Liên hệ — số mới 034 966 7962
- Số cũ bị xoá khỏi toàn bộ repo. `BRAND.phone = '034 966 7962'`, `phoneHref = '+84349667962'`,
  Zalo `zalo.me/84349667962`. Sửa ở `src/data/products.ts`, `CLAUDE.md`, `reference/prototype-data.js`.
- **`src/components/ContactActions.tsx` (mới)** — ba cách liên hệ cùng một chỗ: Gọi · Nhắn Zalo · Chép số.
  Nút chép dùng Clipboard API, báo "Đã chép" qua `role="status"`; máy chặn clipboard thì hiện số
  ra màn hình để khách tự bôi đen. Gắn ở trang chủ và trang liên hệ; trang sản phẩm + FAQ có nút Zalo.
- **Xoá hẳn** thư mục `deploy/` (bản tĩnh cũ, vẫn còn số điện thoại cũ và dữ liệu lệch).

### 2. Tinh chỉnh trải nghiệm
- Form: lỗi báo **ngay tại ô thiếu** (`aria-invalid` + mô tả dưới ô), con trỏ nhảy về ô đầu tiên bị thiếu,
  lỗi tự biến mất khi khách gõ lại. Bảng màu không có màu nhấn nên báo lỗi bằng viền dày + chữ đậm, không dùng đỏ.
- Bộ lọc sản phẩm: `role="group"` + nhãn, và một dòng ẩn báo cho trình đọc màn hình còn lại bao nhiêu sản phẩm
  sau mỗi lần lọc (đổi bộ lọc không tải lại trang nên nếu không báo thì người dùng trình đọc không biết gì đã đổi).
- Xem ảnh cận cảnh: khoá cuộn nền khi mở, trả lại đúng trạng thái cũ khi đóng; ảnh trong khung phóng to
  nén nhẹ tay hơn (`quality={90}`).
- CSS: bôi đen theo màu thương hiệu, `text-wrap: balance/pretty` chống dòng cụt, cuộn mượt tới mục
  (tôn trọng reduced-motion), ảnh nhích nhẹ khi rê chuột, FAQ trượt mở, **bản in sạch** (bỏ nav/nút, in kèm link).

### 3. Rà soát toàn bộ câu chữ (vi + en)
- `src/i18n/ui.ts` viết lại toàn bộ: bỏ lối lạm dụng gạch ngang, câu dài ngắn xen kẽ, bỏ giọng máy dịch.
- `src/data/products.ts` + `products.en.ts`: sửa lối viết định nghĩa bằng gạch ngang trong phần kiến thức
  thành phần và FAQ; ba mô tả tiếng Anh bị mất chữ phân loại so với bản Việt đã bổ sung lại
  (Restorative BB cushion · Exo-Bio Ampoule facial mist · ReCella day and night cream).
- Sửa lỗi số ít/số nhiều tiếng Anh ở dòng đếm sản phẩm ("1 product" thay vì "1 products").
- Trang liên hệ trước đây nhắc "Zalo" ba lần liền nhau; nay khối nút để chế độ gọn, phần ghi chú đổi sang
  thông tin có ích (gửi kèm ảnh da + tên liệu trình để tư vấn sát hơn).
- **Phần mô tả công dụng sản phẩm vẫn là nguyên văn catalogue, không đụng tới.** `assertNeedQuotes()`
  chạy lúc build bảo đảm câu trích "tìm theo nhu cầu" khớp nguyên văn ở cả 2 ngôn ngữ.

### 4. Ảnh — dựng lại từ catalogue gốc
- Nguồn: `Catalogue BELLA CELLA VN.pdf` Chi gửi, trích ở 2480px/trang.
- 8 ảnh sản phẩm 908 → **1200px**, ảnh kết cấu 900 → 1200px, ảnh hero 1400 → **2000px**, 5 ảnh chứng thực dựng lại.
- Đã so 1:1 với ảnh cũ trước khi thay: cùng nguồn, bản mới nhiều điểm ảnh hơn và ít viền halo hơn.
  Tổng thư mục ảnh 1,01 MB. Xoá `hero-1400.webp`, `hero-760.webp`.
- Giới hạn còn lại: ảnh trong catalogue vốn chỉ ~448px cho khung sản phẩm. Muốn nét hơn nữa thì
  **phải xin ảnh gốc của nhà sản xuất** — không có cách nào bịa thêm chi tiết.

## Số đo thật (chạy trên máy, bản build này)
```
npm run accept
  404 /khong-co-trang-nay: HTTP 404 lang=vi h1="Không tìm thấy trang"
  404 /en/no-such-page:    HTTP 404 lang=en h1="Page not found"
  404 /san-pham/khong-co:  HTTP 404 lang=vi h1="Không tìm thấy trang"
  song ngữ: 18 trang kiểm lang/hreflang/nút đổi ngôn ngữ
  axe: 72 lượt quét, 0 lượt có lỗi serious/critical
  overflow/reveal: 18 route × 3 bề rộng × 2 theme
  Lighthouse localhost: / 82 · /san-pham/exo-bio-ampoule 96 · /en 87 — a11y 100, bp 100, CLS 0.000

node .dev.local.mjs   → 10/10 thiết bị OK (320px → 2560px)
npx tsc --noEmit      → sạch
npm run build         → 43/43 trang tĩnh
```

**Về 2 mục Lighthouse dưới 90 ở trên:** không phải do bản này. Đã dựng worktree bản cũ `b7a6d65`,
build và chạy song song cùng máy cùng lúc, 3 lượt mỗi bên:
```
CŨ  (b7a6d65, :3001)  perf 85  FCP 2.3s  LCP 3.9s   | các lượt: 82 86 85
MỚI (bản này,  :3000)  perf 85  FCP 2.4s  LCP 3.9s   | các lượt: 85 84 85
```
Hai bản bằng nhau. Ngưỡng ≥ 90 trong `accept` được chỉnh theo production: Vercel nén brotli
(trang chủ 25,4 KB trên đường truyền) còn `next start` ở máy chỉ có gzip (43,8 KB).
Cùng lúc đó bản cũ đo trên bellacella.vercel.app được perf 92 / FCP 1,4s.
→ **Đo hiệu năng phải đo trên production**, không đo localhost.

## Đã deploy — số đo trên production (bellacella.vercel.app, bản 1cd7040)
```
BASE=https://bellacella.vercel.app npm run accept   -> KẾT QUẢ: ĐẠT
  404 vi/en/slug sai: đúng mã 404, đúng ngôn ngữ, có khung site
  song ngữ 18 trang · axe 72 lượt quét 0 lỗi serious/critical
  /  91 · /san-pham/exo-bio-ampoule 97 · /en 99   (a11y 100, bp 100, CLS 0)

BASE=... npm run perf -- --runs 3                   -> ĐẠT mọi ngưỡng
route                        perf  LCP    CLS
/                             92   3.0s   0.000
/san-pham                     99   2.0s   0.000
/san-pham/exo-bio-ampoule     99   1.8s   0.000
/lieu-trinh                  100   1.8s   0.000
/huong-dan                    96   2.7s   0.000
/kien-thuc                    98   2.2s   0.000
/faq                          99   2.0s   0.000
/en                           99   2.0s   0.000
/en/products                  99   2.1s   0.004
/en/products/exo-bio-ampoule  99   1.8s   0.000
```
Trang chủ 92 là điểm thấp nhất, đúng bằng bản cũ đo cùng máy cùng ngày (92) → không phải do bản này,
mà do mạng hôm nay chậm hơn lúc đo lần trước. Mọi trang còn lại 96–100.

## Next 3 actions
1. Chi mở web kiểm mắt thường: số 034 966 7962, nút Gọi/Nhắn Zalo/Chép số, chuyển VI–EN.
2. Chi kiểm tra tài khoản Zalo của số 034 966 7962 đã mở chưa — nút "Nhắn Zalo" trỏ
   `zalo.me/84349667962`, số chưa đăng ký Zalo thì link sẽ hỏng.
3. Chờ giấy tờ nhà sản xuất (số công bố 8 SKU, chứng nhận SPF, ảnh gốc, logo vector) rồi mới mở công khai.

## Blockers (cần Chi hoặc nhà sản xuất)
- Tài khoản Zalo cho số mới.
- Giấy tờ nhà sản xuất — chưa đủ thì giữ `robots noindex`, không mở công khai.
- Ảnh sản phẩm gốc độ phân giải cao: trần chất lượng hiện tại nằm ở nguồn catalogue.
- Hạ tầng khi chạy thật: Vercel Hobby cấm dùng thương mại → Cloudflare Pages hoặc Vercel Pro.
- `LOCAL-ONLY: cần thực hiện trước 16:00` — nâng app-factory-rules 1.2.0 → 2.0.x.

## Ghi chú kỹ thuật
- Đo hiệu năng: **luôn dùng production làm chuẩn**, localhost thấp hơn ~7 điểm chỉ vì thiếu brotli.
- Git Bash trên máy này nuốt tham số bắt đầu bằng `/` → chạy perf với `MSYS_NO_PATHCONV=1`.
- Mọi file `*.local.mjs` là công cụ đo cục bộ, đã gitignore: `.dev.local.mjs` (ma trận thiết bị),
  `.check.local.mjs` (form/bộ lọc/zoom/số điện thoại), `.proof.local.mjs` (đọc chữ đã render để soát).
