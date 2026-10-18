export default function Loading() {
  return (
    <div className="container section" role="status" aria-label="Loading page">
      <div className="skeleton skeleton-title" />
      <div className="product-grid">
        {[1, 2, 3, 4].map((item) => (
          <div className="skeleton skeleton-card" key={item} />
        ))}
      </div>
      <span className="sr-only">Loading Aurade…</span>
    </div>
  );
}
