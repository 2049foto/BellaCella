'use client';

import { useState } from 'react';
import { type Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import type { Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

export default function ProductFilter({ products, lang }: { products: Product[]; lang: Lang }) {
  const t = ui(lang).list;
  const ALL = ui(lang).filterAll;
  const [active, setActive] = useState(ALL);
  const groups = [ALL, ...Array.from(new Set(products.map((p) => p.group)))];
  const shown = active === ALL ? products : products.filter((p) => p.group === active);

  return (
    <>
      <div className="filters" role="group" aria-label={t.filterAria}>
        {groups.map((g) => (
          <button key={g} className="chip" data-filter={g} aria-pressed={g === active} onClick={() => setActive(g)}>
            {g}
          </button>
        ))}
      </div>
      {/* Đổi bộ lọc không tải lại trang → báo cho trình đọc màn hình biết còn lại bao nhiêu sản phẩm. */}
      <p className="sr-only" role="status">{t.filterCount(shown.length, active)}</p>
      <div className="pgrid">{shown.map((p, i) => <ProductCard key={p.id} product={p} lang={lang} priority={i < 2} />)}</div>
    </>
  );
}
