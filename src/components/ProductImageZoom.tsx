'use client';

import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef } from 'react';
import type { Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

/* Xem ảnh cận cảnh bằng <dialog> gốc, không dùng thư viện lightbox.
   Đóng bằng Esc (native) và bấm nền. Khoá cuộn nền khi mở để trang sau
   không trôi dưới ảnh. Ảnh nguồn 1200px nên phóng to vẫn nét. */

type Props = { src: StaticImageData; alt: string; slug: string; badge?: string | null; lang: Lang };

export default function ProductImageZoom({ src, alt, slug, badge, lang }: Props) {
  const t = ui(lang).product;
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Khoá cuộn nền suốt lúc dialog mở; trả lại đúng trạng thái cũ khi đóng.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const unlock = () => { document.documentElement.style.overflow = ''; };
    el.addEventListener('close', unlock);
    return () => { el.removeEventListener('close', unlock); unlock(); };
  }, []);

  function open() {
    document.documentElement.style.overflow = 'hidden';
    dialogRef.current?.showModal();
  }
  function onDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    // Bấm vào vùng nền (chính thẻ dialog, ngoài nội dung) thì đóng.
    if (e.target === dialogRef.current) dialogRef.current?.close();
  }

  return (
    <>
      <figure style={{ margin: 0 }}>
        <button type="button" className="zoom-trigger" onClick={open} aria-label={`${t.zoom}: ${alt}`}>
          <Image
            src={src}
            alt={alt}
            sizes="(max-width:900px) 100vw, 50vw"
            style={{ width: '100%', height: 'auto', viewTransitionName: `product-${slug}` }}
            priority
            fetchPriority="high"
            placeholder="blur"
          />
          {badge && <span className="pbadge">{badge}</span>}
          <span className="zoom-hint" aria-hidden="true">{t.zoomHint}</span>
        </button>
      </figure>

      <dialog ref={dialogRef} className="zoom" onClick={onDialogClick} aria-label={`${t.zoomLarge}: ${alt}`}>
        <div className="zoom-inner">
          <button type="button" className="zoom-close" onClick={() => dialogRef.current?.close()} aria-label={t.zoomClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          {/* Ảnh xem cận cảnh nên nén nhẹ tay hơn phần còn lại của trang. */}
          <Image src={src} alt={alt} sizes="(max-width:900px) 94vw, 860px" quality={90} placeholder="blur" style={{ width: 'auto', height: 'auto', maxWidth: '94vw', maxHeight: '86vh' }} />
        </div>
      </dialog>
    </>
  );
}
