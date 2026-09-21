import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, STEPS, USAGE, bySlug, BRAND } from '@/data/products';
import { IMG } from '@/lib/images';
import { vnd } from '@/lib/format';
import ProductAction from '@/components/ProductAction';
import ProductCard from '@/components/ProductCard';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  return { title: p ? p.name : 'Không tìm thấy sản phẩm' };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();

  const idx = PRODUCTS.indexOf(p);
  const next = PRODUCTS[(idx + 1) % PRODUCTS.length];
  const step = STEPS.find((s) => s.slug === p.slug);
  const usage = USAGE[p.slug];

  return (
    <div className="wrap">
      <div className="crumb"><Link href="/san-pham">Sản phẩm</Link> &nbsp;/&nbsp; {p.name}</div>
      <section className="pdp">
        <figure>
          <Image src={IMG[p.slug]} alt={`${p.name} — ${p.vi}`} sizes="(max-width:900px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} priority fetchPriority="high" placeholder="blur" />
          {p.badge && <span className="pbadge">{p.badge}</span>}
        </figure>
        <div>
          <div className="eyebrow">{p.group}{step ? ` · Bước ${String(step.n).padStart(2, '0')} trong quy trình` : ''}</div>
          <h1 style={{ marginTop: '12px', fontSize: 'clamp(24px,3.4vw,38px)' }}>{p.name}</h1>
          <p style={{ fontSize: '16px', color: 'var(--ink-3)', marginTop: '8px' }}>{p.vi}</p>
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
              <div className="eyebrow">Cách dùng · {usage.when}</div>
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
      <section className="block">
        <div className="shead"><div className="eyebrow">Tiếp theo</div><h2>{next.name}</h2></div>
        <div className="pgrid related"><ProductCard product={next} /></div>
      </section>
    </div>
  );
}
