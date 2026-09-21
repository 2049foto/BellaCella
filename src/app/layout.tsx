import type { Metadata } from 'next';
import './globals.css';
import { archivo, beVietnamPro } from './fonts';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFab from '@/components/ZaloFab';

// noindex,nofollow tới khi Chi cho mở công khai (bản review nội bộ).
export const metadata: Metadata = {
  title: { default: 'BELLA CELLA Vietnam', template: '%s · BELLA CELLA' },
  description: 'Giải pháp chăm sóc da chuyên nghiệp dựa trên Exosome từ tế bào gốc thực vật — được nhiều spa và chuyên gia làm đẹp tại Hàn Quốc và Nhật Bản tin tưởng lựa chọn.',
  robots: { index: false, follow: false },
};

const themeInit = `try{var t=localStorage.getItem('bc-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${archivo.variable} ${beVietnamPro.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <CartProvider>
          <Header />
          <main id="view">{children}</main>
          <Footer />
          <ZaloFab />
        </CartProvider>
      </body>
    </html>
  );
}
