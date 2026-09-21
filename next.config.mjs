/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Ưu tiên AVIF, fallback WebP. Ảnh phục vụ từ public/img/.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
