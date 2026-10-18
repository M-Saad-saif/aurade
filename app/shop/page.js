import ShopCatalog from '@/components/ShopCatalog';
import { collections } from '@/lib/catalog';
import { getCatalog } from '@/lib/watches';
export const metadata = { title: 'Shop watches' };
export default async function Shop({ searchParams }) {
  const params = await searchParams;
  const category = collections.some((item) => item.slug === params.category)
    ? params.category
    : 'all';
  const query = typeof params.q === 'string' ? params.q : '';
  const catalog = await getCatalog();
  return (
    <>
      <div className="page-intro container">
        <p className="eyebrow">THE AURADE COLLECTION</p>
        <h1>Find your signature.</h1>
        <p>Distinctive watches. A personal perspective on time.</p>
      </div>
      <ShopCatalog
        key={`${category}:${query}`}
        products={catalog}
        initialCategory={category}
        initialQuery={query}
        focusSearch={params.focus === 'search'}
      />
    </>
  );
}
