# BELLA CELLA — Website thương hiệu

> Project **độc lập**. Không liên quan tới repo Ai Gym Coach.
> KHÔNG sync ngược skill, settings hay CLAUDE.md sang repo Ai Gym Coach.
> Mọi lệnh chỉ được tác động trong thư mục repo này.

## Sản phẩm là gì

Website giới thiệu và bán mỹ phẩm BELLA CELLA (cosmeceutical Hàn/Nhật, hoạt chất
trung tâm là Exosome từ tế bào gốc thực vật), phân phối tại Việt Nam.
8 SKU, giá 600.000 – 7.000.000 VND. Kênh chính là spa và phòng điều trị;
sản phẩm được dùng làm bước chăm sóc tại nhà sau liệu trình.

Liên hệ chính thức: 034 966 7962 · ljlbeauty.vn

## Stack

| Lớp | Chọn |
| --- | --- |
| Framework | Next.js 15 App Router + TypeScript |
| CSS | Tailwind v4, token khai báo trong `src/styles/design-tokens.css` |
| Component | shadcn/ui |
| Ảnh | `next/image`, nguồn WebP trong `public/img/` |
| Nội dung | `src/data/products.ts` — nguồn sự thật duy nhất |
| Chuyển động | CSS thuần, tối giản |
| Deploy | Vercel (duyệt nội bộ, bật Vercel Authentication) → Cloudflare Pages (chạy thật) |

**Vercel Hobby cấm dùng thương mại.** Chỉ dùng để duyệt riêng tư. Khi mở bán
công khai: Cloudflare Pages (miễn phí, cho phép thương mại) hoặc Vercel Pro.

## Quy ước design token

Token nằm trong `src/styles/design-tokens.css`. **Không hardcode màu trong JSX.**
Không thêm màu mới ngoài danh sách này.

| Token | Sáng | Vai trò |
| --- | --- | --- |
| `--paper` | `#FFFFFF` | Nền chính |
| `--paper-2` | `#F6F7F8` | Khối ảnh sản phẩm, section xen kẽ |
| `--paper-3` | `#EEF0F2` | Nền nhấn nhẹ |
| `--ink` | `#101112` | Wordmark, tiêu đề |
| `--ink-2` | `#3A3D40` | Thân bài |
| `--ink-3` | `#8C9094` | Dung tích, chú thích ảnh |
| `--rule` | `#E3E6E8` | Đường kẻ 1px |
| `--rule-strong` | `#C9CED2` | Viền nhấn |

- **Không có màu nhấn.** Màu duy nhất trên trang là màu của sản phẩm trong ảnh.
- Neutral lệch lạnh nhẹ, theo sắc xanh xám của bao bì DR.BECELL. Không dùng grey trung tính.
- Bo góc `0`. Không đổ bóng, trừ nút Zalo nổi.
- Chữ: `Archivo` cho tiêu đề, `Be Vietnam Pro` cho thân bài. Không serif, không Inter.
- Tracking: `0.2em` cho wordmark, `0.16em` cho nhãn viết hoa.
- Ngữ pháp bố cục mượn từ catalogue: đường kẻ 1px phía trên mỗi khối, text trái / ảnh phải.
  Không dùng card.

## Kiến trúc sẵn cho giỏ hàng

Giỏ hàng **chưa bật**. Ba điểm chuẩn bị, giữ nguyên khi phát triển:

1. Mỗi sản phẩm trong `products.ts` đã có `id`, `sku`, `price`, `inStock`.
2. Mỗi thẻ sản phẩm gọi `<ProductAction product={p} />`. Component này đọc
   `COMMERCE_ENABLED`; hiện render "Nhận tư vấn", bật cờ thì render "Thêm vào giỏ".
3. `CartProvider` bọc ngoài cùng ở layout, hiện chưa làm gì.

Khi bật bán online: Việt Nam dùng MoMo, ZaloPay, VNPay và COD.
Cổng thanh toán cần giấy phép kinh doanh và tài khoản doanh nghiệp — không phải việc code.

## Giấy tờ và trạng thái mở site

- 23/09/2026: Chi báo hãng đã cho phép dùng ảnh, nội dung và mọi thủ tục giấy phép.
- Chi chọn **chưa mở công khai**: giữ bellacella.vercel.app, giữ `noindex`, giữ nút "Nhận tư vấn",
  `COMMERCE_ENABLED=false`. Mua domain / lên Vercel Pro là quyết định của Chi, làm sau.
- Ảnh sản phẩm lấy từ cửa hàng chính hãng bellacella.store (`scripts/build-store-images.mjs`).
- Dung tích và cách dùng lấy từ trang sản phẩm bellacella.store (bảng 상품정보제공고시, mục 사용방법).
  Catalogue cũ ghi sai 3 dung tích (Toner Pad 200ml → 180ml/70 miếng, Sun Cushion 200ml → 25g,
  Recella 24ml → 2g × 30 gói); số trên site theo bảng chính hãng.
- Chưa có trên site: số tiếp nhận phiếu công bố, bản chứng nhận SPF, bảng thành phần đầy đủ (INCI).
  Chỉ đưa lên khi Chi gửi bản giấy tờ — không tự điền.

## Nguyên tắc nội dung — bắt buộc

**Mọi câu trên trang phải truy được về catalogue chính thức hoặc cửa hàng chính hãng bellacella.store.**
Không bịa chứng nhận. Không bịa số liệu clinical. Không bịa review hay testimonial.
Không suy diễn chỉ định y khoa sau thủ thuật — thứ tự sản phẩm chỉ là quy trình
chăm sóc thông thường, phải ghi rõ là theo hướng dẫn của chuyên gia điều trị.
