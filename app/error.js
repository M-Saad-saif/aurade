'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }) {
  return (
    <div className="container empty-state">
      <p className="eyebrow">A SMALL INTERRUPTION</p>
      <h1>Let’s try that again.</h1>
      <p>Something went wrong while loading this page.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
      <Link href="/" className="text-link">
        Return home
      </Link>
    </div>
  );
}
