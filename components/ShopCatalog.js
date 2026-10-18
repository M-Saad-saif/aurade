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
    <div className="container catalog-section">
      <div className="catalog-toolbar">
        <form
          className="search-field"
          onSubmit={(event) => {
            event.preventDefault();
            updateQuery(query);
          }}
        >
          <Icon name="search" />
          <label className="sr-only" htmlFor="watch-search">
            Search watches
          </label>
          <input
            ref={input}
            id="watch-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, dial or movement…"
          />
          <button type="submit">Search</button>
        </form>
        <div className="sort-field">
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <div className="filter-row" aria-label="Filter by collection">
        {[{ slug: 'all', name: 'All watches' }, ...collections].map((item) => (
          <button
            key={item.slug}
            className={`filter-chip ${category === item.slug ? 'active' : ''}`}
            aria-pressed={category === item.slug}
            onClick={() => {
              setCategory(item.slug);
              updateQuery(query, item.slug);
            }}
          >
            {item.name}
          </button>
        ))}
        <span className="result-count" role="status">
          {filtered.length} {filtered.length === 1 ? 'watch' : 'watches'}
        </span>
      </div>
      {filtered.length ? (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="search" size={38} />
          <h2>No watches found.</h2>
          <p>Try a different name or collection.</p>
          <button
            className="button"
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
      <p className="demo-note">
        Illustrative catalog. USD prices, specifications and stock are sample data. Photographs are
        visual references, not exact product or strap representations.
      </p>
    </div>
  );
}
