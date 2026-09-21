import { PageHeadSkeleton, ProductGridSkeleton, LoadingLabel } from '@/components/Skeletons';

export default function Loading() {
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <LoadingLabel />
        <PageHeadSkeleton />
        <div className="filters" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span className="sk sk-line" key={i} style={{ width: '92px', height: '33px', margin: 0 }} />
          ))}
        </div>
        <ProductGridSkeleton />
      </section>
    </div>
  );
}
