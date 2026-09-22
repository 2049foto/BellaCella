import Link from 'next/link';
import { BRAND } from '@/data/products';
import { zaloUrl } from '@/lib/brand';
import { href, type Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

const LINK_KEYS = ['products', 'routine', 'usage', 'knowledge', 'faq', 'pro'] as const;

// Footer bắt buộc ghi rõ: website của đại lý phân phối tại VN, thương hiệu thuộc nhà sản xuất.
export default function Footer({ lang }: { lang: Lang }) {
  const t = ui(lang).footer;
  const year = new Date().getFullYear();
  return (
    <footer className="site">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <div className="mark" style={{ fontSize: '17px' }}>{BRAND.name}<small>{BRAND.descriptor}</small></div>
            <p style={{ marginTop: '16px', fontSize: '13.5px', maxWidth: '34ch', color: 'var(--ink-3)' }}>{t.blurb}</p>
          </div>
          <div>
            <h2>{t.explore}</h2>
            {LINK_KEYS.map((k) => <Link key={k} href={href(lang, k)}>{t.links[k]}</Link>)}
          </div>
          <div>
            <h2>{t.contact}</h2>
            <a href={`tel:${BRAND.phoneHref}`}>{BRAND.phone}</a>
            <a href={zaloUrl} target="_blank" rel="noopener">{ui(lang).zalo}</a>
            <Link href={href(lang, 'contact')}>{t.enquiry}</Link>
          </div>
        </div>
        <div className="fbot">
          <span>© {year} BELLA CELLA · {BRAND.site}</span>
          <span style={{ maxWidth: '62ch', textAlign: 'right' }}>{t.legal}</span>
        </div>
      </div>
    </footer>
  );
}
