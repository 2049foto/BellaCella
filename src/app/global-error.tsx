'use client';

import './globals.css';

// Chỉ kích hoạt khi chính root layout lỗi — phải tự render <html>/<body>.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="vi">
      <body>
        <div className="wrap">
          <section className="block errbox" style={{ borderTop: 0 }}>
            <div className="eyebrow">Sự cố tạm thời</div>
            <h1 style={{ marginTop: '12px' }}>Không tải được trang</h1>
            <p className="lede" style={{ marginTop: '14px' }}>
              Đã có lỗi khi khởi tạo trang. Vui lòng tải lại; nếu vẫn chưa được, quay lại sau ít phút.
            </p>
            <div className="btnrow">
              <button className="btn solid" onClick={() => reset()}>Tải lại trang</button>
            </div>
          </section>
        </div>
      </body>
    </html>
  );
}
