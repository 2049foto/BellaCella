'use client';

/* Nút hành động trên mỗi sản phẩm.
   COMMERCE_ENABLED = false -> "Nhận tư vấn" trỏ trang liên hệ ?sp=slug.
   Bật true -> "Thêm vào giỏ". solid: nút tô đặc cho chỗ nó là hành động chính duy nhất. */
import Link from 'next/link';
import { COMMERCE_ENABLED, type Product } from '@/data/products';
import { useCart } from '@/components/CartProvider';
import { href, type Lang } from '@/i18n/routes';
import { ui } from '@/i18n/ui';

export default function ProductAction({ product, lang, solid }: { product: Product; lang: Lang; solid?: boolean }) {
  const cart = useCart();
  const t = ui(lang).product;

  if (COMMERCE_ENABLED) {
    return (
      <button className="btn solid" onClick={() => cart?.add(product.id)}>
        {t.addToCart}
      </button>
    );
  }

  return (
    <Link className={solid ? 'btn solid' : 'btn'} href={`${href(lang, 'contact')}?sp=${product.slug}`}>
      {t.consult}
    </Link>
  );
}
