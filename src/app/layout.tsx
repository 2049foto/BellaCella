import type { Metadata, Viewport } from 'next';
import './globals.css';
import { archivo, beVietnamPro } from './fonts';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFab from '@/components/ZaloFab';
import JsonLd from '@/components/JsonLd';
import ViewTransitions from '@/components/ViewTransitions';
import { organizationSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';

const DEFAULT_DESC = 'Giải pháp chăm sóc da chuyên nghiệp dựa trên Exosome từ tế bào gốc thực vật — được nhiều spa và chuyên gia làm đẹp tại Hàn Quốc và Nhật Bản tin tưởng lựa chọn.';

// noindex,nofollow tới khi Chi cho mở công khai (bản review nội bộ).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'BELLA CELLA Vietnam', template: '%s · BELLA CELLA' },
  description: DEFAULT_DESC,
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    siteName: 'BELLA CELLA',
    locale: 'vi_VN',
    title: 'BELLA CELLA Vietnam',
    description: DEFAULT_DESC,
    url: SITE_URL,
  },
};

// Màu thanh trình duyệt/thanh trạng thái iOS–Android theo nền (--paper sáng/tối).
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0C0D0E' },
  ],
  viewportFit: 'cover',
};

const themeInit = `try{var t=localStorage.getItem('bc-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${archivo.variable} ${beVietnamPro.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a className="skip" href="#view">Bỏ qua, tới nội dung chính</a>
        <JsonLd data={organizationSchema()} />
        <CartProvider>
          <ViewTransitions>
            <Header />
            <main id="view" tabIndex={-1}>{children}</main>
            <Footer />
            <ZaloFab />
          </ViewTransitions>
        </CartProvider>
      </body>
    </html>
  );
}
