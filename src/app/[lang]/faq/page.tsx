import type { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/data/products';
import JsonLd from '@/components/JsonLd';
import { faqSchema } from '@/lib/schema';
import { content } from '@/i18n/content';
import { href } from '@/i18n/routes';
import { ui } from '@/i18n/ui';
import { langOf, pageMeta, type LangParams } from '@/i18n/page';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = ui(lang).faq;
  return pageMeta(lang, 'faq', t.metaTitle, t.metaDesc);
}

export default async function FaqPage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = ui(lang).faq;
  const faq = content(lang).faq;
  return (
    <div className="wrap">
      <JsonLd data={faqSchema(faq, lang)} />
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="ptitle">{t.title}</h1>
          <p className="lede">{t.lede}</p>
        </div>
        <div className="faq">
          {faq.map((f, i) => (
            <details key={i} open={i === 0}>
              <summary>{f.q}</summary>
              <div className="ans">{f.a}</div>
            </details>
          ))}
        </div>
        <div className="btnrow">
          <Link className="btn solid" href={href(lang, 'contact')}>{t.other}</Link>
          <a className="btn ghost" href={`tel:${BRAND.phoneHref}`}>{ui(lang).call} {BRAND.phone}</a>
        </div>
      </section>
    </div>
  );
}
