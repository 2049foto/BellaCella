/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Ưu tiên AVIF, fallback WebP. Ảnh phục vụ từ public/img/.
    formats: ['image/avif', 'image/webp'],
  },
  // Trang động (/lien-he đọc searchParams) mặc định stream metadata vào body →
  // HTML production không có <title> trong <head> (axe: document-title).
  // Coi mọi user agent như bot: metadata luôn render chặn trong <head>.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
