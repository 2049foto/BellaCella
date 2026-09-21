import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { STEPS, USAGE, bySlug } from '@/data/products';
import { IMG } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Hướng dẫn sử dụng',
  description: 'Cách dùng từng sản phẩm BELLA CELLA: thời điểm trong ngày, số bước và vị trí trong quy trình tám bước. Ưu tiên hướng dẫn trên bao bì và chỉ dẫn chuyên gia.',
  alternates: { canonical: '/huong-dan' },
};

export default function UsagePage() {
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">Hướng dẫn sử dụng</div>
          <h1 style={{ fontSize: 'clamp(26px,3.6vw,42px)' }}>Cách dùng từng sản phẩm</h1>
          <p className="lede">Hướng dẫn theo từng sản phẩm, kèm thời điểm dùng trong ngày và vị trí trong quy trình tám bước.</p>
        </div>
        <div className="note" style={{ maxWidth: '74ch', marginBottom: 'clamp(22px,3vw,34px)' }}>
          <strong>Đọc trước khi làm theo.</strong> Phần hướng dẫn dưới đây là cách dùng thông thường theo <em>loại</em> sản phẩm, không phải văn bản hướng dẫn chính thức của nhà sản xuất. Luôn ưu tiên hướng dẫn in trên bao bì và chỉ dẫn của chuyên gia đang điều trị cho bạn.
        </div>
        <h2 className="sr-only">Hướng dẫn theo từng sản phẩm</h2>
        <div className="usage">
          {STEPS.map((st) => {
            const p = bySlug(st.slug)!;
            const u = USAGE[st.slug];
            if (!u) return null;
            return (
              <div className="ucard" key={st.n}>
                <figure>
                  <Link href={`/san-pham/${p.slug}`}>
                    <Image src={IMG[p.slug]} alt={`${p.name} — ${p.vi}`} placeholder="blur" sizes="(max-width:760px) 100vw, 120px" style={{ width: '100%', height: 'auto' }} />
                  </Link>
                </figure>
                <div>
                  <div className="eyebrow">Bước {String(st.n).padStart(2, '0')} · {st.label}</div>
                  <h3 style={{ marginTop: '9px' }}><Link href={`/san-pham/${p.slug}`}>{p.name}</Link></h3>
                  <div className="uwhen">{u.when} · {p.size}</div>
                  <ol>{u.steps.map((x, i) => <li key={i}>{x}</li>)}</ol>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
