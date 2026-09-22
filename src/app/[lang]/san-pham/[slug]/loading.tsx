import { LoadingLabel } from '@/components/LoadingLabel';

// Khớp bố cục PDP (.pdp: ảnh trái, thông tin phải) để không nhảy layout.
export default function Loading() {
  return (
    <div className="wrap">
      <LoadingLabel />
      <div className="crumb" aria-hidden="true"><span className="sk sk-line" style={{ width: '220px', height: '11px', margin: 0 }} /></div>
      <section className="pdp" aria-hidden="true">
        <figure style={{ margin: 0 }}><span className="sk sk-fig" /></figure>
        <div>
          <span className="sk sk-eyebrow" />
          <span className="sk sk-h1" style={{ width: 'min(80%, 380px)' }} />
          <span className="sk sk-line" style={{ width: '55%' }} />
          <span className="sk sk-line" style={{ width: '40%', height: '1.6em', marginTop: '18px' }} />
          <div className="spec" style={{ marginTop: '26px' }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="row" key={i}><span className="sk sk-line" style={{ width: '80px', margin: 0 }} /><span className="sk sk-line" style={{ width: '70%', margin: 0 }} /></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
