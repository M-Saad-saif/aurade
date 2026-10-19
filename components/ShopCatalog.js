'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collections } from '@/lib/catalog';
import ProductCard from './ProductCard';
import Icon from './Icon';

export default function ShopCatalog({
  products,
  initialCategory = 'all',
  initialQuery = '',
  focusSearch = false,
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('featured');
  const input = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (focusSearch) input.current?.focus();
  }, [focusSearch]);

  const filtered = useMemo(() => {
    const result = products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        `${p.name} ${p.movement} ${p.dial} ${p.reference}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
    );
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [products, category, query, sort]);

  function updateQuery(value, nextCategory = category) {
    const params = new URLSearchParams();
    if (value.trim()) params.set('q', value);
    if (nextCategory !== 'all') params.set('category', nextCategory);
    router.replace(`/shop${params.size ? `?${params}` : ''}`, {
      scroll: false,
    });
  }

  return (
    <div className="w-full">
      
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-[#d8e3dd] pb-6 lg:flex-row lg:items-center">
        
        <form
          className="relative flex w-full max-w-md items-center"
          onSubmit={(event) => {
            event.preventDefault();
            updateQuery(query);
          }}
        >
          <label className="sr-only" htmlFor="watch-search">
            Search watches
          </label>
          <Icon 
            name="search" 
            className="absolute left-4 text-[#5e7a70]" 
            size={18} 
          />
          <input
            ref={input}
            id="watch-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, dial or movement…"
            className="h-11 w-full rounded-full border border-[#c8d6d0] bg-white pl-11 pr-24 text-[0.88rem] text-[#123c35] placeholder-[#5e7a70]/70 transition-all focus:border-[#123c35] focus:outline-none focus:ring-1 focus:ring-[#123c35]"
          />
          <button 
            type="submit"
            className="absolute right-1.5 flex h-8 items-center justify-center rounded-full bg-[#123c35] px-4 text-[0.7rem] font-semibold uppercase tracking-[1px] text-[#f4f0e6] transition-colors hover:bg-[#0d2e28]"
          >
            Search
          </button>
        </form>

        <div className="flex shrink-0 items-center gap-3">
          <label htmlFor="sort" className="text-[0.75rem] font-medium uppercase tracking-[1.5px] text-[#5e7a70]">
            Sort by
          </label>
          <div className="relative">
            <select 
              id="sort" 
              value={sort} 
              onChange={(event) => setSort(event.target.value)}
              className="h-11 cursor-pointer appearance-none rounded-full border border-[#c8d6d0] bg-white pl-4 pr-10 text-[0.85rem] font-medium text-[#123c35] transition-colors focus:border-[#123c35] focus:outline-none focus:ring-1 focus:ring-[#123c35]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name</option>
            </select>
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#123c35]">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="Filter by collection">
          {[{ slug: 'all', name: 'All watches' }, ...collections].map((item) => {
            const active = category === item.slug;
            return (
              <button
                key={item.slug}
                aria-pressed={active}
                onClick={() => {
                  setCategory(item.slug);
                  updateQuery(query, item.slug);
                }}
                className={`rounded-full border px-4 py-2 text-[0.82rem] font-medium transition-all duration-200 ${
                  active
                    ? 'border-[#123c35] bg-[#123c35] text-[#e1c27f]'
                    : 'border-[#c8d6d0] bg-white text-[#123c35] hover:border-[#123c35]'
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        
        <span 
          className="text-[0.8rem] font-medium text-[#5e7a70] whitespace-nowrap" 
          role="status"
        >
          {filtered.length} {filtered.length === 1 ? 'watch' : 'watches'}
        </span>
      </div>

      {filtered.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-sm border border-[#d8e3dd] bg-white px-6 py-24 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f5f2] text-[#123c35]">
            <Icon name="search" size={28} />
          </div>
          <h2 className="mb-2 text-[1.5rem] font-semibold tracking-[-0.5px] text-[#123c35]">
            No watches found.
          </h2>
          <p className="mb-8 max-w-sm text-[0.95rem] text-[#5e7a70]">
            We couldnt find any watches matching your search. Try adjusting your filters or search terms.
          </p>
          <button
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#123c35] px-6 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-all hover:bg-[#0d2e28] active:scale-[0.99]"
            onClick={() => {
              setQuery('');
              setCategory('all');
              updateQuery('', 'all');
            }}
          >
            Reset filters
          </button>
        </div>
      )}

     
      
    </div>
  );
}