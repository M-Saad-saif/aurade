"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatMoney } from "@/lib/catalog";
import { useStore } from "./StoreProvider";
import WatchImage from "./WatchImage";
import Icon from "./Icon";

export default function ProductDetails({ product }) {
  const [strap, setStrap] = useState(product.straps[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [specsOpen, setSpecsOpen] = useState(true);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const [videoHover, setVideoHover] = useState(false);
  const videoRef = useRef(null);
  const { cart, wishlist, dispatch, notify, ready } = useStore();
  const saved = ready && wishlist.includes(product.id);

  const hasVideo = Boolean(product.video);
  const videoActive = hasVideo && activeImage === 0;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const shouldPlay =
      videoActive && videoHover && product.video?.type !== "gif";
    if (shouldPlay) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else if (!el.paused) {
      el.pause();
    }
  }, [videoActive, videoHover, product.video]);

  const inBag = cart
    .filter((line) => line.id === product.id)
    .reduce((sum, line) => sum + line.quantity, 0);

  const available = product.stock - inBag;

  function add() {
    if (!ready || available <= 0) return;
    dispatch({
      type: "ADD",
      id: product.id,
      strap,
      quantity: Math.min(quantity, available),
    });
    notify(`${product.name} added to your bag`);
  }

  return (
    <div className="min-h-screen bg-[#f0f5f2]">
      <div className="mx-auto max-w-7xl px-6 pb-28 pt-6 sm:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-[0.78rem] text-[#5e7a70]"
        >
          <Link href="/" className="transition-colors hover:text-[#123c35]">
            Home
          </Link>
          <span aria-hidden="true" className="text-[#a8bdb5]">
            /
          </span>
          <Link href="/shop" className="transition-colors hover:text-[#123c35]">
            Watches
          </Link>
          <span aria-hidden="true" className="text-[#a8bdb5]">
            /
          </span>
          <span className="text-[#123c35]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* --- MAIN IMAGE AREA --- */}
            <div
              className="relative overflow-hidden rounded-sm border border-[#d8e3dd] bg-white shadow-[0_1px_2px_rgba(18,60,53,0.04)]"
              onMouseEnter={() => setVideoHover(true)}
              onMouseLeave={() => setVideoHover(false)}
            >
              <div className="relative aspect-[4/5] w-full">
                {product.images.map((src, index) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      activeImage === index
                        ? "z-10 opacity-100"
                        : "z-0 opacity-0"
                    }`}
                  >
                    <WatchImage
                      src={src}
                      alt={`${product.name} watch photograph ${index + 1}`}
                      priority={index === 0} // Only prioritize the first image for load speed
                    />
                  </div>
                ))}
              </div>

              {/* --- HOVER CLIP --- */}
              {hasVideo && (
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 z-20 transition-opacity duration-300 ${
                    videoActive && videoHover
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  {product.video.type === "gif" ? (
                    <img
                      src={product.video.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={product.video.url}
                      className="h-full w-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  )}
                </div>
              )}

              {hasVideo && videoActive && !videoHover && (
                <span className="pointer-events-none absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-[#123c35]/85 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[2px] text-[#f4f0e6] backdrop-blur-sm">
                  <Icon name="play" size={12} />
                  Hover to play
                </span>
              )}

              {/* Reference chip */}
              <span className="absolute bottom-4 left-4 z-20 rounded-full bg-white/90 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[2px] text-[#123c35] backdrop-blur-sm">
                {product.reference}
              </span>
            </div>

            {/* --- THUMBNAILS --- */}
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((src, index) => {
                  const isActive = activeImage === index;
                  return (
                    <button
                      key={src}
                      type="button"
                      aria-label={`View photo ${index + 1}`}
                      aria-pressed={isActive}
                      onClick={() => setActiveImage(index)}
                      className={`relative aspect-square overflow-hidden rounded-sm border bg-white transition-all duration-300 ease-in-out ${
                        isActive
                          ? "border-[#123c35] ring-1 ring-[#123c35] opacity-100"
                          : "border-[#d8e3dd] opacity-90 hover:border-[#123c35]/40 hover:opacity-100"
                      }`}
                    >
                      <WatchImage src={src} alt="" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <p className="mb-3 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[4px] text-[#5e7a70]">
              <span className="h-px w-8 bg-[#123c35]" />
              Aurade / {product.reference}
            </p>

            <h1 className="text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.8px] text-[#123c35] sm:text-[2.75rem]">
              {product.name}
            </h1>

            <p className="mt-3 text-[0.95rem] text-[#4d6b62]">
              {product.movement} · {product.caseSize} · {product.dial} dial
            </p>

            <p className="mt-6 text-[1.85rem] font-semibold tracking-[-0.5px] text-[#123c35]">
              {formatMoney(product.price)}{" "}
              <span className="text-[0.8rem] font-medium uppercase tracking-[2px] text-[#5e7a70]">
                USD
              </span>
            </p>

            <p className="mt-5 max-w-prose text-[0.98rem] leading-relaxed text-[#3d534c]">
              {product.description}
            </p>

            <fieldset className="mt-8">
              <legend className="mb-3 flex w-full items-baseline justify-between text-[0.72rem] font-medium uppercase tracking-[2px] text-[#5e7a70]">
                <span>Choose your strap</span>
                <span className="normal-case tracking-normal text-[#123c35]">
                  {strap}
                </span>
              </legend>

              <div className="flex flex-wrap gap-2">
                {product.straps.map((option) => {
                  const selected = strap === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setStrap(option)}
                      className={`rounded-full border px-4 py-2 text-[0.82rem] font-medium transition-all duration-200 ${
                        selected
                          ? "border-[#123c35] bg-[#123c35] text-[#e1c27f]"
                          : "border-[#c8d6d0] bg-white text-[#123c35] hover:border-[#123c35]"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex h-12 items-center justify-between rounded-full border border-[#c8d6d0] bg-white sm:w-32">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-full w-10 items-center justify-center rounded-l-full text-[#123c35] transition-colors hover:bg-[#f0f5f2] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Icon name="minus" size={15} />
                </button>
                <span
                  aria-live="polite"
                  className="min-w-[2ch] text-center text-[0.95rem] font-semibold text-[#123c35]"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={quantity >= available}
                  onClick={() => setQuantity(Math.min(available, quantity + 1))}
                  className="flex h-full w-10 items-center justify-center rounded-r-full text-[#123c35] transition-colors hover:bg-[#f0f5f2] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Icon name="plus" size={15} />
                </button>
              </div>

              {/* add to bag */}
              <button
                type="button"
                disabled={!ready || available <= 0}
                onClick={add}
                className="group inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#123c35] px-6 text-[0.85rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-all duration-200 hover:bg-[#0d2e28] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon name="bag" size={17} />
                {available <= 0 ? "All units in bag" : "Add to bag"}
              </button>

              {/* wishlist */}
              <button
                type="button"
                aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                aria-pressed={saved}
                disabled={!ready}
                onClick={() => {
                  dispatch({ type: "WISHLIST", id: product.id });
                  notify(saved ? "Removed from wishlist" : "Saved to wishlist");
                }}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                  saved
                    ? "border-[#123c35] bg-[#123c35] text-[#e1c27f]"
                    : "border-[#c8d6d0] bg-white text-[#123c35] hover:border-[#123c35]"
                }`}
              >
                <Icon
                  name="heart"
                  fill={saved ? "currentColor" : "none"}
                  size={18}
                />
              </button>
            </div>

            <p className="mt-4 flex items-center gap-2 text-[0.78rem] text-[#4d6b62]">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${
                  ready && available > 0 ? "bg-[#2f7a4e]" : "bg-[#b85450]"
                }`}
              />
              {ready ? available : product.stock} available in demo inventory
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 border-y border-[#d8e3dd] py-5 sm:grid-cols-2">
              <Link
                href="/support/shipping"
                className="group flex items-center gap-3 text-[0.82rem] text-[#123c35] transition-opacity hover:opacity-80"
              >
                <Icon name="truck" />
                <span className="border-b border-transparent transition-colors group-hover:border-[#123c35]">
                  Shipping: $15, free from $300
                </span>
              </Link>
              <Link
                href="/support/returns"
                className="group flex items-center gap-3 text-[0.82rem] text-[#123c35] transition-opacity hover:opacity-80"
              >
                <Icon name="return" />
                <span className="border-b border-transparent transition-colors group-hover:border-[#123c35]">
                  Returns information
                </span>
              </Link>
            </div>

            <div className="mt-2 divide-y divide-[#d8e3dd]">
              <div className="py-5">
                <button
                  type="button"
                  onClick={() => setSpecsOpen((v) => !v)}
                  aria-expanded={specsOpen}
                  className="flex w-full cursor-pointer items-center justify-between text-left text-[0.95rem] font-medium text-[#123c35]"
                >
                  <span className="flex items-center gap-3">
                    Specifications
                    <span className="rounded-full bg-[#123c35]/[0.07] px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[1.5px] text-[#5e7a70]">
                      6 details
                    </span>
                  </span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border border-[#d8e3dd] text-[#5e7a70] transition-all duration-300 ${
                      specsOpen
                        ? "rotate-45 border-[#123c35] text-[#123c35]"
                        : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    specsOpen
                      ? "mt-5 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <dl className="overflow-hidden rounded-sm border border-[#d8e3dd] bg-white">
                      {[
                        ["Movement", product.movement],
                        ["Case size", product.caseSize],
                        ["Case material", product.caseMaterial],
                        ["Dial", product.dial],
                        ["Water resistance", product.waterResistance],
                        ["Reference", product.reference],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="grid grid-cols-[1fr_1.3fr] items-center gap-4 border-b border-[#d8e3dd] px-4 py-3 text-[0.88rem] last:border-b-0"
                        >
                          <dt className="font-medium text-[#5e7a70]">
                            {label}
                          </dt>
                          <dd className="text-right font-medium text-[#123c35]">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>

              <div className="py-4">
                <button
                  type="button"
                  onClick={() => setDeliveryOpen((v) => !v)}
                  aria-expanded={deliveryOpen}
                  className="flex w-full cursor-pointer items-center justify-between text-left text-[0.95rem] font-medium text-[#123c35]"
                >
                  Delivery &amp; returns
                  <span
                    className={`text-[#5e7a70] transition-transform duration-300 ${
                      deliveryOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    deliveryOpen
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[0.88rem] leading-relaxed text-[#3d534c]">
                      This is a demo storefront. No products are shipped and no
                      payment is collected.{" "}
                      <Link
                        href="/support/shipping"
                        className="font-medium text-[#123c35] underline-offset-4 hover:underline"
                      >
                        Read delivery information.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-4">
                <button
                  type="button"
                  onClick={() => setCareOpen((v) => !v)}
                  aria-expanded={careOpen}
                  className="flex w-full cursor-pointer items-center justify-between text-left text-[0.95rem] font-medium text-[#123c35]"
                >
                  Care &amp; keeping
                  <span
                    className={`text-[#5e7a70] transition-transform duration-300 ${
                      careOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    careOpen
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[0.88rem] leading-relaxed text-[#3d534c]">
                      Follow the actual manufacturer&apos;s care instructions
                      for any watch you purchase.{" "}
                      <Link
                        href="/support/care"
                        className="font-medium text-[#123c35] underline-offset-4 hover:underline"
                      >
                        Explore our care checklist.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#d8e3dd] bg-[#f0f5f2]/95 backdrop-blur-md sm:hidden">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-4 py-3">
          <div className="flex-1">
            <p className="text-[0.65rem] uppercase tracking-[2px] text-[#5e7a70]">
              Total
            </p>
            <p className="text-[1.05rem] font-semibold text-[#123c35]">
              {formatMoney(product.price)}
            </p>
          </div>
          <button
            type="button"
            disabled={!ready || available <= 0}
            onClick={add}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#123c35] px-5 text-[0.82rem] font-semibold uppercase tracking-[1.5px] text-[#f4f0e6] transition-colors hover:bg-[#0d2e28] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon name="bag" size={16} />
            {available <= 0 ? "In bag" : "Add to bag"}
          </button>
        </div>
      </div>
    </div>
  );
}
