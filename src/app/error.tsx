'use client';

import Link from 'next/link';
import { useEffect } from 'react';

// Trang lỗi giữ ngôn ngữ thương hiệu: điềm tĩnh, không emoji, không "Oops".
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Ghi log phía client để tiện theo dõi khi có backend giám sát.
    console.error(error);
  }, [error]);

  return (
    <div className="wrap">
      <section className="block errbox" style={{ borderTop: 0 }}>
        <div className="eyebrow">Sự cố tạm thời</div>
        <h1 style={{ marginTop: '12px' }}>Trang gặp trục trặc khi tải</h1>
        <p className="lede" style={{ marginTop: '14px' }}>
          Đã có lỗi khi hiển thị nội dung này. Bạn thử tải lại; nếu vẫn chưa được, vui lòng quay lại sau ít phút hoặc liên hệ qua Zalo ở góc màn hình.
        </p>
        <div className="btnrow">
          <button className="btn solid" onClick={() => reset()}>Tải lại trang</button>
          <Link className="btn ghost" href="/">Về trang chủ</Link>
        </div>
      </section>
    </div>
  );
}
