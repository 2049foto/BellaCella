# BELLA CELLA — website

Repo độc lập. Xem `CLAUDE.md` cho stack, design token và nguyên tắc nội dung.

## Bắt đầu

```bash
# 1. Đăng ký marketplace skill (chỉ chạy khi phiên Claude Code khác đã tắt)
#    .claude/settings.json đã khai báo sẵn, chỉ cần tin cậy thư mục này.
/plugin marketplace update
/plugin install example-skills@anthropic-skills

# 2. Kiểm tra skill nào đã load
/skills

# 3. Dựng site
npm create next-app@latest . -- --typescript --tailwind --app --no-src-dir=false
```

## Cấu trúc

```
.claude/settings.json                  marketplace + enabledPlugins (chỉ repo này)
.claude/skills/bella-acceptance/       cổng nghiệm thu, đọc mỗi vòng lặp
src/data/products.ts                   nguồn sự thật nội dung — 8 SKU
src/styles/design-tokens.css           token màu, chữ, khoảng
public/img/                            ảnh WebP đã tối ưu
reference/prototype.html               bản prototype đầy đủ 7 trang, dùng để đối chiếu
```

## Ảnh

Trích từ `Catalogue_BELLA_CELLA_VN.pdf` (2480×3507 @ 300 DPI gốc).
Ảnh sản phẩm 908×~1100 px, nâng bằng Lanczos + unsharp — **không dùng upscaler AI**
để không làm méo chữ trên bao bì. Cần ảnh lớn hơn thì phải xin file gốc từ nhà sản xuất.
