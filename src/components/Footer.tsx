import Link from 'next/link';
import { BRAND } from '@/data/products';
import { zaloUrl } from '@/lib/brand';

// Footer bắt buộc ghi rõ: website của đại lý phân phối tại VN, thương hiệu thuộc nhà sản xuất.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <div className="mark" style={{ fontSize: '17px' }}>{BRAND.name}<small>{BRAND.descriptor}</small></div>
            <p style={{ marginTop: '16px', fontSize: '13.5px', maxWidth: '34ch', color: 'var(--ink-3)' }}>
              Beautiful From Every Cell — giải pháp chăm sóc da từ tế bào, được chuyên gia tại Hàn Quốc và Nhật Bản tin tưởng.
            </p>
          </div>
          <div>
            <h2>Khám phá</h2>
            <Link href="/san-pham">Sản phẩm</Link>
            <Link href="/lieu-trinh">Liệu trình chăm sóc</Link>
            <Link href="/huong-dan">Hướng dẫn sử dụng</Link>
            <Link href="/kien-thuc">Kiến thức thành phần</Link>
            <Link href="/faq">Hỏi đáp</Link>
            <Link href="/chuyen-gia">Dành cho spa &amp; chuyên gia</Link>
          </div>
          <div>
            <h2>Liên hệ</h2>
            <a href={`tel:${BRAND.phoneHref}`}>{BRAND.phone}</a>
            <a href={zaloUrl} target="_blank" rel="noopener">Zalo tư vấn</a>
            <Link href="/lien-he">Gửi yêu cầu tư vấn</Link>
          </div>
        </div>
        <div className="fbot">
          <span>© {year} BELLA CELLA · {BRAND.site}</span>
          <span style={{ maxWidth: '62ch', textAlign: 'right' }}>
            Website của đại lý phân phối tại Việt Nam. Thương hiệu BELLA CELLA và toàn bộ nội dung sản phẩm thuộc về nhà sản xuất. Giá niêm yết theo catalogue, có thể thay đổi.
          </span>
        </div>
      </div>
    </footer>
  );
}
