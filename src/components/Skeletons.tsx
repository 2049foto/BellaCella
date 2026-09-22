/* Skeleton dùng chung cho loading.tsx — server component, không JS phía client.
   Giữ đúng khung kích thước khối thật để tránh nhảy layout khi nội dung vào. */

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="pgrid" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <article className="pcard" key={i}>
          <span className="sk sk-line" style={{ width: '55%' }} />
          <span className="sk sk-fig" style={{ margin: '10px 0 16px' }} />
          <span className="sk sk-line" style={{ width: '80%' }} />
          <span className="sk sk-line" style={{ width: '65%' }} />
          <div className="pfoot"><span className="sk sk-line" style={{ width: '45%', height: '1em', marginTop: '14px' }} /></div>
        </article>
      ))}
    </div>
  );
}

export function PageHeadSkeleton() {
  return (
    <div className="shead" aria-hidden="true">
      <span className="sk sk-eyebrow" />
      <span className="sk sk-h1" />
      <span className="sk sk-line" style={{ width: 'min(90%, 620px)' }} />
      <span className="sk sk-line" style={{ width: 'min(70%, 480px)' }} />
    </div>
  );
}
