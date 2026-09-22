'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { href } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

// Trang lỗi giữ ngôn ngữ thương hiệu: điềm tĩnh, không emoji, không "Oops".
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const lang = usePathname().startsWith('/en') ? 'en' : 'vi';
  const t = ui(lang).error;
  useEffect(() => {
    // Ghi log phía client để tiện theo dõi khi có backend giám sát.
    console.error(error);
  }, [error]);

  return (
    <div className="wrap">
      <section className="block errbox" style={{ borderTop: 0 }}>
        <div className="eyebrow">{t.eyebrow}</div>
        <h1 style={{ marginTop: '12px' }}>{t.h}</h1>
        <p className="lede" style={{ marginTop: '14px' }}>{t.p}</p>
        <div className="btnrow">
          <button className="btn solid" onClick={() => reset()}>{t.retry}</button>
          <Link className="btn ghost" href={href(lang, 'home')}>{t.home}</Link>
        </div>
      </section>
    </div>
  );
}
