import { zaloUrl } from '@/lib/brand';
import type { Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

// Nút Zalo nổi ở mọi trang.
export default function ZaloFab({ lang }: { lang: Lang }) {
  const t = ui(lang);
  return (
    <a className="zalo" href={zaloUrl} aria-label={t.zaloAria} target="_blank" rel="noopener">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 9 9 0 0 1-3.2-.6L4 21l1.4-4.2a8.2 8.2 0 0 1-1.4-4.6A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
      </svg>
      <span>{t.zalo}</span>
    </a>
  );
}
