'use client';

/* View Transitions cho điều hướng SPA — API gốc của trình duyệt, không thư viện.
   Bắt click trên link nội bộ ở pha capture, bọc router.push trong
   document.startViewTransition, giải phóng khi pathname đổi.
   Tôn trọng prefers-reduced-motion và trình duyệt chưa hỗ trợ: rơi về điều hướng thường. */

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Doc = Document & { startViewTransition?: (cb: () => void | Promise<void>) => { finished: Promise<void> } };

export default function ViewTransitions({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const finishRef = useRef<(() => void) | null>(null);

  // Khi route mới commit, kết thúc transition đang chờ.
  useEffect(() => {
    if (finishRef.current) {
      finishRef.current();
      finishRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const doc = document as Doc;
    const supports = typeof doc.startViewTransition === 'function';

    function onClick(e: MouseEvent) {
      if (!supports) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = e.target as Element | null;
      const a = el?.closest?.('a');
      if (!a) return;
      const target = a.getAttribute('target');
      if (target && target !== '_self') return;
      if (a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/')) return; // chỉ nội bộ; bỏ tel:/https:/#

      const url = new URL(href, location.href);
      if (url.pathname === location.pathname && url.search === location.search) return; // cùng trang

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // để Link xử lý bình thường

      // Ta tiếp quản điều hướng này với view transition.
      e.preventDefault();
      e.stopImmediatePropagation();

      const transition = doc.startViewTransition!(() =>
        new Promise<void>((resolve) => {
          finishRef.current = resolve;
          router.push(href);
        }),
      );
      // An toàn: nếu route không commit kịp, vẫn kết thúc để không treo.
      const guard = window.setTimeout(() => finishRef.current?.(), 600);
      transition.finished.finally(() => window.clearTimeout(guard));
    }

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  return <>{children}</>;
}
