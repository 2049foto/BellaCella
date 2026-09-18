# Prompt cho Claude Code CLI — dựng website BELLA CELLA

Dán toàn bộ khối dưới vào Claude Code sau khi đã `cd "D:\APP FACTORY\Website LEBEL"`.
Hoặc ngắn gọn hơn: nói với Claude Code "đọc PROMPT.md và làm theo từ đầu đến cuối".

---

Đọc `CLAUDE.md`, `src/data/products.ts`, `src/styles/design-tokens.css`,
`reference/prototype.html` và `reference/prototype-data.js` TRƯỚC khi viết dòng code nào.
`reference/prototype.html` là bản prototype 9 trang đã được duyệt — dựng lại đúng nó
bằng Next.js, đừng thiết kế lại.

## GIỚI HẠN — vi phạm là dừng ngay

- Chỉ tác động trong thư mục repo này. KHÔNG đọc/ghi thư mục nào khác, đặc biệt KHÔNG
  đụng repo Ai Gym Coach.
- KHÔNG ghi vào `~/.claude/` (config global, dùng chung với phiên Claude Code khác).
- KHÔNG thêm màu, font hay hiệu ứng chuyển động ngoài `src/styles/design-tokens.css`.
- KHÔNG bịa chứng nhận, số liệu clinical, review hay testimonial. Mọi câu phải truy được
  về `products.ts` hoặc `prototype-data.js`.
- KHÔNG suy diễn chỉ định y khoa. Thứ tự sản phẩm là quy trình chăm sóc thông thường.
- Giữ `COMMERCE_ENABLED = false`. Không dựng luồng thanh toán.

## GIAI ĐOẠN 1 — config skill cấp project

Chạy `.\claude-setup\install.ps1` (tạo `.claude\settings.json` và skill nghiệm thu).

Sau đó, CHỈ KHI phiên Claude Code của Ai Gym Coach đã tắt — hỏi tôi xác nhận trước:

```
/plugin marketplace update
/plugin install example-skills@anthropic-skills
/skills
```

Báo tôi danh sách skill đã load, và xác nhận không có skill nào của Gym Coach lẫn vào.

## GIAI ĐOẠN 2 — scaffold

Next.js 15 App Router + TypeScript + Tailwind v4. Giữ nguyên `src/data/`, `src/styles/`,
`public/img/` đang có — đừng ghi đè. Import `design-tokens.css` vào global CSS.
Font: Archivo (tiêu đề) + Be Vietnam Pro (thân bài) qua `next/font/google`.

## GIAI ĐOẠN 3 — chuyển dữ liệu còn thiếu sang TypeScript

`reference/prototype-data.js` có 3 khối CHƯA nằm trong `products.ts`. Chuyển sang
TypeScript có type đầy đủ, giữ nguyên từng chữ:

- `USAGE` — hướng dẫn dùng 8 sản phẩm (giữ cờ `usageSource: 'general'`)
- `KNOWLEDGE` — 4 khối kiến thức thành phần, kèm `evidence[]` và `sources[]`
- `FAQ` — 9 câu hỏi đáp

## GIAI ĐOẠN 4 — dựng 9 route

```
/                      hero · triết lý · 8 sản phẩm · quy trình 8 bước · chứng thực · tìm hiểu thêm · liên hệ
/san-pham              danh sách 8 SKU, lọc theo nhóm
/san-pham/[slug]       chi tiết: thành phần, công dụng, cách dùng, ghi chú needsReview
/lieu-trinh            quy trình 8 bước + lưu ý không phải chỉ định y khoa
/huong-dan             hướng dẫn dùng từng sản phẩm
/kien-thuc             kiến thức thành phần + bằng chứng + nguồn có link
/faq                   9 câu hỏi đáp
/chuyen-gia            dành cho spa, có form đăng ký
/lien-he               form tư vấn + Zalo + điện thoại
```

Component bắt buộc tách riêng:
- `<ProductAction product={p} />` — đọc `COMMERCE_ENABLED`; false thì render "Nhận tư vấn"
  trỏ `/lien-he?sp=slug`, true thì render "Thêm vào giỏ".
- `<CartProvider>` bọc ngoài cùng trong `layout.tsx`, hiện chưa làm gì.
- `<ZaloFab />` nút Zalo nổi mọi trang.
- Footer PHẢI ghi: website của đại lý phân phối tại Việt Nam, thương hiệu thuộc nhà sản xuất.

Ảnh: dùng `next/image` đọc từ `public/img/`. Ảnh hero có 2 cỡ (`hero-1400`, `hero-760`).
`alt` tiếng Việt chứa đúng tên SKU.

## GIAI ĐOẠN 5 — vòng lặp nghiệm thu

Sau MỖI trang: `npm run dev`, dùng Playwright chụp 390 / 768 / 1440, đọc lại
`.claude\skills\bella-acceptance\SKILL.md`, sửa chỗ lệch, lặp lại.

Tối đa **3 vòng một trang**. Ba vòng liên tiếp không cải thiện thì DỪNG và báo tôi.
Chỉ sang trang tiếp theo khi trang hiện tại đạt hết checklist.

Báo tôi sau mỗi trang xong — đừng chờ hết mới báo.

## GIAI ĐOẠN 6 — deploy Vercel

```
npm run build
npx vercel login
npx vercel --prod
```

Sau khi deploy xong, vào Vercel Project Settings → Deployment Protection, bật
**Vercel Authentication**. Lý do: gói Hobby cấm dùng cho mục đích thương mại, nên bản
review phải ở chế độ riêng tư. Giữ `noindex,nofollow` trong metadata cho tới khi tôi
nói mở công khai.

Đưa tôi link deploy.

## GIAI ĐOẠN 7 — báo cáo

1. Skill nào đã load, ở tầng nào (project hay global)
2. Trang nào đạt checklist, trang nào còn nợ mục gì
3. Điểm Lighthouse từng trang
4. Link deploy
5. Việc gì cần tôi quyết

## ĐANG CHỜ, ĐỪNG TỰ ĐIỀN

- Số tiếp nhận phiếu công bố mỹ phẩm 8 SKU — tôi đang xin nhà sản xuất
- Chứng nhận SPF cho Sun Cushion
- Toner Pad: catalogue ghi 200ml, nhãn ghi 180ml/70EA — chưa xác nhận
- Sun Cushion: catalogue ghi 200ml cho dạng phấn nước — chưa xác nhận

Hai mục cuối đã đánh dấu `needsReview` trong `products.ts` — hiển thị ghi chú chờ xác
nhận trên trang chi tiết, đừng tự sửa số.

Ảnh sản phẩm bản độ phân giải cao hơn có thể được thêm vào `public/img/` sau. Đọc đường
dẫn ảnh từ dữ liệu, đừng hardcode trong JSX, để thay ảnh không phải sửa component.
