# Kiểm kê skill — PC (Windows profile `2049f`) — 2026-09-22

Nhiệm vụ A1+A2 trong `HANDOFF-PC.md`. **Chỉ đọc, chưa xoá/di chuyển gì.**
File này sẽ chuyển sang repo `2049foto/claude-skills` ở bước A3.

Quét bằng script Node đọc frontmatter mọi `SKILL.md` ở 4 chỗ: tổng **1068 bản SKILL.md**.

## Kết quả xử lý (2026-09-22, Chi xác nhận "2 app trên 1 PC", giao toàn quyền)

- **A3 bỏ**: 2 app dùng chung `~/.claude` → không cần repo `claude-skills`.
- Backup: `~/.claude/backups/skills-bak-2026-09-22.tar.gz` (`.claude/skills` + `.agents`, 548 mục).
- D1 ✅ 19 thư mục → junction (symlink cần admin; junction không cần, cùng loại `npx skills` tạo).
- D6 ✅ gỡ 3 plugin `@expo-plugins`. D7 ✅ tắt `postgres-best-practices`. Context7 ✅ bật.
- D4 ⏸ `app-factory-rules` — chỉ làm khi còn 1 cửa sổ Claude (hook dùng chung). Lệnh ở `skill-updates/2026-09-22-skill-update.md`.
- D2/D3/D5 ⏸ nằm trong repo Gym Coach/Museo — CLAUDE.md BellaCella cấm động tới; đã ghi NOTEFORALL cho phiên Gym Coach.
- D8 để yên. D9 chờ Chi chọn (không gấp).
- Ledger: `D:\APP FACTORY\skill-updates\INSTALLED.md`.

## 0. Phát hiện lớn — đã trả lời: 2 app trên 1 PC

`HANDOFF-PC.md` giả định "2 máy PC". Nhưng trên máy này có **2 app Claude chạy chung một
Windows profile**: `AppData\Roaming\Claude-Pro1` và `Claude-Pro2`, và
`~/.claude/settings.json` ghi rõ: *"Claude 1 và Claude 2 chạy cùng một Windows profile nên
DÙNG CHUNG file này"*.

→ Nếu "2 PC" thực ra là **2 app Claude trên 1 PC** thì `~/.claude/skills` và plugin **đã dùng
chung sẵn** — không cần repo sync giữa 2 máy, chỉ cần dọn trùng lặp. Nếu thật sự có PC vật lý
thứ hai thì mới cần repo `claude-skills` + marketplace.

## 1. Tổng quan theo nguồn

| Nguồn | Số skill | Ghi chú |
|---|---:|---|
| `~/.claude/skills` (cấp user) | 52 | 27 symlink → `~/.agents/skills`, 25 thư mục thật |
| `~/.agents/skills` (kho của `npx skills`, có `.skill-lock.json`) | 46 | Nguồn gốc của các symlink trên |
| Plugin đã cài (`installed_plugins.json`) | 25 plugin / 413 SKILL.md | 17 bật, 8 tắt |
| `D:\APP FACTORY` | 532 SKILL.md | 484 nằm trong `app-003-gym-coach` |

## 2. Skill cấp user (`~/.claude/skills`) — 52

Frontmatter đều hợp lệ (`name` = tên thư mục, có `description`).

| Nhóm | Skill | Nguồn upstream (từ `.skill-lock.json`) | Sửa cuối |
|---|---|---|---|
| App Store Connect CLI (23) | `asc-*` (23 cái) | rudrankriyam/app-store-connect-cli-skills | 07-20 → 09-22 |
| ASO | `aso-appstore-screenshots` | adamlyttleapps/claude-skill-aso-appstore-screenshots | 07-20 |
| App review | `appstore-review` | devsemih/appstore-review-skill | 07-24 |
| React Native (3) | `react-native-core/-ecosystem/-performance` | maikotrindade/awesome-react-native-skills | 07-24 |
| Taste (13) | `brandkit, design-taste-frontend, design-taste-frontend-v1, full-output-enforcement, gpt-taste, high-end-visual-design, image-to-code, imagegen-frontend-mobile, imagegen-frontend-web, industrial-brutalist-ui, minimalist-ui, redesign-existing-projects, stitch-design-taste` | leonxlnx/taste-skill | 07-20 |
| UI/UX Pro Max (7) | `banner-design, brand, design, design-system, slides, ui-styling, ui-ux-pro-max` | nextlevelbuilder/ui-ux-pro-max-skill | 08-24 → 09-22 |
| Superdesign | `superdesign` | superdesigndev/superdesign-skill | 08-24 |
| **Official Anthropic** | `frontend-design` | anthropics/skills | 09-22 |
| Tự viết | `council`, `handoff` | — (không có upstream) | 07-24, 09-07 |

