import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="container empty-state">
      <p className="eyebrow">404 / A MOMENT OFF TRACK</p>
      <h1>Time to find your way.</h1>
      <p>The page or watch you’re looking for isn’t here.</p>
      <Link href="/shop" className="button">
        Explore the collection
      </Link>
    </div>
  );
}
