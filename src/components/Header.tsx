'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BRAND } from '@/data/products';

const NAV = [
  { href: '/san-pham', label: 'Sản phẩm' },
  { href: '/lieu-trinh', label: 'Liệu trình' },
  { href: '/huong-dan', label: 'Hướng dẫn dùng' },
  { href: '/kien-thuc', label: 'Kiến thức' },
  { href: '/faq', label: 'Hỏi đáp' },
  { href: '/lien-he', label: 'Liên hệ' },
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        <Link href="/" className="mark" aria-label="BELLA CELLA — trang chủ">
          {BRAND.name}<small>{BRAND.descriptor}</small>
        </Link>
        <nav className={`main${open ? ' open' : ''}`} id="nav">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={isActive(pathname, n.href) ? 'page' : undefined} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hact">
          <a className="tcall" href={`tel:${BRAND.phoneHref}`}>{BRAND.phone}</a>
          <button className="themebtn" onClick={toggleTheme} aria-label="Đổi nền sáng tối" title="Đổi nền sáng tối">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          </button>
          <button className="burger" onClick={() => setOpen((v) => !v)} aria-label="Mở menu" aria-expanded={open}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
