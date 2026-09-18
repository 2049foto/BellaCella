import type { Metadata } from 'next';
import Image from 'next/image';
import { KNOWLEDGE, CREDENTIALS } from '@/data/products';
import { IMG } from '@/lib/images';

export const metadata: Metadata = { title: 'Kiến thức thành phần' };

export default function KnowledgePage() {
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <div className="shead">
          <div className="eyebrow">Kiến thức thành phần</div>
          <h1 style={{ fontSize: 'clamp(26px,3.6vw,42px)' }}>Thành phần và bằng chứng hiện có</h1>
          <p className="lede">Trang này trình bày những gì nghiên cứu hiện tại thật sự cho thấy — cả điểm tích cực và giới hạn. Mọi nguồn đều dẫn link để bạn tự kiểm tra.</p>
        </div>
        {KNOWLEDGE.map((k) => (
          <div className="kblock" key={k.key}>
            <div className="eyebrow">{k.eyebrow}</div>
            <h2 style={{ marginTop: '10px', marginBottom: 'clamp(18px,2.4vw,28px)' }}>{k.title}</h2>
            <div className="kgrid">
              <div>{k.body.map((b, i) => <p key={i} style={{ marginBottom: '13px', fontSize: '14px' }}>{b}</p>)}</div>
              <div>
                <div className="eyebrow">Bằng chứng nói gì</div>
                <ul className="kev" style={{ marginTop: '12px' }}>{k.evidence.map((e, i) => <li key={i}>{e}</li>)}</ul>
                {k.sources.length > 0 && (
                  <div className="ksrc">
                    <div className="eyebrow" style={{ marginBottom: '7px' }}>Nguồn</div>
                    {k.sources.map((sx) => <a key={sx.u} href={sx.u} target="_blank" rel="noopener">{sx.t}</a>)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="note" style={{ maxWidth: '74ch', marginTop: '30px' }}>
          Nội dung trang này nhằm cung cấp thông tin, không thay thế chẩn đoán hay chỉ định của bác sĩ. Mô tả sản phẩm trích từ catalogue chính thức; phần bằng chứng khoa học dẫn từ nghiên cứu độc lập về nhóm thành phần, không phải nghiên cứu trên chính sản phẩm BELLA CELLA.
        </div>
      </section>
      <section className="block">
        <div className="shead">
          <div className="eyebrow">Chứng thực</div>
          <h2>Được chuyên gia Hàn Quốc và Nhật Bản tin dùng</h2>
          <p className="lede">{CREDENTIALS.body}</p>
        </div>
        <div className="cgrid">
          {CREDENTIALS.photos.map((c, i) => (
            <figure className={i === 0 ? 'lead' : ''} key={c.img}>
              <Image src={IMG[c.img]} alt={c.cap} sizes="(max-width:560px) 100vw, (max-width:900px) 50vw, 33vw" style={{ width: '100%', height: 'auto' }} />
              <figcaption>Ảnh: {c.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
