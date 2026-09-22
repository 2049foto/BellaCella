import type { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { content } from '@/i18n/content';
import { href } from '@/i18n/routes';
import { ui } from '@/i18n/ui';
import { langOf, pageMeta, type LangParams } from '@/i18n/page';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = ui(lang).routine;
  return pageMeta(lang, 'routine', t.title, t.metaDesc);
}

export default async function RoutinePage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = ui(lang).routine;
  const c = content(lang);
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="ptitle">{t.title}</h1>
          <p className="lede">{t.lede}</p>
        </div>
        <div className="steps">
          {c.steps.map((s) => {
            const p = c.bySlug(s.slug)!;
            return (
              <Link className="step" href={href(lang, 'products', s.slug)} key={s.n}>
                <span className="num"><span className="sr-only">{ui(lang).product.stepSr}</span>{String(s.n).padStart(2, '0')}</span>
                <span className="lab">{s.label}</span>
                <span className="pn">{p.name}<br /><span style={{ color: 'var(--ink-3)', fontSize: '11px' }}>{p.size}</span></span>
              </Link>
            );
          })}
        </div>
        <div className="note" style={{ maxWidth: '74ch', marginTop: '28px' }}>
          <strong>{t.noteStrong}</strong> {t.note}
        </div>
      </section>
      <section className="block">
        <div className="shead"><div className="eyebrow">{t.setEyebrow}</div><h2>{t.setH}</h2></div>
        <div className="pgrid">{c.products.map((p) => <ProductCard key={p.id} product={p} lang={lang} />)}</div>
      </section>
    </div>
  );
}
