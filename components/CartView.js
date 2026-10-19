'use client';
import Link from 'next/link';
import { useStore } from './StoreProvider';
import { cartSubtotal, lineKey } from '@/lib/cart';
import { formatMoney, shippingFor } from '@/lib/catalog';
import WatchImage from './WatchImage';
import Icon from './Icon';

export function OrderSummary({ cart, children }) {
  const { findProduct } = useStore();
  const subtotal = cartSubtotal(cart, findProduct);
  const shipping = shippingFor(subtotal);
  const freeShippingThreshold = 8340000;
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <aside className="rounded-sm border border-[#d8e3dd] bg-white p-6 shadow-[0_12px_40px_-16px_rgba(18,60,53,0.1)] sm:p-8 lg:sticky lg:top-24">
      <h2 className="mb-6 text-[1.25rem] font-semibold tracking-[-0.3px] text-[#123c35]">
        Order Summary
      </h2>
      
      <dl className="flex flex-col gap-4 text-[0.9rem]">
        <div className="flex items-center justify-between text-[#4d6b62]">
          <dt>Subtotal</dt>
          <dd className="font-medium text-[#123c35]">{formatMoney(subtotal)}</dd>
        </div>
        
        <div className="flex items-center justify-between text-[#4d6b62]">
          <dt>Demo shipping</dt>
          <dd className="font-medium text-[#123c35]">
            {shipping ? formatMoney(shipping) : 'Complimentary'}
          </dd>
        </div>
        
        <div className="flex items-center justify-between text-[#4d6b62]">
          <dt>Taxes</dt>
          <dd className="text-[0.8rem] text-[#5e7a70]/70">Not calculated</dd>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-[#d8e3dd] pt-4">
          <dt className="text-[1rem] font-semibold text-[#123c35]">Total</dt>
          <dd className="text-[1.2rem] font-semibold text-[#123c35]">
            {formatMoney(subtotal + shipping)}
          </dd>
        </div>
      </dl>

      {/* Free Shipping Progress Bar */}
      {subtotal > 0 && subtotal < freeShippingThreshold && (
        <div className="mt-6">
          <p className="mb-2 text-[0.8rem] text-[#4d6b62]">
            You are <strong className="font-semibold text-[#123c35]">{formatMoney(freeShippingThreshold - subtotal)}</strong> away from free shipping.
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e5ede9]">
            <div 
              className="h-full bg-[#123c35] transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-8">
        {children}
      </div>

      <p className="mt-6 text-center text-[0.7rem] leading-relaxed text-[#5e7a70]/70">
        PKR. Demo only. No payment or fulfillment. A real store must calculate applicable taxes server-side.
      </p>
    </aside>
  );
}

export default function CartView() {
  const { cart, dispatch, ready, notify, findProduct } = useStore();

  // --- LOADING STATE ---
  if (!ready)
    return (
      <section className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center px-6 py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#123c35] border-t-transparent" />
        <p className="mt-4 text-[0.9rem] text-[#5e7a70]">Loading your bag...</p>
      </section>
    );

  // --- EMPTY STATE ---
  if (!cart.length)
    return (
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-sm border border-[#d8e3dd] bg-white px-6 py-24 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f5f2] text-[#123c35]">
            <Icon name="bag" size={32} />
          </div>
          <p className="mb-3 flex items-center justify-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
            <span className="h-px w-6 bg-[#123c35]" />
            A little room for something special
            <span className="h-px w-6 bg-[#123c35]" />
          </p>
          <h1 className="mb-3 text-[2rem] font-semibold tracking-[-0.5px] text-[#123c35] sm:text-[2.5rem]">
            Your bag is waiting.
          </h1>
          <p className="mb-10 max-w-md text-[0.95rem] leading-relaxed text-[#5e7a70]">
            Discover a watch that feels like you. Explore our curated collection of timepieces.
          </p>
          <Link 
            href="/shop" 
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#123c35] px-8 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-all duration-200 hover:bg-[#0d2e28] active:scale-[0.99]"
          >
            Explore watches
            <Icon name="arrow" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    );

  // --- MAIN CART VIEW ---
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      
      {/* HEADER */}
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-[#d8e3dd] pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
            Your considered selection
          </p>
          <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.5px] text-[#123c35] sm:text-[2.5rem]">
            Shopping bag.
          </h1>
        </div>
        <Link 
          href="/shop" 
          className="group inline-flex shrink-0 items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[1.5px] text-[#123c35] transition-colors hover:text-[#0d2e28]"
        >
          <span className="border-b border-transparent pb-1 transition-colors group-hover:border-[#123c35]">
            Continue exploring
          </span>
          <Icon name="arrow" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* LAYOUT GRID */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
        
        {/* CART LINES */}
        <div className="flex flex-col divide-y divide-[#d8e3dd] border-t border-[#d8e3dd]">
          {cart.map((line) => {
            const product = findProduct(line.id);
            if (!product) return null;
            const key = lineKey(line.id, line.strap);
            const otherQuantity = cart
              .filter((item) => item.id === line.id && lineKey(item.id, item.strap) !== key)
              .reduce((sum, item) => sum + item.quantity, 0);

            return (
              <article className="flex flex-col gap-6 py-6 sm:flex-row" key={key}>
                
                {/* Image */}
                <Link 
                  href={`/watches/${product.id}`} 
                  className="relative block aspect-[4/5] w-full shrink-0 overflow-hidden rounded-sm border border-[#d8e3dd] bg-[#f0f5f2] sm:w-[120px]"
                >
                  <WatchImage 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>

                {/* Info Container */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    
                    {/* Product Details */}
                    <div>
                      <p className="mb-1 text-[0.6rem] font-medium uppercase tracking-[2px] text-[#5e7a70]">
                        Aurade / {product.reference}
                      </p>
                      <h2 className="text-[1.1rem] font-semibold leading-snug tracking-[-0.2px] text-[#123c35]">
                        <Link href={`/watches/${product.id}`} className="hover:underline">
                          {product.name}
                        </Link>
                      </h2>
                      <p className="mt-1 text-[0.85rem] text-[#4d6b62]">{line.strap}</p>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <strong className="block text-[1.05rem] font-semibold text-[#123c35]">
                        {formatMoney(product.price * line.quantity)}
                      </strong>
                      <p className="mt-0.5 text-[0.8rem] text-[#5e7a70]">
                        {formatMoney(product.price)} each
                      </p>
                    </div>
                  </div>

                  {/* Bottom Row: Quantity & Remove */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex h-9 items-center rounded-full border border-[#c8d6d0] bg-white">
                      <button
                        aria-label={`Decrease ${product.name} quantity`}
                        disabled={line.quantity <= 1}
                        onClick={() =>
                          dispatch({
                            type: 'QUANTITY',
                            key,
                            quantity: line.quantity - 1,
                          })
                        }
                        className="flex h-full w-9 items-center justify-center rounded-l-full text-[#123c35] transition-colors hover:bg-[#f0f5f2] disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Icon name="minus" size={13} />
                      </button>
                      <span className="w-8 text-center text-[0.85rem] font-semibold text-[#123c35]">
                        {line.quantity}
                      </span>
                      <button
                        aria-label={`Increase ${product.name} quantity`}
                        disabled={line.quantity + otherQuantity >= product.stock}
                        onClick={() =>
                          dispatch({
                            type: 'QUANTITY',
                            key,
                            quantity: line.quantity + 1,
                          })
                        }
                        className="flex h-full w-9 items-center justify-center rounded-r-full text-[#123c35] transition-colors hover:bg-[#f0f5f2] disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Icon name="plus" size={13} />
                      </button>
                    </div>

                    <button
                      className="group flex items-center gap-1.5 text-[0.75rem] font-medium text-[#5e7a70] transition-colors hover:text-[#b85450]"
                      onClick={() => {
                        dispatch({ type: 'REMOVE', key });
                        notify('Removed from your bag');
                      }}
                    >
                      <Icon name="trash" size={14} className="transition-transform group-hover:-translate-y-0.5" />
                      Remove
                    </button>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

        {/* ORDER SUMMARY */}
        <OrderSummary cart={cart}>
          <Link 
            href="/checkout" 
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#123c35] px-6 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-all duration-200 hover:bg-[#0d2e28] active:scale-[0.99]"
          >
            Continue to checkout
            <Icon name="arrow" size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </OrderSummary>

      </div>
    </section>
  );
}