import Image from 'next/image';
import Link from 'next/link';
import { type Product } from '@/data/products';
import { IMG } from '@/lib/images';
import { vnd } from '@/lib/format';
import ProductAction from '@/components/ProductAction';

// Kích cỡ ảnh theo CHIỀU RỘNG CARD (container query), không phải viewport.
// Card render ở nhiều bối cảnh: lưới 4 cột, 2 cột, khối "liên quan" hẹp.
const CARD_SIZES = '(max-width:460px) 90vw, (max-width:820px) 45vw, (max-width:1100px) 30vw, 280px';

export default function ProductCard({ product: p }: { product: Product }) {
  const alt = `${p.name} — ${p.vi}`;
  return (
    <article className="pcard">
      <div className="pgroup">{p.group}</div>
      <Link href={`/san-pham/${p.slug}`} aria-label={p.name}>
        <figure>
          <Image src={IMG[p.slug]} alt={alt} fill sizes={CARD_SIZES} placeholder="blur" style={{ objectFit: 'cover' }} />
          {p.badge && <span className="pbadge">{p.badge}</span>}
        </figure>
      </Link>
      <Link href={`/san-pham/${p.slug}`} className="pname-link"><h3 className="pname">{p.name}</h3></Link>
      <div className="pvi">{p.vi}</div>
      <div className="psize">{p.size}</div>
      <div className="pfoot">
        <div className="pprice">{vnd(p.price)} <span>VND {p.priceUnit}</span></div>
        <div className="pact"><ProductAction product={p} /></div>
      </div>
    </article>
  );
}
