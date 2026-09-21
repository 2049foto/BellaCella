import type { Metadata } from 'next';
import Image from 'next/image';
import { BRAND } from '@/data/products';
import { IMG } from '@/lib/images';
import { zaloUrl } from '@/lib/brand';
import EnquiryForm from '@/components/EnquiryForm';

export const metadata: Metadata = {
  title: 'Yêu cầu tư vấn',
  description: 'Gọi trực tiếp hoặc nhắn Zalo để được tư vấn sản phẩm BELLA CELLA phù hợp với tình trạng da và liệu trình bạn đang thực hiện.',
  alternates: { canonical: '/lien-he' },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ sp?: string }> }) {
  const { sp } = await searchParams;

  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">Liên hệ</div>
          <h1 style={{ fontSize: 'clamp(26px,3.6vw,42px)' }}>Yêu cầu tư vấn</h1>
          <p className="lede">Gọi trực tiếp để được tư vấn ngay, hoặc để lại thông tin bên dưới.</p>
        </div>
        <div className="contactgrid">
          <div>
            <EnquiryForm selected={sp} />
          </div>
          <div>
            <div className="eyebrow">Liên hệ trực tiếp</div>
            <div className="statline" style={{ marginTop: '14px' }}>
              <div><span className="k">Điện thoại</span><a className="v" href={`tel:${BRAND.phoneHref}`}>{BRAND.phone}</a></div>
              <div><span className="k">Zalo</span><a className="v" href={zaloUrl} target="_blank" rel="noopener">{BRAND.phone}</a></div>
              <div><span className="k">Website</span><span className="v">{BRAND.site}</span></div>
            </div>
            <div className="note" style={{ marginTop: '24px' }}>Zalo là kênh phản hồi nhanh nhất. Nhấn nút Zalo ở góc phải màn hình để chat trực tiếp.</div>
            <figure style={{ margin: '28px 0 0', background: 'var(--paper-2)' }}>
              <Image src={IMG['cred-treatment']} alt="Chuyên gia thực hiện liệu trình chăm sóc da với BELLA CELLA" placeholder="blur" sizes="(max-width:820px) 100vw, 50vw" style={{ width: '100%', height: 'auto' }} />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
