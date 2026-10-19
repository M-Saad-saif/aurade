'use client';
import Link from 'next/link';
import { useStore } from './StoreProvider';
import ProductCard from './ProductCard';
import Icon from './Icon';

export default function WishlistView() {
  const { wishlist, ready, findProduct } = useStore();

  if (!ready) {
    return (
      <section className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center px-6 py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#123c35] border-t-transparent" />
        <p className="mt-4 text-[0.9rem] text-[#5e7a70]">Loading your wishlist...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-12 lg:px-8 lg:pt-16">
      
      <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
        <p className="mb-4 flex items-center justify-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
          <span className="h-px w-6 bg-[#123c35]" />
          Keep a little inspiration
          <span className="h-px w-6 bg-[#123c35]" />
        </p>
        
        <h1 className="text-[2.5rem] font-semibold leading-[1.1] tracking-[-1px] text-[#123c35] sm:text-[3.5rem] lg:text-[4rem]">
          Your wishlist.
        </h1>
        
        <p className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-[#4d6b62] sm:text-[1.1rem]">
          Saved on this browser, ready when you are.
        </p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((id) => {
            const product = findProduct(id);
            return product ? <ProductCard key={id} product={product} /> : null;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-sm border border-[#d8e3dd] bg-white px-6 py-24 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f5f2] text-[#123c35]">
            <Icon name="heart" size={32} />
          </div>
          
          <h2 className="mb-3 text-[1.5rem] font-semibold tracking-[-0.5px] text-[#123c35] sm:text-[1.75rem]">
            Something will catch your eye.
          </h2>
          
          <p className="mb-10 max-w-md text-[0.95rem] leading-relaxed text-[#5e7a70]">
            Tap the heart on any watch to save it here for later. Your personal collection is just a click away.
          </p>
          
          <Link 
            href="/shop" 
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#123c35] px-8 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-all duration-200 hover:bg-[#0d2e28] active:scale-[0.99]"
          >
            Find your watch
            <Icon 
              name="arrow" 
              size={16} 
              className="transition-transform duration-300 group-hover:translate-x-1" 
            />
          </Link>
        </div>
      )}

    </section>
  );
}