## 3. Plugin đã cài

| Plugin | Version | Bật | SKILL.md | Ghi chú |
|---|---|:-:|---:|---|
| superpowers@superpowers-dev | 6.1.1 | ✅ | 14 | cache còn bản 6.3.0 chưa dùng |
| context7@context7-marketplace | 1.0.2 | ❌ | 1 | **đã cài nhưng TẮT** — brief muốn dùng Context7 |
| posthog@claude-plugins-official | 1.1.58 | ✅ | 137 | |
| github@claude-plugins-official | ed404106 | ❌ | 0 | cache 2 bản |
| typescript-lsp@claude-plugins-official | 1.0.0 | ✅ | 0 | LSP, không có skill |
| expo@claude-plugins-official | 1.12.4 | ✅ | 23 | bản đang dùng |
| expo@expo-plugins | 1.8.0 | ❌ | 20 | **trùng**, cũ hơn |
| expo-deployment@expo-plugins | 1.8.0 | ❌ | 20 | **trùng** (cùng 20 skill) |
| expo-app-design@expo-plugins | 1.8.0 | ❌ | 20 | **trùng** (cùng 20 skill) |
| supabase@supabase-agent-skills | 1ad9aaeb | ✅ | 2 | cache còn bản 8331f910 |
| postgres-best-practices@supabase-agent-skills | 1ad9aaeb | ✅ | 2 | **trùng hệt** 2 skill với plugin `supabase` |
| RevenueCat@RevenueCat | 2.0.0 | ✅ | 16 | |
| revenuecat-play-billing@RevenueCat | 1.0.0 | ❌ | 20 | |
| sentry-mcp@sentry-mcp | ce099fd2 | ❌ | 0 | MCP, không skill |
| app-factory-rules@app-factory-toolkit | **1.2.0** | ✅ | 9 | **CŨ**: nguồn đã 2.0.0/2.0.1, thiếu `context-guard`, `new-app` |
| interface-design@interface-design | 2026.6.20 | ✅ | 1 | |
| ui-design / design-systems / interaction-design / visual-critique @designer-skills | 1.0–1.1 | ✅ | 48 | |
| cognitive-accessibility / adaptive-interfaces / accessible-content @inclusive-design-skills | 1.0.0 | ✅ | 30 | |
| obsidian-second-brain | 0.14.0 | ❌ | 1 | |
| marketing-skills@marketingskills | 2.10.0 | ✅ | 49 | |

Marketplace `withqwerty` (rahulkeerthi/expo-toolkit) đã add nhưng không cài plugin nào.

## 4. `D:\APP FACTORY` — 532 SKILL.md

| Chỗ | Số | Git-tracked? | Nhận xét |
|---|---:|:-:|---|
| `app-003-gym-coach/.claude/skills` | 351 | ✅ (856 file) | Bộ "everything-claude-code" + bản sao 40 skill cấp user. Phần lớn không liên quan (Django, Laravel, Perl, Kubernetes, homelab, healthcare…) |
| `app-003-gym-coach/.agents/skills` | 116 (+ lồng) | ✅ | Tập con của cái trên |
| `app-002-museo/.claude/skills` | 13 | ✅ | `animation-vocabulary, apple-design, canvas-design, emil-design-eng, find-animation-opportunities, frontend-design, impeccable, improve-animations, pick-ui-library, prototype, review-animations, sleek-design-mobile-apps, theme-factory` |
| `app-factory-toolkit/plugins/app-factory-rules` | 11 | (không có remote) | nguồn marketplace `app-factory-toolkit`, plugin.json 2.0.0 |
| `Claude 1/plugins/app-factory-rules` | 11 | — | bản 2.0.1, lệch toolkit ở hooks + `new-app` |
| `Claude 2/plugins/app-factory-rules` | 11 | — | giống hệt `Claude 1` |
| `_archive/sync-backup-Claude1-…` | 1 | — | `new-app` cũ |
| `Website LEBEL/.claude/skills` | 1 | ✅ | `bella-acceptance` — skill riêng project, giữ tại chỗ |

## 5. Trùng lặp (A2) — đề xuất giữ/loại

