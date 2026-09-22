import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, STEPS, USAGE, bySlug, BRAND } from '@/data/products';
import { IMG } from '@/lib/images';
import { vnd } from '@/lib/format';
import ProductAction from '@/components/ProductAction';
import Image from 'next/image';
import ProductImageZoom from '@/components/ProductImageZoom';
import JsonLd from '@/components/JsonLd';
import { productSchema, breadcrumbSchema } from '@/lib/schema';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return { title: 'Không tìm thấy sản phẩm' };
  const desc = `${p.vi} · ${p.size} · ${vnd(p.price)} VND${p.priceUnit ? ' ' + p.priceUnit : ''}. ${p.body[0]}`.slice(0, 200);
  return {
    title: p.name,
    description: desc,
    alternates: { canonical: `/san-pham/${p.slug}` },
    openGraph: {
      type: 'website',
      title: `${p.name} · BELLA CELLA`,
      description: desc,
      url: `/san-pham/${p.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();

  const stepIdx = STEPS.findIndex((s) => s.slug === p.slug);
  const step = STEPS[stepIdx];
  const nextStep = STEPS[(stepIdx + 1) % STEPS.length];
  const next = bySlug(nextStep.slug)!;
  const nn = (n: number) => String(n).padStart(2, '0');
  const usage = USAGE[p.slug];

  return (
    <div className="wrap">
      <JsonLd data={[
        productSchema(p),
        breadcrumbSchema([
          { name: 'Trang chủ', path: '/' },
          { name: 'Sản phẩm', path: '/san-pham' },
          { name: p.name, path: `/san-pham/${p.slug}` },
        ]),
      ]} />
      <div className="crumb"><Link href="/san-pham">Sản phẩm</Link> &nbsp;/&nbsp; {p.name}</div>
      <section className="pdp">
        <ProductImageZoom src={IMG[p.slug]} alt={`${p.name} — ${p.vi}`} slug={p.slug} badge={p.badge} />
        <div>
          <p className="pdp-step">Bước {nn(step.n)} trong quy trình — {step.label}</p>
          <h1 className="pdp-title">{p.name}</h1>
          <p className="pdp-vi">{p.vi}</p>
          <div className="bigprice">{vnd(p.price)} <span>VND {p.priceUnit}</span></div>
          <div className="btnrow" style={{ marginTop: '20px' }}>
            <ProductAction product={p} />
            <a className="btn ghost" href={`tel:${BRAND.phoneHref}`}>Gọi {BRAND.phone}</a>
          </div>
          <div className="spec">
            <div className="row"><span className="k">Dung tích</span><span>{p.size}</span></div>
            <div className="row"><span className="k">Mã sản phẩm</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{p.sku}</span></div>
            {p.actives && <div className="row"><span className="k">Thành phần chính</span><span>{p.actives}</span></div>}
            {p.activeList && <div className="row"><span className="k">Thành phần chính</span><ul>{p.activeList.map((a) => <li key={a}>{a}</li>)}</ul></div>}
            <div className="row"><span className="k">Công dụng</span><div>{p.body.map((b, i) => <p key={i} style={{ marginBottom: '10px' }}>{b}</p>)}</div></div>
          </div>
          {usage && (
            <div style={{ marginTop: '30px', borderTop: '1px solid var(--rule)', paddingTop: '22px' }}>
              <h2 className="pdp-h">Cách dùng <span>{usage.when}</span></h2>
              <ol style={{ margin: '13px 0 0', paddingLeft: '20px', fontSize: '13.5px' }}>
                {usage.steps.map((x, i) => <li key={i} style={{ marginBottom: '7px' }}>{x}</li>)}
              </ol>
              <p style={{ marginTop: '13px', fontSize: '12px', color: 'var(--ink-3)' }}>
                Hướng dẫn chung theo loại sản phẩm. Ưu tiên hướng dẫn trên bao bì và chỉ dẫn của chuyên gia điều trị. <Link href="/huong-dan" style={{ textDecoration: 'underline' }}>Xem toàn bộ hướng dẫn</Link>
              </p>
            </div>
          )}
          {p.needsReview && (
            <div className="note" style={{ marginTop: '20px' }}>
              <strong>Đang chờ xác nhận từ nhà sản xuất:</strong> {p.needsReview}
            </div>
          )}
        </div>
      </section>
      <section className="block flush">
        <Link className="nextband" href={`/san-pham/${next.slug}`}>
          <div className="nb-copy">
            <p className="nb-kicker">{nextStep.n === 1 ? 'Quay lại bước đầu của quy trình' : 'Bước tiếp theo trong quy trình'}</p>
            <p className="nb-step"><span>{nn(nextStep.n)}</span>{nextStep.label}</p>
            <h2>{next.name}</h2>
            <p className="nb-vi">{next.vi}</p>
            <span className="btn ghost">Xem sản phẩm</span>
          </div>
          <figure>
            <Image src={IMG[next.slug]} alt={`${next.name} — ${next.vi}`} fill placeholder="blur" sizes="(max-width:760px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
          </figure>
        </Link>
      </section>
    </div>
  );
}
