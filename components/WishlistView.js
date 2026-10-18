'use client';
import Link from 'next/link';
import { useStore } from './StoreProvider';
import ProductCard from './ProductCard';
import Icon from './Icon';
export default function WishlistView() {
  const { wishlist, ready, findProduct } = useStore();
  if (!ready)
    return (
      <div className="container empty-state" role="status">
        Loading your wishlist…
      </div>
    );
  return (
    <div className="container section">
      <div className="page-intro compact">
        <p className="eyebrow">KEEP A LITTLE INSPIRATION</p>
        <h1>Your wishlist.</h1>
        <p>Saved on this browser, ready when you are.</p>
      </div>
      {wishlist.length ? (
        <div className="product-grid">
          {wishlist.map((id) => {
            const product = findProduct(id);
            return product ? <ProductCard key={id} product={product} /> : null;
          })}
        </div>
      ) : (
        <div className="empty-state">
          <Icon name="heart" size={40} />
          <h2>Something will catch your eye.</h2>
          <p>Tap the heart on any watch to save it here.</p>
          <Link href="/shop" className="button">
            Find your watch <Icon name="arrow" />
          </Link>
        </div>
      )}
    </div>
  );
}
