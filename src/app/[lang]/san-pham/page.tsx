import type { Metadata } from 'next';
import Link from 'next/link';
import ProductFilter from '@/components/ProductFilter';
import { content, assertNeedQuotes } from '@/i18n/content';
import { href } from '@/i18n/routes';
import { ui } from '@/i18n/ui';
import { langOf, pageMeta, type LangParams } from '@/i18n/page';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = ui(lang).list;
  return pageMeta(lang, 'products', t.title, t.metaDesc);
}

// Chạy lúc build: câu trích lệch catalogue (vi hoặc en) thì build fail, không lên trang.
assertNeedQuotes();

export default async function ProductListPage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = ui(lang).list;
  const c = content(lang);
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="ptitle">{t.title}</h1>
          <p className="lede">{t.lede} <a href="#theo-nhu-cau" className="inline">{t.ledeLink}</a>.</p>
        </div>
        <h2 className="sr-only">{t.listSr}</h2>
        <ProductFilter products={c.products} lang={lang} />
      </section>

      <section className="block" id="theo-nhu-cau" aria-labelledby="needs-h">
        <div className="shead">
          <div className="eyebrow">{t.needsEyebrow}</div>
          <h2 id="needs-h">{t.needsH}</h2>
          <p className="lede">{t.needsLede}</p>
        </div>
        {c.needs.map((n) => (
          <div className="need" key={n.key}>
            <h3>{n.label}</h3>
            <ul>
              {n.picks.map(({ slug, quote }) => (
                <li key={slug}>
                  <Link href={href(lang, 'products', slug)}>{c.bySlug(slug)!.name}</Link>
                  <q>{quote}</q>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="note" style={{ maxWidth: '74ch', marginTop: '26px' }}>{t.needsNote}</div>
      </section>
    </div>
  );
}
