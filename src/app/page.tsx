import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, STEPS, CREDENTIALS, BRAND, bySlug } from '@/data/products';
import { IMG } from '@/lib/images';
import { zaloUrl } from '@/lib/brand';
import ProductCard from '@/components/ProductCard';
import { vnd } from '@/lib/format';

const prices = PRODUCTS.map((p) => p.price);
const priceMin = Math.min(...prices);
const priceMax = Math.max(...prices);

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-kicker">{BRAND.tagline_en}</p>
          <h1 className="hero-title" id="hero-title"><span>Đẹp từ</span><span>từng tế bào.</span></h1>
          <p className="hero-lede">
            Giải pháp chăm sóc da chuyên nghiệp dựa trên Exosome từ tế bào gốc thực vật — được nhiều spa và chuyên gia làm đẹp tại Hàn Quốc và Nhật Bản tin tưởng lựa chọn.
          </p>
          <div className="btnrow">
            <Link className="btn solid" href="/san-pham">Xem 8 sản phẩm</Link>
            <Link className="btn ghost" href="/lieu-trinh">Liệu trình chăm sóc</Link>
          </div>
          <dl className="hero-facts">
            <div><dt>Dòng sản phẩm</dt><dd>{PRODUCTS.length} sản phẩm</dd></div>
            <div><dt>Hoạt chất trung tâm</dt><dd>Exosome thực vật</dd></div>
            <div><dt>Giá niêm yết</dt><dd>{vnd(priceMin)} – {vnd(priceMax)} VND</dd></div>
          </dl>
        </div>
        <figure className="hero-media">
          <Image src={IMG['hero-1400']} alt="Người mẫu BELLA CELLA cùng hộp phấn nước Recovery BB Cushion" fill priority fetchPriority="high" placeholder="blur" sizes="(max-width:860px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: '50% 30%' }} />
        </figure>
      </section>

      <div className="wrap">
        <section className="block">
          <div className="split">
            <div>
              <h2 className="statement">Chăm sóc da bắt đầu từ cấp độ tế bào.</h2>
              <p className="lede" style={{ marginTop: '22px' }}>
                BELLA CELLA xây dựng công thức quanh Exosome có nguồn gốc từ tế bào gốc thực vật, kết hợp Collagen, Peptide và Hyaluronic Acid theo nhiều phân tử lượng. Sản phẩm được thiết kế cho cả liệu trình chuyên nghiệp tại phòng điều trị và bước chăm sóc tại nhà sau liệu trình.
              </p>
              <div className="statline">
                <div><span className="k">Hoạt chất trung tâm</span><span className="v">Exosome thực vật</span></div>
                <div><span className="k">Kênh chuyên nghiệp</span><span className="v">Spa và phòng điều trị</span></div>
                <div><span className="k">Thị trường tin dùng</span><span className="v">Hàn Quốc, Nhật Bản</span></div>
              </div>
            </div>
            <figure className="texture">
              <Image src={IMG['serum-texture']} alt="Kết cấu tinh chất Exo-Bio nhỏ vào đĩa petri" fill placeholder="blur" sizes="(max-width:820px) 100vw, 50vw" style={{ objectFit: 'cover', objectPosition: '50% 100%' }} />
            </figure>
          </div>
        </section>

        <section className="block">
          <div className="shead">
            <div className="eyebrow">Sản phẩm</div>
            <h2>Chăm sóc tại nhà được khuyến nghị sau liệu trình</h2>
            <p className="lede">Tám sản phẩm bao trọn quy trình từ làm sạch đến chống nắng, dùng độc lập hoặc theo bộ.</p>
          </div>
          <div className="pgrid">{PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>

        <section className="block">
          <div className="shead">
            <div className="eyebrow">Quy trình</div>
            <h2>Tám bước, theo thứ tự sử dụng</h2>
            <p className="lede">Thứ tự dưới đây là quy trình chăm sóc thông thường. Với da vừa trải qua liệu trình chuyên sâu, hãy dùng theo đúng hướng dẫn của chuyên gia đang điều trị cho bạn.</p>
          </div>
          <div className="steps">
            {STEPS.map((s) => {
              const p = bySlug(s.slug)!;
              return (
                <Link className="step" href={`/san-pham/${s.slug}`} key={s.n}>
                  <span className="num"><span className="sr-only">Bước </span>{String(s.n).padStart(2, '0')}</span>
                  <span className="lab">{s.label}</span>
                  <span className="pn">{p.name}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="block">
          <div className="shead">
            <div className="eyebrow">Chứng thực</div>
            <h2>{CREDENTIALS.heading}</h2>
            <p className="lede">{CREDENTIALS.body}</p>
          </div>
          <div className="cgrid">
            {CREDENTIALS.photos.map((c, i) => (
              <figure className={i === 0 ? 'lead' : ''} key={c.img}>
                <Image src={IMG[c.img]} alt={c.cap} placeholder="blur" sizes="(max-width:560px) 100vw, (max-width:900px) 50vw, 33vw" style={{ width: '100%', height: 'auto' }} />
                <figcaption>Ảnh: {c.cap}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="block">
          <div className="shead">
            <div className="eyebrow">Tìm hiểu thêm</div>
            <h2>Thông tin bạn có thể cần</h2>
          </div>
          <div className="sci">
            <div>
              <h3><Link href="/huong-dan">Cách dùng từng sản phẩm</Link></h3>
              <p>Thời điểm dùng, số bước, vị trí trong quy trình tám bước — cho cả tám sản phẩm.</p>
            </div>
            <div>
              <h3><Link href="/kien-thuc">Thành phần và bằng chứng</Link></h3>
              <p>Exosome, NMN, Hyaluronic Acid — nghiên cứu hiện tại cho thấy gì, và chưa cho thấy gì. Có dẫn nguồn.</p>
            </div>
            <div>
              <h3><Link href="/faq">Câu hỏi thường gặp</Link></h3>
              <p>Dùng sau laser được không, bao lâu thấy kết quả, giá có thay đổi — trả lời thẳng.</p>
            </div>
          </div>
        </section>

        <section className="block">
          <div className="split">
            <div>
              <div className="eyebrow">Liên hệ</div>
              <h2 style={{ marginTop: '12px' }}>Cần tư vấn sản phẩm phù hợp?</h2>
              <p className="lede" style={{ marginTop: '16px' }}>Gọi trực tiếp hoặc để lại thông tin, đội ngũ BELLA CELLA sẽ liên hệ tư vấn theo tình trạng da và liệu trình bạn đang thực hiện.</p>
            </div>
            <div>
              <div className="statline" style={{ marginTop: 0 }}>
                <div><span className="k">Điện thoại</span><a className="v" href={`tel:${BRAND.phoneHref}`}>{BRAND.phone}</a></div>
                <div><span className="k">Zalo</span><a className="v" href={zaloUrl} target="_blank" rel="noopener">{BRAND.phone}</a></div>
                <div><span className="k">Website</span><span className="v">{BRAND.site}</span></div>
              </div>
              <div className="btnrow"><Link className="btn solid" href="/lien-he">Gửi yêu cầu tư vấn</Link></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
