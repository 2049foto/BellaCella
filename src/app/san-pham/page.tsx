import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import ProductFilter from '@/components/ProductFilter';

export const metadata: Metadata = { title: 'Sản phẩm' };

export default function ProductListPage() {
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">Toàn bộ dòng sản phẩm</div>
          <h1 style={{ fontSize: 'clamp(26px,3.6vw,42px)' }}>Sản phẩm</h1>
          <p className="lede">Tám sản phẩm, giá niêm yết theo catalogue chính thức. Nhấn vào từng sản phẩm để xem thành phần chính và công dụng đầy đủ.</p>
        </div>
        <h2 className="sr-only">Danh sách sản phẩm</h2>
        <ProductFilter products={PRODUCTS} />
      </section>
    </div>
  );
}
