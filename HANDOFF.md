# HANDOFF — Website BELLA CELLA + kho skill

Cập nhật: 2026-09-22 ~12:05 (PC, Claude-Pro2). Brief: `HANDOFF-PC.md` (A → B → C).
Branch: `claude/bellacella-design-quality-5q5c5a` (đã push). `main` chưa đổi.

## Current goal
Chi duyệt bản preview của branch → merge vào `main` để lên bellacella.vercel.app.

## Done
- **A (kho skill):** Chi xác nhận "2 app trên 1 PC" → không cần repo `claude-skills`.
  Backup + dọn trùng + bật Context7. Chi tiết: `SKILL-INVENTORY.md`.
- **B (quét skill):** `D:\APP FACTORY\skill-updates\2026-09-22-skill-update.md` + `INSTALLED.md`.
  Không có skill official nào bắt buộc cài thêm.
- **C3.1 bảo mật** (`0f40796`): Next 15.5.7 → 15.5.25 (~30 advisory, có RCE), overrides postcss/sharp. `npm audit`: 0.
- **C3.3 Best Practices** (`0f40796`): thêm favicon (monogram B, Archivo 800) → BP trang chủ 96 → 100.
- **Script nghiệm thu** `npm run accept` (`scripts/accept.mjs`): CSS thật sự áp dụng, tràn ngang, reveal, axe, Lighthouse `--runs N`.
- **C1 Tìm theo nhu cầu** (`f07c253`): `/san-pham#theo-nhu-cau` — 7 nhu cầu, 16 gợi ý, mỗi gợi ý trích nguyên văn catalogue; build fail nếu câu trích lệch.

## Số đo (cùng máy PC, Lighthouse mobile, trung vị 3 lần)

| Trang | Perf | A11y | BP | SEO | LCP |
|---|:-:|:-:|:-:|:-:|:-:|
| Trang chủ — baseline `ad7e55b` | 90 (87/90/94) | 100 | 100* | 69 | 3.0s |
| Trang chủ — hiện tại | 89 (89/89/97) | 100 | 100 | 69 | 3.4s |
| PDP — baseline | 93 | 100 | 100 | 69 | 2.9s |
| PDP — hiện tại | 94 | 100 | 100 | 69 | 2.7s |

\* lần đo baseline không bắt được lỗi favicon; lần đo đầu phiên (cùng code) bắt được → BP 96.
SEO 69 = cố ý (noindex). axe: 36 lượt quét, 0 serious/critical. Không tràn ngang 9 route × 3 bề rộng × 2 theme.

## Chưa đạt / chưa làm — và vì sao
- **Perf trang chủ ~89 trên máy này** (dao động 87–97). LCP đo thật chỉ 0.53s; con số 3.4s là LCP *mô phỏng*. Nguyên nhân chính là main thread parse ~47KB dữ liệu RSC inline (overhead chuẩn của Next). Đã thử `experimental.inlineCss`: không cải thiện → đã xoá. Không phải hồi quy (baseline cùng máy 90). Số 99–100 trong brief đo ở môi trường cloud khác.
- **C2 pháp lý:** QĐ 610/QĐ-QLD thu hồi 313 số công bố của 14 doanh nghiệp (tự nguyện). Không doanh nghiệp nào mang tên BELLA CELLA / LJL (nguồn: suckhoeviet.org.vn). **Chưa đối chiếu được từng số** vì chưa có số tiếp nhận của 8 SKU.
- **needsReview** (Toner Pad 200/180ml, Sun Cushion 200ml): vẫn chờ nhà sản xuất — không tự sửa.
- **app-factory-rules** 1.2.0 → 2.0.x: chỉ làm khi còn 1 cửa sổ Claude.

## Next 3 actions
1. Chi mở preview của branch trên Vercel (dashboard: https://vercel.com/derexeths-projects/bellacella), xem `/san-pham#theo-nhu-cau` → duyệt.
2. Duyệt xong: merge branch vào `main` (Vercel tự deploy production, vẫn noindex).
3. Xin nhà sản xuất: số tiếp nhận phiếu công bố 8 SKU + chứng nhận SPF Sun Cushion → đối chiếu QĐ 610 + tra cứu dav.gov.vn.

## Blockers (chỉ Chi)
- Giấy tờ nhà sản xuất (số công bố, SPF, ảnh gốc, logo vector) — chặn việc mở site công khai.
- Merge vào `main` = cập nhật site review đang chạy → chờ Chi duyệt.

## Files touched (phiên này)
- Repo: `package.json`, `package-lock.json`, `.gitignore`, `scripts/accept.mjs`, `src/app/{favicon.ico,icon.png,apple-icon.png}`, `src/app/globals.css`, `src/app/san-pham/page.tsx`, `src/data/products.ts`, `SKILL-INVENTORY.md`, `HANDOFF.md`
- Ngoài repo: `~/.claude/skills` (junction), `~/.claude/settings.json` (plugin), `~/.claude/backups/`, `D:\APP FACTORY\skill-updates\*`, `D:\APP FACTORY\NOTEFORALL.md`
