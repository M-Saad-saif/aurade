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
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg sm:rounded-3xl">
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
          <span className="pointer-events-none absolute left-3 top-3 z-20 max-w-[calc(100%-3.25rem)] truncate rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
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
          className={`absolute right-3 top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 sm:right-4 sm:top-4 sm:h-9 sm:w-9 ${
            saved
              ? "bg-black text-red-500"
              : "bg-white/80 text-gray-700 hover:bg-white hover:text-black"
          }`}
        >
          <Icon name="heart" fill={saved ? "currentColor" : "none"} size={16} />
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <h3 className="text-base font-bold leading-snug tracking-tight text-gray-900 sm:text-xl lg:text-2xl">
          <Link href={href} className="hover:underline">
            {product.name}{" "}
            {product.reference && (
              <span className="text-[10px] text-gray-500 sm:text-[12px]">
                ({product.reference})
              </span>
            )}
          </Link>
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-gray-600 sm:mt-2 sm:text-sm">
          {product.description ||
            `${product.movement ? product.movement + " · " : ""}${product.caseSize || ""}`}
        </p>

        {/* Select Dropdowns (Style Match from Image) */}
        <div className="mt-3 grid grid-cols-1 gap-2 min-[520px]:grid-cols-2 min-[520px]:gap-2.5">
          <div className="relative flex min-w-0 items-center justify-center rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-[10px] font-medium text-gray-800 shadow-sm sm:px-3 sm:text-xs">
            <span className="flex min-w-0 items-center gap-2 truncate">
              <span className="h-3 w-3 shrink-0 rounded-full bg-[#b2c3b2] sm:h-3.5 sm:w-3.5" />
              <span className="truncate">{product.movement}</span>
            </span>
          </div>

          <div className="relative flex min-w-0 items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-[10px] font-medium text-gray-800 shadow-sm sm:px-3 sm:text-xs">
            <span className="shrink-0 truncate text-[9px] sm:text-[10px]">Case size</span>
            <span className="truncate">{product.caseSize}</span>
          </div>
        </div>

        {/* Footer / Price & Add to Cart */}
        <div className="mt-auto flex flex-col gap-2.5 border-t border-gray-100 pt-3 min-[520px]:flex-row min-[520px]:items-center min-[520px]:justify-between min-[520px]:gap-3 sm:pt-4">
          <span className="text-base font-semibold tracking-tight text-gray-900 sm:text-2xl">
            {formatMoney(product.price)}
          </span>

          <Link
            href={href}
            aria-label={`Discover ${product.name}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#163d24] px-3 py-2.5 text-[11px] font-semibold text-[#ffe2a7] shadow-sm transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] min-[520px]:w-auto min-[520px]:rounded-2xl min-[520px]:px-4 min-[520px]:py-3 sm:px-5 sm:text-xs"
          >
            <span>Discover</span>
            <Icon name="shopping-bag" size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
