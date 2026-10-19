"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatMoney } from "@/lib/catalog";
import { useStore } from "./StoreProvider";
import Icon from "./Icon";
import WatchImage from "./WatchImage";

export default function ProductCard({ product }) {
  const { wishlist, dispatch, ready, notify } = useStore();
  const saved = ready && wishlist.includes(product.id);
  const href = `/watches/${product.id}`;

  const [videoHover, setVideoHover] = useState(false);
  const videoRef = useRef(null);
  const hasVideo = Boolean(product.video);
  const isGif = product.video?.type === "gif";

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (videoHover && hasVideo && !isGif) {
      el.currentTime = 0;
      el.play().catch(() => {});
    } else if (!el.paused) {
      el.pause();
    }
  }, [videoHover, hasVideo, isGif]);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg">
      {/* Top Image Container */}
      <div
        className="relative overflow-hidden bg-[#f5f5f7]"
        onMouseEnter={() => setVideoHover(true)}
        onMouseLeave={() => setVideoHover(false)}
      >
        <Link href={href} aria-label={`View ${product.name}`} className="block">
          <div className="aspect-square w-full overflow-hidden flex items-center justify-center">
            <WatchImage
              src={product.image}
              alt={`${product.name} illustrative photograph`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </Link>

        {/* Hover Video / GIF overlay */}
        {hasVideo && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ${
              videoHover ? "opacity-100" : "opacity-0"
            }`}
          >
            {isGif ? (
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

        {/* Optional Badge */}
        {product.badge && (
          <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {/* Video Icon Indicator */}
        {hasVideo && (
          <span className="pointer-events-none absolute bottom-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
            <Icon name="play" size={12} />
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          disabled={!ready}
          aria-label={`${saved ? "Remove" : "Save"} ${product.name} ${
            saved ? "from" : "to"
          } wishlist`}
          aria-pressed={saved}
          onClick={() => {
            dispatch({ type: "WISHLIST", id: product.id });
            notify(saved ? "Removed from wishlist" : "Saved to your wishlist");
          }}
          className={`absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
            saved
              ? "bg-black text-red-500"
              : "bg-white/80 text-gray-700 hover:bg-white hover:text-black"
          }`}
        >
          <Icon name="heart" fill={saved ? "currentColor" : "none"} size={16} />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          <Link href={href} className="hover:underline">
            {product.name} {product.reference && <span className="text-gray-500 text-[12px]">({product.reference})</span>}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-gray-600 leading-snug line-clamp-2">
          {product.description ||
            `${product.movement ? product.movement + " · " : ""}${product.caseSize || ""}`}
        </p>

        {/* Select Dropdowns (Style Match from Image) */}
        <div className="mt-[-10px] grid grid-cols-2 gap-2.5">
          <div className="relative flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-800 shadow-sm">
            <span className="flex items-center gap-2 truncate  ">
              <span className="h-3.5 w-3.5 rounded-full bg-[#b2c3b2] shrink-0" />
              {product.movement}
            </span>
          </div>

          <div className="relative flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-800 shadow-sm">
            <span className="truncate text-[10px]">Case size</span> {product.caseSize}
          </div>
        </div>

        {/* Footer / Price & Add to Cart */}
        <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">
            {formatMoney(product.price)}
          </span>

          <Link
            href={href}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl bg-[#163d24] px-5 py-3 text-xs font-semibold text-[#ffe2a7] shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] "
          >
            <span>Discover</span>
            <Icon name="shopping-bag" size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
