import type { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCTS, STEPS, bySlug } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Liệu trình chăm sóc',
  description: 'Quy trình tám bước với sản phẩm BELLA CELLA như bước chăm sóc tại nhà sau liệu trình — thứ tự thông thường, không phải chỉ định y khoa.',
  alternates: { canonical: '/lieu-trinh' },
};

export default function RoutinePage() {
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">Quy trình</div>
          <h1 style={{ fontSize: 'clamp(26px,3.6vw,42px)' }}>Liệu trình chăm sóc</h1>
          <p className="lede">Tám sản phẩm BELLA CELLA được thiết kế như bước chăm sóc tại nhà sau liệu trình điều trị. Bảng dưới đây là thứ tự sử dụng thông thường theo nhóm công dụng.</p>
        </div>
        <div className="steps">
          {STEPS.map((s) => {
            const p = bySlug(s.slug)!;
            return (
              <Link className="step" href={`/san-pham/${s.slug}`} key={s.n}>
                <span className="num">BƯỚC {String(s.n).padStart(2, '0')}</span>
                <span className="lab">{s.label}</span>
                <span className="pn">{p.name}<br /><span style={{ color: 'var(--ink-3)', fontSize: '11px' }}>{p.size}</span></span>
              </Link>
            );
          })}
        </div>
        <div className="note" style={{ maxWidth: '74ch', marginTop: '28px' }}>
          <strong>Lưu ý quan trọng.</strong> Thứ tự trên là quy trình chăm sóc da thông thường, không phải chỉ định y khoa. Nếu bạn vừa thực hiện laser, lăn kim, peel hoặc bất kỳ thủ thuật thẩm mỹ nào, hãy dùng sản phẩm theo đúng hướng dẫn của bác sĩ hoặc chuyên gia đang điều trị cho bạn.
        </div>
      </section>
      <section className="block">
        <div className="shead"><div className="eyebrow">Bộ sản phẩm</div><h2>Toàn bộ quy trình</h2></div>
        <div className="pgrid">{PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>
    </div>
  );
}
