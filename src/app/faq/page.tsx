import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ, BRAND } from '@/data/products';
import JsonLd from '@/components/JsonLd';
import { faqSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Hỏi đáp',
  description: 'Câu hỏi thường gặp về BELLA CELLA: Exosome có hiệu quả không, dùng sau laser được không, thứ tự tám sản phẩm, bao lâu thấy kết quả — trả lời thẳng, dẫn nguồn.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <div className="wrap">
      <JsonLd data={faqSchema(FAQ)} />
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">Hỏi đáp</div>
          <h1 style={{ fontSize: 'clamp(26px,3.6vw,42px)' }}>Câu hỏi thường gặp</h1>
          <p className="lede">Chín câu khách hàng hỏi nhiều nhất, trả lời thẳng — kể cả khi câu trả lời là &quot;chưa có dữ liệu&quot;.</p>
        </div>
        <div className="faq">
          {FAQ.map((f, i) => (
            <details key={i} open={i === 0}>
              <summary>{f.q}</summary>
              <div className="ans">{f.a}</div>
            </details>
          ))}
        </div>
        <div className="btnrow">
          <Link className="btn solid" href="/lien-he">Câu hỏi khác — gửi tư vấn</Link>
          <a className="btn ghost" href={`tel:${BRAND.phoneHref}`}>Gọi {BRAND.phone}</a>
        </div>
      </section>
    </div>
  );
}
