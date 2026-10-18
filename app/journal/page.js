import Link from 'next/link';
import { articles } from '@/lib/content';
import { photos } from '@/lib/catalog';
import WatchImage from '@/components/WatchImage';
export const metadata = { title: 'Journal' };
export default function Journal() {
  return (
    <section className="container section">
      <div className="page-intro compact">
        <p className="eyebrow">NOTES FROM AURADE</p>
        <h1>A little perspective.</h1>
        <p>Thoughts on design, personal style and choosing well.</p>
      </div>
      <div className="journal-grid">
        {articles.map((article) => (
          <Link href={`/journal/${article.slug}`} className="journal-card" key={article.slug}>
            <WatchImage src={photos[article.image]} alt="Watch editorial photograph" />
            <p className="eyebrow">{article.category}</p>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <span className="text-link">Read the story ↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
