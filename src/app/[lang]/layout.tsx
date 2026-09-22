import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { archivo, beVietnamPro } from '../fonts';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ZaloFab from '@/components/ZaloFab';
import JsonLd from '@/components/JsonLd';
import ViewTransitions from '@/components/ViewTransitions';
import { organizationSchema } from '@/lib/schema';
import { SITE_URL } from '@/lib/site';
import { LANGS, alternates } from '@/i18n/routes';
import { ui } from '@/i18n/ui';
import { langOf, type LangParams } from '@/i18n/page';

// Root layout theo ngôn ngữ: /vi (URL không tiền tố) và /en. Ngôn ngữ khác → 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

// noindex,nofollow tới khi Chi cho mở công khai (bản review nội bộ).
export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = ui(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: 'BELLA CELLA Vietnam', template: '%s · BELLA CELLA' },
    description: t.metaDesc,
    robots: { index: false, follow: false },
    alternates: alternates(lang, 'home'),
    openGraph: {
      type: 'website',
      siteName: 'BELLA CELLA',
      locale: t.ogLocale,
      alternateLocale: lang === 'vi' ? 'en_US' : 'vi_VN',
      title: 'BELLA CELLA Vietnam',
      description: t.metaDesc,
    },
  };
}

// Màu thanh trình duyệt/thanh trạng thái iOS–Android theo nền (--paper sáng/tối).
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0C0D0E' },
  ],
  viewportFit: 'cover',
};

const themeInit = `try{var t=localStorage.getItem('bc-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`;

export default async function RootLayout({ children, params }: { children: React.ReactNode } & LangParams) {
  const lang = await langOf(params);
  return (
    <html lang={lang} className={`${archivo.variable} ${beVietnamPro.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <a className="skip" href="#view">{ui(lang).skip}</a>
        <JsonLd data={organizationSchema(lang)} />
        <CartProvider>
          <ViewTransitions>
            <Header lang={lang} />
            <main id="view" tabIndex={-1}>{children}</main>
            <Footer lang={lang} />
            <ZaloFab lang={lang} />
          </ViewTransitions>
        </CartProvider>
      </body>
    </html>
  );
}
