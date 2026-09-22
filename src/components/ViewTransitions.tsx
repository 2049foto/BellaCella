'use client';

/* Điều hướng nội bộ: View Transitions + thanh tiến trình — API gốc, không thư viện.
   - Bắt click trên link nội bộ ở pha capture, đánh dấu <html data-nav="busy"> để CSS
     hiện vạch tiến trình (chỉ khi mạng chậm), bỏ dấu khi pathname đổi.
   - Nếu trình duyệt hỗ trợ và người dùng không yêu cầu giảm chuyển động: bọc router.push
     trong document.startViewTransition. Ngược lại để Link điều hướng bình thường. */

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Doc = Document & { startViewTransition?: (cb: () => void | Promise<void>) => { finished: Promise<void> } };

const setBusy = (on: boolean) => {
  if (on) document.documentElement.setAttribute('data-nav', 'busy');
  else document.documentElement.removeAttribute('data-nav');
};

export default function ViewTransitions({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const finishRef = useRef<(() => void) | null>(null);

  // Khi route mới commit: kết thúc transition đang chờ, tắt vạch tiến trình.
  useEffect(() => {
    setBusy(false);
    if (finishRef.current) {
      finishRef.current();
      finishRef.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    const doc = document as Doc;
    const supports = typeof doc.startViewTransition === 'function';
    let busyGuard = 0;

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = e.target as Element | null;
      const a = el?.closest?.('a');
      if (!a) return;
      const target = a.getAttribute('target');
      if (target && target !== '_self') return;
      if (a.hasAttribute('download') || a.hasAttribute('data-full')) return; // tải lại trang thật (vd. đổi ngôn ngữ)
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/')) return; // chỉ nội bộ; bỏ tel:/https:/#

      const url = new URL(href, location.href);
      if (url.pathname === location.pathname && url.search === location.search) return; // cùng trang

      // Có điều hướng thật → bật vạch tiến trình; tự tắt sau 10s nếu điều hướng bị huỷ.
      setBusy(true);
      window.clearTimeout(busyGuard);
      busyGuard = window.setTimeout(() => setBusy(false), 10000);

      if (!supports || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // để Link xử lý

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
    return () => {
      document.removeEventListener('click', onClick, true);
      window.clearTimeout(busyGuard);
    };
  }, [router]);

  return <>{children}</>;
}
