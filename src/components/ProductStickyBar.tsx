'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BRAND, COMMERCE_ENABLED, type Product } from '@/data/products';
import { zaloUrl } from '@/lib/brand';
import { href, type Lang } from '@/i18n/routes';
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
    // Chỉ hiện khi khối giá đã cuộn LÊN khỏi màn hình (top < 0). Nếu chỉ xét isIntersecting
    // thì lúc mới vào trang trên điện thoại — khi khối giá còn nằm dưới màn hình — thanh đã bật.
    // -70px: trừ chiều cao header dính, để thanh xuất hiện đúng lúc giá khuất sau header.
    const io = new IntersectionObserver(
      // So với BIÊN của vùng quan sát, không so với 0: rootMargin âm đẩy biên xuống 70px,
      // nên lúc mốc vừa khuất sau header thì top vẫn đang là số dương.
      ([e]) => setShown(!e.isIntersecting && e.boundingClientRect.top < (e.rootBounds?.top ?? 0)),
      { rootMargin: '-70px 0px 0px 0px' },
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
            <Link className="btn solid" href={`${href(lang, 'contact')}?sp=${product.slug}`}>
              {COMMERCE_ENABLED ? t.product.addToCart : t.product.consult}
            </Link>
            <a className="btn ghost" href={zaloUrl} target="_blank" rel="noopener">{t.contactActions.zalo}</a>
            <a className="btn ghost pbar-call" href={`tel:${BRAND.phoneHref}`}>{t.call} {BRAND.phone}</a>
          </div>
        </div>
      </div>
    </>
  );
}
