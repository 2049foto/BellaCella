'use client';

import { useEffect, useRef, useState } from 'react';
import { BRAND } from '@/data/products';
import { zaloUrl } from '@/lib/brand';
import type { Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

/* Ba cách liên hệ, cùng một chỗ: gọi, nhắn Zalo, chép số.
   Nút chép dùng Clipboard API; máy chặn clipboard thì hiện số để khách tự chọn. */
export default function ContactActions({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const t = ui(lang).contactActions;
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(BRAND.phone.replace(/\s/g, ''));
      setCopied('ok');
    } catch {
      setCopied('fail');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied('idle'), 2600);
  }

  return (
    <div className="cta-block">
      <div className="btnrow" style={{ marginTop: 0 }}>
        <a className="btn solid" href={`tel:${BRAND.phoneHref}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6.6 3.5 9 8l-2 1.5a12 12 0 0 0 5.5 5.5L14 13l4.5 2.4V19a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 7.7 2 2 0 0 1 5 5.5z" /></svg>
          {t.call} {BRAND.phone}
        </a>
        <a className="btn" href={zaloUrl} target="_blank" rel="noopener">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 9 9 0 0 1-3.2-.6L4 21l1.4-4.2a8.2 8.2 0 0 1-1.4-4.6A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" /></svg>
          {t.zalo}
        </a>
        <button type="button" className="btn ghost" onClick={copy}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 9h10v10H9zM5 15V5h10" /></svg>
          {copied === 'ok' ? t.copied : t.copy}
        </button>
      </div>
      <p className="cta-note" role="status">
        {copied === 'ok' ? `${t.copiedFull} ${BRAND.phone}` : copied === 'fail' ? `${t.copyFail} ${BRAND.phone}` : compact ? '' : t.hint}
      </p>
    </div>
  );
}
