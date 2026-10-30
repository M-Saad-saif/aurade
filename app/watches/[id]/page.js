import { notFound } from "next/navigation";
import { getCatalog } from "@/lib/watches";
import ProductDetails from "@/components/ProductDetails";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { getCollection } from "@/lib/catalog";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const catalog = await getCatalog();
  const product = catalog.find((item) => item.id === id);
  return {
    title: product?.name || "Watch not found",
    description: product?.description,
  };
}

export default async function WatchPage({ params }) {
  const { id } = await params;
  const catalog = await getCatalog();
  const product = catalog.find((item) => item.id === id);
  if (!product) notFound();
  const collection = getCollection(product.category);
  const collectionWatches = catalog.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );

  return (
    <>
      <ProductDetails key={product.id} product={product} />
      <section className="section site-container">
        <SectionHeading
          eyebrow={collection?.name || "THE COLLECTION"}
          title={`${collection?.name || "More"} watches.`}
          href={`/collections/${product.category}`}
        />
        {collectionWatches.length > 0 ? (
          <div className="product-grid related-grid">
            {collectionWatches.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#5e7a70]">
            More watches from this collection are coming soon.
          </p>
        )}
      </section>
    </>
  );
}
