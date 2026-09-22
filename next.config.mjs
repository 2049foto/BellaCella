/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // CSS của trang chỉ ~9KB nhưng nằm trên đường chặn render: 2 lượt tải nối tiếp
  // (~300ms + 150ms trên mạng chậm). Nhúng thẳng vào HTML, bỏ hẳn 2 lượt đó.
  experimental: { inlineCss: true },
  images: {
    // Ưu tiên AVIF, fallback WebP. Ảnh phục vụ từ public/img/.
    formats: ['image/avif', 'image/webp'],
  },
  // Trang động (/lien-he đọc searchParams) mặc định stream metadata vào body →
  // HTML production không có <title> trong <head> (axe: document-title).
  // Coi mọi user agent như bot: metadata luôn render chặn trong <head>.
  htmlLimitedBots: /.*/,
  // Font OG đọc bằng fs theo process.cwd() — trình trace không tự thấy, phải khai báo.
  outputFileTracingIncludes: { '/*': ['./src/fonts/og/*.ttf'] },
  // Header bảo mật cho mọi đường dẫn. CSP không siết script (Next dùng inline script
  // để hydrate) — chỉ chặn nhúng iframe, plugin, đổi base URL và form gửi ra ngoài.
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'; upgrade-insecure-requests" },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
      ],
    }];
  },
};

export default nextConfig;
