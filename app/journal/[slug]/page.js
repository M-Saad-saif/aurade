import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/content';
import { photos } from '@/lib/catalog';
import WatchImage from '@/components/WatchImage';

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: articles.find((item) => item.slug === slug)?.title || 'Story not found',
  };
}

export default async function Article({ params }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  return (
    <article className="container section article">
      <Link href="/journal" className="text-link">
        ← Back to journal
      </Link>
      <p className="eyebrow">{article.category}</p>
      <h1>{article.title}</h1>
      <p className="lead">{article.excerpt}</p>
      <WatchImage src={photos[article.image]} alt="Illustrative watch editorial" priority />
      <div className="prose">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link href="/shop" className="button">
          Explore the collection
        </Link>
      </div>
    </article>
  );
}
