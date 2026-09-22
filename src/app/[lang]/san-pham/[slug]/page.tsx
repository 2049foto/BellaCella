import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PRODUCTS, BRAND } from '@/data/products';
import { IMG } from '@/lib/images';
import { zaloUrl } from '@/lib/brand';
import ProductAction from '@/components/ProductAction';
import ProductImageZoom from '@/components/ProductImageZoom';
import JsonLd from '@/components/JsonLd';
import { productSchema, breadcrumbSchema } from '@/lib/schema';
import { content } from '@/i18n/content';
import { href, alternates, isLang, type Lang } from '@/i18n/routes';
import { ui, money } from '@/i18n/ui';

type Params = { params: Promise<{ lang: string; slug: string }> };

async function read(params: Params['params']): Promise<{ lang: Lang; slug: string }> {
  const { lang, slug } = await params;
  return { lang: isLang(lang) ? lang : 'vi', slug };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await read(params);
  const p = content(lang).bySlug(slug);
  if (!p) return { title: ui(lang).product.notFound };
  const desc = `${p.vi} · ${p.size} · ${money(lang, p.price)} VND${p.priceUnit ? ' ' + p.priceUnit : ''}. ${p.body[0]}`.slice(0, 200);
  return {
    title: p.name,
    description: desc,
    alternates: alternates(lang, 'products', p.slug),
    openGraph: {
      type: 'website',
      title: `${p.name} · BELLA CELLA`,
      description: desc,
      url: href(lang, 'products', p.slug),
      locale: ui(lang).ogLocale,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { lang, slug } = await read(params);
  const c = content(lang);
  const t = ui(lang).product;
  const p = c.bySlug(slug);
  if (!p) notFound();

  const stepIdx = c.steps.findIndex((s) => s.slug === p.slug);
  const step = c.steps[stepIdx];
  const nextStep = c.steps[(stepIdx + 1) % c.steps.length];
  const next = c.bySlug(nextStep.slug)!;
  const nn = (n: number) => String(n).padStart(2, '0');
  const usage = c.usage[p.slug];

  return (
    <div className="wrap">
      <JsonLd data={[
        productSchema(p, lang),
        breadcrumbSchema([
          { name: ui(lang).crumbHome, path: href(lang, 'home') },
          { name: t.crumb, path: href(lang, 'products') },
          { name: p.name, path: href(lang, 'products', p.slug) },
        ]),
      ]} />
      <div className="crumb"><Link href={href(lang, 'products')}>{t.crumb}</Link> &nbsp;/&nbsp; {p.name}</div>
      <section className="pdp">
        <ProductImageZoom src={IMG[p.slug]} alt={`${p.name} — ${p.vi}`} slug={p.slug} badge={p.badge} lang={lang} />
        <div>
          <p className="pdp-step">{t.stepOf(nn(step.n), step.label)}</p>
          <h1 className="pdp-title">{p.name}</h1>
          <p className="pdp-vi">{p.vi}</p>
          <div className="bigprice">{money(lang, p.price)} <span>VND {p.priceUnit}</span></div>
          <div className="btnrow" style={{ marginTop: '20px' }}>
            <ProductAction product={p} lang={lang} />
            <a className="btn ghost" href={`tel:${BRAND.phoneHref}`}>{ui(lang).call} {BRAND.phone}</a>
            <a className="btn ghost" href={zaloUrl} target="_blank" rel="noopener">{ui(lang).contactActions.zalo}</a>
          </div>
          <div className="spec">
            <div className="row"><span className="k">{t.size}</span><span>{p.size}</span></div>
            <div className="row"><span className="k">{t.sku}</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{p.sku}</span></div>
            {p.actives && <div className="row"><span className="k">{t.actives}</span><span>{p.actives}</span></div>}
            {p.activeList && <div className="row"><span className="k">{t.actives}</span><ul>{p.activeList.map((a) => <li key={a}>{a}</li>)}</ul></div>}
            <div className="row"><span className="k">{t.benefits}</span><div>{p.body.map((b, i) => <p key={i} style={{ marginBottom: '10px' }}>{b}</p>)}</div></div>
          </div>
          {usage && (
            <div style={{ marginTop: '30px', borderTop: '1px solid var(--rule)', paddingTop: '22px' }}>
              <h2 className="pdp-h">{t.howTo} <span>{usage.when}</span></h2>
              <ol style={{ margin: '13px 0 0', paddingLeft: '20px', fontSize: '13.5px' }}>
                {usage.steps.map((x, i) => <li key={i} style={{ marginBottom: '7px' }}>{x}</li>)}
              </ol>
              <p style={{ marginTop: '13px', fontSize: '12px', color: 'var(--ink-3)' }}>
                {t.usageNote} <Link href={href(lang, 'usage')} style={{ textDecoration: 'underline' }}>{t.allUsage}</Link>
              </p>
            </div>
          )}
          {p.needsReview && (
            <div className="note" style={{ marginTop: '20px' }}>
              <strong>{t.pending}</strong> {p.needsReview}
            </div>
          )}
        </div>
      </section>
      <section className="block flush">
        <Link className="nextband" href={href(lang, 'products', next.slug)}>
          <div className="nb-copy">
            <p className="nb-kicker">{nextStep.n === 1 ? t.restart : t.nextStep}</p>
            <p className="nb-step"><span>{nn(nextStep.n)}</span>{nextStep.label}</p>
            <h2>{next.name}</h2>
            <p className="nb-vi">{next.vi}</p>
            <span className="btn ghost">{t.view}</span>
          </div>
          <figure>
            <Image src={IMG[next.slug]} alt={`${next.name} — ${next.vi}`} fill placeholder="blur" sizes="(max-width:760px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
          </figure>
        </Link>
      </section>
    </div>
  );
}
