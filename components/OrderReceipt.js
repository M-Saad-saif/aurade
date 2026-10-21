"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatMoney } from "@/lib/catalog";
import { ORDER_RECEIPT_KEY } from "@/lib/receipt";
import Icon from "./Icon";

export default function OrderReceipt({ id }) {
  const [order, setOrder] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        sessionStorage.getItem(ORDER_RECEIPT_KEY) || "null",
      );
      if (
        saved?.orderNumber === id &&
        saved?.customer &&
        Array.isArray(saved.items) &&
        Number.isFinite(saved.total) &&
        Number.isFinite(saved.subtotal) &&
        saved.items.every(
          (line) =>
            typeof line.name === "string" &&
            typeof line.strap === "string" &&
            Number.isInteger(line.quantity) &&
            line.quantity > 0 &&
            Number.isFinite(line.unitPrice) &&
            line.unitPrice >= 0,
        )
      )
        setOrder(saved);
    } catch {
      /* Missing or invalid receipts render a safe fallback. */
    }
    setReady(true);
  }, [id]);

  // --- LOADING STATE ---
  if (!ready)
    return (
      <section className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center px-6 py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#123c35] border-t-transparent" />
        <p className="mt-4 text-[0.9rem] text-[#5e7a70]">Loading receipt...</p>
      </section>
    );

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-9 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f5f2] text-[#123c35]">
          <Icon name="check" size={28} />
        </div>

        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-6 shrink-0 bg-[#123c35]" />
          <p className="mb-0 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
            {id ? "Order Confirmed" : "No Order Found"}
          </p>
          <span className="h-px w-6 shrink-0 bg-[#123c35]" />
        </div>

        <h1 className="text-[2.5rem] font-semibold leading-[1.1] tracking-[-1px] text-[#123c35] sm:text-[3.5rem] lg:text-[3rem]">
          {order
            ? "A moment, well chosen."
            : id
              ? "Your order is confirmed."
              : "Your next moment awaits."}
        </h1>

        <p className=" max-w-lg text-[0.95rem] leading-relaxed text-[#4d6b62]">
          {order
            ? `Thank you, ${order.customer.name}. We have received your order and will contact you on ${order.customer.phone} to confirm payment and delivery.`
            : id
              ? `We have received your order ${id}. A receipt could not be displayed in this browser, but our team has your details and will contact you to confirm.`
              : "Complete checkout to place an order."}
        </p>
      </div>

      {order && (
        <div className="mt-8 flex flex-col gap-6">
          {/* Order Details Card */}
          <div className="rounded-sm border border-[#d8e3dd] bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-2 flex flex-col justify-between gap-2 border-b border-[#d8e3dd] pb-1 sm:flex-row sm:items-center">
              <h2 className="text-[1.1rem] font-semibold text-[#123c35]">
                Receipt {order.orderNumber}
              </h2>
              {order.createdAt && (
                <p className="text-[0.8rem] text-[#5e7a70]">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {order.items.map((line, index) => (
                <div
                  className="flex items-start justify-between gap-4"
                  key={index}
                >
                  <div>
                    <p className="text-[0.95rem] font-semibold text-[#123c35]">
                      {line.name}
                    </p>
                    <p className="mt-[-18px] text-[0.8rem] text-[#5e7a70]">
                      {line.strap} · Qty {line.quantity}
                    </p>
                  </div>
                  <strong className="text-[0.95rem] font-semibold text-[#123c35]">
                    {formatMoney(line.unitPrice * line.quantity)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-[#d8e3dd] pt-4">
              <strong className="text-[1.1rem] font-semibold text-[#123c35]">
                Total
              </strong>
              <strong className="text-[1.1rem] font-semibold text-[#123c35]">
                {formatMoney(order.total)}
              </strong>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="rounded-sm border border-[#d8e3dd] bg-[#f0f5f2] p-2 sm:p-8">
            <h2 className="mb-5 text-[0.75rem] font-semibold uppercase tracking-[2px] text-[#123c35]">
              Contact Details
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[0.85rem]">
                <span className="text-[#5e7a70]">Name</span>
                <strong className="font-medium text-[#123c35]">
                  {order.customer.name}
                </strong>
              </div>
              <div className="flex items-center justify-between text-[0.85rem]">
                <span className="text-[#5e7a70]">Phone</span>
                <strong className="font-medium text-[#123c35]">
                  {order.customer.phone}
                </strong>
              </div>
              <div className="flex items-center justify-between text-[0.85rem]">
                <span className="text-[#5e7a70]">Email</span>
                <strong className="font-medium text-[#123c35]">
                  {order.customer.email}
                </strong>
              </div>
            </div>
          </div>

          {!order.whatsappSent && order.whatsappFallbackUrl && (
            <div className="flex flex-col items-center justify-between gap-4 rounded-sm border border-[#25D366]/30 bg-[#25D366]/5 p-6 text-center sm:flex-row sm:text-left">
              <p className="max-w-md text-[0.85rem] leading-relaxed text-[#123c35]">
                Send your order to our team on WhatsApp to make sure it reaches
                us right away the email is already send to <span className="font-bold">{order.customer.email}.</span>
              </p>
              <a
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-[0.8rem] font-semibold uppercase tracking-[1px] text-white transition-all hover:bg-[#1EBE57]"
                href={order.whatsappFallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Send on WhatsApp
                <Icon name="whatsapp" size={16} />
              </a>
            </div>
          )}
        </div>
      )}

      {/* --- BOTTOM CTA --- */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/shop"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#123c35] px-8 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-all duration-200 hover:bg-[#0d2e28] active:scale-[0.99]"
        >
          Continue exploring
          <Icon
            name="arrow"
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
