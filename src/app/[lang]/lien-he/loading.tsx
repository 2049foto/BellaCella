import { PageHeadSkeleton } from '@/components/Skeletons';
import { LoadingLabel } from '@/components/LoadingLabel';

export default function Loading() {
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <LoadingLabel />
        <PageHeadSkeleton />
        <div className="contactgrid" aria-hidden="true">
          <div className="enq">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="field" key={i}>
                <span className="sk sk-line" style={{ width: '120px', height: '11px', margin: 0 }} />
                <span className="sk" style={{ height: i === 3 ? '104px' : '44px', marginTop: '7px' }} />
              </div>
            ))}
            <span className="sk" style={{ height: '44px', width: '160px' }} />
          </div>
          <div>
            <span className="sk sk-eyebrow" />
            {Array.from({ length: 3 }).map((_, i) => (
              <span className="sk sk-line" key={i} style={{ width: '80%' }} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
