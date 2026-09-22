import type { Metadata } from 'next';
import ProviderForm from '@/components/ProviderForm';

export const metadata: Metadata = {
  title: 'Dành cho spa & chuyên gia',
  description: 'Hợp tác phân phối BELLA CELLA cho spa, phòng khám da liễu và thẩm mỹ viện: sản phẩm dùng trong liệu trình và bán kèm chăm sóc tại nhà.',
  alternates: { canonical: '/chuyen-gia' },
};

export default function ProviderPage() {
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">Dành cho chuyên gia</div>
          <h1 className="ptitle">Hợp tác cùng spa và phòng điều trị</h1>
          <p className="lede">BELLA CELLA được xây dựng cho kênh chuyên nghiệp: dùng trong liệu trình tại phòng điều trị, và bán kèm như bước chăm sóc tại nhà sau liệu trình.</p>
        </div>
        <div className="split">
          <div>
            <h2 style={{ fontSize: 'clamp(18px,2.2vw,24px)' }}>Vì sao phù hợp với kênh chuyên nghiệp</h2>
            <div className="plist">
              <div><span className="n">01</span><span>Cấu hình sản phẩm theo liều: Exo-Bio Ampoule 10 lọ, Recella Cream 30 gói, Serum Mask 10 miếng — thuận tiện cho phòng điều trị và cho khách mang về.</span></div>
              <div><span className="n">02</span><span>Recovery BB Cushion có thể dùng như lớp dưỡng phục hồi ngay sau liệu trình thẩm mỹ, lưu trên da qua đêm.</span></div>
              <div><span className="n">03</span><span>Bộ tám sản phẩm bao trọn quy trình, cho phép tư vấn theo bộ thay vì đơn lẻ.</span></div>
              <div><span className="n">04</span><span>Thương hiệu đã hiện diện tại Hàn Quốc và Nhật Bản, có tư liệu hình ảnh hội thảo và báo chí để hỗ trợ truyền thông tại điểm bán.</span></div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: 'clamp(18px,2.2vw,24px)' }}>Đăng ký nhận thông tin hợp tác</h2>
            <p style={{ fontSize: '13.5px', color: 'var(--ink-3)', marginTop: '10px' }}>Để lại thông tin, đội ngũ BELLA CELLA sẽ liên hệ trao đổi về chính sách dành cho spa, phòng điều trị và nhà phân phối.</p>
            <ProviderForm />
          </div>
        </div>
      </section>
    </div>
  );
}
