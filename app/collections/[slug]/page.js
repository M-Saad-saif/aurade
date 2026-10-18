import { notFound } from 'next/navigation';
import { collections, getCollection } from '@/lib/catalog';
import { getCatalog } from '@/lib/watches';
import ProductCard from '@/components/ProductCard';
export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: getCollection(slug)?.name || 'Collection not found' };
}
export default async function Collection({ params }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const catalog = await getCatalog();
  return (
    <div className="container section">
      <div className="page-intro compact">
        <p className="eyebrow">THE AURADE EDIT</p>
        <h1>{collection.name}.</h1>
        <p>{collection.description}</p>
      </div>
      <div className="product-grid">
        {catalog
          .filter((product) => product.category === slug)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
