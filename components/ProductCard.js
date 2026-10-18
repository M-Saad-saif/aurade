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
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-[#d8e3dd] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-[#123c35]/30 hover:shadow-[0_12px_32px_-16px_rgba(18,60,53,0.25)]">
      <div
        className="relative overflow-hidden bg-[#f0f5f2]"
        onMouseEnter={() => setVideoHover(true)}
        onMouseLeave={() => setVideoHover(false)}
      >
        <Link href={href} aria-label={`View ${product.name}`} className="block">
          <div className="aspect-[4/5] w-full overflow-hidden">
            <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              <WatchImage
                src={product.image}
                alt={`${product.name} illustrative watch photograph`}
              />
            </div>
          </div>
        </Link>

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

        {product.badge && (
          <span className="pointer-events-none absolute left-3 top-3 z-20 rounded-full bg-white/90 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[2px] text-[#123c35] backdrop-blur-sm">
            {product.badge}
          </span>
        )}

        {hasVideo && (
          <span className="pointer-events-none absolute bottom-3 right-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-[#123c35]/80 text-[#f4f0e6] backdrop-blur-sm">
            <Icon name="play" size={12} />
          </span>
        )}

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
          className={`absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
            saved
              ? "border-[#123c35] bg-[#123c35] text-[#e1c27f]"
              : "border-[#d8e3dd] bg-white/90 text-[#123c35] hover:border-[#123c35] hover:bg-white"
          }`}
        >
          <Icon name="heart" fill={saved ? "currentColor" : "none"} size={16} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[0.62rem] font-medium uppercase tracking-[2.5px] text-[#5e7a70]">
          Aurade / {product.reference}
        </p>

        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="text-[1.05rem] font-semibold leading-snug tracking-[-0.2px] text-[#123c35]">
            <Link
              href={href}
              className="transition-colors hover:text-[#0d2e28]"
            >
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 text-[0.95rem] font-semibold tracking-[-0.2px] text-[#123c35]">
            {formatMoney(product.price)}
          </span>
        </div>

        <p className="mt-1.5 text-[0.8rem] text-[#4d6b62]">
          {product.movement} · {product.caseSize}
        </p>

        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1.5 self-start text-[0.78rem] font-medium uppercase tracking-[1.5px] text-[#123c35] transition-colors hover:text-[#0d2e28]"
        >
          <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-[#123c35]">
            Discover the watch
          </span>
          <Icon name="arrow" size={14} />
        </Link>
      </div>
    </article>
  );
}
