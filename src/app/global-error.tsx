'use client';

import './globals.css';

// Chỉ kích hoạt khi chính root layout lỗi — phải tự render <html>/<body>.
// Không có layout/params → đọc ngôn ngữ từ URL (chỉ render phía trình duyệt).
const T = {
  vi: { eyebrow: 'Sự cố tạm thời', h: 'Không tải được trang', p: 'Đã có lỗi khi khởi tạo trang. Bạn thử tải lại giúp chúng tôi. Nếu vẫn chưa được, vui lòng quay lại sau ít phút.', retry: 'Tải lại trang' },
  en: { eyebrow: 'Temporary problem', h: 'This page could not load', p: 'Something went wrong while starting this page. Try reloading. If it still fails, come back in a few minutes.', retry: 'Reload page' },
};

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const lang = typeof location !== 'undefined' && location.pathname.startsWith('/en') ? 'en' : 'vi';
  const t = T[lang];
  return (
    <html lang={lang}>
      <body>
        <div className="wrap">
          <section className="block errbox" style={{ borderTop: 0 }}>
            <div className="eyebrow">{t.eyebrow}</div>
            <h1 style={{ marginTop: '12px' }}>{t.h}</h1>
            <p className="lede" style={{ marginTop: '14px' }}>{t.p}</p>
            <div className="btnrow">
              <button className="btn solid" onClick={() => reset()}>{t.retry}</button>
            </div>
          </section>
        </div>
      </body>
    </html>
  );
}
