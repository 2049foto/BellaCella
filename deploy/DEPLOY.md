# Deploy bản review lên Vercel

Thư mục này là site tĩnh hoàn chỉnh, deploy được ngay. Không cần build.

## Cách 1 — mày tự deploy (không phải đưa token cho ai)

```powershell
cd "D:\APP FACTORY\Website LEBEL\deploy"
npx vercel login       # mở browser, đăng nhập 1 lần
npx vercel --prod
```

Xong. Vercel in ra link, mở trên điện thoại để duyệt.

## Cách 2 — tao deploy hộ

Tạo token tại https://vercel.com/account/tokens (scope: Full Access, hạn 1 ngày),
gửi tao. Tao deploy rồi đưa link. Xong thì vào đó xoá token.

## Lưu ý đã cài sẵn

- `noindex,nofollow` trong `<head>` — Google sẽ KHÔNG index bản review này.
  Xoá dòng đó khi mở công khai.
- Nên bật **Vercel Authentication** trong Project Settings → Deployment Protection,
  vì gói Hobby cấm dùng thương mại; ở chế độ riêng tư thì đây là bản nháp, không phải
  trang bán hàng.
- `vercel.json` đã đặt cache 1 năm cho `/img/*`.

## Khi mở bán công khai

Gói Hobby không dùng được cho mục đích thương mại. Chọn một trong hai:
- **Cloudflare Pages** — miễn phí, cho phép thương mại, băng thông không giới hạn.
  Kéo thả đúng thư mục này là chạy.
- **Vercel Pro** — 20 USD/tháng, tặng tên miền năm đầu.
