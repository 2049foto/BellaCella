import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { IMG } from '@/lib/images';
import { content } from '@/i18n/content';
import { href } from '@/i18n/routes';
import { ui } from '@/i18n/ui';
import { langOf, pageMeta, type LangParams } from '@/i18n/page';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await langOf(params);
  const t = ui(lang).usage;
  return pageMeta(lang, 'usage', t.metaTitle, t.metaDesc);
}

export default async function UsagePage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = ui(lang).usage;
  const c = content(lang);
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">{t.eyebrow}</div>
          <h1 className="ptitle">{t.title}</h1>
          <p className="lede">{t.lede}</p>
        </div>
        <div className="note" style={{ maxWidth: '74ch', marginBottom: 'clamp(22px,3vw,34px)' }}>
          <strong>{t.noteStrong}</strong> {t.note}
        </div>
        <h2 className="sr-only">{t.listSr}</h2>
        <div className="usage">
          {c.steps.map((st) => {
            const p = c.bySlug(st.slug)!;
            const u = c.usage[st.slug];
            if (!u) return null;
            const link = href(lang, 'products', p.slug);
            return (
              <div className="ucard" key={st.n}>
                <figure>
                  <Link href={link}>
                    <Image src={IMG[p.slug]} alt={`${p.name} — ${p.vi}`} placeholder="blur" sizes="(max-width:760px) 88px, 120px" style={{ width: '100%', height: 'auto' }} />
                  </Link>
                </figure>
                <div>
                  <div className="eyebrow">{t.step} {String(st.n).padStart(2, '0')} · {st.label}</div>
                  <h3 style={{ marginTop: '9px' }}><Link href={link}>{p.name}</Link></h3>
                  <div className="uwhen">{u.when} · {p.size}</div>
                  <ol>{u.steps.map((x, i) => <li key={i}>{x}</li>)}</ol>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
