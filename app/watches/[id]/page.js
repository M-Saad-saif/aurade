import { notFound } from 'next/navigation';
import { products } from '@/lib/catalog';
import { getCatalog } from '@/lib/watches';
import ProductDetails from '@/components/ProductDetails';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';

export function generateStaticParams() {
  return products.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const catalog = await getCatalog();
  const product = catalog.find((item) => item.id === id);
  return {
    title: product?.name || 'Watch not found',
    description: product?.description,
  };
}

export default async function WatchPage({ params }) {
  const { id } = await params;
  const catalog = await getCatalog();
  const product = catalog.find((item) => item.id === id);
  if (!product) notFound();
  
  return (
    <>
      <ProductDetails key={product.id} product={product} />
      <section className="section container">
        <SectionHeading eyebrow="ANOTHER PERSPECTIVE" title="You might also like." href="/shop" />
        <div className="product-grid related-grid">
          {catalog
            .filter((item) => item.id !== id)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
    </>
  );
}
