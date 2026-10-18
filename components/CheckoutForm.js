'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useStore } from './StoreProvider';
import { cartSubtotal } from '@/lib/cart';
import { shippingFor } from '@/lib/catalog';
import { OrderSummary } from './CartView';
import Icon from './Icon';
export default function CheckoutForm() {
  const { cart, dispatch, ready, findProduct } = useStore();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const lock = useRef(false);
  const router = useRouter();
  function submit(event) {
    event.preventDefault();
    if (lock.current || !cart.length) return;
    lock.current = true;
    setSubmitting(true);
    setError('');
    try {
      const id = `AUR-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
      const subtotal = cartSubtotal(cart, findProduct);
      // Never persist addresses, names, email or payment data in this demo.
      const order = {
        id,
        createdAt: new Date().toISOString(),
        items: cart.flatMap((line) => {
          const product = findProduct(line.id);
          return product ? [{ ...line, name: product.name, unitPrice: product.price }] : [];
        }),
        subtotal,
        shipping: shippingFor(subtotal),
        total: subtotal + shippingFor(subtotal),
      };
      sessionStorage.setItem('aurade:last-demo-order', JSON.stringify(order));
      dispatch({ type: 'CLEAR_CART' });
      router.push(`/order-success?id=${encodeURIComponent(id)}`);
    } catch {
      setError(
        'Unable to save the demo receipt in this browser. Your bag has not been cleared. Please enable browser storage and try again.',
      );
      lock.current = false;
      setSubmitting(false);
    }
  }
  if (!ready)
    return (
      <div className="container empty-state" role="status">
        Preparing checkout…
      </div>
    );
  if (!cart.length && !submitting)
    return (
      <div className="container empty-state">
        <h1>Your bag is empty.</h1>
        <Link href="/shop" className="button">
          Explore watches
        </Link>
      </div>
    );
  return (
    <div className="container section">
      <div className="page-intro compact">
        <p className="eyebrow">ONE LAST DETAIL</p>
        <h1>Demo checkout.</h1>
        <p>No payment is collected. No real order is placed. Use fictional details.</p>
      </div>
      <div className="checkout-layout">
        <form onSubmit={submit} className="checkout-form">
          <div className="demo-banner">
            <Icon name="shield" />
            <span>
              Interactive demonstration only. Do not enter sensitive or real personal information.
            </span>
          </div>
          <h2>Contact & delivery</h2>
          <div className="form-grid">
            <label className="span-two">
              Email
              <input
                name="email"
                type="email"
                autoComplete="off"
                placeholder="demo@example.com"
                required
                maxLength={254}
              />
            </label>
            <label>
              First name
              <input name="firstName" autoComplete="off" required maxLength={80} />
            </label>
            <label>
              Last name
              <input name="lastName" autoComplete="off" required maxLength={80} />
            </label>
            <label className="span-two">
              Street address
              <input name="address" autoComplete="off" required maxLength={200} />
            </label>
            <label>
              City
              <input name="city" autoComplete="off" required maxLength={100} />
            </label>
            <label>
              Postal code
              <input name="postal" autoComplete="off" required maxLength={20} />
            </label>
            <label className="span-two">
              Country
              <select name="country" required defaultValue="">
                <option value="" disabled>
                  Select country
                </option>
                {[
                  'Pakistan',
                  'United States',
                  'United Kingdom',
                  'United Arab Emirates',
                  'Canada',
                  'Other',
                ].map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="checkbox-label">
            <input type="checkbox" required />I understand this is a demo, not a purchase.
          </label>
          <p className="form-error" role="alert">
            {error}
          </p>
          <button className="button full-width" disabled={submitting} type="submit">
            {submitting ? 'Creating demo receipt…' : 'Place demo order'}
            <Icon name="arrow" />
          </button>
          <Link href="/cart" className="text-link checkout-back">
            Back to bag
          </Link>
        </form>
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
}
