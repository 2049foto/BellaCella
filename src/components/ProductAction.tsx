'use client';

/* Nút hành động trên mỗi sản phẩm.
   COMMERCE_ENABLED = false -> "Nhận tư vấn" trỏ /lien-he?sp=slug.
   Bật true -> "Thêm vào giỏ". */
import Link from 'next/link';
import { COMMERCE_ENABLED, type Product } from '@/data/products';
import { useCart } from '@/components/CartProvider';

export default function ProductAction({ product }: { product: Product }) {
  const cart = useCart();

  if (COMMERCE_ENABLED) {
    return (
      <button className="btn solid" onClick={() => cart?.add(product.id)}>
        Thêm vào giỏ
      </button>
    );
  }

  return (
    <Link className="btn" href={`/lien-he?sp=${product.slug}`}>
      Nhận tư vấn
    </Link>
  );
}
