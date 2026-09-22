import type { Metadata } from 'next';
import Image from 'next/image';
import { BRAND } from '@/data/products';
import { IMG } from '@/lib/images';
import { zaloUrl } from '@/lib/brand';
import EnquiryForm from '@/components/EnquiryForm';
import { ui } from '@/i18n/ui';
import { langOf, pageMeta, type LangParams } from '@/i18n/page';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = ui(lang).contact;
  return pageMeta(lang, 'contact', t.title, t.metaDesc);
}

export default async function ContactPage({ params, searchParams }: LangParams & { searchParams: Promise<{ sp?: string }> }) {
  const lang = await langOf(params);
  const { sp } = await searchParams;
  const t = ui(lang).contact;
  const h = ui(lang).home;

  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="ptitle">{t.title}</h1>
          <p className="lede">{t.lede}</p>
        </div>
        <div className="contactgrid">
          <div>
            <EnquiryForm selected={sp} lang={lang} />
          </div>
          <div>
            <div className="eyebrow">{t.direct}</div>
            <div className="statline" style={{ marginTop: '14px' }}>
              <div><span className="k">{h.phone}</span><a className="v" href={`tel:${BRAND.phoneHref}`}>{BRAND.phone}</a></div>
              <div><span className="k">Zalo</span><a className="v" href={zaloUrl} target="_blank" rel="noopener">{BRAND.phone}</a></div>
              <div><span className="k">{h.website}</span><span className="v">{BRAND.site}</span></div>
            </div>
            <div className="note" style={{ marginTop: '24px' }}>{t.note}</div>
            <figure style={{ margin: '28px 0 0', background: 'var(--paper-2)' }}>
              <Image src={IMG['cred-treatment']} alt={t.imgAlt} placeholder="blur" sizes="(max-width:820px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
