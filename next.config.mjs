/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Ảnh phục vụ từ public/img/, chỉ dùng nội bộ.
    formats: ['image/webp'],
  },
};

export default nextConfig;
