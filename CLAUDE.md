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

## Việc chưa xong, cần giấy tờ từ nhà sản xuất

- Số tiếp nhận phiếu công bố sản phẩm mỹ phẩm cho cả 8 SKU.
- Bản chứng nhận SPF cho Sun Cushion (catalogue ghi "chứng nhận an toàn của Hàn Quốc").
- Ảnh sản phẩm gốc độ phân giải cao và logo vector.
- **Không mở site công khai trước khi có đủ giấy tờ trên.**

Hai chỗ mâu thuẫn trong catalogue, đã đánh dấu `needsReview` trong dữ liệu:
Toner Pad ghi 200ml nhưng nhãn ghi 180ml/70EA; Sun Cushion ghi 200ml cho dạng phấn nước.

## Nguyên tắc nội dung — bắt buộc

**Mọi câu trên trang phải truy được về catalogue chính thức.**
Không bịa chứng nhận. Không bịa số liệu clinical. Không bịa review hay testimonial.
Không suy diễn chỉ định y khoa sau thủ thuật — thứ tự sản phẩm chỉ là quy trình
chăm sóc thông thường, phải ghi rõ là theo hướng dẫn của chuyên gia điều trị.
