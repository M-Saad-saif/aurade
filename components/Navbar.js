"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./StoreProvider";
import Icon from "./Icon";
import Image from "next/image";

const links = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Collections", "/collections"],
  ["Gallery", "/gallery"],
  ["About", "/about"],
];

export default function Header() {
  const { cart, wishlist, ready } = useStore();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const [cartBlink, setCartBlink] = useState(false);
  const [wishlistBlink, setWishlistBlink] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const count = ready
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const wishlistCount = ready ? wishlist.length : 0;

  useEffect(() => {
    if (count > 0) {
      setCartBlink(true);
      const timer = setTimeout(() => setCartBlink(false), 600);
      return () => clearTimeout(timer);
    }
  }, [count]);

  useEffect(() => {
    if (wishlistCount > 0) {
      setWishlistBlink(true);
      const timer = setTimeout(() => setWishlistBlink(false), 600);
      return () => clearTimeout(timer);
    }
  }, [wishlistCount]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Announcement Bar */}
      <div className="border-b border-[#123c35]/10 bg-[#123c35] text-[#f4f0e6]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-6 py-0.5 text-center text-[0.65rem] font-medium tracking-[0.5px]">
          <span className="hidden sm:inline">
            A considered collection. A distinctive presence.
          </span>
          <span className="sm:hidden">A considered collection.</span>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1 border-b border-transparent pb-0.5 text-[#e1c27f] transition-colors"
          >
            Discover Aurade
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-30 border-b border-[#d8e3dd] bg-[#f0f5f2]/85 backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:h-18 sm:gap-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex min-w-0 items-center gap-2">
            {/* Toggle Button */}
            <button
              type="button"
              className="-ml-1.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#123c35] transition-colors hover:bg-[#123c35]/6 sm:-ml-2 sm:h-10 sm:w-10 lg:hidden"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="main-navigation-mobile"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>

            <Link
              href="/"
              aria-label="Aurade home"
              className="group flex min-w-0 items-center gap-2 text-[#123c35] transition-opacity hover:opacity-80 sm:gap-3"
            >
              <Image
                src="/images/logo.png"
                alt="Aurade logo"
                width={36}
                height={36}
                className="h-8 w-8 shrink-0 rounded-lg object-contain sm:h-9 sm:w-9"
                priority
              />

              <div className="flex min-w-0 flex-col justify-center">
                <span className="text-[1rem] font-semibold leading-none tracking-[0.14em] text-[#123c35] sm:text-[1.15rem] sm:tracking-[0.2em]">
                  U.R.A.D.E
                </span>

                <span className="mt-1 hidden text-[0.5rem] font-medium uppercase leading-none tracking-[0.14em] text-[#5e7a70] min-[380px]:block sm:mt-1.5 sm:text-[0.55rem] sm:tracking-[0.18em]">
                  Time, with an aura
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className="hidden items-center justify-center gap-1 lg:flex"
          >
            {links.map(([label, href]) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[0.82rem] font-medium transition-colors ${
                    active
                      ? "text-[#123c35]"
                      : "text-[#4d6b62] hover:text-[#123c35]"
                  }`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-3.5 -bottom-px h-0.5 rounded-full bg-[#123c35] transition-all duration-300 ${
                      active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <Link
              href="/shop?focus=search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#123c35] transition-colors hover:bg-[#123c35]/6 sm:h-10 sm:w-10"
              aria-label="Search watches"
            >
              <Icon name="search" />
            </Link>

            <Link
              href="/wishlist"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#123c35] transition-colors hover:bg-[#123c35]/6 sm:h-10 sm:w-10"
              aria-label={`Wishlist, ${wishlistCount} watches`}
            >
              <Icon name="heart" />
              {wishlistCount > 0 && (
                <>
                  {wishlistBlink && (
                    <span className="absolute -right-0.5 -top-0.5 h-4.5 min-w-4.5 animate-ping rounded-full bg-[#e1c27f] opacity-75" />
                  )}
                  <span
                    className={`absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#123c35] px-1 text-[0.6rem] font-semibold text-[#e1c27f] ring-2 ring-[#f0f5f2] transition-transform duration-300 ${
                      wishlistBlink ? "scale-125" : "scale-100"
                    }`}
                  >
                    {wishlistCount}
                  </span>
                </>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#123c35] transition-colors hover:bg-[#123c35]/6 sm:h-10 sm:w-10"
              aria-label={`Shopping bag, ${count} items`}
            >
              <Icon name="bag" />
              {count > 0 && (
                <>
                  {cartBlink && (
                    <span className="absolute -right-0.5 -top-0.5 h-4.5 min-w-4.5 animate-ping rounded-full bg-[#e1c27f] opacity-75" />
                  )}
                  <span
                    className={`absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#123c35] px-1 text-[0.6rem] font-semibold text-[#e1c27f] ring-2 ring-[#f0f5f2] transition-transform duration-300 ${
                      cartBlink ? "scale-125" : "scale-100"
                    }`}
                  >
                    {count}
                  </span>
                </>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ===== MOBILE DRAWER CONTAINER ===== */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          open
            ? "visible pointer-events-auto"
            : "invisible pointer-events-none delay-300"
        }`}
        aria-hidden={!open}
      >
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-[#123c35]/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <nav
          id="main-navigation-mobile"
          aria-label="Mobile navigation"
          className={`absolute inset-y-0 left-0 h-full w-[80%] max-w-sm border-r border-[#d8e3dd] bg-[#f0f5f2] px-6 pb-8 pt-6 shadow-[8px_0_32px_-12px_rgba(18,60,53,0.25)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[1.05rem] font-semibold tracking-[3px] text-[#123c35]">
              AURADE
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#123c35] transition-colors hover:bg-[#123c35]/6"
            >
              <Icon name="close" />
            </button>
          </div>

          <ul className="mt-10 flex flex-col divide-y divide-[#d8e3dd]">
            {links.map(([label, href]) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-4 text-[1.05rem] font-medium transition-colors ${
                      active
                        ? "text-[#123c35]"
                        : "text-[#4d6b62] hover:text-[#123c35]"
                    }`}
                  >
                    {label}
                    <Icon name="arrow" size={16} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="mt-10 text-[0.62rem] font-medium uppercase tracking-[3px] text-[#5e7a70]">
            Time, with an aura
          </p>
        </nav>
      </div>
    </>
  );
}
