'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatMoney } from '@/lib/catalog';
import Icon from './Icon';
export default function OrderReceipt({ id }) {
  const [order, setOrder] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem('aurade:last-demo-order') || 'null');
      if (
        saved?.id === id &&
        Array.isArray(saved.items) &&
        Number.isFinite(saved.total) &&
        Number.isFinite(saved.shipping) &&
        Number.isFinite(saved.subtotal) &&
        saved.items.every(
          (line) =>
            typeof line.name === 'string' &&
            typeof line.strap === 'string' &&
            Number.isInteger(line.quantity) &&
            line.quantity > 0 &&
            Number.isFinite(line.unitPrice) &&
            line.unitPrice >= 0,
        )
      )
        setOrder(saved);
    } catch {
      /* Missing or invalid receipts render a safe empty state. */
    }
    setReady(true);
  }, [id]);
  if (!ready)
    return (
      <div className="empty-state" role="status">
        Loading receipt…
      </div>
    );
  return (
    <div className="site-container receipt section">
      <div className="receipt-icon">
        <Icon name="check" size={32} />
      </div>
      <p className="eyebrow">{order ? 'DEMO COMPLETE' : 'NO RECEIPT FOUND'}</p>
      <h1>{order ? 'A moment, well chosen.' : 'Your next moment awaits.'}</h1>
      <p>
        {order
          ? 'Your demo receipt is ready. No payment was collected and nothing will be shipped.'
          : 'Demo receipts are available only in the browser tab where they were created.'}
      </p>
      {order && (
        <div className="receipt-card">
          <h2>Receipt {order.id}</h2>
          {order.items.map((line, index) => (
            <div className="receipt-line" key={index}>
              <span>
                {line.name}
                <small>
                  {line.strap} · Quantity {line.quantity}
                </small>
              </span>
              <strong>{formatMoney(line.unitPrice * line.quantity)}</strong>
            </div>
          ))}
          <div className="receipt-line">
            <span>Demo shipping</span>
            <strong>{formatMoney(order.shipping)}</strong>
          </div>
          <div className="receipt-line">
            <strong>Demo total</strong>
            <strong>{formatMoney(order.total)}</strong>
          </div>
        </div>
      )}
      <Link href="/shop" className="button">
        Continue exploring <Icon name="arrow" />
      </Link>
    </div>
  );
}
