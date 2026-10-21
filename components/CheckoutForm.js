"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useStore } from "./StoreProvider";
import { ORDER_RECEIPT_KEY } from "@/lib/receipt";
import { OrderSummary } from "./CartView";
import Icon from "./Icon";

export default function CheckoutForm() {
  const { cart, dispatch, ready } = useStore();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const lock = useRef(false);
  const router = useRouter();

  async function submit(event) {
    event.preventDefault();

    if (lock.current || !cart.length) return;

    lock.current = true;
    setSubmitting(true);
    setError("");

    const data = new FormData(event.currentTarget);
    const payload = {
      customer: {
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone"),
      },
      items: cart.map(({ id, strap, quantity }) => ({ id, strap, quantity })),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.order) {
        setError(
          result?.error ||
            "We could not place your order. Please check your details and try again.",
        );
        lock.current = false;
        setSubmitting(false);
        return;
      }

      try {
        sessionStorage.setItem(ORDER_RECEIPT_KEY, JSON.stringify(result.order));
      } catch {
        /* The order is confirmed on the server even if the receipt cannot be stored. */
      }

      dispatch({ type: "CLEAR_CART" });
      router.push(
        `/order-success?id=${encodeURIComponent(result.order.orderNumber)}`,
      );
    } catch {
      setError(
        "We could not reach the server. Please check your connection and try again.",
      );
      lock.current = false;
      setSubmitting(false);
    }
  }

  // --- LOADING STATE ---
  if (!ready)
    return (
      <section className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center px-6 py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#123c35] border-t-transparent" />
        <p className="mt-4 text-[0.9rem] text-[#5e7a70]">
          Preparing checkout...
        </p>
      </section>
    );

  // --- EMPTY STATE ---
  if (!cart.length && !submitting)
    return (
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-center rounded-sm border border-[#d8e3dd] bg-white px-6 py-24 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0f5f2] text-[#123c35]">
            <Icon name="bag" size={32} />
          </div>
          <h1 className="mb-3 text-[2rem] font-semibold tracking-[-0.5px] text-[#123c35] sm:text-[2.5rem]">
            Your bag is empty.
          </h1>
          <p className="mb-8 max-w-md text-[0.95rem] leading-relaxed text-[#5e7a70]">
            You need to add a watch to your bag before you can check out.
          </p>
          <Link
            href="/shop"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#123c35] px-8 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-all duration-200 hover:bg-[#0d2e28] active:scale-[0.99]"
          >
            Explore watches
            <Icon
              name="arrow"
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    );

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
      <div className="mb-10 border-b text-center border-[#d8e3dd] pb-6">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-6 shrink-0 bg-[#123c35]" />
          <p className="mb-0 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
            Secure Checkout
          </p>
          <span className="h-px w-6 shrink-0 bg-[#123c35]" />
        </div>

        <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-[-0.5px] text-[#123c35] sm:text-[2.5rem]">
          Place your order.
        </h1>

        <p className="mt-3  text-[0.95rem] leading-relaxed text-[#4d6b62]">
          Enter your contact details. We will confirm your order by email and
          phone.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
        <form
          id="checkout-form"
          onSubmit={submit}
          className="flex flex-col gap-8"
        >
          <div className="flex items-start gap-4 rounded-sm border border-[#d8e3dd] bg-[#f0f5f2] p-5">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#5e7a70] shadow-sm">
              <Icon name="shield" size={16} />
            </div>
            <div>
              <p className="text-[0.85rem] font-semibold text-[#123c35]">
                Secure & Private
              </p>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-[#5e7a70]">
                No online payment is collected. Your details are only used to
                confirm and deliver this order.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-[1.2rem] font-semibold tracking-[-0.3px] text-[#123c35]">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-[0.75rem] font-semibold uppercase tracking-[1px] text-[#123c35]">
                  Full name
                </span>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  maxLength={120}
                  className="h-11 w-full rounded-sm border border-[#c8d6d0] bg-white px-4 text-[0.95rem] text-[#123c35] placeholder-[#5e7a70]/50 transition-colors focus:border-[#123c35] focus:outline-none focus:ring-1 focus:ring-[#123c35]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[0.75rem] font-semibold uppercase tracking-[1px] text-[#123c35]">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  maxLength={254}
                  className="h-11 w-full rounded-sm border border-[#c8d6d0] bg-white px-4 text-[0.95rem] text-[#123c35] placeholder-[#5e7a70]/50 transition-colors focus:border-[#123c35] focus:outline-none focus:ring-1 focus:ring-[#123c35]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[0.75rem] font-semibold uppercase tracking-[1px] text-[#123c35]">
                  Phone number
                </span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+92 300 1234567"
                  required
                  maxLength={30}
                  className="h-11 w-full rounded-sm border border-[#c8d6d0] bg-white px-4 text-[0.95rem] text-[#123c35] placeholder-[#5e7a70]/50 transition-colors focus:border-[#123c35] focus:outline-none focus:ring-1 focus:ring-[#123c35]"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#123c35]"
              />
              <span className="text-[0.85rem] leading-snug text-[#4d6b62]">
                I confirm my details are correct and agree to be contacted about
                this order.
              </span>
            </label>

            {error && (
              <p
                className="rounded-sm bg-[#fdf2f2] p-3 text-[0.85rem] font-medium text-[#b85450]"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          <div className="mt-4 lg:hidden">
            <button
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#123c35] px-8 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-all duration-200 hover:bg-[#0d2e28] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={submitting}
              type="submit"
            >
              {submitting ? "Placing order..." : "Place order"}
              {!submitting && <Icon name="arrow" size={16} />}
            </button>
          </div>

          <Link
            href="/cart"
            className="group inline-flex items-center gap-2 text-[0.85rem] font-medium text-[#5e7a70] transition-colors hover:text-[#123c35] lg:mb-0"
          >
            <Icon
              name="arrow"
              size={14}
              className="rotate-180 transition-transform group-hover:-translate-x-1"
            />
            Back to bag
          </Link>
        </form>

        <OrderSummary cart={cart} showItems>
          <button
            className="group hidden h-12 w-full items-center justify-center gap-2 rounded-full bg-[#123c35] px-6 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-all duration-200 hover:bg-[#0d2e28] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 lg:flex"
            disabled={submitting}
            type="submit"
            form="checkout-form"
          >
            {submitting ? "Placing order..." : "Place order"}
            {!submitting && (
              <Icon
                name="arrow"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            )}
          </button>
        </OrderSummary>
      </div>
    </section>
  );
}
