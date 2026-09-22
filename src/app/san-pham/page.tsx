import type { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCTS, NEEDS, bySlug, assertNeedQuotes } from '@/data/products';
import ProductFilter from '@/components/ProductFilter';

export const metadata: Metadata = {
  title: 'Sản phẩm',
  description: 'Tám sản phẩm BELLA CELLA — làm sạch, cân bằng, tinh chất Exosome, mặt nạ NMN, chống nắng — giá niêm yết theo catalogue chính thức. Tra cứu theo nhu cầu, trích nguyên văn catalogue.',
  alternates: { canonical: '/san-pham' },
};

// Chạy lúc build: câu trích lệch catalogue thì build fail, không lên trang.
assertNeedQuotes();

export default function ProductListPage() {
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">Toàn bộ dòng sản phẩm</div>
          <h1 className="ptitle">Sản phẩm</h1>
          <p className="lede">Tám sản phẩm, giá niêm yết theo catalogue chính thức. Nhấn vào từng sản phẩm để xem thành phần chính và công dụng đầy đủ, hoặc <a href="#theo-nhu-cau" className="inline">tìm theo nhu cầu</a>.</p>
        </div>
        <h2 className="sr-only">Danh sách sản phẩm</h2>
        <ProductFilter products={PRODUCTS} />
      </section>

      <section className="block" id="theo-nhu-cau" aria-labelledby="needs-h">
        <div className="shead">
          <div className="eyebrow">Tìm theo nhu cầu</div>
          <h2 id="needs-h">Catalogue nói gì về điều bạn cần</h2>
          <p className="lede">Mỗi gợi ý kèm câu trích nguyên văn từ mô tả công dụng trong catalogue chính thức — không thêm, không suy diễn.</p>
        </div>
        {NEEDS.map((n) => (
          <div className="need" key={n.key}>
            <h3>{n.label}</h3>
            <ul>
              {n.picks.map(({ slug, quote }) => {
                const p = bySlug(slug)!;
                return (
                  <li key={slug}>
                    <Link href={`/san-pham/${slug}`}>{p.name}</Link>
                    <q>{quote}</q>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
        <div className="note" style={{ maxWidth: '74ch', marginTop: '26px' }}>
          Đây là tra cứu theo mô tả công dụng trong catalogue, không phải chẩn đoán hay chỉ định y khoa. Với chăm sóc tại nhà sau thủ thuật hoặc liệu trình, hãy dùng sản phẩm theo hướng dẫn của chuyên gia điều trị của bạn.
        </div>
      </section>
    </div>
  );
}