| # | Trùng | Giữ | Loại / xử lý | Lý do |
|---|---|---|---|---|
| D1 | 19/25 thư mục thật trong `~/.claude/skills` **giống hệt byte** (`diff -rq`) bản ở `~/.agents/skills` (asc-screenshot-resize, asc-shots-pipeline, asc-subscription-localization, asc-wall-submit, asc-whats-new-writer, aso-appstore-screenshots + 13 taste). 6 cái còn lại (appstore-review, council, handoff, react-native ×3) không có bản `.agents` | bản `.agents` (có lock, `npx skills update` được) | đổi 19 thư mục thật thành symlink | 2 bản copy sẽ lệch nhau khi update |
| D2 | `frontend-design` có **3 bản khác nội dung**: user (anthropics/skills, 09-22), museo (08-05), gym (08-24) | bản user (mới nhất, có upstream) | bản trong museo/gym | project-level đè user-level khi mở project đó |
| D3 | 40 skill cấp user bị copy vào `app-003-gym-coach/.claude/skills` (`council`, `design-system` khác nội dung; `design-taste-frontend` giống hệt…) | bản user | xoá khỏi repo gym (commit riêng trong repo gym) | project đè user, 2 nơi update |
| D4 | `app-factory-rules`: 3 bản nguồn (toolkit 2.0.0, Claude 1/2 2.0.1) + cache đang chạy **1.2.0** + archive | 1 nguồn duy nhất (bản 2.0.1) | cập nhật plugin cài đặt; bỏ bản thừa | đang chạy bản cũ nhất, thiếu 2 skill |
| D5 | 9 skill `app-factory-rules` cũng bị copy vào gym (`bug-triage, check-updates, expo-release, handoff-session, improve, mobile-design-system, paywall-audit, supabase-safe-change, verify-before-done`) | plugin | bản trong gym | |
| D6 | Expo: `expo@claude-plugins-official` (bật) + 3 plugin `@expo-plugins` (tắt) chứa cùng 20 skill | `expo@claude-plugins-official` | gỡ 3 plugin tắt | tắt rồi, chỉ tốn chỗ + gây nhầm |
| D7 | `supabase` và `postgres-best-practices` chứa cùng 2 skill | giữ 1 (`supabase`) | tắt/gỡ `postgres-best-practices` | skill hiện 2 lần trong danh sách |
| D8 | Cache plugin nhiều version (superpowers 6.1.1+6.3.0, supabase ×2, github ×2) | — | để Claude Code tự dọn / update | không hại, chỉ tốn chỗ |
| D9 | Chồng chức năng (không trùng tên): `handoff` (user) ↔ `app-factory-rules:handoff-session`; `council` (user) ↔ `anthropic-skills:llm-council` (claude.ai); `design-system` (UI/UX Pro Max) ↔ `design-systems:*` plugin | cần anh chọn | — | trùng chức năng, model dễ gọi nhầm |

Không skill cấp user nào trùng tên với 15 skill claude.ai (`docs, computer-use, …, docx`).

## 6. Skill hỏng / lỗi nhẹ

**Không có SKILL.md nào rỗng, thiếu frontmatter, hay thiếu `name`/`description`** trong cả 1068 bản.
Không có symlink gãy.

Lỗi nhẹ (`name` khác tên thư mục — chạy vẫn được, nhưng lệch tên khi gọi):

| File | `name` trong frontmatter | Thư mục |
|---|---|---|
| RevenueCat 2.0.0 `skills/revenuecat-experiment-analysis` | `experiment-analysis` | revenuecat-experiment-analysis |
| cognitive-accessibility 1.0.0 `skills/adaptive-personalisation` | `contextual-help-design` | adaptive-personalisation — **nội dung sai chỗ**, có thể là bug upstream |
| obsidian-second-brain 0.14.0 (SKILL.md ở root plugin) | — | plugin tắt, bỏ qua |

Lỗi cấu hình (không phải skill hỏng nhưng ảnh hưởng):
- `app-factory-rules` đang chạy **1.2.0**, nguồn đã **2.0.x** → 2 skill mới (`context-guard`, `new-app`) không được nạp.
- `context7` đã cài nhưng **tắt**.

## 7. Nguồn quét chưa được / hạn chế

- Skill cấp tài khoản claude.ai (`anthropic-skills:*`): không có file local, chỉ thấy tên qua danh sách skill của phiên.
- Không đọc nội dung từng skill để đánh giá chất lượng — chỉ frontmatter + md5 so trùng.
