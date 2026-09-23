'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { GalleryItem } from '@/lib/gallery';
import type { Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

/* Bộ ảnh trang sản phẩm, theo lối các hãng mỹ phẩm lớn:
   - Khung ảnh là dải cuộn ngang có điểm dừng (scroll-snap): điện thoại vuốt bằng tay, máy tính bấm ảnh nhỏ.
     Tắt JS vẫn vuốt/cuộn xem đủ ảnh.
   - Bấm ảnh mở khung xem lớn (<dialog> gốc): vuốt, nút trước/sau, phím ← →, Esc để đóng.
   - Khung lớn không rộng quá 680px: ảnh gốc của hãng 570–1000px, phóng hơn nữa là nhoè. */

type Props = { items: GalleryItem[]; name: string; alt0: string; slug: string; badge?: string | null; lang: Lang };

const smooth = (): ScrollBehavior =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
const indexOf = (el: HTMLElement) => Math.round(el.scrollLeft / Math.max(1, el.clientWidth));

export default function ProductGallery({ items, name, alt0, slug, badge, lang }: Props) {
  const t = ui(lang).product;
  const [active, setActive] = useState(0);
  const [zoomAt, setZoomAt] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const zoomTrack = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Vị trí đang xem trong khung lớn, giữ bằng ref: lúc sự kiện close chạy thì dialog đã ẩn, đo lại ra 0.
  const zoomAtRef = useRef(0);
  const many = items.length > 1;
  const alt = (i: number) => (i === 0 ? alt0 : `${name} — ${t.kinds[items[i].kind]}`);

  // Khoá cuộn nền suốt lúc xem lớn; đóng thì trả lại, và đưa khung ảnh trên trang về đúng ảnh vừa xem.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const onClose = () => {
      document.documentElement.style.overflow = '';
      const s = stage.current;
      if (s) s.scrollTo({ left: zoomAtRef.current * s.clientWidth, behavior: 'auto' });
    };
    el.addEventListener('close', onClose);
    return () => { el.removeEventListener('close', onClose); document.documentElement.style.overflow = ''; };
  }, []);

  const setZoom = (i: number) => { zoomAtRef.current = i; setZoomAt(i); };
  const go = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    const n = Math.max(0, Math.min(items.length - 1, i));
    el.scrollTo({ left: n * el.clientWidth, behavior: smooth() });
  };

  function open(i: number) {
    document.documentElement.style.overflow = 'hidden';
    dialogRef.current?.showModal();
    const z = zoomTrack.current;
    if (z) z.scrollLeft = i * z.clientWidth; // dialog đã hiện nên đo được bề rộng ngay
    setZoom(i);
  }
  function onDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) dialogRef.current?.close();
  }
  function onDialogKey(e: React.KeyboardEvent<HTMLDialogElement>) {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(zoomTrack.current, zoomAt + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(zoomTrack.current, zoomAt - 1); }
  }

  return (
    <>
      <figure className="gallery" aria-label={many ? t.gallery : undefined}>
        <div className="gstage">
          <div className="gtrack" ref={stage} onScroll={(e) => setActive(indexOf(e.currentTarget))}>
            {items.map((it, i) => (
              <button type="button" className="gslide zoom-trigger" key={it.file} onClick={() => open(i)} aria-label={`${t.zoom}: ${alt(i)}`}>
                <Image
                  src={it.src}
                  alt={alt(i)}
                  sizes="(max-width:520px) 100vw, 460px"
                  placeholder="blur"
                  priority={i === 0}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  style={i === 0 ? { viewTransitionName: `product-${slug}` } : undefined}
                />
              </button>
            ))}
          </div>
          {badge && <span className="pbadge">{badge}</span>}
          <span className="zoom-hint" aria-hidden="true">{t.zoomHint}</span>
        </div>
        {many && (
          <>
            <div className="gthumbs">
              {items.map((it, i) => (
                <button type="button" className="gthumb" key={it.file} onClick={() => go(stage.current, i)}
                  aria-label={`${t.galleryShow} ${i + 1}/${items.length}`} aria-current={i === active ? 'true' : undefined}>
                  <Image src={it.src} alt="" sizes="64px" />
                </button>
              ))}
            </div>
            <div className="gdots" aria-hidden="true">
              {items.map((it, i) => <span key={it.file} data-on={i === active || undefined} />)}
            </div>
          </>
        )}
      </figure>

      <dialog ref={dialogRef} className="zoom" onClick={onDialogClick} onKeyDown={onDialogKey} aria-label={`${t.zoomLarge}: ${name}`}>
        <div className="zoom-inner">
          <button type="button" className="zoom-close" onClick={() => dialogRef.current?.close()} aria-label={t.zoomClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <div className="gtrack" ref={zoomTrack} onScroll={(e) => setZoom(indexOf(e.currentTarget))}>
            {items.map((it, i) => (
              <div className="gslide" key={it.file}>
                <Image src={it.src} alt={alt(i)} sizes="(max-width:720px) 96vw, 680px" quality={90} placeholder="blur" />
              </div>
            ))}
          </div>
          {many && (
            <div className="zoom-nav">
              <button type="button" onClick={() => go(zoomTrack.current, zoomAt - 1)} disabled={zoomAt === 0} aria-label={t.galleryPrev}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
              </button>
              <span className="zoom-count" aria-live="polite">{zoomAt + 1} / {items.length}</span>
              <button type="button" onClick={() => go(zoomTrack.current, zoomAt + 1)} disabled={zoomAt === items.length - 1} aria-label={t.galleryNext}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
