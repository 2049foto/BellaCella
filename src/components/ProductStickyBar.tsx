'use client';

import { useEffect, useRef, useState } from 'react';
import { BRAND, type Product } from '@/data/products';
import ProductAction from '@/components/ProductAction';
import { zaloUrl } from '@/lib/brand';
import type { Lang } from '@/i18n/routes';
import { ui, money } from '@/i18n/ui';

/* Thanh tóm tắt sản phẩm, hiện khi khối giá cuộn khuất khỏi màn hình.
   Dùng IntersectionObserver thay vì bắt sự kiện cuộn: không chạy code mỗi khung hình.
   Thẻ fixed nên không chiếm chỗ trong bố cục, không gây xô lệch. */
export default function ProductStickyBar({ product, lang }: { product: Product; lang: Lang }) {
  const t = ui(lang);
  const [shown, setShown] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    // Chỉ hiện khi khối giá đã cuộn LÊN khuất sau header. Nếu chỉ xét isIntersecting
    // thì lúc mới vào trang trên điện thoại — khi khối giá còn nằm dưới màn hình — thanh đã bật.
    // Biên trên = chiều cao header dính đo thật (86px máy tính, thấp hơn trên điện thoại),
    // không đoán số cố định. So với rootBounds.top chứ không so với 0 vì biên đã bị đẩy xuống.
    const headerH = Math.round(document.querySelector('header.site')?.getBoundingClientRect().height ?? 0);
    const io = new IntersectionObserver(
      ([e]) => setShown(!e.isIntersecting && e.boundingClientRect.top < (e.rootBounds?.top ?? 0)),
      { rootMargin: `-${headerH}px 0px 0px 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" style={{ height: 1 }} />
      <div className="pbar" data-shown={shown || undefined}>
        <div className="wrap pbar-in">
          <div className="pbar-id">
            <span className="pbar-name">{product.name}</span>
            <span className="pbar-price">{money(lang, product.price)} VND {product.priceUnit}</span>
          </div>
          <div className="pbar-act">
            <ProductAction product={product} lang={lang} solid />
            <a className="btn ghost" href={zaloUrl} target="_blank" rel="noopener">{t.contactActions.zalo}</a>
            <a className="btn ghost pbar-call" href={`tel:${BRAND.phoneHref}`}>{t.call} {BRAND.phone}</a>
          </div>
        </div>
      </div>
    </>
  );
}
