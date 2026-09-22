'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BRAND } from '@/data/products';
import { href, counterpart, publicPath, type Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

const NAV_KEYS = ['products', 'routine', 'usage', 'knowledge', 'faq', 'contact'] as const;

function isActive(pathname: string, h: string) {
  return pathname === h || pathname.startsWith(h + '/');
}

export default function Header({ lang }: { lang: Lang }) {
  const t = ui(lang);
  const other: Lang = lang === 'vi' ? 'en' : 'vi';
  const rawPath = usePathname();
  // Server (render sẵn) thấy đường dẫn nội bộ, trình duyệt thấy URL công khai → chuẩn hoá để hai bên khớp nhau.
  const pathname = publicPath(rawPath, lang);
  const [open, setOpen] = useState(false);

  // Menu mobile: Esc để đóng, và tự đóng khi đổi trang.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  function toggleTheme() {
    const el = document.documentElement;
    const cur = el.getAttribute('data-theme');
    const isDark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
    const next = isDark ? 'light' : 'dark';
    el.setAttribute('data-theme', next);
    try { localStorage.setItem('bc-theme', next); } catch { /* ignore */ }
  }

  return (
    <header className="site">
      <div className="wrap hbar">
        <Link href={href(lang, 'home')} className="mark" aria-label={t.homeAria}>
          {BRAND.name}<small>{BRAND.descriptor}</small>
        </Link>
        <nav className={`main${open ? ' open' : ''}`} id="nav">
          {NAV_KEYS.map((k) => {
            const h = href(lang, k);
            return (
              <Link key={k} href={h} aria-current={isActive(pathname, h) ? 'page' : undefined} onClick={() => setOpen(false)}>
                {t.nav[k]}
              </Link>
            );
          })}
        </nav>
        <div className="hact">
          <a className="tcall" href={`tel:${BRAND.phoneHref}`}>{BRAND.phone}</a>
          {/* Đổi ngôn ngữ = tải lại trang thật (thẻ <html lang> đổi theo), giữ đúng trang tương ứng. */}
          <a className="langbtn" href={counterpart(pathname, other)} hrefLang={other} lang={other} aria-label={t.langSwitch.aria} data-full="">
            {t.langSwitch.label}
          </a>
          <button className="themebtn" onClick={toggleTheme} aria-label={t.theme} title={t.theme}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          </button>
          <button className="burger" onClick={() => setOpen((v) => !v)} aria-label={open ? t.menuClose : t.menuOpen} aria-expanded={open} aria-controls="nav">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
