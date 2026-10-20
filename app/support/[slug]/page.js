import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supportPages } from '@/lib/content';

export function generateStaticParams() {
  return Object.keys(supportPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: Object.hasOwn(supportPages, slug) ? supportPages[slug].title : 'Information' };
}

export default async function Support({ params }) {
  const { slug } = await params;
  const page = Object.hasOwn(supportPages, slug) ? supportPages[slug] : null;
  if (!page) notFound();
  return (
    <div className="site-container section support-layout">
      <aside className="support-nav">
        <p className="eyebrow">INFORMATION</p>
        {Object.entries(supportPages).map(([key, value]) => (
          <Link key={key} href={`/support/${key}`} aria-current={key === slug ? 'page' : undefined}>
            {value.title.replace(/\.$/, '')}
          </Link>
        ))}
        <Link href="/contact">Contact</Link>
      </aside>
      <article className="prose">
        <p className="eyebrow">AURADE / HELP</p>
        <h1>{page.title}</h1>
        <p className="lead">{page.intro}</p>
        {page.sections.map(([title, copy]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{copy}</p>
          </section>
        ))}
      </article>
    </div>
  );
}
