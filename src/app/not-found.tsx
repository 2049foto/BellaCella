import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="eyebrow">404</div>
        <h1 style={{ marginTop: '12px' }}>Không tìm thấy trang</h1>
        <p className="lede" style={{ marginTop: '14px' }}>Đường dẫn không tồn tại. Quay lại danh sách sản phẩm để tiếp tục.</p>
        <div className="btnrow"><Link className="btn solid" href="/san-pham">Xem sản phẩm</Link></div>
      </section>
    </div>
  );
}
