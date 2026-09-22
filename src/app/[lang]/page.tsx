import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/data/products';
import { IMG } from '@/lib/images';
import { zaloUrl } from '@/lib/brand';
import ProductCard from '@/components/ProductCard';
import { content } from '@/i18n/content';
import { href, alternates } from '@/i18n/routes';
import { ui, money } from '@/i18n/ui';
import { langOf, type LangParams } from '@/i18n/page';

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  return { alternates: alternates(await langOf(params), 'home') };
}

export default async function HomePage({ params }: LangParams) {
  const lang = await langOf(params);
  const t = ui(lang).home;
  const c = content(lang);
  const prices = c.products.map((p) => p.price);
  const nn = (n: number) => String(n).padStart(2, '0');

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker">{t.kicker}</p>
          <h1 className="hero-title" id="hero-title"><span>{t.title[0]}</span><span>{t.title[1]}</span></h1>
          <p className="hero-lede">{t.lede}</p>
          <div className="btnrow">
            <Link className="btn solid" href={href(lang, 'products')}>{t.ctaProducts}</Link>
            <Link className="btn ghost" href={href(lang, 'routine')}>{t.ctaRoutine}</Link>
          </div>
          <dl className="hero-facts">
            <div><dt>{t.facts.range}</dt><dd>{t.facts.rangeV(c.products.length)}</dd></div>
            <div><dt>{t.facts.active}</dt><dd>{t.facts.activeV}</dd></div>
            <div><dt>{t.facts.price}</dt><dd>{money(lang, Math.min(...prices))} – {money(lang, Math.max(...prices))} VND</dd></div>
          </dl>
        </div>
        <figure className="hero-media">
          <Image src={IMG['hero-1400']} alt={t.heroAlt} fill priority fetchPriority="high" placeholder="blur" sizes="(max-width:860px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: '50% 30%' }} />
        </figure>
      </section>

      <div className="wrap">
        <section className="block">
          <div className="split">
            <div>
              <h2 className="statement">{t.statement}</h2>
              <p className="lede" style={{ marginTop: '22px' }}>{t.philosophy}</p>
              <div className="statline">
                <div><span className="k">{t.stat.active}</span><span className="v">{t.stat.activeV}</span></div>
                <div><span className="k">{t.stat.channel}</span><span className="v">{t.stat.channelV}</span></div>
                <div><span className="k">{t.stat.market}</span><span className="v">{t.stat.marketV}</span></div>
              </div>
            </div>
            <figure className="texture">
              <Image src={IMG['serum-texture']} alt={t.textureAlt} fill placeholder="blur" sizes="(max-width:820px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: '50% 100%' }} />
            </figure>
          </div>
        </section>

        <section className="block">
          <div className="shead">
            <div className="eyebrow">{t.productsEyebrow}</div>
            <h2>{t.productsH}</h2>
            <p className="lede">{t.productsLede}</p>
          </div>
          <div className="pgrid">{c.products.map((p) => <ProductCard key={p.id} product={p} lang={lang} />)}</div>
        </section>

        <section className="block">
          <div className="shead">
            <div className="eyebrow">{t.stepsEyebrow}</div>
            <h2>{t.stepsH}</h2>
            <p className="lede">{t.stepsLede}</p>
          </div>
          <div className="steps">
            {c.steps.map((s) => {
              const p = c.bySlug(s.slug)!;
              return (
                <Link className="step" href={href(lang, 'products', s.slug)} key={s.n}>
                  <span className="num"><span className="sr-only">{ui(lang).product.stepSr}</span>{nn(s.n)}</span>
                  <span className="lab">{s.label}</span>
                  <span className="pn">{p.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="block">
          <div className="shead">
            <div className="eyebrow">{t.credEyebrow}</div>
            <h2>{c.credentials.heading}</h2>
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

        <section className="block">
          <div className="shead">
            <div className="eyebrow">{t.moreEyebrow}</div>
            <h2>{t.moreH}</h2>
          </div>
          <div className="sci">
            {t.more.map((m) => (
              <div key={m.key}>
                <h3><Link href={href(lang, m.key)}>{m.h}</Link></h3>
                <p>{m.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="block">
          <div className="split">
            <div>
              <div className="eyebrow">{t.contactEyebrow}</div>
              <h2 style={{ marginTop: '12px' }}>{t.contactH}</h2>
              <p className="lede" style={{ marginTop: '16px' }}>{t.contactLede}</p>
            </div>
            <div>
              <div className="statline" style={{ marginTop: 0 }}>
                <div><span className="k">{t.phone}</span><a className="v" href={`tel:${BRAND.phoneHref}`}>{BRAND.phone}</a></div>
                <div><span className="k">Zalo</span><a className="v" href={zaloUrl} target="_blank" rel="noopener">{BRAND.phone}</a></div>
                <div><span className="k">{t.website}</span><span className="v">{BRAND.site}</span></div>
              </div>
              <div className="btnrow"><Link className="btn solid" href={href(lang, 'contact')}>{t.sendEnquiry}</Link></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
