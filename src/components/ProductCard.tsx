import Image from 'next/image';
import Link from 'next/link';
import { type Product } from '@/data/products';
import { vnd } from '@/lib/format';
import ProductAction from '@/components/ProductAction';

// Kích cỡ ảnh theo lưới sản phẩm (tối đa 4 cột).
const CARD_SIZES = '(max-width:460px) 100vw, (max-width:820px) 50vw, (max-width:1100px) 33vw, 25vw';

export default function ProductCard({ product: p }: { product: Product }) {
  const alt = `${p.name} — ${p.vi}`;
  return (
    <article className="pcard">
      <div className="pgroup">{p.group}</div>
      <Link href={`/san-pham/${p.slug}`} aria-label={p.name}>
        <figure>
          <Image src={`/img/${p.slug}.webp`} alt={alt} fill sizes={CARD_SIZES} style={{ objectFit: 'cover' }} />
          {p.badge && <span className="pbadge">{p.badge}</span>}
        </figure>
      </Link>
      <Link href={`/san-pham/${p.slug}`}><h3 className="pname">{p.name}</h3></Link>
      <div className="pvi">{p.vi}</div>
      <div className="psize">{p.size}</div>
      <div className="pfoot">
        <div className="pprice">{vnd(p.price)} <span>VND {p.priceUnit}</span></div>
        <div className="pact"><ProductAction product={p} /></div>
      </div>
    </article>
  );
}
