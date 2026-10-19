import ShopCatalog from "@/components/ShopCatalog";
import { collections } from "@/lib/catalog";
import { getCatalog } from "@/lib/watches";

export const metadata = { title: "Shop watches" };

export default async function Shop({ searchParams }) {
  const params = await searchParams;
  const category = collections.some((item) => item.slug === params.category)
    ? params.category
    : "all";
  const query = typeof params.q === "string" ? params.q : "";
  const catalog = await getCatalog();

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-12 pb-24 lg:px-8 lg:pt-16">
      
      <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
        <p className="mb-4 flex items-center justify-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
          <span className="h-px w-6 bg-[#123c35]" />
          The Aurade Collection
          <span className="h-px w-6 bg-[#123c35]" />
        </p>
        
        <h1 className="text-[2.5rem] font-semibold leading-[1.1] tracking-[-1px] text-[#123c35] sm:text-[3.5rem] lg:text-[4rem]">
          Find your signature.
        </h1>
        
        <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-[#4d6b62] sm:text-[1.1rem]">
          Distinctive watches. A personal perspective on time.
        </p>
      </div>

      <ShopCatalog
        key={`${category}:${query}`}
        products={catalog}
        initialCategory={category}
        initialQuery={query}
        focusSearch={params.focus === "search"}
      />
      
    </section>
  );
}