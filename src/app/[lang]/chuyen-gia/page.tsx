import type { Metadata } from 'next';
import ProviderForm from '@/components/ProviderForm';
import { ui } from '@/i18n/ui';
import { langOf, pageMeta, type LangParams } from '@/i18n/page';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = ui(lang).pro;
  return pageMeta(lang, 'pro', t.metaTitle, t.metaDesc);
}

export default async function ProviderPage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = ui(lang).pro;
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="ptitle">{t.title}</h1>
          <p className="lede">{t.lede}</p>
        </div>
        <div className="split">
          <div>
            <h2 style={{ fontSize: 'clamp(18px,2.2vw,24px)' }}>{t.whyH}</h2>
            <div className="plist">
              {t.why.map((w, i) => <div key={i}><span className="n">{String(i + 1).padStart(2, '0')}</span><span>{w}</span></div>)}
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(18px,2.2vw,24px)' }}>{t.formH}</h2>
            <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', marginTop: '10px' }}>{t.formLede}</p>
            <ProviderForm lang={lang} />
          </div>
        </div>
      </section>
    </div>
  );
}
