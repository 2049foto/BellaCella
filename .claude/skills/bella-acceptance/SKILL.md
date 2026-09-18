---
name: bella-acceptance
description: Cổng nghiệm thu cho website BELLA CELLA. Đọc skill này sau mỗi lần dựng hoặc sửa một trang, trước khi chuyển sang trang tiếp theo. Dùng khi kiểm tra giao diện, chạy vòng lặp tự sửa, hoặc trước khi commit.
---

# Cổng nghiệm thu — website BELLA CELLA

Chạy toàn bộ checklist sau mỗi trang. **Không sang trang tiếp theo khi còn mục chưa đạt.**

## Cách chạy

1. `npm run dev`
2. Playwright chụp 3 breakpoint: 390, 768, 1440
3. Đối chiếu checklist dưới
4. Sửa chỗ lệch, lặp lại
5. Tối đa **3 vòng một trang**. Ba vòng liên tiếp không cải thiện thì dừng và báo người dùng.

## Checklist

- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Không có lỗi axe-core mức serious hoặc critical
- [ ] Ba breakpoint không tràn ngang (`document.documentElement.scrollWidth === clientWidth`)
- [ ] Tỉ lệ tương phản chữ thân ≥ 4.5:1 ở cả nền sáng và nền tối
- [ ] Mọi ảnh sản phẩm có `alt` tiếng Việt chứa đúng tên SKU
- [ ] Giá hiển thị đọc từ `products.ts`, không hardcode trong JSX
- [ ] `npm run build` xanh, không lỗi TypeScript
- [ ] Không dùng màu nào ngoài token trong `design-tokens.css`
- [ ] Không có card, không bo góc, không đổ bóng (trừ nút Zalo nổi)
- [ ] Focus bàn phím thấy được trên mọi link và nút
- [ ] `prefers-reduced-motion` được tôn trọng

## Nguyên tắc nội dung

- [ ] Mọi câu truy được về catalogue — không bịa chứng nhận, số liệu, review
- [ ] Trang liệu trình có ghi rõ đây là quy trình thông thường, không phải chỉ định y khoa
- [ ] Hai mục `needsReview` (Toner Pad, Sun Cushion) hiển thị ghi chú chờ xác nhận

## Giới hạn phạm vi

- [ ] Không tạo, sửa hay xóa file nào ngoài repo này
- [ ] Không ghi vào `~/.claude/`
