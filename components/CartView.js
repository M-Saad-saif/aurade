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
  return (
    <aside className="order-summary">
      <p className="eyebrow">THE DETAILS</p>
      <h2>Order summary</h2>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatMoney(subtotal)}</dd>
        </div>
        <div>
          <dt>Demo shipping</dt>
          <dd>{shipping ? formatMoney(shipping) : 'Complimentary'}</dd>
        </div>
        <div>
          <dt>Taxes</dt>
          <dd>Not calculated in demo</dd>
        </div>
        <div className="summary-total">
          <dt>Demo total</dt>
          <dd>{formatMoney(subtotal + shipping)}</dd>
        </div>
      </dl>
      {subtotal > 0 && subtotal < 30000 && (
        <p className="shipping-progress">
          {formatMoney(30000 - subtotal)} away from complimentary demo shipping.
        </p>
      )}
      {children}
      <p className="demo-note">
        USD. Demo only. No payment or fulfillment. A real store must calculate applicable taxes
        server-side.
      </p>
    </aside>
  );
}
export default function CartView() {
  const { cart, dispatch, ready, notify, findProduct } = useStore();
  if (!ready)
    return (
      <div className="container empty-state" role="status">
        Loading your bag…
      </div>
    );
  if (!cart.length)
    return (
      <div className="container empty-state">
        <Icon name="bag" size={45} />
        <p className="eyebrow">A LITTLE ROOM FOR SOMETHING SPECIAL</p>
        <h1>Your bag is waiting.</h1>
        <p>Discover a watch that feels like you.</p>
        <Link href="/shop" className="button">
          Explore watches <Icon name="arrow" />
        </Link>
      </div>
    );
  return (
    <div className="container section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR CONSIDERED SELECTION</p>
          <h1>Shopping bag.</h1>
        </div>
        <Link href="/shop" className="text-link">
          Continue exploring <Icon name="arrow" />
        </Link>
      </div>
      <div className="cart-layout">
        <div className="cart-lines">
          {cart.map((line) => {
            const product = findProduct(line.id);
            if (!product) return null;
            const key = lineKey(line.id, line.strap);
            const otherQuantity = cart
              .filter((item) => item.id === line.id && lineKey(item.id, item.strap) !== key)
              .reduce((sum, item) => sum + item.quantity, 0);
            return (
              <article className="cart-line" key={key}>
                <Link href={`/watches/${product.id}`} className="cart-image">
                  <WatchImage src={product.image} alt={product.name} />
                </Link>
                <div className="cart-line-info">
                  <p className="product-reference">AURADE / {product.reference}</p>
                  <h2>
                    <Link href={`/watches/${product.id}`}>{product.name}</Link>
                  </h2>
                  <p>{line.strap}</p>
                  <p>{formatMoney(product.price)} each</p>
                  <div className="quantity-control">
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
                    >
                      <Icon name="minus" size={14} />
                    </button>
                    <span>{line.quantity}</span>
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
                    >
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                </div>
                <div className="cart-line-end">
                  <strong>{formatMoney(product.price * line.quantity)}</strong>
                  <button
                    className="icon-button"
                    aria-label={`Remove ${product.name} from bag`}
                    onClick={() => {
                      dispatch({ type: 'REMOVE', key });
                      notify('Removed from your bag');
                    }}
                  >
                    <Icon name="trash" size={18} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        <OrderSummary cart={cart}>
          <Link href="/checkout" className="button full-width">
            Continue to demo checkout <Icon name="arrow" size={17} />
          </Link>
        </OrderSummary>
      </div>
    </div>
  );
}
