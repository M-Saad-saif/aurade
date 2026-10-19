import Link from "next/link";
import Newsletter from "./Newsletter";
import Image from "next/image";

const groups = [
  [
    "Explore",
    [
      ["All watches", "/shop"],
      ["Collections", "/collections"],
      ["Wishlist", "/wishlist"],
      ["Shopping bag", "/cart"],
    ],
  ],

  [
    "Aurade",
    [
      ["Our story", "/about"],
      ["The journal", "/journal"],
      ["Sell / trade", "/trade"],
      ["Contact", "/contact"],
    ],
  ],

  [
    "Information",
    [
      ["Shipping", "/support/shipping"],
      ["Returns", "/support/returns"],
      ["Watch care", "/support/care"],
      ["FAQ", "/support/faq"],
    ],
  ],
];
export default function Footer() {
  return (
    <>
      <Newsletter />

      <footer className="site-footer max-w-7xl mx-auto px-9">
        <div className="container footer-grid">
          <div>
            <Link
              href="/"
              aria-label="Aurade home"
              className="group flex items-center gap-3 text-[#123c35] transition-opacity hover:opacity-80"
            >
              <Image
                src="/images/logo.png"
                alt="Aurade logo"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0 rounded-[8px] object-contain"
                priority
              />

              <div className="flex flex-col justify-center">
                <span className="text-[1.15rem] font-semibold leading-none tracking-[0.2em] text-[#123c35]">
                  URADE
                </span>

                <span className="mt-1.5 text-[0.55rem] font-medium uppercase leading-none tracking-[0.18em] text-[#5e7a70]">
                  Time, with an aura
                </span>
              </div>
            </Link>

            <p className="muted footer-note">
              A thoughtfully designed watch storefront.
              <br />
              Demonstration collection, not a live retailer.
            </p>
          </div>
          {groups.map(([title, links]) => (
            <div key={title}>
              <h3>{title}</h3>
              {links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Aurade. Demo storefront.</span>
          <div>
            <Link href="/support/privacy">Privacy</Link>
            <Link href="/support/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
