import type { MetadataRoute } from 'next';
import { BRAND } from '@/data/products';

// Web App Manifest: "Thêm vào màn hình chính" trên iOS/Android hiện đúng tên, icon, màu.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BELLA CELLA Vietnam',
    short_name: BRAND.name,
    description: BRAND.tagline_vi,
    lang: 'vi',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
