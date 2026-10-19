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
  const filteredProducts = catalog.filter(
    (product) => product.category === slug
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-12 lg:px-8 lg:pt-16">
      
      <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
        <p className="mb-4 flex items-center justify-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
          <span className="h-px w-6 bg-[#123c35]" />
          The Aurade Edit
          <span className="h-px w-6 bg-[#123c35]" />
        </p>
        
        <h1 className="text-[2.5rem] font-semibold leading-[1.1] tracking-[-1px] text-[#123c35] sm:text-[3.5rem] lg:text-[4rem]">
          {collection.name}.
        </h1>
        
        <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-[#4d6b62] sm:text-[1.1rem]">
          {collection.description}
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-sm border border-[#d8e3dd] bg-white px-6 py-24 text-center">
          <h2 className="mb-2 text-[1.5rem] font-semibold tracking-[-0.5px] text-[#123c35]">
            Coming soon.
          </h2>
          <p className="max-w-sm text-[0.95rem] text-[#5e7a70]">
            We are currently curating watches for this collection. Check back shortly.
          </p>
        </div>
      )}

    </section>
  );
}