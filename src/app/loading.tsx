import { PageHeadSkeleton, LoadingLabel } from '@/components/Skeletons';

// Skeleton mặc định cho mọi route chưa có loading riêng.
export default function Loading() {
  return (
    <div className="wrap">
      <section className="block" style={{ borderTop: 0 }}>
        <LoadingLabel />
        <PageHeadSkeleton />
      </section>
    </div>
  );
}
