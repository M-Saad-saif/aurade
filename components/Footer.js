import Link from "next/link";
import Image from "next/image";
const groups = [
  {
    title: "Explore",
    links: [
      ["All watches", "/shop"],
      ["Collections", "/collections"],
      ["Wishlist", "/wishlist"],
      ["Shopping bag", "/cart"],
    ],
  },
  {
    title: "Aurade",
    links: [
      ["Our story", "/about"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Information",
    links: [["FAQ", "/support/faq"]],
  },
];



export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[#d8e3dd] bg-[#f0f5f2]">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:pr-8">
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
                className="h-10 w-10 shrink-0 rounded-lg object-contain"
                priority
              />
              <div className="flex flex-col justify-center">
                <span className="text-[1.2rem] font-semibold leading-none tracking-[0.2em] text-[#123c35]">
                  U.R.A.D.E
                </span>
                <span className="mt-1.5 text-[0.55rem] font-medium uppercase leading-none tracking-[0.18em] text-[#5e7a70]">
                  Time, with an aura
                </span>
              </div>
            </Link>

          

            <p className="mt-6 max-w-xs text-[0.85rem] leading-relaxed text-[#5e7a70]">
              A thoughtfully designed watch storefront with a curated
              collection and personal order confirmation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-2 lg:col-span-8">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[2px] text-[#123c35] sm:mb-5 sm:text-[0.75rem]">
                  {group.title}
                </h3>
                <ul className="flex flex-col gap-2 sm:gap-0">
                  {group.links.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="group inline-flex py-0.5 text-[0.85rem] text-[#5e7a70] transition-colors hover:text-[#123c35] sm:text-[0.88rem]"
                      >
                        <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-[#123c35]">
                          {label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 -mb-7.5 flex flex-col items-center justify-between gap-4 border-t border-[#d8e3dd] pt-8 sm:mt-10 sm:flex-row">
          <p className="text-[0.8rem] text-[#5e7a70]">
            © {currentYear} Aurade.
          </p>
        </div>
      </div>
    </footer>
  );
}
