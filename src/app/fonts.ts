import localFont from 'next/font/local';

/* Font tự host — woff2 đã subset latin + latin-ext + vietnamese trong src/fonts/.
   Bỏ request chặn render sang fonts.gstatic.com, build không cần mạng.
   next/font tự sinh fallback có size-adjust/ascent-override để tránh nhảy chữ (CLS). */

export const archivo = localFont({
  variable: '--font-archivo',
  display: 'swap',
  // Không preload cả bộ: preload 9 file ~230KB làm nghẽn băng thông và trì hoãn LCP
  // trên mạng mobile. Font tự host cùng origin + display:swap + fallback đã chỉnh
  // size-adjust nên tải theo nhu cầu là đủ, LCP không phải chờ font.
  preload: false,
  fallback: ['Segoe UI', 'system-ui', 'sans-serif'],
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
  fallback: ['Segoe UI', 'system-ui', 'sans-serif'],
  src: [
    { path: '../fonts/bvp-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/bvp-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/bvp-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/bvp-600.woff2', weight: '600', style: 'normal' },
  ],
});
