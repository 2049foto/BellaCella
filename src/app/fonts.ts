import localFont from 'next/font/local';

/* Font tự host — woff2 đã subset latin + latin-ext + vietnamese trong src/fonts/.
   Bỏ request chặn render sang fonts.gstatic.com, build không cần mạng.

   Fallback: KHÔNG dùng bản next/font tự sinh (adjustFontFallback: false).
   Bản tự sinh khớp chiều cao chữ nhưng lệch BỀ RỘNG — đo được: chữ dự phòng của
   Be Vietnam Pro rộng hơn font thật 2,5%. Hệ quả: đoạn văn xuống thêm một dòng,
   khi font thật tải xong thì co lại và đẩy toàn bộ nội dung bên dưới lên 26px
   (CLS 0.17 ở /san-pham). Thay bằng hai @font-face tự khai trong globals.css
   (`bvp-fallback`, `archivo-fallback`) với size-adjust đặt theo tỉ lệ bề rộng đo thật. */

export const archivo = localFont({
  variable: '--font-archivo',
  display: 'swap',
  // Không preload: preload cả bộ ~244KB làm nghẽn băng thông và trì hoãn LCP trên
  // mạng mobile. Fallback đã khớp bề rộng nên font tới muộn cũng không xô lệch gì.
  preload: false,
  adjustFontFallback: false,
  fallback: ['archivo-fallback', 'Segoe UI', 'system-ui', 'sans-serif'],
  src: [
    { path: '../fonts/archivo-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/archivo-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/archivo-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/archivo-700.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/archivo-800.woff2', weight: '800', style: 'normal' },
  ],
});

export const beVietnamPro = localFont({
  variable: '--font-bvp',
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  fallback: ['bvp-fallback', 'Segoe UI', 'system-ui', 'sans-serif'],
  src: [
    { path: '../fonts/bvp-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/bvp-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/bvp-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/bvp-600.woff2', weight: '600', style: 'normal' },
  ],
});
