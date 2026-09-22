import type { Metadata } from 'next';
import Image from 'next/image';
import { IMG } from '@/lib/images';
import { content } from '@/i18n/content';
import { ui } from '@/i18n/ui';
import { langOf, pageMeta, type LangParams } from '@/i18n/page';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = ui(lang).knowledge;
  return pageMeta(lang, 'knowledge', t.metaTitle, t.metaDesc);
}

export default async function KnowledgePage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = ui(lang).knowledge;
  const c = content(lang);
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="ptitle">{t.title}</h1>
          <p className="lede">{t.lede}</p>
        </div>
        {c.knowledge.map((k) => (
          <div className="kblock" key={k.key}>
            <div className="eyebrow">{k.eyebrow}</div>
            <h2 style={{ marginTop: '10px', marginBottom: 'clamp(18px,2.4vw,28px)' }}>{k.title}</h2>
            <div className="kgrid">
              <div>{k.body.map((b, i) => <p key={i} style={{ marginBottom: '13px', fontSize: '14px' }}>{b}</p>)}</div>
              <div>
                <div className="eyebrow">{t.evidence}</div>
                <ul className="kev" style={{ marginTop: '12px' }}>{k.evidence.map((e, i) => <li key={i}>{e}</li>)}</ul>
                {k.sources.length > 0 && (
                  <div className="ksrc">
                    <div className="eyebrow" style={{ marginBottom: '7px' }}>{t.sources}</div>
                    {k.sources.map((sx) => <a key={sx.u} href={sx.u} target="_blank" rel="noopener">{sx.t}</a>)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="note" style={{ maxWidth: '74ch', marginTop: '30px' }}>{t.note}</div>
      </section>
      <section className="block">
        <div className="shead">
          <div className="eyebrow">{t.credEyebrow}</div>
          <h2>{t.credH}</h2>
          <p className="lede">{c.credentials.body}</p>
        </div>
        <div className="cgrid">
          {c.credentials.photos.map((ph, i) => (
            <figure className={i === 0 ? 'lead' : ''} key={ph.img}>
              <Image src={IMG[ph.img]} alt={ph.cap} placeholder="blur" sizes="(max-width:560px) 100vw, (max-width:900px) 50vw, 33vw" style={{ width: '100%', height: 'auto' }} />
              <figcaption>{t.photoPrefix}{ph.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
