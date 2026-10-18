"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "./StoreProvider";
import Icon from "./Icon";

const links = [
  ["Home", "/"],
  ["Shop", "/shop"],
  ["Collections", "/collections"],
  ["Our story", "/about"],
  ["Journal", "/journal"],
];

export default function Header() {
  const { cart, wishlist, ready } = useStore();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const escape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const count = ready
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div className="border-b border-[#123c35]/10 bg-[#123c35] text-[#f4f0e6]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-2 px-6 py-0.5 text-center text-[0.65rem] font-medium tracking-[0.5px]">
          <span className="hidden sm:inline">
            A considered collection. A distinctive presence.
          </span>
          <span className="sm:hidden">A considered collection.</span>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1 border-b border-transparent pb-0.5 transition-colors  text-[#e1c27f]"
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

      <header className="sticky top-0 z-40 border-b border-[#d8e3dd] bg-[#f0f5f2]/85 backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-6 sm:h-[72px] lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="-ml-2 flex h-10 w-10 items-center justify-center rounded-full text-[#123c35] transition-colors hover:bg-[#123c35]/[0.06] lg:hidden"
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="main-navigation-mobile"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>

            <Link
              href="/"
              aria-label="Aurade home"
              className="flex flex-col leading-none text-[#123c35] transition-opacity hover:opacity-80"
            >
              <span className="text-[1.15rem] font-semibold tracking-[3px]">
                A.U.R.A.D.E
              </span>
              <span className="mt-1 text-[0.52rem] font-medium uppercase tracking-[3px] text-[#5e7a70]">
                Time, with an aura
              </span>
            </Link>
          </div>

          {/* ---------- CENTER: desktop nav ---------- */}
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
                    className={`pointer-events-none absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-[#123c35] transition-all duration-300 ${
                      active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ---------- RIGHT: actions ---------- */}
          <div className="flex items-center justify-end gap-1">
            <Link
              href="/shop?focus=search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#123c35] transition-colors hover:bg-[#123c35]/[0.06]"
              aria-label="Search watches"
            >
              <Icon name="search" />
            </Link>

            <Link
              href="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#123c35] transition-colors hover:bg-[#123c35]/[0.06]"
              aria-label={`Wishlist, ${ready ? wishlist.length : 0} watches`}
            >
              <Icon name="heart" />
              {ready && wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#123c35] px-1 text-[0.6rem] font-semibold text-[#e1c27f] ring-2 ring-[#f0f5f2]">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#123c35] transition-colors hover:bg-[#123c35]/[0.06]"
              aria-label={`Shopping bag, ${count} items`}
            >
              <Icon name="bag" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#123c35] px-1 text-[0.6rem] font-semibold text-[#e1c27f] ring-2 ring-[#f0f5f2]">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ===== MOBILE DRAWER ===== */}
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-[#123c35]/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <nav
        id="main-navigation-mobile"
        aria-label="Main navigation"
        className={`fixed inset-y-0 left-0 z-40 w-[80%] max-w-sm border-r border-[#d8e3dd] bg-[#f0f5f2] px-6 pb-8 pt-6 shadow-[8px_0_32px_-12px_rgba(18,60,53,0.25)] transition-transform duration-300 ease-out lg:hidden ${
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
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#123c35] transition-colors hover:bg-[#123c35]/[0.06]"
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
    </>
  );
}
