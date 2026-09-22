import Link from 'next/link';
import { href, type Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

// Nội dung trang 404 — dùng chung cho not-found.tsx và trang khong-ton-tai.
export default function NotFoundView({ lang }: { lang: Lang }) {
  const t = ui(lang).notFound;
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="eyebrow">404</div>
        <h1 style={{ marginTop: '12px' }}>{t.h}</h1>
        <p className="lede" style={{ marginTop: '14px' }}>{t.p}</p>
        <div className="btnrow"><Link className="btn solid" href={href(lang, 'products')}>{t.cta}</Link></div>
      </section>
    </div>
  );
}
